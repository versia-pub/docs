# Microblogging

> [!WARNING]
>
> Before Lysand 3.0, microblogging was directly integrated into the core spec. As of Lysand 3.0, microblogging has been moved to an extension, as part of a larger modularization effort. This document describes the new microblogging extension.

The Microblogging extension allows users to perform certain tasks related to microblogging, such as "boosting" (reposting) posts.

## Announce

The `Announce` action signifies a user's intent to broadcast or share an object with their followers. This action is analogous to the "retweet" function on Twitter.


`Announce`s can of course be deleted ("unboosting") with a classic [Undo](../objects/undo) object.

Here's an example of an `Announce` action:

```json5
{
    "id": "3e7e4750-afd4-4d99-a256-02f0710a0520",
    "type": "Extension",
    "extension_type": "org.lysand:microblogging/Announce",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "uri": "https://example.com/actions/3e7e4750-afd4-4d99-a256-02f0710a0520",
    "created_at": "2021-01-01T00:00:00.000Z",
    "object": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19"
}
```

### Fields

#### Author

| Name   | Type   | Required |
| :----- | :----- | :------- |
| author | String | Yes      |

URI of the [Actor](./actors) who initiated the action.

#### Object

| Name   | Type   | Required |
| :----- | :----- | :------- |
| object | String | Yes      |

URI of the object being announced. Must be of type [Note](./note)

#### Implementation

When a [Note](../objects/note) object is announced, the client **SHOULD** display the original note with an indicator that it has been announced. The client **SHOULD** also display the number of times the note has been announced, such as a number next to a small icon like such on [Mastodon](https://joinmastodon.org/):

![Bottom graphics of a Mastodon post, including a "boosting" icon with numbers next to it](/assets/boosting.png)

Furthermore, users should be notified when their notes are announced by other users.


## Types

```typescript
interface Announce extends Extension {
    extension_type: "org.lysand:microblogging/Announce";
    author: string;
    object: string;
}
```

