# Announce

The `Announce` action signifies a user's intent to broadcast or share an object with their followers. This action is analogous to the "retweet" function on Twitter.

Here's an example of an `Announce` action:

```json5
{
    "type": "Announce",
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19"
}
```

## Fields

### Author

| Name   | Type   | Required |
| :----- | :----- | :------- |
| author | String | Yes      |

URI of the [Actor](./actors) who initiated the action.

### Object

| Name   | Type   | Required |
| :----- | :----- | :------- |
| object | String | Yes      |

URI of the object being announced. Must be of type [Note](./note)

## Types

```typescript
interface Announce extends Entity {
    type: "Announce";
    author: string;
    object: string;
}
```