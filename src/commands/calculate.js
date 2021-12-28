const { SlashCommandBuilder } = require("@discordjs/builders");
const mexp = require("math-expression-evaluator");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("calculate")
    .setDescription("Calculate a math expression, as long as it makes sense")
    .addStringOption(option =>
      option
        .setName("expression")
        .setDescription("The math expression to calculate")
        .setRequired(true)
    ),
  async execute(client, interaction) {
    const exp = interaction.options.getString("expression");

    const tokens = [
      {
        type: 8,
        token: "root",
        show: "root",
        value: function (a, b) {
          return Math.pow(b, 1 / a);
        }
      },
      {
        type: 0,
        token: "sqrt",
        show: "sqrt",
        value: function (a) {
          return Math.sqrt(a);
        }
      }
    ];
    let value;
    try {
      value = mexp.eval(exp, tokens);
    } catch (e) {
      value = `\b\bSyntax error : ${e.message}`;
    }
    await interaction.reply({
      embeds: [
        {
          description: `\`\`\`\n${exp}\n= ${value}\`\`\``,
          footer: {
            text: `Type /calculate to calculate your math expression !`
          },
          color: "#5865F2"
        }
      ],
      ephemeral: true
    });
  }
};
