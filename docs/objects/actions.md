# Actions

Actions are the main way that clients interact with the Lysand protocol. They are JSON objects that represent an action that a user wants to perform, such as posting a new object or following a user.

Here is an example action:
```json5
{
    "type": "Like",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19"
}
```

## Type

Currently available types are:
- [`Like`](/objects/like)
- [`Dislike`](/objects/dislike)
- [`Follow`](/objects/follow)
- [`FollowAccept`](/objects/follow-accept)
- [`FollowReject`](/objects/follow-reject)
- [`Announce`](/objects/announce)
- [`Undo`](/objects/undo)

Notably, a `Block` action is not included in the Lysand protocol. This is because Lysand does not have a concept of blocking users. Instead, it is up to the client or server to decide if it wants to display content from a user or not.

This serves to prevent abuse of the protocol to find out if a user has blocked another user, which is a privacy concern.

## Fields

### Author

The `author` field on an Action is a string that represents the URI of the user that created the action. It is used to identify the author of the action.

The `author` field is required on all actions.
