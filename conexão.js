require('./configurar')

const { default: connConnect, useMultiFileAuthState, makeWASocket, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@whiskeysockets/baileys")

const fs = require('fs')

const pino = require('pino')

const yargs = require('yargs/yargs')

const lolcatjs = require('lolcatjs')

const { Boom } = require('@hapi/boom')

const chalk = require('chalk')

const FileType = require('file-type')

const path = require('path')

const _ = require('lodash')

const NodeCache = require("node-cache");

const axios = require('axios')

const PhoneNumber = require('awesome-phonenumber')

const owo = JSON.parse(fs.readFileSync('./dados/lib/lowdb/adapters/koi.json'))

const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep, reSize } = require('./dados/lib/myfunc')

const cor = '\x1b[91m%s\x1b[0m';

const verde = '\x1b[32m%s\x1b[0m';

var low
try {
low = require('lowdb')
} catch (e) {
low = require('./dados/lib/lowdb')
}

const { Low, JSONFile } = low

const mongoDB = require('./dados/lib/mongoDB')

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
/https?:\/\//.test(opts['db'] || '') ?
new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
new mongoDB(opts['db']) :
new JSONFile(`./dados/src/database.json`)
)
global.DATABASE = global.db // Compatibilidade com versões anteriores
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read()
global.db.READ = false
global.db.data = {
users: {},
group: {},
chats: {},
database: {},
game: {},
settings: {},
donate: {},
others: {},
sticker: {},
anonymous: {},
...(global.db.data || {})
}
global.db.chain = _.chain(global.db.data)
}
loadDatabase()

// salvar banco de dados a cada 30 segundos
if (global.db) setInterval(async () => {
if (global.db.data) await global.db.write()
}, 30 * 1000)


const msgRetryCounterCache = new NodeCache();

const readline = require("readline");

const pairingCode = process.argv.includes("--code");

const rl = readline.createInterface({input: process.stdin, output: process.stdout,});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));


async function connectVenom() {

const { state, saveCreds } = await useMultiFileAuthState(`./VenomQr`)

const { version, isLatest } = await fetchLatestBaileysVersion();

const venom = makeWASocket({
version,
auth: state,
syncFullHistory: true,
printQRInTerminal: !pairingCode,
qrTimeout: 180000,
logger: pino({ level: 'silent' }),
browser: ["Chrome (Linux)", "", ""],
msgRetryCounterCache,
connectTimeoutMs: 60000,
defaultQueryTimeoutMs: 0,
keepAliveIntervalMs: 10000,
emitOwnEvents: true,
fireInitQueries: true,
generateHighQualityLinkPreview: true,
syncFullHistory: true,
markOnlineOnConnect: true,
patchMessageBeforeSending: (message) => {
const requiresPatch = !!(message.buttonsMessage || message.listMessage);
if (requiresPatch) {
message = {viewOnceMessage: {
message: {messageContextInfo: {
deviceListMetadataVersion: 2,
deviceListMetadata: {},
},...message }}}}
return message;
}});

const PhoneNumber = require('awesome-phonenumber')

if (pairingCode && !venom.authState.creds.registered) {

let phoneNumber = await question('\x1b[91m- Insira o número de telefone que deseja conectar o bot\n- Digite o número aqui: \x1b[0m');

phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

let code = await venom.requestPairingCode(phoneNumber);

code = code?.match(/.{1,4}/g)?.join("-") || code;

console.log(cor, "\n-" + `Código de Emparelhamento no WhatsApp:`, code);

rl.close();
}

venom.ev.on('messages.upsert', async mek => {
try {

if (!mek.messages) return

msg = mek.messages[0]

require("./cases")(venom, mek, store, msg)

} catch (err) {
console.log(err)
}
})

venom.public = true

venom.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    try {
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;

            if (reason === DisconnectReason.badSession) { 
                console.log(`\nArquivo de sessão inválido, exclua a sessão e verifique novamente`); 
                venom.logout(); 
            } else if (reason === DisconnectReason.connectionClosed) { 
                console.log("\nConexão fechada, reconectando...."); 
                connectVenom(); 
            } else if (reason === DisconnectReason.connectionLost) { 
                console.log("\nConexão perdida do servidor, reconectando..."); 
                connectVenom(); 
            } else if (reason === DisconnectReason.connectionReplaced) { 
                console.log("\nConexão substituída, outra nova sessão aberta, feche primeiro a sessão atual"); 
                gans.logout(); 
            } else if (reason === DisconnectReason.loggedOut) { 
                console.log(`\nDispositivo desconectado, verifique novamente e execute.`); 
                venom.logout(); 
            } else if (reason === DisconnectReason.restartRequired) { 
                console.log("\nÉ necessário reiniciar, reiniciando..."); 
                connectVenom(); 
            } else if (reason === DisconnectReason.timedOut) { 
                console.log("\nConexão esgotada, reconectando..."); 
                connectVenom(); 
            } else if (reason === DisconnectReason.Multidevicemismatch) { 
                console.log("\nIncompatibilidade de vários dispositivos. Verifique novamente"); 
                venom.logout(); 
            } else {
                venom.end(`\nMotivo de desconexão desconhecido:  ${reason}|${connection}`);
            }
        }

        if (connection === "connecting") {
            console.log(verde, "\nconectando kaneki base...");
        }

        if (connection === "open") {
            console.log(verde, "\nkaneki base conectada ✓");
        }
    } catch (error) {
        if (error instanceof TypeError) {
            console.error('Erro de tipo:', error.message);
        } else if (error.message === 'rate-overlimit') {
            console.error('Erro de limite de taxa:', error.message);
        } else {
            console.error('Erro desconhecido:', error.message);
        }
    }
});


venom.ev.on("creds.update", saveCreds);

venom.ev.on('group-participants.update', async (anu) => {

try {

let metadata = await venom.groupMetadata(anu.id)

let participants = anu.participants

for (let num of participants) {

try {
ppuser = await venom.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://tinyurl.com/yx93l6da'
}

try {
ppgroup = await venom.profilePictureUrl(anu.id, 'image')
} catch {
ppgroup = 'https://tinyurl.com/yx93l6da'
}
if (anu.action == 'add') {
venom.sendMessage(anu.id, {
sticker: {url: "./dados/figurinha/bemvindo.webp"},
contextInfo: {
externalAdReply: {
title: `👋 Olá @${num.split("@")[0]}`,
body: `Bem-Vindo (a)`,
thumbnailUrl: ppuser,
sourceUrl: "https://instagram.com/venom_mods_ofc",
mediaType: 1,
renderLargerThumbnail: false
}}})
}
}
} catch (err) {
return null
console.log("Erro na seção do grupo de boas-vindas "+err)
}
})
}
connectVenom()