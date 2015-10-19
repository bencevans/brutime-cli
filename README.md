# brutime-cli

> Brunel Timetable CLI.

## Install

```
$ npm install --global brutime-cli
```

## Usage

```
Usage: brutime [OPTIONS] COMMAND [arg...]
       brutime [ --help | -v | --version ]

A command line client for Brunel's Timetabling system.

Commands:

  scrape                            Scrape and print timetable info
  version                           Print version

Options:

  -v, --version                      Print version information and quit
  -f, --format=table                 Reporter format
      --period=1-52                  University weeks to scrape
      --days=1-7                     Days of the week to scrape

Formats:

  table (default)                    Print a table similar to the output on https://teaching.brunel.ac.uk/SWS-1516
  json                               Print a JSON representation

Examples:

  Print your timetable in a table similar to timetabling website:
  $ brutime scrape

  Generate a JSON output:
  $ brutime scrape -f json
```

## Related

- [brutime](https://github.com/bencevans/brutime) - API for this module


## License

ISC © [Ben Evans](http://bensbit.co.uk)
