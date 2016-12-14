if (process.env.NODE_ENV === 'PROD') {
    module.exports = require('./Root.prod');
} else {
    module.exports = require('./Root.dev');
}
