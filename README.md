# Toggl2Redmine [![Build Status](https://travis-ci.org/trawiasty/toggl2redmine.svg?branch=master)](https://travis-ci.org/trawiasty/toggl2redmine)

Simple tool for migrating Toggle time entries into Redmine as time spents.

## Usage

`node index.js [--group] <toggl-api-key> <redmine-url> <redmine-api-key> <date>`

Options
- *--group* - enable grouping entries with the same description and tags

Parameters:
- *toggl-api-key*   - API key to your Toggl account
- *redmine-url*     - Redmine URL
- *redmine-api-key* - API key to your Redmine account
- *date*            - date in format *mm.dd.YYYY*, filters entries to given day

## Use with bash script

``` 
cp toggl.sh.example toggl.sh
# Fill toggl.sh file with toggl and redmine api keys and redmine url

sh toggl.sh mm.dd.yyyy    # with specific date
sh toggl.sh               # with current date
``` 
