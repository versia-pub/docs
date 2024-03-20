# Protocol Extensions

Lysand accommodates protocol extensions, which are enhancements to the protocol that are not part of the core protocol. These extensions are designed to augment the protocol with additional features and are namespaced.

Protocol extensions can be incorporated into an object as follows:

```json5
{
    // ...
    "extensions": {
        "com.organization.name:key": "value"
    }
    // ...
}
```

The `extensions` field is an object that comprises a list of extensions. Each extension is a key-value pair, where the key represents the extension name, and the value signifies the extension value.

The extension name **MUST** be a string that includes the reverse domain name of the organization that devised the extension, followed by a colon, and then the name of the extension. For instance, `com.example:extension_name`.

The extension name **MUST** be unique within the organization namespace (i.e., it should be unique for each organization).

The extension value **MAY** be any valid JSON value. The decision to implement extensions is at the discretion of the servers.

For instance, a server might implement an extension that enables users to geotag an object. The extension name could be `org.geotagger:geotag`, and the extension value might be a string that contains the geotag.
```json5
{
    // ...
    "extensions": {
        "org.geotagger:geotag": "40.7128° N, 74.0060° W"
    }
    // ...
}
```

Lysand strongly advocates that extensions are documented and standardized, and that servers refrain from implementing extensions that are not documented or standardized by their author. Moreover, official extensions of the Lysand protocol should take precedence over custom extensions. (Third-party extensions may be incorporated into the official spec if necessary).

## Adding New Object Types

Lysand supports the addition of new object types via extensions. This is beneficial for introducing new types of objects to the protocol, such as polls or events.

Every new object type added **MUST** have `Extension` as its object type, and **MUST** have an `extension_type` field that contains the extension name of the object type.

The extension name of the object type is formatted as follows:

```
com.organization.name:extension/Type
```

For instance, if a server wishes to add a new object type named `Poll`, the extension name would be `com.example:poll/Poll`.

Custom types **MUST** commence with a capital letter, **MUST** be alphanumeric values (with PascalCase used instead of spaces) and **MUST** be unique across all extensions.

Custom types **MUST** be unique within their organization namespace (i.e., it should be unique for each organization).

An example is provided in the following object:
```json5
{
    "type": "Extension",
    "extension_type": "com.example:poll/Poll",
    "id": "6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "uri": "https://example.com/actions/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "created_at": "2021-01-01T00:00:00.000Z",
    "question": "What is your favourite colour?",
    "options": [
        "Red",
        "Blue",
        "Green"
    ]
}
```

## Official Protocol Extensions

Lysand has a selection of official extensions that are part of the core protocol. These extensions are standardized and documented, and servers **SHOULD** implement them if they implement the core protocol (however, they are not obligated to do so).

These include:

- [Custom Emojis](/extensions/custom-emojis)
- [Reactions](/extensions/reactions)
- [Polls](/extensions/polls)
- [Is Cat](/extensions/is-cat)
- [Server Endorsement](/extensions/server-endorsement)
- [Reports](/extensions/reports)

## Types

```typescript
// Specific extension types will extend from this
interface Extension extends Entity {
    type: "Extension";
    extension_type: string;
}
```