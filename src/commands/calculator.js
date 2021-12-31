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
        return;
      case "scientific":
        await require("./calculators/scientific_calculator").execute(
          client,
          interaction
        );
        return;
    }
    await interaction.reply({
      content:
        "If you see this message, that means that you ran the command just at " +
        "the wrong moment, congrats !\n\nAnyways, the bot is just updating, " +
        "and because of how Discord work it takes some time... Re-try the " +
        "command in about an hour !"
    });
  }
};
