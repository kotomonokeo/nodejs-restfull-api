# User API Spec

## Register User API

Endpoint : POST /api/users/

Request Body :
b 
```json
{
  "username": "admin",
  "password": "password",
  "name": "name"
}
```

Response Body Success

```json
{
  "data": {
    "username": "admin",
    "name": "name"
  }
}
```

Response Body Error

```json
{
  "Error": "message error"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body

```json
{
  "username": "username",
  "password": "password"
}
```

Response Body Success

```json
{
  "data": {
    "token": "unique-token",
  }
}
```

Response Body Error

```json
{
  "Error": "username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers : 
- Authorization : token

Request Body

```json
{
  "name": "password", //optional
  "username": "username" //optional
}
```

Response Body Success

```json
{
  "data": {
    "username": "username",
    "name": "password",
  }
}
```

Response Body Error

```json
{
  "Error": "name length max 100"
}
```

## Get User API

Endpoint : GET /api/users

Headers : 
- Authorization : token

Response Body Success

```json
{
  "data": {
    "username": "username",
    "name": "name",
  }
}
```

Response Body Error

```json
{
  "Error": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

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
  "Error": "Unauthorized"
}
```
