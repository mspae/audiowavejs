import { expect } from 'chai';

const exec = require('child_process').exec;
const errorString = `Error: Please specify the input and output file:
'audiowaveform-js inputFile.wav outputFile.json'
`;

describe('Command line interface:', () => {

  it('No arguments should result in error', (done) => {
    exec('node dist/index.js', (err, stdout, stderr) => {
      expect(stderr).to.equal(errorString);
      done();
    });
  });

  it('One argument should result in error', (done) => {
    exec('node dist/index.js foo', (err, stdout, stderr) => {
      expect(stderr).to.equal(errorString);
      done();
    });
  });
});
