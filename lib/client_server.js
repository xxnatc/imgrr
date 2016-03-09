module.exports = exports = function(port) {
  const express = require('express');
  const app = express();

  app.use('/', express.static(__dirname + '/../build'));

  return app.listen(port, () => {
    console.log('Client server running on port: ' + port);
  });
};
