require('babel/register');

if (require('piping')({main:"./src/server/index.js",hook:true})) {
  require('./server');
}
