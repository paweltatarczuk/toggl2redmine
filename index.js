// Copyright 2017 Paweł Tatarczuk
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
// OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
// ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

'use strict';

let App = require('./lib/app');

/**
 * Returns usage text
 * @return {String}
 */
function usage() {
	return 'toggl2redmine ' +
         '[--group] ' +
         '[--wid <wid>]' +
         '<toggl-key> ' +
         '<redmine-url> ' +
         '<redmine-key> ' +
         '<mm-dd-yyyy>';
}

// Process arguments
let args = [];
let group = false;
let wid = null;

for (let i = 2; i < process.argv.length; i++) {
  let arg = process.argv[i];

  if (arg === '--group') {
    group = true;
    continue;
  }

  if (arg == '--wid') {
    wid = process.argv[++i]; // Fetch wid and move on
    continue;
  }

  args.push(arg);
}

// Check arguments
if (args.length !== 4) {
  process.stdout.write(usage());
  process.exit(1);
}

// Prepare options
let options = {
  'toggl': {
    'apiKey': args[0],
  },
  'redmine': {
    'url': args[1],
    'apiKey': args[2],
  },
  'date': args[3],
  'group': group,
  'wid': wid,
};

// Run app
let app = new App(options);
app.run();
