const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const jwtSecret = 'secret_key';

const User = require('../models/comment.model.js');

router.use(bodyParser.json());

