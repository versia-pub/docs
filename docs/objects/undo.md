# Undo

An `Undo` object signifies the reversal of a previously executed action by a user. It is primarily used to revoke an action or remove an existing object.

An `Undo` object **MUST** contain an `object` field that holds the URI of the object being reversed.

Servers **MUST NOT** permit users to reverse actions that they did not initiate.

Upon receiving `Undo` actions, servers **MUST** reverse the action being undone. For instance, if a user expresses liking a post and subsequently undoes the like action, the server **MUST** eliminate the like from the post. Similarly, if an `Undo` action is received for a `Follow` action, the server **MUST** cease following the user.

If the `Undo` action has a Publication or another object as the `object` field, the server **MUST** discontinue displaying the object to users. It is recommended, but not mandatory, to delete the original object.

An `Undo` action on a `Patch` object **MUST** be interpreted as the cancellation of the `Note` object, not the patch itself.

Example:
```json5
{
    "type": "Undo",
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

URI of the object being undone. The object **MUST** be an [Action](./actions) or a [Note](./note). To undo [Patch](./patch) objects, use a subsequent [Patch](./patch) or delete the original [Note](./note).

## Types

```typescript
interface Undo extends Entity {
    type: "Undo";
    author: string;
    object: string;
}
```