# Objects

Lysand uses JSON (JavaScript Object Notation) objects as its data format. It is meant to be a simple format that is easy to implement and understand.

All JSON objects such as [Publications](/objects/publications), [Actors](/objects/actors), and [Actions](/objects/actions) **MUST** have the following fields:

## ID

The `id` field on an Object is a string that represents the unique identifier of the object. It is used to identify the object, and **MUST** be unique across all objects on the same server.

The `id` field is not required to be unique across the entire network, but it is recommended that it is. Servers **MUST** use UUIDs or a UUID-compatible system for the `id` field.

## Created At

The `created_at` field on an object is a string that represents the date and time that the object was created. It is used to determine the order of objects. The data **MUST** be in ISO 8601 format.

Example: `2021-01-01T00:00:00.000Z`

> **Note:** The `created_at` field should be the date and time that the post was actually made, but it is not required to be. Any ISO 8601 date is allowed in the `created_at` field. It is up to the servers to decide if they want to process dates that they would consider invalid, such as dates in the future.

## URI

The `uri` field on an object is a string that represents the URI of the object. It is used to identify the object, and **MUST** be unique across all objects. This URI **MUST** be unique across the entire network, and contain the `id` of the object in the URI.

URIs must follow the rules defined [here](/spec).

## Type

The `type` field on an object is a string that represents the type of the object. It is used to determine how the object should be displayed to the user.

The `type` field **MUST** be one of the following values:
- `Note`
- `Patch`
- `Actor`
- `Like`
- `Dislike`
- `Follow`
- `FollowAccept`
- `FollowReject`
- `Announce`
- `Undo`
- `ServerMetadata`
- `Extension`

Other values are not allowed in this current iteration of the protocol.