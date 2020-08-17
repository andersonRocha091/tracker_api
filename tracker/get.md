# Show All revenues

Show all revenues already imported into your mongo database in /deals request

**URL** : `/revenues/`

**Method** : `GET`

**Params** : `{skip: if desire skip some record, limit: ammount per page}`

## Success Responses

**Code** : `200 OK`

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

### OR

**Condition** : No itens were imported (not ran yet /deals).

**Code** : `200 OK`

```json
[]

```
