##### 1.6.3.1.7. Undo

An `Undo` action is an action that represents a user undoing an action. It is used to cancel an action or delete an already existing object.

An `Undo` object **MUST** have an `object` field that contains the URI of the object that the user is undoing. The object **MUST** be a `Publication` object.

Servers **MUST** not allow users to undo actions that they did not create.

Servers that receive `Undo` actions **MUST** undo the action that is being undone. For example, if a user likes a post, and then undoes the like, the server **MUST** remove the like from the post. Similarly, if an `Undo` action is received for a `Follow` action, the server **MUST** unfollow the user.

If the `Undo` action has a Publication or other object as the `object` field, the server **MUST** stop showing the object to users. Deleting the original object is recommended, but not required.

An `Undo` action on a `Patch` object **MUST** be treated as cancellation of the `Note` object, not of the patch itself.

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
