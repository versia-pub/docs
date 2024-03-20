# Polls

The Polls extension enables users to generate polls/surveys, a valuable tool for soliciting feedback or opinions from users, such as "What is your preferred color?".

Polls are incorporated as a new field under the [Note](../objects/note) Extensions, named `polls`. This field is an object that encapsulates the poll details.

```json5
{
    "id": "f08a124e-fe90-439e-8be4-15a428a72a19",
    "type": "Note",
    // ...
    "extensions": {
        "org.lysand:polls": {
            "poll": {
                "options": [
                    {
                        "text/plain": {
                            "content": "Red"
                        }
                    },
                    {
                        "text/plain": {
                            "content": "Blue"
                        }
                    },
                    {
                        "text/plain": {
                            "content": "Green"
                        }
                    }
                ],
                "votes": [
                    9,
                    5,
                    0
                ],
                "multiple_choice": false,
                "expires_at": "2021-01-04T00:00:00.000Z"
            }
        }
    }
    // ...
}
```

The fields are explained below.

> [!NOTE]
> There is no `question` field, as it is presumed that the question will be included in the `contents` field of the associated [Note](../objects/note). Clients are anticipated to render surveys adjacent to the contents of the [Note](../objects/note) itself.

## Fields

### Options

| Name    | Type                   | Required |
| :------ | :--------------------- | :------- |
| options | Array of ContentFormat | Yes      |

Displays the various options users can vote for.

**MUST** contain at least 2 options, but does not have an upper limit for the number of options.

> [!NOTE]
> Servers should limit the number of options to a reasonable number, preferably in a configurable manner, such as 40. This is to prevent abuse of the protocol by sending a large number of options, as they are not paginated.

### Votes

| Name  | Type             | Required |
| :---- | :--------------- | :------- |
| votes | Array of Integer | Yes      |

Contains the number of votes cast for each option. The index of the array corresponds to the index of the option in the `options` array.

Votes should not be public: the server should hide the users that casted votes and only show the total amount.

### Multiple Choice

| Name            | Type    | Required |
| :-------------- | :------ | :------- |
| multiple_choice | Boolean | No       |

Indicates whether the poll is multiple choice. If true, users can vote for multiple options. If false, users can only vote for one option.

If not provided, it is assumed that the poll is not multiple choice.

### Expiration

| Name       | Type   | Required |
| :--------- | :----- | :------- |
| expires_at | String | Yes      |

The date and time when the poll expires. After this time, the poll is closed and no more votes can be cast.

Clients **SHOULD** display the time remaining until the poll expires.

### Integration With Custom Emojis

If you implement both the Polls and the [Custom Emojis](./custom-emojis) extensions, you can use the Custom Emojis extension to add emojis to poll options.

Example:
```json5
{
    // ...
    "extensions": {
        "org.lysand:polls": {
            "poll": {
                "options": [
                    {
                        "text/plain": {
                            "content": "Red :red:"
                        }
                    },
                    {
                        "text/plain": {
                            "content": "Blue :blue:"
                        }
                    },
                    {
                        "text/plain": {
                            "content": "Green :green:"
                        }
                    }
                ],
                "votes": [
                    9,
                    5,
                    0
                ],
                "multiple_choice": false,
                "expires_at": "2021-01-04T00:00:00.000Z"
            }
        },
        "org.lysand:custom_emojis": {
            "emojis": [
                {
                    "name": "red",
                    "url": {
                        "image/webp": {
                            "content": "https://cdn.example.com/emojis/red.webp"
                        }
                    }
                },
                {
                    "name": "blue",
                    "url": {
                        "image/webp": {
                            "content": "https://cdn.example.com/emojis/blue.webp"
                        }
                    }
                },
                {
                    "name": "green",
                    "url": {
                        "image/webp": {
                            "content": "https://cdn.example.com/emojis/green.webp"
                        }
                    }
                }
            ]
        }
    }
    // ...
}
```

When rendering the poll options, clients **SHOULD** display emojis as recommended by the [Custom Emojis](./custom-emojis) extension.

### Poll Results

Clients **SHOULD** display poll results as a percentage of votes. For example, if 10 users voted for the first option, and 5 users voted for the second option, the first option should be displayed as 66.67%, and the second option should be displayed as 33.33%. (with the third option being 0%)

Clients **SHOULD** display the number of votes for each option, and the total number of votes.

###  Sending Votes

Clients **SHOULD** allow users to vote on polls. When a user votes on a poll, the client **MUST** send a `POST` request to the poll's [Note](../objects/note) URI with the following JSON object in the body:

```json5
{
    "type": "Extension",
    "extension_type": "org.lysand:polls/Vote",
    "id": "6b1586cf-1f83-4d85-8d70-a5dc9f213b3e",
    "uri": "https://example.com/actions/6b1586cf-1f83-4d85-8d70-a5dc9f213b3e",
    "author": "https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe",
    "poll": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19",
    "option": 0
}
```

The `option` field **MUST** be the index of the option in the `options` array that the user is voting for.

In return, the server **MUST** respond with a `200 OK` response code, and a JSON object in the body, unless there is an error. This JSON object **MUST** be a valid `VoteResult` object.

```json5
{
    "type": "Extension",
    "extension_type": "org.lysand:polls/VoteResult",
    "id": "d6eb84ea-cd13-43f9-9c54-01244da8e5e3",
    "uri": "https://example.com/actions/d6eb84ea-cd13-43f9-9c54-01244da8e5e3",
    "poll": "https://example.com/publications/f08a124e-fe90-439e-8be4-15a428a72a19",
    "votes": [
        10,
        5,
        0
    ]
}
```

Each number in the `votes` array corresponds to the number of votes for each option. The index of the array corresponds to the index of the poll option in the original Poll object.

If the poll is closed, the server **MUST** respond with a `403 Forbidden` response code.

The total amount of votes can be calculated by summing the `votes` array.

This amount **MUST** include the user's vote, and **SHOULD** be displayed to the user after voting.

### Poll Events

When a poll ends, a user that has voted in it **SHOULD** be notified of the results by the server.

The server **MAY** send a `GET` request to the poll's Publication URI to update its internal database.

## Types

```typescript
interface Poll extends Extension {
    extension_type: "org.lysand:polls/Poll";
    options: ContentFormat[];
    votes: number[];
    multiple_choice?: boolean;
    expires_at: string;
}
```

```typescript
interface Vote extends Extension {
    extension_type: "org.lysand:polls/Vote";
    poll: string;
    option: number;
}
```

```typescript
interface VoteResult extends Extension {
    extension_type: "org.lysand:polls/VoteResult";
    poll: string;
    votes: number[];
}
```
