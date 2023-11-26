# Like

A `Like` action is an action that represents a user liking/favouriting an object. It is one of the most common type of action.

A `Like` object **MUST** have an `object` field that contains the URI of the object that the user is liking. The object **MUST** be a `Publication` object.

Example:
```json5
{
    "type": "Like",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19"
}
```