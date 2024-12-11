const { Client } = require("revolt.js");
const { token, prefix } = require('./config.json');
const { exec } = require('child_process');


let client = new Client();

client.on("ready", async () => {
    console.info(`Logged in as ${client.user.username}!`);
    client.api.patch("/users/@me", { status: { text: "Status-text-here", presence: "Online" } });
});

client.on("message", async (message) => {
    if (message.content === prefix + "ping") {
        message.channel.sendMessage("Pong!");
    }
});

client.on("message", async (message) => {
    if (message.content === prefix + "test") { 
        message.reply("The test works perfectly"); 
    }
});

client.on("message", async (message) => {
    if (message.content === prefix + "react") {
        message.react(encodeURIComponent("❤️"));    
    }
});

client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "exec ")) {
        const command = message.content.slice(prefix.length + 5); 
        exec(command, (error, stdout, stderr) => {
            if (error) {
                message.channel.sendMessage(`Erreur : ${error.message}`);
                return;
            }
            if (stderr) {
                message.channel.sendMessage(`Erreur : ${stderr}`);
                return;
            }
            message.channel.sendMessage(`Résultat : ${stdout}`);
        });
    }
});

client.loginBot(token);
