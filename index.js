var Device = require('zetta-device');
var util = require('util');


var Thermostat = module.exports = function(opts) {
  Device.call(this);
  this.units = 'Fahrenheit';
  this.indoorTemperature = 73.0000;
  this.indoorHumidity = 0.3333;
  this.outdoorTemperature = 57.0000;
  this.outdoorHumidity = 0.4512;
  this.heatSetpoint = 76.0000;
  this.coolSetpoint = 68.0000;
  this.setpoint = this.heatSetpoint;

  this._opts = opts || {};
};
util.inherits(Thermostat, Device);

Thermostat.prototype.init = function(config) {
  config
    .name('Hallway Thermostat')
    .type('thermostat')
    .state('heating')
    .when('off', {allow: ['heat', 'cool']})
    .when('heating', {allow: ['off', 'cool', 'setSetpoint']})
    .when('cooling', {allow: ['off', 'heat', 'setSetpoint']})
    .map('heat', this.heat)
    .map('cool', this.cool)
    .map('off', this.off)
    .map('setSetpoint', this.setSetpoint, [{ type:'text', name: 'setpoint'}])
    .monitor('outdoorTemperature')
    .monitor('outdoorHumidity')
    .monitor('indoorTemperature')
    .monitor('indoorHumidity')
    .monitor('setpoint');
};

Thermostat.prototype.off = function(cb) {
  this.state = 'off';
  cb();
}

Thermostat.prototype.heat = function(cb) {
  this.state = 'heating';
  cb();
}

Thermostat.prototype.cool = function(cb) {
  this.state = 'cooling'
  cb();
}

Thermostat.prototype.setSetpoint = function(setpoint, cb) {
  this.setpoint = setpoint;
  if ('cooling' == this.state) {
    this.coolSetpoint = setpoint;
  } else if ('heating' == this.state) {
    this.heatSetpoint = setpoint;
  }
  cb();
}
