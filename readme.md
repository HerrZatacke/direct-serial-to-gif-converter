# GB printer direct serial to gif converter

## listening

Serial mode can be started with `npm run listen`

### needs a config file for serial setup
``` json
{
  "portConfig": {
    "comName": "COM7",
    "baudRate": 19200,
    "dataBits": 7,
    "stopBits": 1,
    "autoOpen": true,
    "parity": "even"
  }
}
```
## converting existing dump
A file called `dump.txt` must be located in the project's root folder.
Start conversion with `npm start`
