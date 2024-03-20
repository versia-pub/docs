# User Interactions

User interactions in the Lysand protocol are primarily facilitated through Actions. These are JSON objects that encapsulate a user's intended operation, such as favouriting an object or initiating a follow request to another user.

Actions are a broad category encompassing various types of objects, rather than being a specific object type.

Here's an example of an Action:

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

## Action Types

The currently supported action types include:
- [`Like`](./like)
- [`Dislike`](./dislike)
- [`Follow`](./follow)
- [`FollowAccept`](./follow-accept)
- [`FollowReject`](./follow-reject)
- [`Announce`](./announce)
- [`Undo`](./undo)

Notably, the Lysand protocol does not include a `Block` action. This is because Lysand does not inherently support the concept of blocking users. Instead, the decision to display or hide content from a particular user should be done server-side.

This approach helps prevent potential misuse of the protocol to determine if a user has been blocked by another, thereby addressing a significant privacy concern.

## Fielkds

### Author

| Name   | Type   | Required |
| :----- | :----- | :------- |
| author | String | Yes      |

URI of the [Actor](./actors) who initiated the action.