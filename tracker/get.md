# Show all tracking logs

Show all tracking logs in your database

**URL** : `/tracker/`

**Method** : `GET`

**Params** : `{skip: if desire skip some record, limit: ammount per page}`

## Success Responses

**Code** : `200 OK`

```json
{
  "dados": [
    {
      "uid": 162775,
      "tracker_uid": 1101,
      "angle": 0,
      "speed": 0,
      "aquisition_time": 1593564093,
      "visible_satellites": 0,
      "engine": "off",
      "event_id": 7,
      "event_info": 0,
      "insert_time": "2020-07-01 02:43:32",
      "mileage": 248114.161,
      "voltage": 12.4,
      "driver_ibutton": "0",
      "hdop": 0
    },
    {
      "uid": 162777,
      "tracker_uid": 1101,
      "angle": 0,
      "speed": 0,
      "aquisition_time": 1593567693,
      "visible_satellites": 0,
      "engine": "off",
      "event_id": 7,
      "event_info": 0,
      "insert_time": "2020-07-01 02:43:33",
      "mileage": 248114.161,
      "voltage": 12.4,
      "driver_ibutton": "0",
      "hdop": 0
    },
    {
      "uid": 162778,
      "tracker_uid": 1101,
      "angle": 0,
      "speed": 0,
      "aquisition_time": 1593571293,
      "visible_satellites": 0,
      "engine": "off",
      "event_id": 7,
      "event_info": 0,
      "insert_time": "2020-07-01 02:43:33",
      "mileage": 248114.161,
      "voltage": 12.3,
      "driver_ibutton": "0",
      "hdop": 0
    },
    {
      "uid": 162779,
      "tracker_uid": 1101,
      "angle": 0,
      "speed": 0,
      "aquisition_time": 1593571371,
      "visible_satellites": 6,
      "engine": "off",
      "event_id": 7,
      "event_info": 0,
      "insert_time": "2020-07-01 02:43:33",
      "mileage": 248114.161,
      "voltage": 12.2,
      "driver_ibutton": "0",
      "hdop": 1.7
    },
    {
      "uid": 325202,
      "tracker_uid": 1101,
      "angle": 0,
      "speed": 0,
      "aquisition_time": 1593574971,
      "visible_satellites": 0,
      "engine": "off",
      "event_id": 7,
      "event_info": 0,
      "insert_time": "2020-07-01 04:26:18",
      "mileage": 248114.161,
      "voltage": 12.3,
      "driver_ibutton": "0",
      "hdop": 0
    },
    {
      "uid": 325204,
      "tracker_uid": 1101,
      "angle": 0,
      "speed": 0,
      "aquisition_time": 1593577564,
      "visible_satellites": 5,
      "engine": "off",
      "event_id": 7,
      "event_info": 0,
      "insert_time": "2020-07-01 04:26:18",
      "mileage": 248114.161,
      "voltage": 12.2,
      "driver_ibutton": "0",
      "hdop": 2.8
    },
    {
      "uid": 907080,
      "tracker_uid": 1101,
      "angle": 0,
      "speed": 0,
      "aquisition_time": 1593581164,
      "visible_satellites": 0,
      "engine": "off",
      "event_id": 7,
      "event_info": 0,
      "insert_time": "2020-07-01 06:18:33",
      "mileage": 248114.161,
      "voltage": 12.3,
      "driver_ibutton": "0",
      "hdop": 0
    },
    {
      "uid": 907086,
      "tracker_uid": 1101,
      "angle": 0,
      "speed": 0,
      "aquisition_time": 1593584267,
      "visible_satellites": 6,
      "engine": "off",
      "event_id": 7,
      "event_info": 0,
      "insert_time": "2020-07-01 06:18:33",
      "mileage": 248114.161,
      "voltage": 12.2,
      "driver_ibutton": "0",
      "hdop": 1.3
    },
    {
      "uid": 2005250,
      "tracker_uid": 1101,
      "angle": 0,
      "speed": 0,
      "aquisition_time": 1593587867,
      "visible_satellites": 0,
      "engine": "off",
      "event_id": 7,
      "event_info": 0,
      "insert_time": "2020-07-01 08:03:56",
      "mileage": 248114.161,
      "voltage": 12.3,
      "driver_ibutton": "0",
      "hdop": 0
    },
    {
      "uid": 2005256,
      "tracker_uid": 1101,
      "angle": 0,
      "speed": 0,
      "aquisition_time": 1593590614,
      "visible_satellites": 0,
      "engine": "off",
      "event_id": 7,
      "event_info": 0,
      "insert_time": "2020-07-01 08:03:56",
      "mileage": 248114.161,
      "voltage": 12.1,
      "driver_ibutton": "0",
      "hdop": 0
    }
  ],
  "statusCode": 200
}
```

### OR

**Condition** : No itens found.

**Code** : `200 OK`

```json
[]

```
