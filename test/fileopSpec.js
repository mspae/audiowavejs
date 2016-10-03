import { expect } from 'chai';
import sinon from 'sinon';

import fs from 'fs';
import fileOp from '../src/fileop.js';

describe('File i/o:', () => {
  const inputPath = 'input/file';
  const outputPath = 'output/file';

  const expectedFileOpResult = outputPath;
  const expectedReadFileResult = 'data from file';
  const expectedProcessorResult = 'processed data';
  const expectedWriteFileResult = [outputPath, expectedProcessorResult];

  let statStub;
  let readFileStub;
  let writeFileStub;
  let processor;
  let fileOpResult;

  before((done) => {
    statStub = sinon.stub(fs, 'stat');
    statStub.yields(null, true);

    readFileStub = sinon.stub(fs, 'readFile');
    readFileStub.yields(null, expectedReadFileResult);

    writeFileStub = sinon.stub(fs, 'writeFile');
    writeFileStub.yields(null, expectedWriteFileResult[0], expectedWriteFileResult[1]);

    processor = sinon.stub().returns(Promise.resolve(expectedProcessorResult));

    fileOp(inputPath, outputPath, processor).then(output => {
      fileOpResult = output;
      done();
    }).catch(err => {
      fileOpResult = err;
      done();
    });
  });

  it('fileOp should return output file path', () => {
    expect(fileOpResult).to.equal(expectedFileOpResult);
  });

  it('writeFile should be called with the path of the output file and the processed data', () => {
    sinon.assert.calledWith(writeFileStub, outputPath, JSON.stringify(expectedProcessorResult));
  });

  it('readFile should be called with the path of the input file', () => {
    sinon.assert.calledWith(readFileStub, inputPath);
  });

  it('processor should be called with the data from the file', () => {
    sinon.assert.calledWith(processor, expectedReadFileResult);
  });

  after(() => {
    statStub.restore();
    readFileStub.restore();
    writeFileStub.restore();
  });
});
