import fs from 'fs';
global.window = {};

const AV = require('av');
require('mp3.js');
require('flac.js');

export default function processor(data) {
  // cache data for promise
  const thisData = data;
  return new Promise((resolve, reject) => {

    const chunkSize = 256;
    let asset = AV.Asset.fromBuffer(thisData);
    let format;
    let interleaved = []
    let result = {
      samples_per_pixel: chunkSize,
      bits: 8,
    };

    asset.on('error', err => {
      reject(err);
    });

    asset.get('format', f => {
      result.sample_rate = f.sampleRate;
    });

    asset.decodeToBuffer(b => {
      const buffer = new AV.Buffer(b);
      const bufferLength = buffer.length;
      let index = 0;
      let data = [];
      //console.log(buffer);

      for (; index < bufferLength; index += chunkSize) {
        data.push(buffer.slice(index, index + chunkSize).copy());
      }

      console.log(bufferLength, data.length);

      data = data.map((chunk) => {
        let max;
        let min;
        let value;

        for (value in chunk) {
          if (chunk.hasOwnProperty(value)) {
            console.log(value.data);
          }
        }
        chunk.map((item) => {
          min = (min < item) ? min : item;
          max = (max > item) ? max : item;
        });
        interleaved.push(min);
        interleaved.push(max);
      });

      result.length = data.length;
      result.data = interleaved;
      resolve(result);
    });

  });
}
