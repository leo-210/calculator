module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(client, interaction);
      } catch (e) {
        client.logger.error(
          `Erreur lors de l'exécution de la commande '${interaction.commandName}` +
            `' : ${e}\nauthorId: ${interaction.user.id}${
              interaction.options.data
                ? `\noptions: ${interaction.options.data}`
                : ""
            }`
        );
        if (interaction.replied || interaction.deffered)
          await interaction.followUp({
            content: "Il y a eu une erreur lors de l'exécution de la commande.",
            ephemeral: true
          });
        else
          await interaction.reply({
            content: "Il y a eu une erreur lors de l'exécution de la commande.",
            ephemeral: true
          });
      }
    }
  }
};
