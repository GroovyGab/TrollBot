const config = require("../config.json");
const prefix = config.prefix;
const Discord = require("discord.js");

module.exports = {
  name: "hackban",
  description: "idban",
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
          value: `${prefix}hackban <ID>`,
        });

      return message.channel.send(NoIDEmbed);
    }
    message.guild.fetchBans().then((bans) => {
      let reason = args.slice(1).join(" ");
      if (!reason) reason = "Sin especificar.";
      let bUser = bans.find((b) => b.user.id == userID);
      if (bUser) {
        let AlreadyBannedEmbed = new Discord.MessageEmbed()
        .setColor("#d61515")
        .attachFiles("./assets/error.png")
        .setThumbnail("attachment://error.png")
        .setTitle("Error:")
        .addField("El Usuario:", `<@${userID}> Ya está baneado.`)
          return message.channel.send(AlreadyBannedEmbed)
      }
      if (!userID) return;
      const user = userID;
      let HackBanEmbed = new Discord.MessageEmbed()
        .setColor("#d61515")
        .setTitle("HACKBAN 💀")
        .addField("Usuario Baneado", `<@${user}>`)
        .addField("Baneado Por El Moderador:", message.author)
        .addField("Razón", reason)
        .setTimestamp();
      message.channel.send(HackBanEmbed);
      message.guild.members.ban(userID, { reason: reason });
    });
  },
};
