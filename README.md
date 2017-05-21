# Toggl2Redmine

Simple tool for migrating Toggle time entries into Redmine as time spents.

## Usage

`node index.js <toggl-api-key> <redmine-url> <redmine-api-key> <date>`

Parameters:
- *toggl-api-key*   - API key to your Toggl account
- *redmine-url*     - Redmine URL
- *redmine-api-key* - API key to your Redmine account
- *date*            - date in format *mm.dd.YYYY*, filters entries to given day
