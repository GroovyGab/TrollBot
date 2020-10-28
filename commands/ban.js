module.exports = {
  name: "ban",
  description: "ban",
  execute(message, args) {
    const Discord = require("discord.js");
    const config = require("../config.json");
    const prefix = config.prefix;
    let server = message.guild.name;
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

    let member = message.mentions.members.first();

    if (!member) {
      let NoMemberEmbed = new Discord.MessageEmbed()
        .setColor("#d61515")
        .attachFiles(`./assets/error.png`)
        .setThumbnail("attachment://error.png")
        .setColor("#d61515")
        .setTitle("Error:")
        .addFields({
          name: "Argumentos Inválidos.",
          value: `${prefix}ban <@Miembro>`,
        });

      return message.channel.send(NoMemberEmbed);
    }

    if (member.id === message.author.id) {
      let CantBanYorselfEmbed = new Discord.MessageEmbed()
        .setColor("#d61515")
        .attachFiles(`./assets/error.png`)
        .setThumbnail("attachment://error.png")
        .setColor("#d61515")
        .addFields({
          name: "Error:",
          value: `Bruh, no te puedes banear a ti mismo.`,
        });

      return message.channel.send(CantBanYorselfEmbed);
    }
    // Configurar permisos por roles personalizados.
    if (member.hasPermission("BAN_MEMBERS")) {
      let CantBanEmbed = new Discord.MessageEmbed()
        .setColor("#d61515")
        .attachFiles(`./assets/error.png`)
        .setThumbnail("attachment://error.png")
        .setColor("#d61515")
        .addFields({
          name: "Error:",
          value: `No puedes banear a un moderador.`,
        });

      return message.channel.send(CantBanEmbed);
    }

    let reason = args.slice(1).join(" ");

    if (!reason) reason = "Sin especificar.";

    let BanEmbed = new Discord.MessageEmbed()
      .setColor("#d61515")
      .setTitle( "BANEADO 🔨")
      .setThumbnail(member.user.displayAvatarURL())
      .addField("Usuario Baneado", member)
      .addField("Baneado Por El Moderador:", message.author)
      .addField("Razón", reason)
      .setTimestamp();

    message.channel.send(BanEmbed);

    let DmBanEmbed = new Discord.MessageEmbed()
      .setColor("#d61515")
      .setTitle(`Has sido baneado de: ${server}`)
      .setThumbnail(member.user.displayAvatarURL())
      .addField("Baneado Por El Moderador:", message.author)
      .addField("Razón", reason)
      .setTimestamp();
    member.send(DmBanEmbed);
    member.ban({ reason: reason });
  },
};
