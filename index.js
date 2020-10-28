const fs = require("fs");
const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.login(config.token);

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const activities_list = [
  "Bot En Desarrollo",
  "FGaBoX TrollBot",
  `Prefix: tr!`,
  "Hecho Con JavaScript",
];

client.on("ready", () => {
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    client.user.setActivity(activities_list[index]);
  }, 10000);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  const args = message.content.slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  switch (command) {
    case "hackban": {
      client.commands.get("hackban").execute(message, args);
      break;
    }
    case "ban": {
      client.commands.get("ban").execute(message, args);
      break;
    }
    case "unban": {
      client.commands.get("unban").execute(message, args);
      break;
    }
    case "kick": {
      client.commands.get("kick").execute(message, args);
      break;
    }
    case "say": {
      client.commands.get("say").execute(message, args);
      break;
    }
  }
});
