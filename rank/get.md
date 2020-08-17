# Ranking 

Get a rank of top speeds by tracker. By default it is sorted in descendant mode.

**URL** : `/tracker/rank`

**Method** : `GET`

**Params**:{
    order: `ASC|DESC order of speed ranking by tracker`,
    startDate: `the specific date and time you want to get the ranking information - (yyyy-mm-dd hh:mm:ss)`,
    endDate: `setting this param the rank will consider the interval between startDate and endDate. It must be also in the format (yyyy-mm-dd hh:mm:ss)`
}

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "message": [
    {
      "tracker_uid": 46402,
      "speed": 147
    },
    {
      "tracker_uid": 1101,
      "speed": 146
    },
    {
      "tracker_uid": 32952,
      "speed": 138
    },
    {
      "tracker_uid": 61295,
      "speed": 134
    },
    {
      "tracker_uid": 48377,
      "speed": 122
    },
    {
      "tracker_uid": 33180,
      "speed": 120
    },
    {
      "tracker_uid": 38820,
      "speed": 120
    },
    {
      "tracker_uid": 50939,
      "speed": 111
    },
    {
      "tracker_uid": 52481,
      "speed": 0
    },
    {
      "tracker_uid": 52483,
      "speed": 0
    },
    {
      "tracker_uid": 52486,
      "speed": 0
    },
    {
      "tracker_uid": 62604,
      "speed": 0
    },
    {
      "tracker_uid": 52454,
      "speed": 0
    },
    {
      "tracker_uid": 52462,
      "speed": 0
    },
    {
      "tracker_uid": 52464,
      "speed": 0
    },
    {
      "tracker_uid": 52465,
      "speed": 0
    },
    {
      "tracker_uid": 52466,
      "speed": 0
    },
    {
      "tracker_uid": 52470,
      "speed": 0
    },
    {
      "tracker_uid": 52471,
      "speed": 0
    },
    {
      "tracker_uid": 52476,
      "speed": 0
    },
    {
      "tracker_uid": 52480,
      "speed": 0
    }
  ]
}
```

## Notes

* If you don't specify 'order' the api will assume Descendant one:
* If you misspell any parameter, or out of format for startDate, and endDate
```json
{
  "statusCode": 400,
  "error": "Bad Request"
}
```

