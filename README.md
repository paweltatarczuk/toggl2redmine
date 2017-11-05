# Toggl2Redmine [![Build Status](https://travis-ci.org/trawiasty/toggl2redmine.svg?branch=master)](https://travis-ci.org/trawiasty/toggl2redmine)

Simple tool for migrating Toggle time entries into Redmine as time spents.

## Usage

`node index.js <toggl-api-key> <redmine-url> <redmine-api-key> <date>`

Parameters:
- *toggl-api-key*   - API key to your Toggl account
- *redmine-url*     - Redmine URL
- *redmine-api-key* - API key to your Redmine account
- *date*            - date in format *mm.dd.YYYY*, filters entries to given day
