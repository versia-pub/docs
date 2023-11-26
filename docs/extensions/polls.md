# Polls

With the Polls extension, users can create polls. This is useful for asking questions to users, such as "What is your favourite colour?".

Polls are added as a new field under Publication Extensions, called `poll`. This field is an object that contains the poll information.

```json5
{
    // ...
    "extensions": {
        "org.lysand:polls": {
            "poll": {
                "options": [
                    [
                        {
                            "content": "Red",
                            "content_type": "text/plain"
                        }
                    ],
                    [
                        {
                            "content": "Blue",
                            "content_type": "text/plain"
                        }
                    ],
                    [
                        {
                            "content": "Green",
                            "content_type": "text/plain"
                        }
                    ]
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

These fields are described below.

> **Note:** There is no `question` field, because it is assumed that the question will be put in the `contents` field of the Publication. Clients are expected to render polls next to the contents of the Publication itself.

## Fields

### Options

The `options` field on a Poll object is an array that contains a list of `ContentFormat` arrays. It is used to represent the options of the poll.

The `options` field is required on all Poll extension fields

The `options` field **MUST** contain at least 2 options, and does not have an upper limit for the number of options.

> **Note:** Servers should limit the number of options to a reasonable number, perferably in a configurable manner, such as 10. This is to prevent abuse of the protocol by sending a large number of options.

### Votes

The `votes` field on a Poll object is an array that contains a list of integers. It is used to represent the number of votes for each option.

The `votes` field is required on all Poll extension fields.

### Multiple Choice

The `multiple_choice` field on a Poll object is a boolean that represents whether or not the poll is multiple choice. It is used to determine if the user can select multiple options.

The `multiple_choice` field is not required on all Poll extension fields. If it is not provided, it is assumed that the poll is not multiple choice.

### Expires At

The `expires_at` field on a Poll object is a string that represents the date and time that the poll expires. It is used to determine when the poll ends, and when to stop accepting votes.

The `expires_at` field is required on all Poll extension fields.

Clients **SHOULD** display the time remaining until the poll expires.

### Integration With Custom Emojis

If you implement both the Polls and the Custom Emojis extensions, you can use the Custom Emojis extension to add emojis to poll options.

Example:
```json5
{
    // ...
    "extensions": {
        "org.lysand:polls": {
            "poll": {
                "options": [
                    [
                        {
                            "content": ":red:",
                            "content_type": "text/plain"
                        }
                    ],
                    [
                        {
                            "content": ":blue:",
                            "content_type": "text/plain"
                        }
                    ],
                    [
                        {
                            "content": ":green:",
                            "content_type": "text/plain"
                        }
                    ]
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
                    "url": [
                        {
                            "content": "https://cdn.example.com/emojis/red.webp",
                            "content_type": "image/webp"
                        }
                    ]
                },
                {
                    "name": "blue",
                    "url": [
                        {
                            "content": "https://cdn.example.com/emojis/blue.webp",
                            "content_type": "image/webp"
                        }
                    ]
                },
                {
                    "name": "green",
                    "url": [
                        {
                            "content": "https://cdn.example.com/emojis/green.webp",
                            "content_type": "image/webp"
                        }
                    ]
                }
            ]
        }
    }
    // ...
}
```

When rendering the poll options, clients **SHOULD** display emojis as recommended by the [Custom Emojis](/extensions/custom-emojis) extension.

### Poll Results

Clients **SHOULD** display poll results as a percentage of votes. For example, if 10 users voted for the first option, and 5 users voted for the second option, the first option should be displayed as 66.67%, and the second option should be displayed as 33.33%.

Clients **SHOULD** display the number of votes for each option.

Clients **SHOULD** display the total number of votes.

###  Sending Votes

Clients **SHOULD** allow users to vote on polls. When a user votes on a poll, the client **MUST** send a `POST` request to the poll's Publication URI with the following JSON object in the body:

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

In return, the server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid `VoteResult` object.

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

If the poll is closed, the server **MUST** respond with a `403 Forbidden` response code.

The total amount of votes can be calculated by summing the `votes` array.

This amount **MUST** include the user's vote, and **SHOULD** be displayed to the user after voting.

### Poll Events

When a poll ends, a user that has voted in it **SHOULD** be notified of the results by the server.

The server **MAY** send a `GET` request to the poll's Publication URI to update its internal database.