const rootProd = require('./Root.prod.jsx');
const rootDev = require('./Root.dev.jsx');

if (process.env.NODE_ENV === 'PROD') {
  module.exports = rootProd;
} else {
  module.exports = rootDev;
}
