### 1.6.2. Actors

Actors are the main users of the Lysand protocol. They are JSON objects that represent a user. They are similar to ActivityPub's `Actor` objects.

Actors **MUST** be referred to by their `id` internally and across the protocol. The `username` property MUST be treated as a changeable display name, and **MUST NOT** be used to identify the actor.

Here is an example actor:
```json5
{
    "type": "User",
    "id": "02e1e3b2-cb1f-4e4a-b82e-98866bee5de7",
    "uri": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7",
    "created_at": "2021-01-01T00:00:00.000Z",
    "display_name": "Gordon Ramsay",
    "username": "gordonramsay",
    "avatar": [
        {
            "content": "https://cdn.test.com/avatars/ab5081cf-b11f-408f-92c2-7c246f290593.png",
            "content_type": "image/png"
        },
        {
            "content": "https://cdn.test.com/avatars/ab5081cf-b11f-408f-92c2-7c246f290593.webp",
            "content_type": "image/webp"
        }
    ],
    "header": [
        {
            "content": "https://cdn.test.com/banners/ab5081cf-b11f-408f-92c2-7c246f290593.png",
            "content_type": "image/png"
        },
        {
            "content": "https://cdn.test.com/banners/ab5081cf-b11f-408f-92c2-7c246f290593.webp",
            "content_type": "image/webp"
        }
    ],
    "indexable": true,
    "public_key": {
        "public_key": "...",
        "actor": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
    },
    "bio": [
        {
            "content": "My name is Gordon Ramsay, I'm a silly quirky little pony that LOVES to roleplay in the bedroom!",
            "content_type": "text/plain"
        },
        {
            "content": "My name is <b>Gordon Ramsay</b>, I'm a silly quirky little pony that <i>LOVES</i> to roleplay in the bedroom!",
            "content_type": "text/html"
        }
    ],
    "fields": [
        {
            "key": [
                {
                    "content": "Where I live",
                    "content_type": "text/plain"
                }
            ],
            "value": [
                {
                    "content": "Portland, Oregon",
                    "content_type": "text/plain"
                }
            ],
        }
    ],
    "featured": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/featured",
    "followers": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/followers",
    "following": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/following",
    "likes": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/likes",
    "dislikes": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/dislikes",
    "inbox": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/inbox",
    "outbox": "https://test.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7/outbox",
}
```

As there is only one type of `Actor`, the `User`, please see [`User`](/objects/user) for more information.