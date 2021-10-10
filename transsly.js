const Discord = require('discord.js');
const { config } = require("dotenv");
config({ path: __dirname + "/Tokens/.env" });
const conf = require("./transconf.json")
const tokens = [
    "TOKEN",
    "TOKEN",
    "TOKEN",
    "TOKEN",
    "TOKEN"
];
const chnls = [
    conf.channels.voice1,
    conf.channels.voice2,
    conf.channels.voice3,
    conf.channels.voice4,
    conf.channels.voice5
];
const selamlı = [];
for (let index = 0; index < 5; index++) {
    const token = tokens[index];
    const client = new Discord.Client();
    client.login(token);
    let concon;
    client.on('ready', async () => {
        console.log(`[ TRANSSLY LOGS ] ${client.user.username} (${client.user.id}) ONLİNE!`);
        client.user.setPresence({ status: conf.bots.status });
    setInterval(() => {
      const oynuyor = conf.bots.footer;
      const index = Math.floor(Math.random() * (oynuyor.length));
      client.user.setActivity(`${oynuyor[index]}`, {type: "LISTENING"});
    }, 10000);
        concon = await client.channels.cache.get(chnls[index]).join()
    });
    let ses;
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.user.bot) return;
        if (cur.channel && (cur.channel.id === chnls[index])) {
            if (cur.channelID === prev.channelID) return;
            if (selamlı.includes(cur.member.id) && (cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get(conf.perms.kayıtsız).rawPosition)) {
                console.log(selamlı);
                ses = await concon.play('./SESGİR!(HG).mp3');
                return;
            }
            if ((cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get(conf.perms.kayıtsız).rawPosition)) {
                ses = await concon.play('./SESGİR!(HOŞGELDİN).mp3');
                selamlı.push(cur.member.user.id);
            } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get(conf.perms.yetkiliperm).rawPosition) {
                ses = await concon.play('./SESGİR!(TEKRAR).mp3');
                selamlı.push(cur.member.user.id);
            }
        }
        if (prev.channel && (prev.channel.id === chnls[index]) && (prev.channel.members.size === 1) && ses) ses.end();
    });
    client.on('guildMemberUpdate', async (prev, cur) => {
        if (concon.channel.members.some(biri => biri.user.id === cur.user.id)) {
            if ((prev.roles.highest.rawPosition < cur.roles.highest.rawPosition)) {
                ses = await concon.play('./SESGİR!(ELVEDA).mp3');
            }
        } else return;
    });
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.id === client.user.id) concon = await client.channels.cache.get(chnls[index]).join();
    })
}