---
layout: layouts/docs.njk
title: Authentication
permalink: /docs/authentication/
---

# Authentication

The PortX ORCA API uses industry-standard authentication mechanisms to secure access to your data.

## Authentication Methods

### JWT Bearer Tokens

The primary authentication method is JWT (JSON Web Token) bearer tokens obtained via OAuth 2.0.

#### Obtaining a Token

Request an access token from the authorization server:

```bash
POST https://auth.portx.io/oauth/token
Content-Type: application/json

{
  "client_id": "your_client_id",
  "client_secret": "your_client_secret",
  "grant_type": "client_credentials",
  "scope": "accounts:read accounts:write"
}
```

#### Response

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "accounts:read accounts:write"
}
```

### Using the Token

Include the access token in the `Authorization` header:

```bash
curl https://api.portx.io/orca/v1/accounts \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Scopes

Access is controlled through OAuth scopes. Request only the scopes your application needs:

| Scope | Description |
|-------|-------------|
| `accounts:read` | Read account information |
| `accounts:write` | Create and modify accounts |
| `transactions:read` | View transaction history |
| `transactions:write` | Create transactions |
| `parties:read` | Read party (customer) data |
| `parties:write` | Create and modify parties |
| `cards:read` | View card information |
| `cards:write` | Issue and manage cards |

## Token Expiration

Access tokens expire after **1 hour** (3600 seconds). Implement token refresh logic in your application:

1. Store the token expiration time
2. Request a new token before the current one expires
3. Handle `401 Unauthorized` responses by refreshing the token

## Security Best Practices

1. **Never expose credentials** - Keep client secrets server-side
2. **Use HTTPS** - All API calls must use TLS
3. **Rotate secrets** - Periodically rotate your client credentials
4. **Minimal scopes** - Request only necessary permissions
5. **Token storage** - Store tokens securely, never in client-side code

## OpenID Connect

For user-facing applications, we support OpenID Connect for delegated authentication. Contact support for OIDC configuration details.

## Error Responses

Authentication failures return standard HTTP status codes:

| Status | Description |
|--------|-------------|
| `401 Unauthorized` | Invalid or expired token |
| `403 Forbidden` | Valid token but insufficient permissions |

Example error response:

```json
{
  "error": "unauthorized",
  "error_description": "The access token is invalid or has expired"
}
```
