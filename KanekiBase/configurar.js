const fs = require('fs')
const chalk = require('chalk')

global.banner1 = "KANEKI"
global.banner2 = "BASE"

global.nomebot = 'Kaneki Base'
global.nomedono = 'Venom'
global.numerodono = ['559784412501']
global.prefixos = "!"

global.resposta = {
    admin: '❗Este comando só pode ser usado por administradores do grupo!',
    botAdmin: '❗Este comando só pode ser usado quando o bot é um administrador do grupo!',
    dono: '❗Este comando só pode ser usado pelo meu proprietário venom!',
    grupo: '❗Este comando só pode ser usado em em grupo!',
    error: '🚫 Erro ao externo!',
}

global.thumb = fs.readFileSync('./dados/imagem/menu.jpg')

let arquivo = require.resolve(__filename)
fs.watchFile(arquivo, () => {
    fs.unwatchFile(arquivo)
    console.log(chalk.redBright(`Arquivo atualizado '${__filename}'`))
    delete require.cache[arquivo]
    require(arquivo)
})
