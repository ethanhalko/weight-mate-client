var fs = require('fs');

function readWriteSync() {
  console.log('sup');
  let env = process.env.ENV;
  if (!process.env.ENV) {
    env = 'dev'; //SETTING DEFAULT ENV AS DEV
  }
  var data = fs.readFileSync(`${__dirname}/environments/environment.${env}.ts`, 'utf-8');
  fs.writeFileSync(`${__dirname}/environments/environment.ts`, data, 'utf-8');
  console.log('readFileSync complete');
}
readWriteSync();
