const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Infos about the bot"),
  async execute(client, interaction) {
    await interaction.reply({
      embeds: [
        {
          title: "Calculator, by Léo-21#6810",
          description:
            "Calculator is a Discord bot that allows you to have your own calculator" +
            " in Discord.",
          fields: [
            {
              name: "Usage",
              value:
                "`/calculator` to generate a new calculator." +
                "If you want, you can also use the command `/calculate` to calculate" +
                "a math expression. More info on the syntax with `/help syntax`.\n\n" +
                "Note : the calculator doesn't look very good on mobile, and unfortunately" +
                " I cant' really do much about it."
            }
          ],
          color: "#5865F2"
        }
      ],
      components: [
        {
          type: "ACTION_ROW",
          components: [
            {
              type: "BUTTON",
              label: "Invite the bot",
              url: "https://Leo-210.github.io/Calculator/add.html",
              style: "LINK"
            }
          ]
        }
      ]
    });
  }
};
