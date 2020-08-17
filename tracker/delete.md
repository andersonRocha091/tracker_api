# Delete tracker log
Delete tracker log for the specified id.

**URL** : `/tracker/:id/`

**Parameters** : `id=[number]` where `id` is the ID of the tracker log in the
database.

**Method** : `DELETE`

## Success Response

**Condition** : If the revenue exists.

**Code** : `200`

**Content** : `{message: "Tracker record removed successfully",statusCode: 200};`