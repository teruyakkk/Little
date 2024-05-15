require('./configurar')

const { baileys, proto, generateWAMessageFromContent, getContentType } = require("@whiskeysockets/baileys")

const { getGroupAdmins, processo, fetchJson } = require("./dados/lib/funções.js")

const { smsg, formatp, tanggal, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom, reSize } = require('./dados/lib/myfunc')

const { exec } = require("child_process")

const cheerio = require("cheerio")

const chalk = require("chalk")

const util = require("util")

const jsobfus = require('javascript-obfuscator')

const axios = require("axios")

const fs = require("fs")

const moment = require('moment-timezone')

const cor = '\x1b[91m%s\x1b[0m';

const verde = '\x1b[32m%s\x1b[0m';

//Database
global.db.data = JSON.parse(fs.readFileSync('./dados/src/database.json'))
if (global.db.data) global.db.data = {
users: {},
group: {},
chats: {},
database: {},
settings: {},
donate: {},
others: {},
sticker: {},
...(global.db.data || {})
}

moment.tz.setDefault("America/Sao_Paulo").locale("id")

module.exports = async (venom, mek, store, msg) => {

try {

const type = getContentType(msg.message)

const content = JSON.stringify(msg.message)

const from = msg.key.remoteJid

const fatkuns = (msg.quoted || msg)

const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : msg.quoted ? msg.quoted : msg

const body = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''

const prefixo = prefixos 

const isCmd = body.startsWith(prefixo)

const comando = body.replace(prefixo, '').trim().split(/ +/).shift().toLowerCase()    

const args = body.trim().split(/ +/).slice(1)

const NomeBot = venom.user.id.split(':')[0]

const sender = msg.key.fromMe ? (venom.user.id.split(':')[0]+'@s.whatsapp.net' || venom.user.id) : (msg.key.participant || msg.key.remoteJid)

const isGroup = from.endsWith('@g.us')

const groupMetadata = isGroup ? await venom.groupMetadata(from).catch(e => {}) : ''

const groupName = isGroup ? groupMetadata.subject : ''

const participants = isGroup ? await groupMetadata.participants : ''

const groupAdmins = isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''

const isBotAdmins = isGroup ? groupAdmins.includes(NomeBot) : false

const isAdmins = isGroup ? groupAdmins.includes(sender) : false

const senderNumber = sender.split('@')[0]

const UsuarioVip = JSON.parse(fs.readFileSync('./dados/vip/usuariosVIP.json'))

const isVip = UsuarioVip.includes(sender)

const nome = msg.pushName || `${senderNumber}`

const isBot = NomeBot.includes(senderNumber)

const isDono = numerodono.includes(senderNumber) || isBot

const mentionUser = [...new Set([...(msg.mentionedJid || []), ...(msg.quoted ? [msg.quoted.sender] : [])])]

const mentionByTag = type == 'extendedTextMessage' && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []

const mentionByReply = type == 'extendedTextMessage' && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || '' : ''

const text = q = args.join(" ")


const budy = (typeof text == 'string' ? text : '')

const mime = (quoted.msg || quoted).mimetype || ''

const qmsg = (quoted.msg || quoted)

const numberQuery = q.replace(new RegExp('[()+-/ +/]', 'gi'), '') + '@s.whatsapp.net'

const usernya = mentionByReply ? mentionByReply : mentionByTag[0]

const Input = mentionByTag[0] ? mentionByTag[0] : mentionByReply ? mentionByReply : q ? numberQuery : false

const client = venom;

// Função para adicionar um usuário VIP
function adicionarUsuarioVIP(usuario) {
  // Carrega os dados atuais, se existirem
  let usuariosVIP = [];
  try {
    const dados = fs.readFileSync('./dados/vip/usuariosVIP.json');
    usuariosVIP = JSON.parse(dados);
  } catch (error) {
    // Arquivo ainda não existe ou está vazio
  }

  // Adiciona o usuário à lista de usuários VIP
  if (!usuariosVIP.includes(usuario)) {
    usuariosVIP.push(usuario);
    fs.writeFileSync('./dados/vip/usuariosVIP.json', JSON.stringify(usuariosVIP, null, 2));
    responder(`_Usuário ${usuario.replace(/[^0-9]/g, '')} adicionado como VIP com sucesso ✓_`);
  } else {
    responder(`_Este Usuário ${usuario.replace(/[^0-9]/g, '')} já é VIP √_`);
  }
}

// Função para deletar um usuário VIP
function deletarUsuarioVIP(usuario) {
  let usuariosVIP = [];
  try {
    const dados = fs.readFileSync('./dados/vip/usuariosVIP.json');
    usuariosVIP = JSON.parse(dados);
    const index = usuariosVIP.indexOf(usuario);
    if (index !== -1) {
      usuariosVIP.splice(index, 1);
      fs.writeFileSync('./dados/vip/usuariosVIP.json', JSON.stringify(usuariosVIP, null, 2));
      responder(`_Usuário ${usuario.replace(/[^0-9]/g, '')} removido dos VIPs com sucesso ✓`);
    } else {
      responder(`_Usuário ${usuario.replace(/[^0-9]/g, '')} não encontrado na lista de VIPs ✓_u`);
    }
  } catch (error) {
    responder('Erro ao acessar o arquivo de usuários VIP.');
  }
}

const comprarbot = `
*Domine a Competição: Nosso Bot Personalizado* 🤖💼

Procurando um bot que *desafie os limites*? Nosso bot personalizado não só automatiza suas tarefas, mas também pode **enviar travas e crashes** para usuários, dominando o campo da competição. Personalizado para suas necessidades, ele garante resultados sem precedentes. 💥💼 Transforme seu jogo hoje mesmo!

Entre em contato para saber mais: https://wa.me/559784412501 📞📧
`

const painel = `
_*🔎📑CONSULTA ONLINE ESPECIALIZADA EM DADOS📑🔎*_

_Está em busca de informações precisas e confiáveis? Conte com nossa consultoria online para obter dados detalhados sobre:_

*NOME 1*
*NOME 2*
*CPF*
*CPF1*
*CPF2*
*CPF3*
*CPF4*
*SCORE*
*TELEFONE 1*
*TELEFONE 2*
*BIN*
*BANK*
*BANKLIST*
*FERIADOS*
*CEP*
*CNPJ*
*DDD*
*PLACA 1*
*PLACA 2*
*LOCALIZAÇÃO IP*
*MÃE*
*PARENTES*
*VIZINHOS*
*BENEFÍCIOS*
*E-MAIL*
*SITE*

_*ℹ️ Com nossa plataforma, tenha acesso a detalhes como localização, telefones associados, BIN, bancos relacionados, feriados, CEP, CNPJ, DDD, placas de veículos e até mesmo IPs.*_

_*🔎 Além disso, oferecemos insights sobre mãe, parentes, vizinhos e benefícios relacionados. Quer saber mais sobre o histórico de um e-mail ou site? Nós te ajudamos!*_

_*✅ Garantimos segurança e privacidade em todas as consultas. Entre em contato conosco e descubra como podemos ajudar você. Vem PV para mais informações!*_

*_https://wa.me/559784412501_*`

const website = `
🌐 Conheça a VenomWeb site

para as melhores APIs de bots do WhatsApp! Desde banir usuários até consultas vitais, nossas APIs oferecem soluções completas. Com banimento, disponibilidade para número, desbanimento, consultas, downloads, uploads de código, geração de conteúdo e criação de logotipos - temos tudo! Acesso seguro com apikey.

site: https://venomweb.site

Contate-nos agora para adquirir! 🚀

Contato para comprar sua apikey: https://wa.me/559784412501`

//Horas
const hora1 = moment.tz('America/Sao_Paulo').format('dddd, DD MMMM YYYY')

const hora2  = moment.tz('America/Sao_Paulo').format('HH : mm : ss')

const tempo2 = moment().tz('America/Sao_Paulo').format('HH:mm:ss')

if(tempo2 < "23:59:00"){
var dizendoTempo = 'Boa noite 🏙️'
}
if(tempo2 < "19:00:00"){
var dizendoTempo = 'Boa noite  🌆'
}
if(tempo2 < "18:00:00"){
var dizendoTempo = 'Boa tarde 🌇'
}
if(tempo2 < "15:00:00"){
var dizendoTempo = 'Boa tarde 🌤️'
}
if(tempo2 < "10:00:00"){
var dizendoTempo = 'Bom dia 🌄'
}
if(tempo2 < "05:00:00"){
var dizendoTempo = 'Bom Amanhecer 🌆'
}
if(tempo2 < "03:00:00"){
var dizendoTempo = 'Boa Madrugada 🌃'
}

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

const parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}

async function criptografia(query) {
return new Promise((resolve, reject) => {
try {
const ofuscaçãoResultado = jsobfus.obfuscate(query,
{
compact: false,
controlFlowFlattening: true,
controlFlowFlatteningThreshold: 1,
numbersToExpressions: true,
simplify: true, 
stringArrayShuffle: true,
splitStrings: true,
stringArrayThreshold: 1
}
);
const result = {
status: 200,
author: `Venom Mods`,
result: ofuscaçãoResultado.getObfuscatedCode()
}
resolve(result)
} catch (e) {
reject(e)
}
})
}

const responder = (teks) => {
venom.sendMessage(from, { text: teks, contextInfo:{"externalAdReply": {"title": nomebot,"body": `👋🏻 Olá ${nome}`, "previewType": "PHOTO","thumbnail": thumb,"sourceUrl": `https://youtube.com/@VenomModsss`}}}, { quoted: msg})}

try {
let isNumber = x => typeof x === 'number' && !isNaN(x)
let user = global.db.data.users[sender]
if (typeof user !== 'object') global.db.data.users[sender] = {}
if (user) {
if (!isNumber(user.afkTime)) user.afkTime = -1
if (!('afkReason' in user)) user.afkReason = ''
} else global.db.data.users[sender] = {
afkTime: -1,
afkReason: '',
}

let chats = global.db.data.chats[from]
if (typeof chats !== 'object') global.db.data.chats[from] = {}
if (chats) {
if (!('mute' in chats)) chats.mute = false
if (!('antilink' in chats)) chats.antilink = false
if (!('antilinkv2' in chats)) chats.antilinkv2 = false
} else global.db.data.chats[from] = {
mute: false,
antilink: false,
antilinkv2: false
}

let setting = global.db.data.settings[isBot]
if (typeof setting !== 'object') global.db.data.settings[isBot] = {}
if (setting) {
if (!isNumber(setting.status)) setting.status = 0
if (!('autoread' in setting)) setting.autoread = false
} else global.db.data.settings[isBot] = {
status: 0,
autoread: false
}
} catch (err) {
console.error(err)
}

try {
ppuser = await venom.profilePictureUrl(sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}

if (!venom.public) {
if (!msg.key.fromMe && !isDono) return
}

if (msg.message) {
if (global.db.data.settings[isBot].autoread) {
venom.readMessages([msg.key])
}
}

function Criador() {
responder(resposta.dono)
}

const perfil = await getBuffer(ppuser)

if (!isGroup && isCmd && sender) {
console.log(cor, `\n`)
console.log(cor, `╭━─━─────────────━─━╮`)
console.log(cor, `>「 𝘾𝙤𝙢𝙖𝙣𝙙𝙤 𝙀𝙢 𝙋𝙧𝙞𝙫𝙖𝙙𝙤 」`)
console.log(cor, `> │ `)
console.log(cor, `> │ 𝘾𝙤𝙢𝙖𝙣𝙙𝙤 : ${prefixo + comando}`)
console.log(cor, `> │ 𝙐𝙨𝙪𝙖𝙧𝙞𝙤 : ${sender.replace(/[^0-9]/g, '')}`)
console.log(cor, `> │ 𝙉𝙞𝙘𝙠 : ${nome}`)
console.log(cor, `> │ 𝙃𝙤𝙧𝙖 : ${hora2}`)
console.log(cor, `> │ 𝙇𝙚𝙩𝙧𝙖𝙨 : ${args.length}`)
console.log(cor, `> │ `)
console.log(cor, `> └─「 LITTLE BOT 」`)
console.log(cor, `╰━─━─────────────━─━╯`)
}

if (!isGroup && !isCmd && sender) {
console.log(cor, `\n`)
console.log(cor, `╭━─━─────────────━─━╮`)
console.log(cor, `>「 𝙈𝙚𝙣𝙨𝙖𝙜𝙚𝙢 𝙀𝙢 𝙋𝙧𝙞𝙫𝙖𝙙𝙤 」`)
console.log(cor, `> │ `)
console.log(cor, `> │ 𝙈𝙚𝙣𝙨𝙖𝙜𝙚𝙢 : ${body}`)
console.log(cor, `> │ 𝙐𝙨𝙪𝙖𝙧𝙞𝙤 : ${sender.replace(/[^0-9]/g, '')}`)
console.log(cor, `> │ 𝙉𝙞𝙘𝙠 : ${nome}`)
console.log(cor, `> │ 𝙃𝙤𝙧𝙖 : ${hora2}`)
console.log(cor, `> │ 𝙇𝙚𝙩𝙧𝙖𝙨 : ${body.length}`)
console.log(cor, `> │ `)
console.log(cor, `> └─「 LITTLE BOT 」`)
console.log(cor, `╰━─━─────────────━─━╯`)
}

if (isGroup && isCmd && sender) {
console.log(cor, `\n`)
console.log(cor, `╭━─━─────────────━─━╮`)
console.log(cor, `>「 𝘾𝙤𝙢𝙖𝙣𝙙𝙤 𝙀𝙢 𝙂𝙧𝙪𝙥𝙤 」`)
console.log(cor, `> │ `)
console.log(cor, `> │ 𝙂𝙧𝙪𝙥𝙤 : ${groupName}`) 
console.log(cor, `> │ 𝘾𝙤𝙢𝙖𝙣𝙙𝙤 : ${prefixo + comando}`)
console.log(cor, `> │ 𝙐𝙨𝙪𝙖𝙧𝙞𝙤 : ${sender.replace(/[^0-9]/g, '')}`)
console.log(cor, `> │ 𝙉𝙞𝙘𝙠 : ${nome}`)
console.log(cor, `> │ 𝙃𝙤𝙧𝙖 : ${hora2}`)
console.log(cor, `> │ 𝙇𝙚𝙩𝙧𝙖𝙨 : ${args.length}`)
console.log(cor, `> │ `)
console.log(cor, `> └─「 LITTLE BOT 」`)
console.log(cor, `╰━─━─────────────━─━╯`)
}

if (!isCmd && isGroup && sender) {
console.log(cor, `\n`)
console.log(cor, `╭━─━─────────────━─━╮`)
console.log(cor, `>「 𝙈𝙚𝙣𝙨𝙖𝙜𝙚𝙢 𝙀𝙢 𝙂𝙧𝙪𝙥𝙤 」`)
console.log(cor, `> │ `)
console.log(cor, `> │ 𝙂𝙧𝙪𝙥𝙤 : ${groupName}`) 
console.log(cor, `> │ 𝙈𝙚𝙣𝙨𝙖𝙜𝙚𝙢 : ${body}`)
console.log(cor, `> │ 𝙐𝙨𝙪𝙖𝙧𝙞𝙤 : ${sender.replace(/[^0-9]/g, '')}`)
console.log(cor, `> │ 𝙉𝙞𝙘𝙠 : ${nome}`)
console.log(cor, `> │ 𝙃𝙤𝙧𝙖 : ${hora2}`)
console.log(cor, `> │ 𝙇𝙚𝙩𝙧𝙖𝙨 : ${body.length}`)
console.log(cor, `> │ `)
console.log(cor, `> └─「 LITTLE BOT 」`)
console.log(cor, `╰━─━─────────────━─━╯`)
}

//Anti Link 
if (db.data.chats[from].antilink) {
if (budy.match(`chat.whatsapp.com`)) {
responder(`「 ANTI LINK WHATSAPP 」\n\nVocê foi detectado enviando um link de grupo, desculpe, você será expulso do grupo!`)
let link = (`https://chat.whatsapp.com/` + await venom.groupInviteCode(from))
let linkdogrupo = new RegExp(link, 'i')
let nossogrupo = linkdogrupo.test(text)
if (nossogrupo) return responder(` Você enviou um link, não irei remover pois é o link do nosso grupo ✓`)
if (isAdmins) return responder(`Você é o administrador então pode enviar links ✓`)
if (isDono) return responder(`Voce é meu dono então pode enviar links ✓`)
venom.groupParticipantsUpdate(from, [sender], 'remove')
}
}

if (db.data.chats[from].antilinkv2) {
if (budy.match(`chat.whatsapp.com`)) {
responder(`「 ANTI LINK WHATSAPP 」\n\n*JANGAN SHARE GC LAIN!!!*`)
let link = (`https://chat.whatsapp.com/` + await venom.groupInviteCode(from))
let linkdogrupo = new RegExp(link, 'i')
let nossogrupo = linkdogrupo.test(text)
if (nossogrupo) return responder(` Você enviou um link, não irei remover pois é o link do nosso grupo ✓`)
if (isAdmins) return responder(`Você é o administrador então pode enviar links ✓`)
if (isDono) return responder(`Voce é meu dono então pode enviar links ✓`)
venom.sendMessage(from, { delete: from })
}
}

//mutar grupo 
if (db.data.chats[from].mute && !isAdmins && !isDono) {
return
}

switch (comando) {
case "menu": {
let menu = `
─────────────···
> ☍ *Usuário :* ${sender.split("@")[0]}
> ☍ *Modo :* ${venom.public ? `Publico` : `Privado`}
> ☍ *Status :* ${isDono ? `Criador 🔱` : `Usuário Comum 😝`}
> ☍ *Vip :* ${isVip ? `Sim ✅` : `Nao ❌`}
> ☍ *Horário :* ${hora2}
> ☍ *Velocidade:* ${processo(process.uptime())}
─────────────···
╭━─━─────────────━─━╮
> ▧─ 「 *C R E D I T O S* 」
> │ ${prefixo}canal
> │ ${prefixo}website
> │ ${prefixo}painel 
> │ ${prefixo}comprarbot
> │ ${prefixo}insta 
> └──···
╰━─━─────────────━─━╯
╭━─━─────────────━─━╮
> ▧─ 「 *G R U P O* 」
> │ ${prefixo}grupo *fechar/abrir*
> │ ${prefixo}totag *texto*
> │ ${prefixo}antilink *on/off*
> │ ${prefixo}antilink2 *on/off*
> │ ${prefixo}mutar *on/off*
> │ ${prefixo}ban
> └──···
╰━─━─────────────━─━╯
╭━─━─────────────━─━╮
> ▧─ 「 *D O N O* 」
> │ ${prefixo}addvip 
> │ ${prefixo}delvip
> │ ${prefixo}criptografar
> │ ${prefixo}publico
> │ ${prefixo}privado 
> │ ${prefixo}visualizarmsg *on/off*
> │ ${prefixo}convite *link*
> │ ${prefixo}push *sua mensagem*
> └──···
╰━─━─────────────━─━╯
> © _Venom Mods_
> _Este bot ainda está em fase de desenvolvimento, por isso pedimos paciência se houver erros em alguma funcionalidade_
╰━─━─────────────━─━╯`
venom.sendMessage(from, {
image: thumb, 
caption: menu,
mentions: [sender],
contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `${dizendoTempo} ${nome}`,
thumbnail: thumb,
sourceUrl: "https://chat.whatsapp.com/Eig4z1Oar9C9Yl58ro7T3n",
mediaType: 1,
renderLargerThumbnail: false
}
}
},{quoted: msg})
}
break

case 'painel': 
venom.sendMessage(from, {
image: {url: './dados/imagem/painel.jpg'},
caption: painel
},{quoted: msg})
break

case 'website':
venom.sendMessage(from, {
image: {url: './dados/imagem/website.jpg'},
caption: website
},{quoted: msg})
break

case 'canal': 
responder(`Aqui está no canal do meu criador!\n\nhttps://youtube.com/@VenomModsss`)
break

case 'comprarbot':
venom.sendMessage(from, {
image: {url: './dados/imagem/comprarbot.jpg'},
caption: comprarbot
},{quoted: msg})
break 

case 'insta':
responder(`Aqui está o Instagram do meu criador venom ✓\n\nhttps://instgram.com/venom_mods_ofc`)
break

case 'addvip': {
if (!isDono) return responder(resposta.dono)
if(!q) return responder(`Digite o número do usuário que você deseja adicionar como vip!\n\nExemplo: ${prefixo + comando} 5597984388522`)
const numerovip = q.replace(/[^0-9]/g, '');
// Chama a função para adicionar um usuário VIP
adicionarUsuarioVIP(`${numerovip + "@s.whatsapp.net"}`);
}
break

case 'delvip': {
if (!isDono) return responder(resposta.dono)
if(!q) return responder(`Digite o número do usuário que você deseja deletar como vip!\n\nExemplo: ${prefixo + comando} 5597984388522`)
const numerovip = q.replace(/[^0-9]/g, '');
// Chama a função para adicionar um usuário VIP
deletarUsuarioVIP(`${numerovip + "@s.whatsapp.net"}`);
}
break 

case "publico": {
if (!isDono) return Criador()
venom.public = true
responder(`_*Todos podem usar os comandos do bot agora ✓*_`)
}
break

case "privado": {
if (!isDono) return Criador()
venom.public = false
responder(`_*Bot privado somente meu dono pode usar os conandos agora ✓*_`)
}
break

case 'visualizamsg':
if (!isDono) return responder(resposta.dono)
if (args.length < 1) return responder(`_Use o comando corretamente: ${prefixo + comando} on/off_`)
if (q === 'on'){
global.db.data.settings[NomeBot].autoread = true
responder(`_Auto visualização de mensagem ${q}_`)
} else if (q === 'off'){
global.db.data.settings[NomeBot].autoread = false
responder(`_Auto visualização de mensagem ${q}_`)
}
break

case 'dono': {
const vcard =
'BEGIN:VCARD\n' + 
'VERSION:3.0\n' +
`FN:${nomedono}\n` + 
`ORG:${nomebot};\n` + 
`TEL;type=MSG;type=CELL;type=VOICE;waid=${dono}:+${dono}\n` + // WhatsApp ID + phone number
'END:VCARD'
			venom.sendMessage(from, {
contacts: {
	displayName: nomedono,
	contacts: [{ vcard }],
},
			}, { quoted: fkontak})
 }
break

case 'mutar': {
if (!isGroup) return responder(resposta.grupo)
if (!isAdmins && !isDono) return responder(resposta.admin)
if (args[0] === "on") {
if (db.data.chats[from].mute) return responder(`Anteriormente esse comando ja está ativo ✓`)
db.data.chats[from].mute = true
responder(`_bot foi silenciados neste grupo com sucesso ✓_`)
} else if (args[0] === "off") {
if (!db.data.chats[from].mute) return responder(`Anteriormente já está desativado ✓`)
db.data.chats[from].mute = false
responder(`_O bot foi ativado neste grupo com sucesso ✓_`)
}
}
break

case 'antilink': {
if (!isGroup) return responder(resposta.grupo)
if (!isAdmins && !isDono) return responder(resposta.admin)
if (args[0] === "on") {
if (db.data.chats[from].antilink) return responder(`_antilink ja está ativado!_`)
db.data.chats[from].antilink = true
responder(`_Antilink ativado com sucesso ✓_`)
} else if (args[0] === "off") {
if (!db.data.chats[from].antilink) return responder(`_Antilink ja está desativado!_`)
db.data.chats[from].antilink = false
responder(`_Antilink desativado com sucesso ✓_`)
}
}
break

case 'antilink2':
if (!isGroup) return responder(resposta.grupo)
if (!isAdmins && !isDono) return responder(resposta.admin)
if (args.length < 1) return responder(`_Use o comando corretamente: ${prefixo + comando} on/off_`)
if (q == 'on'){
global.db.data.chats[from].antilinkv2 = true
responder(`_Antilink v2 ativado com sucesso ✓_`)
} else if (q == 'off'){
global.db.data.chats[from].antilinkv2 = false
responder(`_Antilink v2 desativado com sucesso ✓_`)
}
break

case 'kick':
case 'ban': {
if (!isGroup) return responder(resposta.grupo)
if (!isAdmins && !isDono) return responder(resposta.admin)
let users = msg.mentionedJid ? msg.mentionedJid : msg.quoted ? msg.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
await venom.groupParticipantsUpdate(from, [users], 'remove')
}
break

case 'grupo':
case 'group':
case 'grup': {
if (!isGroup) return responder(resposta.grupo)
if (!isAdmins && !isDono) return responder(resposta.admin)
if (args[0] === 'fechar') {
await venom.groupSettingUpdate(from, 'announcement').then((res) => responder(`_Grupo fechado com sucesso ✓_`)).catch((err) => console.log(jsonformat(err)))
} else if (args[0] === 'abrir') {
await venom.groupSettingUpdate(from, 'not_announcement').then((res) => responder(`_Grupo aberto com sucesso ✓_`)).catch((err) => console.log(jsonformat(err)))
} else {
responder(`_Como usar o comando corretamente!_\n\nDigite ${prefixo + comando} fechar/abrir`)
}
}
break

case 'totag':
case 'hidetag': {
if (!isGroup) return responder(resposta.grupo)
if (!isAdmins && !isDono) return responder(resposta.admin)
venom.sendMessage(from, {
text: q ? q : '',
mentions: participants.map(a => a.id)
}, {
quoted: msg
})
}
break

case 'puash_ctt':
case 'push': {
if (!text) return responder(`_Use o comando corretamente: ${prefixo}${comando} Salva ai Venom Mods_`)
if (!isDono) return responder(resposta.dono)
let get = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
let count = get.length;
let sentCount = 0;

for (let i = 0; i < get.length; i++) {
setTimeout(function() {
venom.sendMessage(get[i], { text: text });
count--;
sentCount++;
if (count === 0) {
 responder(`_Mensagem enviada com sucesso✓_\n*_Para:_* *_${sentCount} Contatos_*`);
}
}, i * 1000); //atrasa cada envio por 1 segundo
}
}
break

case 'cript':
case 'criptografar':
case 'enc': {
if (!isDono) return responder(resposta.dono)
if (!q) return responder(`_Use o comando corretamente ${prefixo+comando} const venom = require('venom-bot')_`)
let meg = await criptografia(q)
responder(`${meg.result}`)
}
break

case "join": {
if (!isDono) return Criador()
if (!text) return responder(`_Use o comando corretamente: ${prefixo+comando} link do grupo_`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return responder('Link do grupo Invalido!')
let result = args[0].split('https://chat.whatsapp.com/')[1]
await venom.groupAcceptInvite(result).then((res) => responder(util.format(res))).catch((err) => responder(util.format(err)))
}
break

default:
}
if (budy.startsWith('>')) {
if (!isOwner) return Criador()
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await responder(evaled)
} catch (err) {
responder(String(err))
}
}

if (isCmd && budy.toLowerCase() != undefined) {
if (from.endsWith('broadcast')) return
if (msg.isBaileys) return
let msgs = global.db.data.database
if (!(budy.toLowerCase() in msgs)) return
venom.copyNForward(from, msgs[budy.toLowerCase()], true)
}
} catch (err) {
console.log(util.format(err))
}
}

let arquivo = require.resolve(__filename) 
fs.watchFile(arquivo, () => {
fs.unwatchFile(arquivo)
console.log(chalk.redBright(`Arquivo atualizado ${__filename}`))
delete require.cache[arquivo]
require(arquivo)
})