#!/usr/bin/env node
/*
* Module dependencies
*/

const BruTime = require('brutime')
const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const pkg = require('./package')

/*
* Helpers
*/

function handleError (err) {
  console.error(err.stack || err)
  process.exit(1)
}

/*
* Help and Version
*/

if (process.argv.length === 2 || argv.h || argv.help) {
  fs.readFile(__dirname + '/lib/usage.txt', 'utf8', function (err, usage) {
    if (err) {
      return handleError(err)
    }
    console.log(usage)
    process.exit(0)
  })
} else if (argv.v || argv.version || argv._[0] === 'version') {
  console.log(pkg.version)
  process.exit(0)
}

const timetable = new BruTime({
  login: process.env.LOGIN,
  password: process.env.PASSWORD
})

/*
* Options
*/

const reporterName = argv.f || argv.format || 'table'
const period = argv.period || '1-52'
const days = argv.days || '1-7'

/*
* Setup Reporter
*/

var reporter
try {
  reporter = require(__dirname + '/reporters/' + reporterName)
} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') {
    handleError(new Error('Unknown reporter \'' + reporterName + '\''))
  } else {
    handleError(e)
  }
}

/**
* Scrape
*/

timetable.getMyModulesTimetable({
  period: period,
  days: days
}, function (err, schedule) {
  if (err) {
    return handleError(err)
  }
  reporter(schedule)
})
