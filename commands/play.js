const { SlashCommandBuilder } = require('@discordjs/builders');
const { Discord, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, MessageSelectMenu, PermissionFlagsBits, SelectMenuBuilder } = require('discord.js')


module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Testing Command'),
    async execute(interaction, client) {
    console.log(123)
      
  }
}