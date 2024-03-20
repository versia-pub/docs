# IsCat

>  [!NOTE]
> This is a **light-hearted** extension designed for amusement and not intended for serious application.

> [!WARNING]
> This extension may be superseded by the upcoming [Vanity Profiles](./vanity) extension.

The IsCat feature allows users to communicate their cat status to others, similar to Misskey's "IsCat" feature.

A user, referred to as an Actor, can specify their feline status using the following field:

```json5
{
    "type": "User",
    // ...
    "extensions": {
        "org.lysand:is_cat": {
            "cat": true,
            // Potential additional fields
            // "dog": true
        }
    }
}
```

Clients **SHOULD** display an appropriate graphic to signify a user's cat status, such as adding cat ears to the user's avatar.