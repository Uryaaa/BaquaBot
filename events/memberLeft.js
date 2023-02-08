module.exports = (client, message) => {
  message.left.profiles()
  .then(async (user)=>{

    client.push(message.source.groupId, `${await user.map(i => i.displayName).join(", ") || "Seseorang"} telah meninggalkan group, selamat tinggal! Semoga bisa bertemu lagi`)
  })
};
