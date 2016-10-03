import { expect } from 'chai';
import sinon from 'sinon';
import processor from '../src/processor.js';
import fs from 'fs';

describe('Processor:', () => {
  let audioInput;
  let testOutput;
  let result;

  try {
    audioInput = fs.readFileSync('./test/resources/demo.wav');
    testOutput = JSON.parse(fs.readFileSync('./test/resources/demo.json', 'utf8'));
  } catch (e) {
    console.error(e);
  }

  before(done => {
    processor(audioInput).then(r => {
      result = r;
      done();
    }).catch(err => {
      console.error(err);
      done();
    })
  });

  it('Output of processor resembles audiowaveform output', () => {
    expect(result).to.equal(testOutput);
  });
});
