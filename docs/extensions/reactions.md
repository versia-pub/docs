# Emoji Reactions

The Emoji Reactions extension allows users to express their responses to objects using emojis, similar to the functionality provided by platforms like Facebook and Discord.

Here's an example of a reaction to a post using this extension:

```json5
{
    "type": "Extension",
    "extension_type": "org.lysand:reactions/Reaction",
    "id": "6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "uri": "https://example.com/actions/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19",
    "content": "😀",
}
```
## Fields

### Type

The `type` field **MUST BE** `Extension`.

The `extension_type` field **MUST** be `org.lysand:reactions/Reaction`.

### Object

| Name   | Type   | Required |
| :----- | :----- | :------- |
| object | String | Yes      |

URI of the object that the user is reacting to. This **MUST** be a [Note](../objects/note) object.

### Content

| Name    | Type   | Required |
| :------ | :----- | :------- |
| content | String | Yes      |

Emoji that the user is reacting with.

Clients **SHOULD** check if the value of `content` is an emoji: if it is not an emoji and instead is text, depending on which other extensions are implemented, it **MAY** be a [Custom Emoji](./custom-emojis).

> [!NOTE]
> If this field is not recognized as an emoji or [Custom Emoji](./custom-emojis), the whole Reaction object can be discarded as it is invalid.
> 
> Please see [Reactions With Custom Emojis](#reactions-with-custom-emojis) for more information about custom emoji reactions.


### Retrieving Reactions

Clients can retrieve reactions to an object by sending a `GET` request to the reaction [Collection](../structures/collection)'s URI.

The URI of the reaction [Collection](../structures/collection) **MUST** be specified as follows, inside a [Note](../objects/note):
```json5
{
    // ...
    "extensions": {
        "org.lysand:reactions": {
            "reactions": "https://example.com/notes/f08a124e-fe90-439e-8be4-15a428a72a19/reactions"
        }
    }
}
```

The `reactions` field is the URI of the reaction `Collection`.

The server **MUST** respond with a [Collection](../structures/collection) object that contains a list of `Reaction` objects, as such:

```json5
{
    "type": "Collection",
    "first": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19/reactions?page=1",
    "last": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19/reactions?page=1",
    "totalCount": 1,
    // "author": ... (for signatures)
    "items": [
        {
            "type": "Extension",
            "extension_type": "org.lysand:reactions/Reaction",
            "id": "6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
            "uri": "https://example.com/actions/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
            "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
            "created_at": "2021-01-01T00:00:00.000Z",
            "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19",
            "content": "😀",
        }
    ]
}
```

### Public Reaction Federation

If a user reacts to a [Note](../objects/note), the user's server **MUST** federate the reaction to all its followers. This is to ensure that all users see the reaction.

Note, however, that this does not mean that the reaction will be displayed to users. If the [Note](../objects/note), that was reacted to is not visible to a user, the reaction **MUST NOT** be displayed to the user, even if the user follows the user that reacted to the [Note](../objects/note),.

### Private Reaction Federation

If a user reacts to a [Note](../objects/note),, the user's server **MUST** federate the reaction to the author of the [Note](../objects/note),. This is to ensure that the author of the [Note](../objects/note), sees the reaction.

### Reactions With Custom Emojis

If you implement both the Reactions and the Custom Emojis extensions, you can use the Custom Emojis extension to react with custom emojis.

The Reaction object needs to be modified as such:

```json5
{
    "type": "Extension",
    "extension_type": "org.lysand:reactions/Reaction",
    "id": "6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "uri": "https://example.com/actions/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19",
    "content": ":happy_face:",
    "extensions": {
        "org.lysand:custom_emojis": {
            "emojis": [
                {
                    "name": "happy_face",
                    "url": {
                        "image/webp": {
                            "content": "https://cdn.example.com/emojis/happy_face.webp",
                        }
                    }
                },
                // ...
            ]
        }
    }
}
```

The only addition to the Reaction object is the `extensions` field, which contains the [Custom Emojis](./custom-emojis) extension.

When rendering the Reaction object, clients **MUST** replace the `:emoji_name:` with the appropriate emoji. If the client does not support custom emojis, it **MUST** display the `:emoji_name:` as-is.

This emoji must be rendered according to the rules of the [Custom Emojis](./custom-emojis) extension.

## Types

```typescript
interface Reaction extends Extension {
    extension_type: "org.lysand:reactions/Reaction";
    object: string;
    content: string;
}
```