# Delete User's Account

Delete the revenue for the specified id.

**URL** : `/revenues/:id/`

**URL Parameters** : `id=[string]` where `id` is the ID of the revenue in the
database.

**Method** : `DELETE`

## Success Response

**Condition** : If the revenue exists.

**Code** : `200`

**Content** : `{"message": "Revenue removed successfully"}`

## Error Responses

**Condition** : Revenue not found into the database.

**Code** : `412 `

**Content** : `{"statusCode": 412,"error": "Precondition Failed","message": "Id Not Found"}`
