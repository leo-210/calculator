const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Infos about the bot"),
  async execute(client, interaction) {
    await interaction.reply({
      embeds: [
        {
          title: "Calculator by Léo-21#6810",
          description:
            "Calculator is a Discord bot that allows you to have your own calculator in Discord." +
            "in Discord.",
          fields: [
            {
              name: "Usage",
              value:
                "`/calculator` to generate a new calculator." +
                "If you want, you can also use the command `/calculate` to calculate" +
                "a math expression. More info on the syntax with `/help syntax`.\n\n" +
                "Note : the trigonometric functions are in degrees, and there's" +
                " no way at the moment to change it to radians or gradians."
            }
          ],
          color: "#5865F2",
          thumbnail: client.user.avatarURL({ format: "png" })
        }
      ]
    });
  }
};
