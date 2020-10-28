const config = require("../config.json");
const prefix = config.prefix;
const Discord = require("discord.js");

module.exports = {
  name: "unban",
  description: "unban",
  execute(message, args) {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      let NoPermEmbed = new Discord.MessageEmbed()
        .setColor("#d61515")
        .attachFiles(`./assets/error.png`)
        .setThumbnail("attachment://error.png")
        .setColor("#d61515")
        .setTitle("Error:")
        .setDescription("No tienes permiso para ejecutar este comando.");

      return message.channel.send(NoPermEmbed);
    }

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      let BotNoPermEmbed = new Discord.MessageEmbed()
        .setColor("#d61515")
        .attachFiles(`./assets/error.png`)
        .setThumbnail("attachment://error.png")
        .setColor("#d61515")
        .setTitle("Error:")
        .addFields({
          name: "No tengo el permiso:",
          value: "`Banear Miembros`",
        });

      return message.channel.send(BotNoPermEmbed);
    }
    let userID = args[0];
    if (!userID) {
      let NoIDEmbed = new Discord.MessageEmbed()
        .setColor("#d61515")
        .attachFiles(`./assets/error.png`)
        .setThumbnail("attachment://error.png")
        .setColor("#d61515")
        .setTitle("Error:")
        .addFields({
          name: "Argumentos Inválidos.",
          value: `${prefix}unban <ID>`,
        });

      return message.channel.send(NoIDEmbed);
    }

    message.guild.fetchBans().then((bans) => {
      if (bans.size == 0) {
        let NotBannedEmbed = new Discord.MessageEmbed()
          .setColor("#d61515")
          .attachFiles(`./assets/error.png`)
          .setThumbnail("attachment://error.png")
          .setColor("#d61515")
          .addFields({
            name: "Error:",
            value: "El usuario no está baneado o no se ha encontrado",
          });

        return message.channel.send(NotBannedEmbed);
      }

      let bUser = bans.find((b) => b.user.id == userID);
      if (!bUser) return;
      let UnbanEmbed = new Discord.MessageEmbed()
        .setColor("#15b33a")
        .attachFiles(`./assets/success.png`)
        .setThumbnail("attachment://success.png")
        .addFields({
          name: "El Usuario:",
          value: `<@${userID}> Ha sido unbaneado.`,
        });
      message.channel.send(UnbanEmbed);
      message.guild.members.unban(bUser.user);
    });
  },
};
