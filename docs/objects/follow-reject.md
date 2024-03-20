# Follow Reject

A FollowReject action signifies a user's decision to decline a follow request from another user. This rejection prevents the requesting user's posts from appearing in the recipient's feed.

Example:
```json5
{
    "type": "FollowReject",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "follower": "https://example.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
}
```

## Fields

### Author

| Name   | Type   | Required |
| :----- | :----- | :------- |
| author | String | Yes      |

URI of the [Actor](./actors) who was being follow requested.

### Follower

| Name   | Type   | Required |
| :----- | :----- | :------- |
| follower | String | Yes      |

URI of the [User](./user) who tried to follow the author.

## Types

```typescript
interface FollowReject extends Entity {
    type: "FollowReject";
    author: string;
    follower: string;
}
```
