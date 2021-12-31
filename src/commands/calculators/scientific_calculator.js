const mexp = require("math-expression-evaluator");
const { normal, second } = require("../../../res/scientific_calc_layout.json");

module.exports = {
  async execute(client, interaction) {
    let expression = [];
    const msg = await interaction.reply({
      embeds: [
        {
          description: "```\n0\n=```",
          footer: {
            text: `If the calculator doesn't respond, create a new one !  •  Calculator`
          },
          color: "#5865F2"
        }
      ],
      components: normal,
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
            sqrt: "√",
            dot: ".",
            square: "^2",
            // eslint-disable-next-line camelcase
            pow_ten: "×10^",
            sin: "sin ",
            cos: "cos ",
            tan: "tan ",
            asin: "asin ",
            acos: "acos ",
            atan: "atan ",
            pi: "π",
            log: "log ",
            ln: "ln ",
            root: "root (",
            comma: ", ",
            e: "e",
            cube: "^3"
          })
        );
        if (idToValue.has(i.customId))
          expression.push(idToValue.get(i.customId));
        else if (!isNaN(i.customId)) expression.push(i.customId);
        else {
          switch (i.customId) {
            case "second":
              await i.update({
                embeds: i.message.embeds,
                components: second
              });
              return;
            case "normal":
              await i.update({
                embeds: i.message.embeds,
                components: normal
              });
              return;
            case "delete":
              expression.pop();
              break;
            case "clear":
              expression = [];
              break;
            case "eq":
              stringExp = expression
                .join("")
                .replaceAll("×", "*")
                .replaceAll("÷", "/")
                .replaceAll("√", "sqrt")
                .replaceAll("π", "pi");
              try {
                result = mexp.eval(stringExp ? stringExp : "0", tokens);
              } catch (e) {
                result = "\b\bSyntax error : " + e.message;
              }
              await i.update({
                embeds: [
                  {
                    description: `\`\`\`\n${
                      expression.length !== 0 ? expression.join("") : "0"
                    }\n= ${result}\`\`\``,
                    footer: {
                      text: `If the calculator doesn't respond, create a new one !  •  Calculator`
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
                text: `If the calculator doesn't respond, create a new one !  •  Calculator`
              },
              color: "#5865F2"
            }
          ],
          components: i.message.components
        });
      });
  }
};
