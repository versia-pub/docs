# Actors

Actors are the primary users of the Lysand protocol. They are JSON objects that symbolize a user, akin to ActivityPub's `Actor` objects.

Actors encompass two distinct object types currently, namely [Users](./user) and [Server Actors](../federation/server-actor).

Here is a sample Actor:

```json5
{
    "type": "User",
    "id": "02e1e3b2-cb1f-4e4a-b82e-98866bee5de7",
    "uri": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7",
    "created_at": "2021-01-01T00:00:00.000Z",
    "display_name": "Gordon Ramsay",
    "username": "gordonramsay",
    "avatar": {
        "image/png": {
            "content": "https://cdn.test.com/avatars/ab5081cf-b11f-408f-92c2-7c246f290593.png",
        },
    },
    "header": {
        "image/png": {
            "content": "https://cdn.test.com/banners/ab5081cf-b11f-408f-92c2-7c246f290593.png",
        },
    },
    "indexable": true,
    "public_key": {
        "public_key": "...",
        "actor": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
    },
    "bio": {
        "text/plain": {
            "content": "Hello!",
        },
    },
    "fields": [],
    "featured": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/featured",
    "followers": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/followers",
    "following": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/following",
    "likes": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/likes",
    "dislikes": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/dislikes",
    "inbox": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/inbox",
    "outbox": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/outbox",
}
```

For detailed information on their structure, please refer to the respective documentation for [User](./user) and [Server Actor](../federation/server-actor).