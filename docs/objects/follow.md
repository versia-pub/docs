# Follow

A `Follow` action is an action that represents a user following another user. By following another user, the user will be able to see the other user's posts in their feed.

A `Follow` object **MUST** have an `followee` field that contains the URI of the user that the user is following.

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
