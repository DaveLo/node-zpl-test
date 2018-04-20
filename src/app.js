#!/usr/bin/env node
"use strict"

// LIBRARIES
const express = require('express');
const compression = require('compression');
const bunyan = require('bunyan');
const bunyanMiddleware = require('bunyan-middleware');
const path = require('path');

// APP
const log = bunyan.createLogger({
  name: 'ZPL_TEST',
  level: process.env.LOG_LEVEL,
  serializers: bunyan.stdSerializers,
});
const app = express();

// MIDDLEWARE
app.use(
  bunyanMiddleware({
    headerName: 'X-Request-Id',
    propertyName: 'reqId',
    logName: 'req_id',
    obscureHeaders: ['Authorization'],
    logger: log,
    level: process.env.LOG_LEVEL,
    requestStart: true,
    verbose: true,
  })
);
app.use(compression());

// ROUTES
app.use('/js', express.static(path.join(__dirname, 'dist')));
app.use('/label', express.static(__dirname));

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/html/index.html'));
})


// ERROR
app.use((err, req, res, next) => {
  log.error({ req_id: req.reqId, stack: err.stack, message: err.message })
  next(err);
});
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message })
});

module.exports = { app, log };
