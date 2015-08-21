require('babel/register');

if (require('piping')({main:"./src/server/index.js"})) {
  require('./server');
}
