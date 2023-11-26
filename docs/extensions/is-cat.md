# Is Cat

> **Note:** This is a **silly** extension that is not meant to be taken very seriously.

With the Is Cat extension, users can tell other users if they are a cat or not. This is akin to Misskey's "IsCat" feature.

An Actor can indicate whether they are a cat or not with the following field:

```json5
{
    "type": "User",
    // ...
    "extensions": {
        "org.lysand:is_cat": {
            "cat": true
        }
    }
}
```

Clients **SHOULD** render some graphic to indicate if a user is a cat or not, such as cat ears on the user's avatar.