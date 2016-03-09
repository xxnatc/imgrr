module.exports = exports = function(port) {
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/imgrr_app_dev');
  const express = require('express');
  const app = express();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

  const imagesRouter = require(__dirname + '/../routes/images_router');
  app.use('/api', imagesRouter);

  app.use((req, res) => {
    res.status(404).json({ msg: 'Page not found' });
  });

  return app.listen(port, () => {
    console.log('Backend server running on port: ' + port);
  });
};
