# Update an tracker log

Update an tacker log at your database.

**URL** : `/tracker/:id/`

**Method** : `PATCH`


**Params**

```json
{
    "id": 10,
}
```

**Data example** Partial data is allowed

```json
{
    "speed": 120,
}
```

## Success Responses

**Condition** : Update can be performed either fully or partially by the Owner
of the Account.

**Code** : `200 OK`

**Content example** :

```json
{
    "message": "Track record updated successfully",
    "statusCode": 200,
};
```

## Error Responses

**Condition** : If any parameter is missing or mispelled, or the content is none.

**Code** : `400`

**Content** : `{"statusCode": 400,"error": "Bad Request","message": "{value}" is required",}`
