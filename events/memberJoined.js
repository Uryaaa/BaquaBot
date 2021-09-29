
module.exports = (client, message) => {
  client.getGroupProfile(message.source.groupId)
  .then((profile)=>{
    console.log(profile)
    message.joined.profiles()
    .then((user)=>{
      console.log(user)
      if(message.source.groupId === 'C8122925dd58845f9cace8fe27b986e19' || message.source.groupId === 'Ccf04c952af391626728c464fdefad0e4')
      {
        message.reply({
          type: 'text',
          text: `Halo ${user.map(i => i.displayName).join(", ")}! Welcome to ${profile.groupName}! Semoga betah, saya adalah bot untuk gc ini, untuk mengakses command ketik "!help", oiya silahkan kirim id nya kesini biar bisa di scout.\n\n Kita juga punya Discord : https://discord.gg/YvP9fK2, kalo berminat silahkan join.`
        })
      } else {
          message.reply({
          type: 'text',
          text: `Halo ${user.map(i => i.displayName).join(", ")}! Welcome to ${profile.groupName}! Semoga betah, saya adalah bot gc ini, untuk mengakses commands bisa ketik "!help".`
        })
      }
    })


  })


};
