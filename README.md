# imgrr
Individual code test for Code Fellow JavaScript 401

## Getting started
All resources in this app are hosted locally, including a Mongo database and Express servers. Make sure you have `mongod` running with the path pointing to a `db/` directory at the repo root. Once you've installed all the node modules through `npm start`, you can:

#### Start up the app
Run `gulp build:dev` to get the latest build of the app, then run `node server.js` to start both the front- and back-end servers. Alternatively, running
```
npm start
```
will perform both task mentioned above. The front-end server is hosted at port `8080` and back-end at `8081`.

#### Run tests!
The front-end is tested with Karma and Jasmine while the back-end is tested with Mocha and Chai. They can be ran separately by calling `gulp karma` and `gulp mocha` from your command line. You can also use
```
npm test
```
to run all the tests at the same time.
