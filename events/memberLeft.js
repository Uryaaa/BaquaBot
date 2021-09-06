module.exports = (client, message) => {
  message.left.profiles()
  .then((user)=>{

    client.push(message.source.groupId, `${user[0].displayName} telah meninggalkan group, selamat tinggal! Semoga bisa bertemu lagi`)
  })
};
