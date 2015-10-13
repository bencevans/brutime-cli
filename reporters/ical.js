const ical = require('ical-generator')

var cal = ical({
  name: 'University Timetable',
  timezone: 'Europe/London',
  prodId: { company: 'bensbit.co.uk', product: 'brucal' }
})

module.exports = function icalReporter (schedule) {
  cal.createEvent({
    start: new Date(),
    end: new Date() + 1000,
    timestamp: new Date(),
    summary: 'CS200-: Module Name',
    organizer: 'Bob <noreply@bob.com>'
  })

  schedule.forEach(function (daysSchedule) {
    daysSchedule.forEach(function (evnt) {
      cal.createEvent({
        start: new Date(),
        end: new Date() + 1000,
        repeating: {
          freq: 'WEEKLY',
          count: 2,
          interval: 1
        },
        summary: evnt.activity,
        description: ''
      })
      // console.log(evnt)
    })
  })

  console.log(cal.toString())
}
