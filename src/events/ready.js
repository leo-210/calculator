module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.user.setPresence({
      activities: [
        {
          type: "WATCHING",
          name: `${client.guilds.cache.reduce(
            (accumulator, value) => accumulator + value.memberCount,
            0
          )} users 🎉`
        }
      ]
    });

    if (process.env.SYNC_APP_COMMANDS === "true") {
      const { REST } = require("@discordjs/rest");
      const { Routes } = require("discord-api-types/v9");
      const commands = Array.from(client.commands.values()).map(command =>
        command.data.toJSON()
      );
      const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);
      try {
        await rest.put(
          Routes.applicationGuildCommands(
            client.user.id,
            client.config.mainGuildId
          ),
          {
            body: commands
          }
        );
        client.logger.debug("Slash commands ajoutées à Discord");
      } catch (e) {
        client.logger.error(
          `Erreur lors du déploiement des slash commands : ${e}`
        );
      }
    }
  }
};
