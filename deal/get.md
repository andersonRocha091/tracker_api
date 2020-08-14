# Transfer deals from pipedrive to bling

Get the deals from your pipedrive account, transfers it to your bling account,
and also saves it at your mongo's database the revenues.

**URL** : `/deals/`

**Method** : `POST`

**Params**:{
    start: `initial page from pipedrive`,
    limit: `amount of itens wanted per page`,
    status: `deals status wanted to be searched - default: won`
}

## Success Response

**Code** : `200 OK`

**Content examples**

For an start=0, limit=10, status=won, you should get an list of itens as
it was saved at your mongo database:

```json
[
  {
    "insertedAt": "2020-08-11T00:44:17.613Z",
    "_id": "5f31ea1e88a95634ffec332a",
    "pipedriveId": 1,
    "description": "deal",
    "blingId": "9093661244",
    "value": 500,
    "year": "2020",
    "month": "8",
    "day": "10",
    "__v": 0
  },
  {
    "insertedAt": "2020-08-11T00:44:17.613Z",
    "_id": "5f31ea1e88a95634ffec332b",
    "pipedriveId": 2,
    "description": "deal",
    "blingId": "9093661249",
    "value": 200,
    "year": "2020",
    "month": "8",
    "day": "10",
    "__v": 0
  }
]
```

## Notes

* If you don't have any deal with status won, or all pipedrive deals with the selected
status were already imported you will got an object like:
```json
{
  "message": "Sorry! but there were not deals with status: \"{status}\" anymore",
  "results": []
}
```

