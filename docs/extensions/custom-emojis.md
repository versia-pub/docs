# Custom Emojis

For detailed information about the Custom Emoji type, refer to [Custom Emojis](../structures/custom-emoji). The implementation of the extension is as follows:

```json5
{
    // ...
    "extensions": {
        "org.lysand:custom_emojis": {
            "emojis": [
                {
                    "name": "happy_face",
                    "url": {
                        "image/png": {
                            "content": "https://cdn.example.com/emojis/happy_face.png",
                            "content_type": "image/png"
                        }
                    }
                },
                // ...
            ]
        }
    }
    // ...
}
```

In this context, the extension name is `org.lysand:custom_emojis`, and the extension value is an object that includes an array of emojis.

## Utilizing Custom Emojis

Clients are **required** to implement custom emojis in any text field where their presence is plausible. This includes, but is not limited to, status text, display names, alt text, and bio fields. However, this does not extend to an [Actor](../objects/actors)'s username, for instance.

A custom emoji is represented within a text string as follows: 
```
:emoji_name:
```

For instance, to use the `happy_face` emoji, a user would type:
```
:happy_face:
```

Clients are **required** to substitute the `:emoji_name:` with the corresponding inline emoji. If the client does not support custom emojis, it **should** display the `:emoji_name:` as it is.

If the client supports Custom Emojis, but does not support a specific emoji that the user is attempting to use (such as with an incompatible MIME type), it **should** display the `:emoji_name:` as it is.

When rendered as images, Custom Emojis **should** have appropriate alt text for accessibility. The alt text **should** be the alt text of the emoji, if it exists. If the emoji does not have an alt text, the alt text **should** be the name of the emoji.

### Styling Custom Emojis

If the styling system, such as CSS, supports it, clients **should** style the emoji to match the height of the text but allow it to take as much width as necessary, instead of treating it as a square and potentially distorting the image.

Example in HTML:
```html
Hello, world! <img src="https://cdn.example.com/emojis/happy_face.webp" alt="A happy face emoji." title="A happy face emoji." style="display: inline; height: 1em;">
```