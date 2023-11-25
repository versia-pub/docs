# Introduction

The Lysand Protocol is meant to be a protocol for federated applications to communicate with each other using the HTTP stack. It is meant to be a simple protocol that is easy to implement and understand.

Unlike ActivityPub, Lysand includes many more out of the box features designed for social media applications. It is also designed to be more secure and private by default.

Lysand tries to be as standardized and possible and discourage use of vendor-specific implementations, such as what Mastodon has done with ActivityPub. It is based on simple JSON objects and HTTP requests, with no need for complex serialization formats.

TypeScript types are provided in this repository for every object in the protocol, which can be easily adapted to other languages.

# Design Goals

Lysand tries to have similar concepts to already existing popular protocols, such as ActivityPub and ActivityStreams. However, it is not compatible with either of them. It is also not compatible with ActivityPub's JSON-LD serialization format.

Lysand-compatible servers may implement other protocols as well, such as ActivityPub, but they are not required to do so.

# Required Across Implementations

All HTTP request bodies and response bodies **MUST** be encoded as UTF-8 JSON, with the `Content-Type` header set to `application/json; charset=utf-8`. If cryptography is supported by the server, there **MUST** also be a `Signature` header as defined in [/signatures](the signatures spec).

Servers **MUST** use UUIDs or a UUID-compatible system for the `id` field. Any kind of UUID is allowed, as long as it is a valid UUID. It **should** be unique across the entire known network if possible, but this is not needed as long as the server can guarantee that the `id` is unique across the server.

> **Note**: Implementers of the protocol may prefer to use [UUIDv7](https://www.ietf.org/archive/id/draft-peabody-dispatch-new-uuid-format-04.html#name-uuid-version-7) instead of the popular UUIDv4 in their internal databases, as UUIDv7 is lexicographically sortable by time generated. A PostgreSQL extension available [here](https://github.com/fboulnois/pg_uuidv7).

All URIs **MUST** be absolute URIs, and **MUST** be HTTPS URIs, except for development purposes. They **MUST** be unique across the entire network, and **MUST** contain the `id` of the object in the URI. They **should not** contain data that can be changed, such as the actor's `username`.

All URIs **MUST** be normalized, and **MUST NOT** contain any query parameters