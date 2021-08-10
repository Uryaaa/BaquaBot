const parseScheduleHtml = require("holo-schedule").default;
const getScheduleHtml = require("holo-schedule/lib/getScheduleHtml").default;
const moment = require("moment");
module.exports = {
  name: "holoschedule",
  description: "Hololive recent schedule",
  aliases: [],
  category: "Anime",
  example: "{prefix}holoschedule",
  async execute(client, message, args) {
    const html = await getScheduleHtml();
    const { lives } = parseScheduleHtml(html);
    let desc = [];
    lives
      .sort((x) => new Date(x.time))
      .reverse()
      .map((x, i) => {
        if (i >= 10) return;
        x = `${i + 1}. ${x.streamer}\n${moment(x.time)
          .utcOffset(+9)
          .format("dddd, MMMM Do YYYY, HH:mm")} JST\n${x.link}\nStatus : ${
          x.streaming ? "🔴" : "⚫"
        }`;
        desc.push(x);
      });
    message.reply(
      `LIVE now in Hololive/Holostar\n==============\n${desc.join(
        "\n\n"
      )}\n\n==============\nSee more : https://schedule.hololive.tv/lives`
    );
    //console.log(time.getDate().toDateString())
    //console.log(lives[1])
  },
};
