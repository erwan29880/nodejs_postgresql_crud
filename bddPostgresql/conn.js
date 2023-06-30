const express = require('express');
const Pool = require('pg').Pool;
const config = require('./config.json');
const conn = new Pool(config);
module.exports = conn;
