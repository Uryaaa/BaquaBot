const parseScheduleHtml  = require('holo-schedule').default
const getScheduleHtml = require( 'holo-schedule/lib/getScheduleHtml').default

module.exports = {
    name: 'test',
    description: '',
    aliases : [],
    category: '',
    example: '{prefix}command [] ? <>',
    async  execute(client, message, args){
     const html = await getScheduleHtml()
     const {lives} = parseScheduleHtml(html)
console.log(lives)


  }
}