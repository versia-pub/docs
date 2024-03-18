# Introduction

The Lysand Protocol is designed as a communication medium for federated applications, leveraging the HTTP stack. Its simplicity ensures ease of implementation and comprehension.

Distinct from ActivityPub, Lysand incorporates an extensive range of built-in features tailored for social media applications. It prioritizes security and privacy by default.

Lysand aims for standardization, discouraging vendor-specific implementations, as seen in Mastodon's adaptation of ActivityPub. It relies on straightforward JSON objects and HTTP requests, eliminating the need for complex serialization formats.

This repository provides TypeScript types for every object in the protocol, facilitating easy adaptation to other languages.

# Design Goals

While Lysand draws parallels with popular protocols like ActivityPub and ActivityStreams, it is not compatible with either. It also does not support ActivityPub's JSON-LD serialization format.

Lysand-compatible servers may choose to implement other protocols, such as ActivityPub, but it is not a requirement.

# Implementation Requirements

All HTTP request and response bodies **MUST** be encoded as UTF-8 JSON, with the `Content-Type` header set to `application/json; charset=utf-8`. If the server supports cryptography, a `Signature` header as defined in [/signatures](the signatures spec) **MUST** also be present.

Servers **MUST** use UUIDs or a UUID-compatible system for the `id` field. Any valid UUID is acceptable, but it **should** be unique across the entire known network if possible. However, uniqueness across the server is the only requirement.

> [!NOTE]
> Protocol implementers may prefer [UUIDv7](https://www.ietf.org/archive/id/draft-peabody-dispatch-new-uuid-format-04.html#name-uuid-version-7) over the popular UUIDv4 for their internal databases, as UUIDv7 is lexicographically sortable by time generated. A PostgreSQL extension is available [here](https://github.com/fboulnois/pg_uuidv7).

All URIs **MUST** be absolute and HTTPS, except for development purposes. They **MUST** be unique across the entire network and **MUST** contain the `id` of the object in the URI. They **should not** contain mutable data, such as the actor's `username`.

All URIs **MUST** be normalized and **MUST NOT** contain any query parameters. URI normalization is defined in [RFC 3986 Section 6](https://datatracker.ietf.org/doc/html/rfc3986#section-6). Servers **MUST** reject any requests with non-normalized URIs.

# Definitions

The words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** are used in this document as defined in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

- **Actor**: An individual or entity utilizing the Lysand protocol, analogous to ActivityPub's `Actor` objects. An actor could be a [Server Actor](federation/server-actor), representing a server, or a [User Actor](objects/actors).
- **Server**: A server that deploys the Lysand protocol, referred to as an **implementation**. Servers are also known as **instances**.

# Universal Guidelines

While some servers may choose to relax these rules for incoming content, provided it doesn't induce errors or edge cases, these guidelines are crucial for outgoing content.

## JSON Object Handling

All JSON objects disseminated during federation **MUST** be handled as follows:
- The object's keys **MUST** be arranged in lexicographical order.
- The object **MUST** be serialized using the [Canonical JSON](https://datatracker.ietf.org/doc/html/rfc8785) format.
- The object **MUST** be encoded using UTF-8.
- The object **MUST** be signed using either the [Server Actor](federation/server-actor) or the [Actor](objects/actors) object's private key, depending on the context. (Signatures and keys are governed by the rules outlined in the [Keys](cryptography/keys) and [Signing](cryptography/signing) spec). Signatures are encoded using request/response headers, not within the JSON object itself.

## Requests and Responses

All HTTP requests **MUST** be transmitted over HTTPS. Servers **MUST NOT** accept HTTP requests, unless for development purposes (e.g., if a server is operating on localhost or another local network).

Servers should support HTTP/2 and HTTP/3 for enhanced performance and security. Servers **MUST** support HTTP/1.1 at a minimum.

### Requests

All requests **MUST** include at least the following headers:
- `Accept: application/json`
- `Content-Type: application/json; charset=utf-8` if the request contains a body
- `Signature` if the request body is signed (which is typically the case)

Additionally, requests **SHOULD** include the following headers (though not mandated by the protocol):
- `User-Agent` with a value that identifies the client software

### Responses

All responses **MUST** include at least the following headers:
- `Content-Type: application/json; charset=utf-8` if the response contains a body
- `Signature` if the response body is signed (which is typically the case)
- `Cache-Control: no-store` on entities that can be edited directly without using a [Patch](objects/patch), such as [Actors](objects/actors)
- A cache header with a `max-age` of at least 5 minutes for entities that are not expected to change frequently, such as [Notes](objects/publications)
- A cache header with a large `max-age` for media files when served by a CDN or other caching service under the server's control