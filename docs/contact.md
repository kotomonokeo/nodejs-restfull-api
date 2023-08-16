# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "first_name": "koto",
  "last_name": "mono",
  "email": "koto@mono.com",
  "phone": "123456798"
}
```

Response Body Success

```json
{
  "data": {
    "id": 1,
    "first_name": "koto",
    "last_name": "mono",
    "email": "koto@mono.com",
    "phone": "123456798"
  }
}
```

Response Body Error

```json
{
  "errors": "email is not valid"
}
```

## Update Contact API

Endpoint : PUT /api/contacts

Headers :

- Authorization : token

Request Body

```json
{
  "first_name": "koto",
  "last_name": "mono",
  "email": "koto@mono.com",
  "phone": "123456798"
}
```

Response Body Success

```json
{
  "data": {
    "first_name": "koto",
    "last_name": "mono",
    "email": "koto@mono.com",
    "phone": "123456798"
  }
}
```

Response Body Error

```json
{
  "Error": "email is not valid"
}
```

## Get Contact API

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Response Body Success

```json
{
  "data": {
    "id": 1,
    "first_name": "koto",
    "last_name": "mono",
    "email": "koto@mono.com",
    "phone": "123456798"
  }
}
```

Response Body Error

```json
{
  "Error": "contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query Params :

- nama : search by first name or last name, using LIKE, optional
- email : search by email, using LIKE, optional
- phone : search by phone, using LIKE, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "koto",
      "last_name": "mono",
      "email": "koto@mono.com",
      "phone": "123456798"
    },
    {
      "id": 2,
      "first_name": "bejo",
      "last_name": "slamet",
      "email": "koto@mono.com",
      "phone": "123456798"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30,
  }
}
```

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers :

- Authorization : token

Response Body Success

```json
{
  "data": "OK"
}
```

Response Body Error

```json
{
  "errors": "contact is not found"
}
```
