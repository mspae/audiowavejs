import fs from 'fs';

export default function fileop(input, output, fn) {
  return new Promise((resolve, reject) => {
    fs.stat(input, (err1) => {
      if (err1) reject(err1);
      fs.readFile(input, (err2, data2) => {
        if (err2) reject(err2);
        fn(data2).then(result => {
          fs.writeFile(output, JSON.stringify(result), err3 => {
            if (err3) reject(err3);
            resolve(output);
          });
        }).catch(err4 => {
          reject(err4);
        });
      });
    });
  });
}
