---
layout: layouts/docs.njk
title: HTTP Methods Guide
permalink: /docs/api_when_to_choose_post_put_patch/
---

# Choosing the right HTTP Method: POST, PATCH, or PUT

## Overview

This document provides guidance for selecting the appropriate HTTP method for banking REST APIs that serve as a bridge between frontend applications and core banking processor technologies.

The recommended approach uses a **hybrid methodology** that leverages the strengths of each HTTP method: PATCH for entity management operations and PUT for financial transaction operations. This design provides clear semantics, operational safety, and aligns with both REST principles and banking industry practices.

## POST for Resource Creation

### When to Use POST
Use POST for creating new resources where the server generates identifiers or when the operation is not naturally idempotent.

### Best Practices for POST
- Reserve for resource creation and non-idempotent operations
- Let the server generate unique identifiers when appropriate
- Return created resource information in response
- Use appropriate HTTP status codes (201 for creation, 202 for async operations)

## PUT for Idempotency and Improved Semantics

### When to Use PUT
Use PUT for transactional operations that must be idempotent and represent complete business operations rather than partial resource updates.

### Key Benefits
- **Idempotency**: Critical for financial operations to prevent duplicate transactions
- **Safe Retries**: Network timeouts and retries don't create duplicate operations
- **Regulatory Compliance**: Deterministic transaction processing meets banking requirements
- **Semantic Clarity**: Clear distinction between entity updates and financial operations

### Best Practices for PUT
- Use client-generated transaction identifiers for idempotency
- Ensure operations are truly idempotent - same request yields same result
- Design operations as complete business transactions
- Implement proper validation for all required transaction parameters
- Handle concurrent requests safely with appropriate locking mechanisms

### Good Resource Candidates for adopting PUT
- **Money Movement / Transfers** - Internal transfers, credit transfers, ledger transfers
- **Payments** - Any payment operation
- **Withdrawals** - Account withdrawal operations
- **Deposits** - Account deposit operations

## PATCH for Entity Management

### When to Use PATCH
Use PATCH for modifying existing resource attributes where partial updates are the norm and clients typically update specific fields rather than entire resources.

### Key Benefits
- **Precision**: Updates only the fields that need changing
- **Safety**: Prevents accidental clearing of critical fields
- **Consumer Simplicity**: Applications update specific attributes without managing full resources
- **API Evolution**: New optional fields don't break existing integrations

### Best Practices for PATCH
- Implement [RFC 7396 (JSON Merge Patch)](https://datatracker.ietf.org/doc/html/rfc7396) for consistent null value handling
- Treat omitted fields as "don't change"
- Use explicit null values to clear/remove fields
- Validate that critical fields cannot be inadvertently cleared
- Maintain clear audit trails showing exactly what changed

### Good Resource Candidates for adopting PATCH over PUT
- **Accounts** - General account settings, preferences, metadata, etc.
- **Loans** - Loan terms, status updates, configuration changes  
- **Parties** - Customer information, contact details, preferences
- **Products** - Portifolio and Product configurations, features, settings
- **Addresses** - Contact information updates
- **Documents** - Document metadata, status, categorization, etc.
- *Including sub-resources like `Holds`, `Cards`, `Escrows`, and others*

## General Decision Framework

**Choose POST when:**
- Creating new resources
- Server-generated identifiers are needed
- Operation is naturally non-idempotent

**Choose PUT when:**
- Executing financial transactions
- Idempotency is critical
- Operation represents a complete business action
- Safe retries are essential

**Choose PATCH when:**
- Modifying existing resource attributes
- Partial updates are common
- Frontend applications work with specific fields
- Safety from accidental overwrites is important

---

*For questions or clarifications about this guidance, please reach out to Fabiano.*