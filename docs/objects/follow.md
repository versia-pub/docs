# Follow

A Follow action embodies a user's intent to follow another user. Upon successful execution of this action, the follower will start receiving the followed user's posts in their feed. This action facilitates the creation of a personalized content stream for each user.

Example:
```json5
{
    "type": "Follow",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "followee": "https://example.com/users/02e1e3b2-cb1f-4e4a-b82e-98866bee5de7"
}
```

## Fields

### Author

| Name   | Type   | Required |
| :----- | :----- | :------- |
| author | String | Yes      |

URI of the [Actor](./actors) who initiated the action.

### Followee

| Name     | Type   | Required |
| :------- | :----- | :------- |
| followee | String | Yes      |

URI of the [User](./user) who is being follow requested.

## Types

```typescript
interface Follow extends Action {
    type: "Follow";
    followee: string;
}
```
