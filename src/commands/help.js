const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get help for some of th bot's functionnalities")
    .addSubcommand(command =>
      command
        .setName("syntax")
        .setDescription("Help on the syntax of the math expressions")
    ),
  async execute(client, interaction) {
    if (interaction.options.getSubcommand() === "syntax") {
      await interaction.reply({
        embeds: [
          {
            title: "Help - Syntax",
            description:
              "For most of the symbols, it is really simple, but there are some special cases.",
            fields: [
              {
                name: "Complex syntax",
                value:
                  "**\\*** `root(n, a)`: returns the nth root of b. Example : root(3, 8) = 2 " +
                  "(this applies to the calculator)\n" +
                  "**\\*** `Sigma(a, b, n)`: corresponds to 'Σ'. Returns the sum of n from a to b\n" +
                  "**\\*** `Pi(a, b, n)`: corresponds to '∏'. Same as `Sigma`, but it multiplies instead\n\n" +
                  "Try it now with `calculate` !"
              },
              {
                name: "All available symbols",
                value:
                  "```\n+, -, / ,* ,Mod ,( ,) ,Sigma ,Pi ,n ,pi, e, !, " +
                  "log, ln, pow, ^, root, sqrt, sin, cos, tan, asin, acos, atan, " +
                  "sinh, cosh, tanh, asinh, acosh, atanh\n```\n" +
                  "Note : the trigonometric functions are in degrees, and there's" +
                  " no way at the moment to change it to radians."
              }
            ],
            color: "#5865F2"
          }
        ]
      });
    }
  }
};
