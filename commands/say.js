module.exports = {
  name: "say",
  description: "soy troll",
  execute(message, args) {
    const Discord = require("discord.js");
    const sayMessage = args.join(" ");
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        const NopermEmbed = new Discord.MessageEmbed()
        .setColor("#f54242")
          .setTitle("No tengo los permisos correspondientes")
          .setDescription("No tengo el permiso: Gestionar Mensajes, Por favor avisar esto a un moderador.")
          .setThumbnail(
            "https://www.freeiconspng.com/thumbs/error-icon/error-icon-4.png"
          );
        message.channel.send(NopermEmbed)
    } else if (!args.join(" ")) {
      message.channel.send("¡No puedo enviar un mensaje vacio!").then((msg) => {
        msg.delete({ timeout: 5000 });
      });
    } else
    message.delete().catch;
    message.channel.send(sayMessage);
  },
};
