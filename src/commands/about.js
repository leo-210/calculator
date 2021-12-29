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
                "`/calculator` to generate a new calculator. " +
                "If you want, you can also use the command `/calculate` to calculate" +
                " a math expression. More info on the syntax with `/help syntax`.\n\n" +
                "Note : the calculator doesn't look very good on mobile, and unfortunately" +
                " I can't really do much about it."
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
              url: "https://discord.com/api/oauth2/authorize?client_id=925164519045603338&permissions=2048&scope=bot%20applications.commands&redirect_uri=https://www.leo21.fr&response_type=code",
              style: "LINK"
            },
            {
              type: "BUTTON",
              label: "Vote for the bot",
              url: "https://top.gg/bot/925164519045603338/vote",
              style: "LINK"
            }
          ]
        }
      ]
    });
  }
};
