module.exports = {
    name: 'wangy',
    description: 'Wangy wangy',
    aliases : ['wangi'],
    category: 'Fun',
    example: '{prefix}wangy [text]',
    execute(client, message, args){
      if(!args[0]) return message.reply({
        type:'text',
        text: 'Argumen input tidak terdeteksi'
      })
      var wngy = args[0].toUpperCase();
      let wangi = `${wngy}...... ${wngy} ❤ ❤ ❤ WANGY WANGY WANGY WANGY WANGY WANGY HU HA HU HA HU HA, aaaah baunya ${wngy} wangi aku mau nyiumin aroma wanginya ${wngy} AAAAAAAAH ~~ Rambutnya.... aaah rambutnya juga pengen aku elus-elus ~ AAAAAH ${wngy} ❤ ❤ ❤   manis banget AAAAAAAAH TATAPAN ${wngy} BEGITU MENGGODAAAAAAAAA............ GUA RELA JADI BUDAK SIMP HANYA DEMI ${wngy} TERDJINTA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAGH apa ? ${wngy} itu gak nyata ? Cuma karakter 2 dimensi katamu ? nggak, ngak ngak ngak ngak NGAAAAAAAAK GUA GAK PERCAYA ITU DIA NYATA !! GUA GAK PEDULI SAMA KENYATAAN POKOKNYA GAK PEDULI. ${wngy} ngeliat gw ... ${wngy} NGELIATIN GW! ${wngy}... kamu percaya sama aku ? aaaaaaaaaaah syukur ${wngy} gak malu memiliki aku aaaaaah ❤ ❤ ❤ YEAAAAAAAAAAAH GUA MASIH PUNYA ${wngy}, ${wngy} AKU SAYANG ${wngy} AKU CINTA ${wngy} AKU AKU INGIN ${wngy} MENJADI BIDADARIKUUUUUUU!!!!!!!!!!!!! AAAAAAAAAAAAAAAAAAAAAAAAAAAAAGH!!!!!!!!!!!!!!!!!!!!!!`
          message.reply({
            type:"text",
            text:`${wangi}`
          })
    }
}