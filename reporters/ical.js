const VCalendar = require('cozy-ical').VCalendar;
const VEvent = require('cozy-ical').VEvent;
const moment = require('moment')
const _ = require('underscore')
const uuid = require('uuid')

const cal = new VCalendar({
  organization: 'Brunel University',
  title: 'University Timetable'
});

const termStart = new Date(2015, 8, 21).valueOf()
const weekValue = 1000 * 60 * 60 * 24 * 7 // A week in unixtime microseconds
const dayValue = weekValue / 7

module.exports = function icalReporter (schedule) {
  var evnts = []

  schedule.forEach(function (daysSchedule, dayNo) {
    daysSchedule.forEach(function (evnt) {
      evnt.weeks.split(', ').forEach(function (weekPeriod) {
        // console.log(weekPeriod)
        var spansWeeks = weekPeriod.match(/^([0-9]+)-([0-9]+)$/)
        if (spansWeeks) {
          // Reoccuring events
          evnt.startWeek = parseInt(spansWeeks[1], 10)
          evnt.endWeek = parseInt(spansWeeks[2], 10)
          evnt.durationWeeks = evnt.endWeek - evnt.startWeek
        } else {
          // One off events
          evnt.startWeek = parseInt(weekPeriod, 10)
          evnt.endWeek = evnt.startWeek
          evnt.durationWeeks = 1
        }
        // All events
        evnt.day = dayNo // day of week (0-6)
        var startDate = new Date(
          termStart +
          (weekValue * (evnt.startWeek - 1)) +
          (dayValue * evnt.day)
        )

        if (5 < evnt.startWeek && evnt.startWeek <= 27) {
          startDate = new Date(startDate.valueOf() + (1000 * 60 * 60))
        }

        evnt.startDate = moment(startDate).set('hour', parseInt(evnt.start.split(':')[0], 10)).toDate()
        evnt.endDate = moment(startDate).set('hour', parseInt(evnt.end.split(':')[0], 10)).toDate()
        evnts.push(evnt)
        // console.log(evnt)
      })
    })
  })

  // console.log(_.sortBy(evnts, function (evnt) {
  //   return evnt.startWeek
  // }))

  evnts.forEach(function (evnt) {
    // console.log(evnt)
    // console.log(typeof evnt.startDate + ' ' + evnt.startDate)


    var vevent = new VEvent({
      startDate: evnt.startDate,
      endDate: evnt.endDate,
      summary: evnt.activity,
      description: JSON.stringify(evnt, null, 2),
      stampDate: new Date(),
      uid: uuid.v4()
    })
    cal.add(vevent);

    // if (evnt.durationWeeks > 1) {
    //   icalData.repeating = {
    //     freq: 'WEEKLY',
    //     count: evnt.durationWeeks,
    //     interval: 1
    //   }
    // }

  })



  console.log(cal.toString())
}
