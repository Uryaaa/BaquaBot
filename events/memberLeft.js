module.exports = (client, message) => {
  message.left.profiles().then((user) => {
    client.push(
      message.source.groupId,
      `${user
        .map((i) => i.displayName)
        .join(
          ", "
        )} telah meninggalkan group, selamat tinggal! Semoga bisa bertemu lagi`
    );
  });
};
