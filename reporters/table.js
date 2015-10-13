var Table = require('cli-table')

var days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

var cols = [
  'Activity',
  'Description',
  'Start',
  'End',
  'Weeks',
  'Room',
  'Staff',
  'Type'
]

module.exports = function table (schedule) {
  schedule.forEach(function (daysSchedule, dayNo) {
    var table = new Table({
      head: cols
      // colWidths: [100, 200]
    })
    console.log('\n' + days[dayNo] + '\n')
    daysSchedule.forEach(function (evnt) {
      table.push(cols.map(function (col) {
        return evnt[col.toLowerCase()]
      }))
    })
    console.log(table.toString())
  })
}
