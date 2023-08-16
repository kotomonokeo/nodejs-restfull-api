# Address API spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

headers :

- Authorization : token

Request Body :

```json
{
  "street": "jalan",
  "city": "kota",
  "province": "provinsi",
  "country": "negara",
  "postal_code": "kode pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan",
    "city": "kota",
    "province": "provinsi",
    "country": "negara",
    "postal_code": "kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "country is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

headers :

- Authorization : token

Request Body :

```json
{
  "street": "jalan",
  "city": "kota",
  "province": "provinsi",
  "country": "negara",
  "postal_code": "kode pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan",
    "city": "kota",
    "province": "provinsi",
    "country": "negara",
    "postal_code": "kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "country is required"
}
```

## Get Address API

Endpoint : GET /api/contacts/contactId/addresses/:addressId

headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan",
    "city": "kota",
    "province": "provinsi",
    "country": "negara",
    "postal_code": "kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

## List Address API

Endpoint : GET /api/contacts/contactId/addresses

headers :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "jalan",
      "city": "kota",
      "province": "provinsi",
      "country": "negara",
      "postal_code": "kode pos"
    },
    {
      "id": 2,
      "street": "jalan",
      "city": "kota",
      "province": "provinsi",
      "country": "negara",
      "postal_code": "kode pos"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

## Remove Address API

Endpoint : Delete /api/contacts/contactId/addresses/:addressId

headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "address is not found"
}
```
