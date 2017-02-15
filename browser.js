'use strict'

var HortenControl = require('./src/HortenControl')

global.HortenControl = global.HortenControl || HortenControl

exports.Control = HortenControl
