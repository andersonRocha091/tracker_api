# Insert a new tracker log

Insert a new tacker log into your database

**URL** : `/tracker/`

**Method** : `POST`

**Data example** All fields must be sent.

```json
{
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
    }
```

## Success Response

**Condition** : If everything is OK and the record saved successfully.

**Code** : `200`

**Content example**

```json
{
  "message": "Track record inserted successfully",
  "uid": 12345,
  "statusCode": "200",
};
```

## Error Responses

**Condition** : If any parameter is missing or mispelled.

**Code** : `400`

**Content** : `{"statusCode": 400,"error": "Bad Request"}`

