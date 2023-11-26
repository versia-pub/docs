# Custom Emojis

Please see [Custom Emojis](/structures/custom-emoji) for more information about the Custom Emojis type. The extension is implemented as such:

```json5
{
    // ...
    "extensions": {
        "org.lysand:custom_emojis": {
            "emojis": [
                {
                    "name": "happy_face",
                    "url": [
                        {
                            "content": "https://cdn.example.com/emojis/happy_face.webp",
                            "content_type": "image/webp"
                        }
                    ]
                },
                // ...
            ]
        }
    }
    // ...
}
```

That is, the extension name is `org.lysand:custom_emojis`, and the extension value is an object that contains a list of emojis.

## Applying Custom Emojis

Clients **MUST** apply custom emojis to the following fields of the following objects:

- `Publication.contents`
- `Publication.subject`
- `Actor.bio`
- `Actor.display_name`

A custom emoji is formatted inside a text string as follows: 
```
:emoji_name:
```

For example, if a user wants to use the `happy_face` emoji, they would type:
```
:happy_face:
```

Clients **MUST** replace the `:emoji_name:` with the appropriate emoji. If the client does not support custom emojis, it **SHOULD** display the `:emoji_name:` as-is.

If the client supports Custom Emojis, but does not support the emoji that the user is trying to use (such as with an incompatible MIME type), it **SHOULD** display the `:emoji_name:` as-is.

When rendered as images, Custom Emojis **SHOULD** have proper alt text for accessibility. The alt text **SHOULD** be the alt text of the emoji, if it has one. If the emoji does not have an alt text, the alt text **SHOULD** be the name of the emoji.

Example in HTML:
```html
Hello, world! <img src="https://cdn.example.com/emojis/happy_face.webp" alt="A happy face emoji." title="A happy face emoji.">
```
