const { Client, Intents, Collection } = require("discord.js");
const { readdirSync, readFileSync } = require("fs");
const { load } = require("js-yaml");
const { version } = require("./../package.json");
const { createLogger, format, transports } = require("winston");

require("dotenv").config();

// eslint-disable-next-line no-console
console.log(`Calculator - Version ${version}\n`);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.logger = newLogger(process.env.DEBUG === "true");
client.config = load(readFileSync("res/config.yml"));
client.commands = new Collection();

if (!process.env.BOT_TOKEN) {
  client.logger.error("La variable d'environnement 'BOT_TOKEN' n'existe pas");
  process.exit(1);
}

registerEvents();
registerCommands();

client.logger.info("Connexion à Discord...");
client
  .login(process.env.BOT_TOKEN)
  .then(() =>
    client.logger.info(`Client connecté en tant que ${client.user.tag}`)
  )
  .catch(e => `Impossible de se connecter à discord : ${e}`);

function registerEvents() {
  const eventFiles = readdirSync("src/events").filter(file =>
    file.endsWith(".js")
  );

  for (const file of eventFiles) {
    try {
      const event = require(`./events/${file}`);
      const execute = (...args) => {
        client.logger.debug(`Event '${event.name}' reçu`);
        event.execute(client, ...args);
      };
      if (event.once) {
        client.once(event.name, execute);
      } else {
        client.on(event.name, execute);
      }
      client.logger.debug(`Event '${event.name}' ajouté`);
    } catch (e) {
      client.logger.error(`Impossible de charger le fichier '${file}' : ${e}`);
    }
  }
}

function registerCommands() {
  const commandFiles = readdirSync("src/commands").filter(file =>
    file.endsWith(".js")
  );

  for (const file of commandFiles) {
    try {
      const command = require(`./commands/${file}`);
      client.commands.set(command.data.name, command);
      client.logger.debug(`Commande '${command.data.name}' ajoutée au bot`);
    } catch (e) {
      client.logger.error(`Impossible de charger le fichier '${file}' : ${e}`);
    }
  }
}

function newLogger(debug) {
  return createLogger({
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          format.padLevels(),
          format.printf(info =>
            format
              .colorize()
              .colorize(
                info.level,
                `[${info.timestamp}] [${info.level}] ${info.message}`
              )
          )
        )
      })
    ],
    level: debug ? "debug" : "info"
  });
}
