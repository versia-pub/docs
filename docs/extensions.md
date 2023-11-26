# Protocol Extensions

Lysand supports protocol extensions, which are extensions to the protocol that are not part of the core protocol. They are meant to be used to extend the protocol with new features. Extensions are namespaced.

Protocol extensions can be added to a object as follows:

```json5
{
    // ...
    "extensions": {
        "com.organization.name:key": "value"
    }
    // ...
}
```

The `extensions` field is an object that contains a list of extensions. Each extension is a key-value pair, where the key is the extension name, and the value is the extension value.

The extension name **MUST** be a string that contains the reverse domain name of the organization that created the extension, followed by a colon, followed by the name of the extension. For example, `com.example:extension_name`.

The extension name **MUST** be unique across the organization namespace (I.E., it should be unique for each organization).

The extension value **MAY** be any valid JSON value. It is up to the servers to decide of they want to implement extensions or not.

For example, a server may implement an extension that allows users to geotag an object. The extension name may be `org.geotagger:geotag`, and the extension value may be a string that contains the geotag.
```json5
{
    // ...
    "extensions": {
        "org.geotagger:geotag": "40.7128° N, 74.0060° W"
    }
    // ...
}
```

Lysand heavily recommends that extensions are documented and standardized, and that servers do not implement extensions that are not documented or standardized by their author.

## Adding New Object Types

Lysand supports adding new object types via extensions. This is useful for adding new types of objects to the protocol, such as polls or events.

Every new object type added **MUST** have `Extension` as its object type, and **MUST** have a `extension_type` field that contains the extension name of the object type.

The extension name of the object type is formatted as follows:

```
com.organization.name:extension/Type
```

For example, if a server wants to add a new object type called `Poll`, the extension name would be `com.example:poll/Poll`.

Custom types **MUST** start with a capital letter, **MUST** be alphanumeric values (with PascalCase used instead of spaces) and **MUST** be unique across all extensions.

Custom types **MUST** be unique in their organization namespace (I.E., it should be unique for each organization).

An example is given in the following object:
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

Lysand has a few official extensions that are part of the core protocol. These extensions are standardized and documented, and servers **SHOULD** implement them if they implement the core protocol (however they are not required to do so).

These include:

- [Custom Emojis](/extensions/custom-emojis)
- [Reactions](/extensions/reactions)
- [Polls](/extensions/polls)
- [Is Cat](/extensions/is-cat)
- [Server Endorsement](/extensions/server-endorsement)
- [Reports](/extensions/reports)