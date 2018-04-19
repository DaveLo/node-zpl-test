#!/usr/bin/env node
'use-strict';

const { app, log } = require('./src/app.js');
const port = process.env.PORT;

app.listen(port, '0.0.0.0', () => {
  log.info(`App Listening on Port ${port}`);
})
