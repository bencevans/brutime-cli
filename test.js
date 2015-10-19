const test = require('tape')
const exec = require('child_process').exec
const fs = require('fs')
const pkg = require('./package')

/**
 * Usage
 */

test('running without any arguments', function (t) {
  t.plan(2)
  exec('./bin.js', function (err, stdout, sterr) {
    t.error(err, 'exits ok')
    t.equal(stdout, fs.readFileSync(__dirname + '/lib/usage.txt', 'utf8') + '\n', 'prints usage')
  })
})

test('display usage with -h', function (t) {
  t.plan(2)
  exec('./bin.js -h', function (err, stdout, sterr) {
    t.error(err, 'exits ok')
    t.equal(stdout, fs.readFileSync(__dirname + '/lib/usage.txt', 'utf8') + '\n', 'prints usage')
  })
})

test('display usage with --help', function (t) {
  t.plan(2)
  exec('./bin.js --help', function (err, stdout, sterr) {
    t.error(err, 'exits ok')
    t.equal(stdout, fs.readFileSync(__dirname + '/lib/usage.txt', 'utf8') + '\n', 'prints usage')
  })
})

/*
* Version
*/

test('running with -v', function (t) {
  t.plan(2)
  exec('./bin.js -v', function (err, stdout) {
    t.error(err, 'exits ok')
    t.equal(stdout, pkg.version + '\n', 'prints version')
  })
})

test('running with --version', function (t) {
  t.plan(2)
  exec('./bin.js -v', function (err, stdout) {
    t.error(err, 'exits ok')
    t.equal(stdout, pkg.version + '\n', 'prints version')
  })
})

/*
* Scraping
*/

test('scrape', function (t) {
  t.plan(1)
  exec('./bin.js', function (err) {
    t.error(err, 'exits ok')
  })
})

test('table reporter', function (t) {
  t.plan(1)
  exec('./bin.js scrape -f table', function (err) {
    t.error(err, 'exits ok')
  })
})

test('json reporter', function (t) {
  t.plan(1)
  exec('./bin.js scrape -f json', function (err) {
    t.error(err, 'exits ok')
  })
})
