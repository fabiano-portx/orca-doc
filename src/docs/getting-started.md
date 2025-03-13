---
layout: layouts/docs.njk
title: Getting Started
---

# Getting Started

Welcome to the PortX ORCA API documentation. This guide will help you get up and running with our Account Management API.

## Overview

The PortX ORCA API provides a comprehensive set of RESTful endpoints for managing banking operations, including:

- **Accounts** - Create and manage bank accounts
- **Parties** - Manage customers (persons and organizations)
- **Transactions** - Process and query transactions
- **Cards** - Issue and manage payment cards
- **Products** - Configure financial products
- **Loans** - Handle loan lifecycle management

## Base URL

All API requests should be made to:

```
https://api.portx.io/orca/v1
```

## Quick Start

### 1. Get Your API Credentials

Contact your PortX representative to obtain:
- Client ID
- Client Secret
- API Key

### 2. Authenticate

The API uses JWT tokens for authentication. First, obtain an access token:

```bash
curl -X POST https://auth.portx.io/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "grant_type": "client_credentials"
  }'
```

### 3. Make Your First Request

Use your access token to fetch accounts:

```bash
curl https://api.portx.io/orca/v1/accounts \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Next Steps

- [Authentication Guide](/docs/authentication/) - Learn more about securing your API calls
- [API Reference](/api/) - Explore all available endpoints
- [Changelog](/docs/changelog/) - See what's new in the latest version

## Need Help?

If you have questions or need support, contact us at [{{ site.contact }}](mailto:{{ site.contact }}).
