# Vanity

The Vanity extension allows users to customize their profile in a more in-depth manner.

Here is an example object:
```json5
{
    // ...
    "type": "User",
    // ...
    "extensions": {
        "org.lysand:vanity": {
            "avatar_overlay": {
                "image/png": {
                    "content": "https://cdn.example.com/ab5081cf-b11f-408f-92c2-7c246f290593/cat_ears.png",
                    "content_type": "image/png"
                }
            },
            "avatar_mask": {
                "image/png": {
                    "content": "https://cdn.example.com/d8c42be1-d0f7-43ef-b4ab-5f614e1beba4/rounded_square.jpeg",
                    "content_type": "image/jpeg"
                }
            },
            "background": {
                "image/png": {
                    "content": "https://cdn.example.com/6492ddcd-311e-4921-9567-41b497762b09/untitled-file-0019822.png",
                    "content_type": "image/png"
                }
            },
            "audio": {
                "audio/mpeg": {
                    "content": "https://cdn.example.com/4da2f0d4-4728-4819-83e4-d614e4c5bebc/michael-jackson-thriller.mp3",
                    "content_type": "audio/mpeg"
                }
            },
            "pronouns": {
                "en-us": [
                    "he/him",
                    {
                        "subject": "they",
                        "object": "them",
                        "dependent_possessive": "their",
                        "independent_possessive": "theirs",
                        "reflexive": "themself"
                    },
                ]
            },
            "birthday": "1998-04-12",
            "location": "+40.6894-074.0447/",
            "activitypub": [
                "@erikuden@mastodon.de"
            ],
            "aliases": [
                "https://burger.social/accounts/349ee237-c672-41c1-aadc-677e185f795a",
                "https://social.lysand.org/users/f565ef02-035d-4974-ba5e-f62a8558331d"
            ]
        }
    }
}
```

The extension name is `org.lysand:vanity`. All properties are optional.

## Fields

### Avatar Overlay

| Name           | Type          | Required |
| :------------- | :------------ | :------- |
| avatar_overlay | ContentFormat | No       |

An overlay to be placed on top of the user's avatar. This can be used to add accessories, such as hats or glasses. Overlay should always be a transparent image.

### Avatar Mask

| Name        | Type          | Required |
| :---------- | :------------ | :------- |
| avatar_mask | ContentFormat | No       |

A mask to be applied to the user's avatar. This can be used to change the shape of the avatar, such as making it a circle or a rounded square. Mask should be a fully black (#000000) image with the shape of the mask being transparent. As such, a rounded square mask should have a fully black square with rounded corners.

### Background

| Name       | Type          | Required |
| :--------- | :------------ | :------- |
| background | ContentFormat | No       |

A background image to be displayed on the user's profile. This should be a full-width high-resolution image, preferably at least 1920x1080 pixels.

Space-efficient formats such as WebP are recommended.

### Audio

| Name  | Type          | Required |
| :---- | :------------ | :------- |
| audio | ContentFormat | No       |

An audio file to be played on the user's profile. This can be used to add a theme song or a voice introduction.

> [!WARNING]
> Audio files should be muted by default and should not autoplay. Users should have the option to play the audio file, or disable them entirely.
>
> Furthermore, audio file support in this extension should be toggleable per server, as it can be a potential vector for abuse.

### Pronouns

| Name     | Type                                 | Required |
| :------- | :----------------------------------- | :------- |
| pronouns | Array of ShortPronoun or LongPronoun | No       |

An array of pronouns the user uses. Pronouns can be represented as a string or an object.

See [Types](#types) for a full description of the `ShortPronoun` and `LongPronoun` types.

### Birthday

| Name     | Type   | Required |
| :------- | :----- | :------- |
| birthday | String | No       |

The user's birthday. This should be in the format `YYYY-MM-DD` (ISO 8601). If the year is set to `0000`, clients should not display the year.

Clients might choose to display the user's age as well when the year is present.

### Location

| Name     | Type   | Required |
| :------- | :----- | :------- |
| location | String | No       |

The user's location. This should be a string of GPS data as defined in [ISO 6709 Annex H](https://en.wikipedia.org/wiki/ISO_6709#String_expression_(Annex_H)), or alternatively a raw string such as "New York, NY". GPS data does not need to be precise, and can be as simple as `+46+002/` (France) or `+48.52+002.20/` (Paris, France).

Clients might choose to display a map of the user's location.

### ActivityPub

| Name       | Type   | Required |
| :--------- | :----- | :------- |
| activitypub | Array of String | No       |

The user's ActivityPub profile. This should be an array of strings in the format `@username@domain`.

Servers are expected to use standard WebFinger resolution to fetch the user's ActivityPub profile if needed.

### Aliases

| Name    | Type   | Required |
| :------ | :----- | :------- |
| aliases | Array of String | No       |

Aliases to the user's profile on other Lysand-compatible servers. This should be an array of URIs resolving to the user's Lysand object.

## Types

```typescript
interface VanityExtension {
    avatar_overlay?: ContentFormat;
    avatar_mask?: ContentFormat;
    background?: ContentFormat;
    audio?: ContentFormat;
    pronouns?: {
        [language: string]: (ShortPronoun | LongPronoun)[];
    };
    birthday?: string;
    location?: string;
    activitypub?: string[];
    aliases?: string[];
}
```

```typescript
type ShortPronoun = string;
```

```typescript
interface LongPronoun {
    subject: string;
    object: string;
    dependent_possessive: string;
    independent_possessive: string;
    reflexive: string;
}
```