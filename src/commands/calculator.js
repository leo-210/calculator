const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("calculator")
    .setDescription("Generates a calculator")
    .addSubcommand(command =>
      command
        .setName("basic")
        .setDescription("A basic calculator with the basic operations")
    )
    .addSubcommand(command =>
      command
        .setName("scientific")
        .setDescription(
          "Same as the basic calculator but with some more complex things"
        )
    ),
  async execute(client, interaction) {
    switch (interaction.options.getSubcommand()) {
      case "basic":
        await require("./calculators/basic_calculator").execute(
          client,
          interaction
        );
        break;
      case "scientific":
        await require("./calculators/scientific_calculator").execute(
          client,
          interaction
        );
    }
  }
};
