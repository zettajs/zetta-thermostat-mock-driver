# Zetta Thermostat Mock Driver

## Install

```
$> npm install zetta-thermostat-mock-driver
```

## Usage

```javascript
var zetta = require('zetta');
var Thermostat = require('zetta-thermostat-mock');

zetta()
  .use(Thermostat)
  .listen(1337)
```

