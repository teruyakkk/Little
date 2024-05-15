const axios = require("axios")
const chalk = require("chalk")
const fetch = require("node-fetch")
const fs = require("fs")
const Jimp = require("jimp")
const moment = require("moment-timezone")

exports.getGroupAdmins = function(participants){ let admins = []; for (let i of participants) { i.admin !== null ? admins.push(i.id) : '' } return admins }
exports.fetchJson = fetchJson = (url, options) => new Promise(async (resolve, reject) => { fetch(url, options).then(response => response.json()).then(json => { resolve(json)}).catch((err) => { reject(err)})})
exports.reSize = (buffer, ukur1, ukur2) => {
    return new Promise(async(resolve, reject) => {
        var baper = await Jimp.read(buffer);
        var ab = await baper.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG)
        resolve(ab)
    })
}
exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.generateProfilePicture = async(buffer) => {
const jimp_1 = await Jimp.read(buffer);
const resz = jimp_1.getWidth() > jimp_1.getHeight() ? jimp_1.resize(550, Jimp.AUTO) : jimp_1.resize(Jimp.AUTO, 650)
const jimp_2 = await Jimp.read(await resz.getBufferAsync(Jimp.MIME_JPEG));
return {
img: await resz.getBufferAsync(Jimp.MIME_JPEG)
}
}
exports.getImg = async (url, options) => {
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
exports.processo = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " Hora, " : " Hora, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " Horas, " : " Horas, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " Minutos, " : " Minutos, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " Segundo" : " Segundos ") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}
exports.tanggal = (numer) => {
	myMonths = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
				myDays = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sabado']; 
				var tgl = new Date(numer);
				var day = tgl.getDate()
				bulan = tgl.getMonth()
				var thisDay = tgl.getDay(),
				thisDay = myDays[thisDay];
				var yy = tgl.getYear()
				var year = (yy < 1000) ? yy + 1900 : yy; 
				const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
				let d = new Date
				let locale = 'id'
				let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
				let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
				return`WIB : *${moment.tz('Asia/Jakarta').format('HH:mm:ss')}*\n Acerte Wita : *${moment.tz('Asia/Makassar').format('HH:mm:ss')}*\nBata com inteligência : *${moment.tz('Asia/Jayapura').format('HH:mm:ss')}*\nData : *${thisDay}, ${day} ${myMonths[bulan]} ${year}*`
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})