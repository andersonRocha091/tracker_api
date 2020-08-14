# Create an revenue

Create an revenue into your mongo database

**URL** : `/revenues/`

**Method** : `POST`

**Data example** All fields must be sent.

```json
{
   "value": 200.54,
    "pipedriveId": 3,
    "day": "10",
    "month": "8",
    "year": "2020",
    "description": "my item description",
```

## Success Response

**Condition** : If everything is OK and an Account didn't exist for this User.

**Code** : `200`

**Content example**

```json
{{
    "insertedAt": "2020-08-10T00:44:17.613Z",
    "_id": "5f31ea1e88a95634ffec332a",
    "pipedriveId": 3,
    "description": "my item description",
    "blingId": "",
    "value":200.54,
    "year": "2020",
    "month": "8",
    "day": "10",
    "__v": 0
  }
```

## Error Responses

**Condition** : If any parameter is missing or mispelled.

**Code** : `400`

**Content** : `{"statusCode": 400,"error": "Bad Request","message": "{value}" is required",}`

