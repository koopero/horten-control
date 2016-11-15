const HortenControl = require('./src/LoopinControl')

global.HortenControl = global.HortenControl || HortenControl

exports.Control = HortenControl
