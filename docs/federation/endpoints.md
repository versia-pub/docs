# Federation

The Lysand protocol is only useful when it is federated. This section describes how federation works in Lysand.

Federation in Lysand is based on the HTTP protocol. Servers communicate with each other by sending HTTP requests to one another.
objects
These requests are usually `POST` requests containing a JSON object in the body. This JSON object **MUST BE** a valid Lysand object.

Servers that receive invalid Lysand objects **SHOULD** discard this object as invalid.

## User Actor Endpoints

A server is trying to get the profile of a user on another server. User discovery is done as specified in [User Discovery](/federation/user-discovery).

Once the requesting server has discovered the endpoints of the server, it can send a `GET` request to the user's endpoint to discover the user's actor.

In the above example, to discover user information, the requesting server **MUST** send a `GET` request to the endpoint `https://example.com/users/uuid` with the headers `Accept: application/json`. To sign the request, the server may use either the [Server Actor](/federation/server-actor) or a requesting user's actor as appropriate.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid User object.

> **Note**: Servers are not required to implement the functionality between certain endpoints such as dislikes or featured notes, but they **MUST** at least return an empty collection for these endpoints. Servers may also discard any objects they do not handle, but should return a success response code.

## User Inbox

Once the requesting server has discovered the endpoints of the server, it can send a `POST` request to the `inbox` endpoint to send an object to the user. This is similar to how objects are sent in ActivityPub.

Typically, the inbox can be located on the same URL as the user's actor, but this is not required. The server **MUST** specify the inbox URL in the actor object.

Example inbox URL: `https://example.com/users/uuid/inbox`

The requesting server **MUST** send a `POST` request to the endpoint `https://example.com/users/uuid/inbox` with the headers `Content-Type: application/json` and `Accept: application/json`.

The body of the request **MUST** be a valid Lysand object.

Example with cURL (without signature):
```bash
curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{ \
    "type":"Publication", \
    "id":"6f27bc77-58ee-4c9b-b804-8cc1c1182fa9", \
    "uri":"https://example.com/publications/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9", \
    "author":"https://example.com/users/6e0204a2-746c-4972-8602-c4f37fc63bbe", \
    "created_at":"2021-01-01T00:00:00.000Z", \
    "contents":"Hello, world!" \
}' https://example.com/users/uuid/inbox
```

The server **MUST** respond with a `200 OK` response code if no error occurred.

## User Outbox

Users in Lysand have an outbox, which is a list of objects that the user has posted. This is similar to the outbox in ActivityPub.

The server **MUST** specify the outbox URL in the actor object.

Example outbox URL: `https://example.com/users/uuid/outbox`

The requesting server **MUST** send a `GET` request to the outbox endpoint (`https://example.com/users/uuid/outbox`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid Collection object containing Publications.

Example:

```json5
{
    "first": "https://example.com/users/uuid/outbox?page=1",
    "last": "https://example.com/users/uuid/outbox?page=1",
    // No next or prev attribute in this case, but they can exist
    "total_items": 1,
    "items": [
        {
            "type": "Note",
            "id": "6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
            "uri": "https://example.com/publications/6f27bc77-58ee-4c9b-b804-8cc1c1182fa9",
            "author": "https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755",
            "created_at": "2021-01-01T00:00:00.000Z",
            "contents": [
                {
                    "content": "Hello, world!",
                    "content_type": "text/plain"
                }
            ],
        }
    ]
}
```

These publications **MUST BE** ordered from newest to oldest, in descending order.

## User Followers

Users in Lysand have a list of followers, which is a list of users that follow the user. This is similar to the followers list in ActivityPub.

> **Note:** If you do not want to display this list publically, you can make the followers endpoint return an empty collection.

The server **MUST** specify the followers URL in the actor object.

Example followers URL: `https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/followers`

The requesting server **MUST** send a `GET` request to the followers endpoint (`https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/followers`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid Collection object containing Actors. This collection may be empty.

## User Following

Users in Lysand have a list of following, which is a list of users that the user follows. This is similar to the following list in ActivityPub.

> **Note:** If you do not want to display this list publically, you can make the following endpoint return an empty collection.

The server **MUST** specify the following URL in the actor object.

Example following URL: `https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/following`

The requesting server **MUST** send a `GET` request to the following endpoint (`https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/following`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid Collection object containing Actors. This collection may be empty.

## User Featured Publications

Users in Lysand have a list of featured publications, which is a list of publications that the user has pinned or are important. This is similar to the featured publications list in ActivityPub.

> **Note:** If you do not want to display this list publically, you can make the featured publications endpoint return an empty collection.

The server **MUST** specify the featured publications URL in the actor object.

Example featured publications URL: `https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/featured`

The requesting server **MUST** send a `GET` request to the featured publications endpoint (`https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/featured`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid Collection object containing Publications. This collection may be empty.

## User Likes

Users in Lysand have a list of likes, which is a list of posts that the user has liked. This is similar to the likes list in ActivityPub.

> **Note:** If you do not want to display this list publically, you can make the likes endpoint return an empty collection.

The server **MUST** specify the likes URL in the actor object.

Example likes URL: `https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/likes`

The requesting server **MUST** send a `GET` request to the likes endpoint (`https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/likes`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid Collection object containing Publications. This collection may be empty.


## User Dislikes

Users in Lysand have a list of dislikes, which is a list of posts that the user has disliked. This is similar to the dislikes list in ActivityPub.

> **Note:** If you do not want to display this list publically, you can make the dislikes endpoint return an empty collection.

The server **MUST** specify the dislikes URL in the actor object.

Example dislikes URL: `https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/dislikes`

The requesting server **MUST** send a `GET` request to the dislikes endpoint (`https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/dislikes`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid Collection object containing Publications. This collection may be empty.

## Server Discovery

> **Note:** The terms "the server" and "the requesting server" are used in this section. "The server" refers to the server that is being discovered, and "the requesting server" refers to the server that is trying to discover the server.

To discover the metadata of a server, the requesting server **MUST** send a `GET` request to the endpoint `https://example.com/.well-known/lysand`.

The requesting server **MUST** send the following headers with the request:
```
Accept: application/json
```

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid `ServerMetadata` object.

Example:
    
```json5
{
    "type": "ServerMetadata",
    "name": "Example",
    "uri": "https://example.com",
    "version": "1.0.0",
    "supported_extensions": [
        "org.lysand:reactions",
        "org.lysand:polls",
        "org.lysand:custom_emojis",
        "org.lysand:is_cat"
    ]
}
```