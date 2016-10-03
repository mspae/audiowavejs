import fs from 'fs';

export default function fileop(input, output, fn) {
  return new Promise((resolve, reject) => {
    fs.stat(input, (err) => {
      if (err) reject(err);
      fs.readFile(input, (err, data) => {
        if (err) reject(err);
        fn(data).then(result => {
          fs.writeFile(output, JSON.stringify(result), (err, data) => {
            if (err) reject(err);
            resolve(output);
          });
        }).catch(err => {
          reject(err);
        });
      });
    });
  });
}
