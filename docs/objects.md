# Data Entities

Lysand employs JSON (JavaScript Object Notation) entities for its data structure. This format is designed to be straightforward, facilitating easy implementation and comprehension.

All JSON entities such as [Publications](objects/publications), [Actors](objects/actors), and [Actions](objects/actions) **MUST** include the following attributes:

## Identifier (ID)

The `id` attribute of an Entity is a string that serves as the unique identifier of the entity. It is utilized to distinguish the entity, and **MUST** be unique among all entities on the same server.

While the `id` attribute is not mandated to be unique across the entire network, it is advisable to do so. Servers **MUST** employ UUIDs or a UUID-compatible system for the `id` attribute.

## Creation Timestamp

The `created_at` attribute of an entity is a string that signifies the date and time when the entity was created. It is used to sequence the entities. The data **MUST** adhere to the ISO 8601 format.

Example: `2021-01-01T00:00:00.000Z`

> [!NOTE]
> The `created_at` attribute should reflect the actual date and time of the post, but it is not mandatory. Any ISO 8601 date is permissible in the `created_at` field. Servers have the discretion to process dates they deem invalid, such as future dates.

## Uniform Resource Identifier (URI)

The `uri` attribute of an entity is a string that signifies the URI of the entity. It is used to identify the entity, and **MUST** be unique among all entities. This URI **MUST** be unique across the entire network, and include the `id` of the entity in the URI.

URIs must adhere to the rules defined [here](spec).

## Entity Type

The `type` attribute of an entity is a string that signifies the type of the entity. It is used to determine how the entity should be presented to the user.

The `type` attribute **MUST** be one of the following values:
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

Other values are not permitted in this current version of the protocol.

# Types

This document uses TypeScript to define the types of the entities in a clear and universal manner. TypeScript is a superset of JavaScript that adds static type definitions to the language. The types are defined in the following format:

```typescript
interface Entity {
    id: string;
    created_at: string;
    uri: string;
    type: string;
    extensions?: {
        "org.lysand:custom_emojis"?: {
            emojis: Emoji[];
        };
        [key: string]: object | undefined;
    };
}
```

The `Entity` type is the base type for all entities in the Lysand protocol. It includes the `id`, `created_at`, `uri`, and `type` attributes.

Other entities described in other parts of this documentation will extend the `Entity` type to include additional attributes, such as:
    
```typescript
interface ImaginaryNote extends Entity {
  content: string;
  mentions: string[];
};
```