# Update Account

Update an revenue at your mongo database.

**URL** : `/revenues/:id/`

**Method** : `PATCH`


**Params**

```json
{
    "_id": "mongo document id",
}
```

**Data example** Partial data is allowed

```json
{
    "description": "my item description new",
}
```

## Success Responses

**Condition** : Update can be performed either fully or partially by the Owner
of the Account.

**Code** : `200 OK`

**Content example** : For the example above, when the 'description' is updated and
posted to `/revenues/5f31ea1e88a95634ffec332a/`...

```json
{
    "insertedAt": "2020-08-10T00:44:17.613Z",
    "_id": "5f31ea1e88a95634ffec332a",
    "pipedriveId": 3,
    "description": "my item description new",
    "blingId": "",
    "value":200.54,
    "year": "2020",
    "month": "8",
    "day": "10",
    "__v": 0
  }
```

## Error Responses

**Condition** : If any parameter is missing or mispelled, or the content is none.

**Code** : `400`

**Content** : `{"statusCode": 400,"error": "Bad Request","message": "{value}" is required",}`

## OR
**Condition** : If body not passed as json.

**Code** : `415 unsuported media type`
