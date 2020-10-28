module.exports = {
  name: "kick",
  description: "kick",
  execute(message, args) {
    const Discord = require("discord.js");
    const config = require("../config.json");
    const prefix = config.prefix;
    let server = message.guild.name;
    let member = message.mentions.members.first();
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      let NoPermEmbed = new Discord.MessageEmbed()
        .setColor("#d61515")
        .attachFiles(`./assets/error.png`)
        .setThumbnail("attachment://error.png")
        .setColor("#d61515")
        .setTitle("Error:")
        .setDescription("No tienes permiso para ejecutar este comando.");

      return message.channel.send(NoPermEmbed);
    }

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
      let BotNoPermEmbed = new Discord.MessageEmbed()
        .setColor("#d61515")
        .attachFiles(`./assets/error.png`)
        .setThumbnail("attachment://error.png")
        .setColor("#d61515")
        .setTitle("Error:")
        .addFields({
          name: "No tengo el permiso:",
          value: "`Expulsar Miembros`",
        });

      return message.channel.send(BotNoPermEmbed);
    }

    if (!member) {
      let NoMemberEmbed = new Discord.MessageEmbed()
        .setColor("#d61515")
        .attachFiles(`./assets/error.png`)
        .setThumbnail("attachment://error.png")
        .setColor("#d61515")
        .setTitle("Error:")
        .addFields({
          name: "Argumentos Inválidos.",
          value: `${prefix}kick <@Miembro>`,
        });

      return message.channel.send(NoMemberEmbed);
    }

    // Configurar permisos por roles personalizados.
    if (member.hasPermission("KICK_MEMBERS")) {
      let CantKickEmbed = new Discord.MessageEmbed()
        .setColor("#d61515")
        .attachFiles(`./assets/error.png`)
        .setThumbnail("attachment://error.png")
        .setColor("#d61515")
        .addFields({
          name: "Error:",
          value: `No puedes kickear a un moderador.`,
        });

      return message.channel.send(CantKickEmbed);
    }

    if (member.id === message.author.id) {
      let CantKickYorselfEmbed = new Discord.MessageEmbed()
        .setColor("#d61515")
        .attachFiles(`./assets/error.png`)
        .setThumbnail("attachment://error.png")
        .setColor("#d61515")
        .addFields({
          name: "Error:",
          value: `Bruh, no te puedes expulsar a ti mismo.`,
        });

      return message.channel.send(CantKickYorselfEmbed);
    }

    let reason = args.slice(1).join(" ");

    if (!reason) reason = "Sin especificar.";

    let KickEmbed = new Discord.MessageEmbed()
      .setColor("#d61515")
      .setTitle("EXPULSADO  ❌")
      .addField("Usuario Expulsado:", member)
      .addField("Expulsado Por El Moderador:", message.author)
      .addField("Razón:", reason)
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp();
    message.channel.send(KickEmbed);

    let DmKickEmbed = new Discord.MessageEmbed()
      .setColor("#d61515")
      .setTitle(`Has sido expulsado de: ${server}`)
      .addField("Expulsado Por El Moderador:", message.author)
      .addField("Razón:", reason)
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp();
    member.send(DmKickEmbed);
    member.kick({ reason: reason });
  },
};
