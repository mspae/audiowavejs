global.window = {};

const AV = require('av');
require('mp3.js');
require('flac.js');

export default function processor(input) {
  return new Promise((resolve, reject) => {
    const chunkSize = 256;
    const asset = AV.Asset.fromBuffer(input);
    const interleaved = [];

    asset.on('error', err => {
      reject(err);
    });

    asset.decodeToBuffer(b => {
      const buffer = new AV.Buffer(b);
      const bufferLength = buffer.length;
      let index = 0;
      const data = [];

      for (; index < bufferLength; index += chunkSize) {
        data.push(buffer.slice(index, index + chunkSize).copy());
      }


      data.forEach(chunk => {
        let max;
        let min;

        Object.keys(chunk).forEach(value => {
          console.log(chunk[value].data);
        });

        chunk.forEach(item => {
          min = (min < item) ? min : item;
          max = (max > item) ? max : item;
        });
        interleaved.push(min);
        interleaved.push(max);
      });

      resolve(interleaved);
    });
  });
}
