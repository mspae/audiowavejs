/**
 * audiowavejs
 *
 * Copyright © 2016 Martin Spencer. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import processor from './processor.js';
import fileop from './fileop.js';

const args = process.argv.slice(2);
const cwd = process.cwd();
const path = require('path');

if (args.length < 2) {
  console.error(`Error: Please specify the input and output file:
'audiowaveform-js inputFile.wav outputFile.json'`);
} else {
  const input = path.join(cwd, args[0]);
  const output = path.join(cwd, args[1]);

  fileop(input, output, processor)
    .then(writtenFile => {
      console.log(`Successfully written output to ${writtenFile}!`);
    })
    .catch(err => {
      console.error('Error: ', err);
    });
}


export default processor;
