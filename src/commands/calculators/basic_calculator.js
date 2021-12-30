const mexp = require("math-expression-evaluator");
const layout = require("../../../res/basic_calc_layout.json");

module.exports = {
  async execute(client, interaction) {
    let expression = [];
    const msg = await interaction.reply({
      embeds: [
        {
          description: "```\n0\n=```",
          footer: {
            text: `If the calculator doesn't respond, create a new one !`
          },
          color: "#5865F2"
        }
      ],
      components: layout,
      ephemeral: true,
      fetchReply: true
    });

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
    let stringExp;
    let result;

    interaction.channel
      .createMessageComponentCollector({
        componentType: "BUTTON",
        idle: 180000
      })
      .on("collect", async i => {
        if (i.message.id !== msg.id) return;

        const idToValue = new Map(
          Object.entries({
            lparen: "(",
            rparen: ")",
            mul: "×",
            div: "÷",
            plus: "+",
            minus: "-",
            pow: "^",
            dot: "."
          })
        );
        if (idToValue.has(i.customId))
          expression.push(idToValue.get(i.customId));
        else if (!isNaN(i.customId)) expression.push(i.customId);
        else {
          switch (i.customId) {
            case "clear":
              expression = [];
              break;
            case "eq":
              stringExp = expression
                .join("")
                .replaceAll("×", "*")
                .replaceAll("÷", "/");
              try {
                result = mexp.eval(stringExp ? stringExp : "0", tokens);
              } catch (e) {
                result = "Syntax error : " + e.message;
              }
              await i.update({
                embeds: [
                  {
                    description: `\`\`\`\n${
                      expression.length !== 0 ? expression.join("") : "0"
                    }\n= ${result}\`\`\``,
                    footer: {
                      text: `If the calculator doesn't respond, create a new one !`
                    },
                    color: "#5865F2"
                  }
                ],
                components: i.message.components
              });
              return;
          }
        }
        await i.update({
          embeds: [
            {
              description: `\`\`\`\n${
                expression.length !== 0 ? expression.join("") : "0"
              }\n=\`\`\``,
              footer: {
                text: `If the calculator doesn't respond, create a new one !`
              },
              color: "#5865F2"
            }
          ],
          components: i.message.components
        });
      });
  }
};
