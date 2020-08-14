# Consolidate the total from the revenues imported from pipedrive

Consolidate the total of all revenues in the database. The params year, month, and day,
allow to group the total per year, month, and day.

**URL** : `/revenues/sum`

**Method** : `GET`


**Params** ```{"year": true|false, month: true|false, day: true|false}```

## Success Responses

**Code** : `200`

## If none param was passed:

**Content** :

```json
{
  "message": [
    {
      "_id": {},
      "total": 603.9
    }
  ]
}
```

## If only year param was passed:

**Content** :

```json
{
  "message": [
    {
      "_id": {
        "year": "2020"
      },
      "total": 603.9
    },
    {
      "_id": {
        "year": "2019"
      },
      "total": 700
    }
  ]
}
```

## If year and month params were passed:

**Content** :

```json
{
  "message": [
    {
      "_id": {
        "year": "2020",
        "month": "8"
      },
      "total": 603.9
    },
    {
      "_id": {
        "year": "2020",
        "month": "7"
      },
      "total": 100
    },
    {
      "_id": {
        "year": "2019",
        "month": "5"
      },
      "total": 50
    }
  ]
}
```

## If year, month, and day params were passed:

**Content** :

```json
{
  "message": [
    {
      "_id": {
        "year": "2020",
        "month": "8",
        "day": "10"
      },
      "total": 603.9
    },
    {
      "_id": {
        "year": "2020",
        "month": "8",
        "day": "11"
      },
      "total": 6.9
    },
    {
      "_id": {
        "year": "2019",
        "month": "8",
        "day": "12"
      },
      "total": 1000
    }
  ]
}
```

## Error Responses

**Condition** : If any parameter is missing or mispelled, or the content is none.

**Code** : `500 internal error`


## OR
**Condition** : If year, month, or day, were not passed as boolean.

**Code** : `400`
**Content**:
```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "{param} must be a boolean",
  "validation": {
    "source": "query",
    "keys": [
      "{param}"
    ]
  }
}
```
