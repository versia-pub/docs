# Federation

This section explains how federation operates within Lysand.

Lysand's federation is built upon the HTTP stack. Servers interact with each other by exchanging HTTP requests.

These requests are predominantly `POST` requests that carry a JSON object in the body. This JSON object **MUST** conform to the Lysand object schema.

Servers that receive non-conforming Lysand objects **SHOULD** disregard these objects as invalid, and return a `400 Bad Request` response code (these could include debugging information in the response body).

> [!NOTE]
> Values such as `https://example.com/users/uuid` are example implementations and not a guide on how an implementation should format a URI. These must follow the rules outlined in [the base spec](../spec.md).
> 
## User Actor Endpoints

When a server aims to retrieve the profile of a user on a differentserver, it follows the process outlined in [User Discovery](user-discovery).

Upon discovering the target server's endpoints, the requesting server can issue a `GET` request to the user's endpoint to retrieve the user's actor.

For instance, to fetch user information, the requesting server **MUST** send a `GET` request to the endpoint `https://example.com/users/uuid` with the required headers. The server can use either the [Server Actor](/federation/server-actor) or a requesting user's actor to sign the request, as appropriate depending on which actor the request is associated with.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid [Actor](../objects/actors) object.

> [!NOTE]
> While servers are not obligated to implement functionality between certain endpoints such as dislikes or featured notes, they **MUST** at least return an empty collection for these endpoints. Servers may also disregard any objects they do not handle, but should return a success response code.

## User Inbox

After the requesting server has discovered the target server's endpoints, it can issue a `POST` request to the `inbox` endpoint to transmit an object to the user. This process mirrors how objects are sent in ActivityPub.

Typically, the inbox can be found at the same URL as the user's actor, but this is not a requirement. The server **MUST** specify the inbox URL in the actor object.

Example inbox URL: `https://example.com/users/uuid/inbox`

The requesting server **MUST** send a `POST` request to the endpoint `https://example.com/users/uuid/inbox` with the headers `Content-Type: application/json` and `Accept: application/json`.

The body of the request **MUST** contain a valid Lysand object.

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

The server **MUST** respond with a `201 CREATED` response code if the operation was successful.

## User Outbox

In Lysand, users have an outbox, which is a list of objects that the user has posted. This is akin to the outbox in ActivityPub.

The server **MUST** specify the outbox URL in the actor object.

Example outbox URL: `https://example.com/users/uuid/outbox`

The requesting server **MUST** send a `GET` request to the outbox endpoint (`https://example.com/users/uuid/outbox`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid [Collection](../structures/collection) object containing [Publications](../objects/publications).

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

> [!NOTE]
> If you prefer not to display this list publicly, you can configure the followers endpoint to return an empty collection.

The server **MUST** specify the followers URL in the actor object.

Example followers URL: `https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/followers`

The requesting server **MUST** send a `GET` request to the followers endpoint (`https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/followers`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid [Collection](../structures/collection) object containing [Actors](../objects/actors). This collection may be empty.

## User Following

Users in Lysand have a followlist, which is a list of users that the user follows. This is similar to the following list in ActivityPub.

> [!NOTE]
> If you prefer not to display this list publicly, you can configure the following endpoint to return an empty collection.

The server **MUST** specify the following URL in the actor object.

Example following URL: `https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/following`

The requesting server **MUST** send a `GET` request to the following endpoint (`https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/following`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid [Collection](../structures/collection) object containing [Actors](../objects/actors). This collection may be empty.

## User Featured Publications

Users in Lysand have a list of featured publications, which is a list of publications that the user has pinned or deemed important. This is similar to the featured publications list in ActivityPub.

> [!NOTE]
> If you prefer not to display this list publicly, you can configure the featured publications endpoint to return an empty collection.

The server **MUST** specify the featured publications URL in the actor object.

Example featured publications URL: `https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/featured`

The requesting server **MUST** send a `GET` request to the featured publications endpoint (`https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/featured`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid [Collection](../structures/collection) object containing [Publications](../objects/publications). This collection may be empty.

## User Likes

Users in Lysand have a list of likes, which is a list of posts that the user has liked. This is similar to the likes list in ActivityPub.

> [!NOTE]
> If you prefer not to display this list publicly, you can configure the likes endpoint to return an empty collection.

The server **MUST** specify the likes URL in the actor object.

Example likes URL: `https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/likes`

The requesting server **MUST** send a `GET` request to the likes endpoint (`https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/likes`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid [Collection](../structures/collection) object containing [Publications](../objects/publications). This collection may be empty.


## User Dislikes

Users in Lysand have a list of dislikes, which is a list of posts that the user has disliked. This is similar to the dislikes list in ActivityPub.

> [!NOTE]
> If you prefer not to display this list publicly, you can configure the dislikes endpoint to return an empty collection.

The server **MUST** specify the dislikes URL in the actor object.

Example dislikes URL: `https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/dislikes`

The requesting server **MUST** send a `GET` request to the dislikes endpoint (`https://example.com/users/731bae4a-9279-4b11-bd8f-f30af7bec755/dislikes`) with the headers `Accept: application/json`.

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid [Collection](../structures/collection) object containing [Publications](../objects/publications). This collection may be empty.

## Server Discovery

> [!NOTE]
> The terms "the server" and "the requesting server" are used in this section. "The server" refers to the server that is being discovered, and "the requesting server" refers to the server that is attempting to discover the server.

To retrieve the metadata of a server, the requesting server **MUST** send a `GET` request to the endpoint `https://example.com/.well-known/lysand`.

The requesting server **MUST** send the following headers with the request:
```
Accept: application/json
```

The server **MUST** respond with a `200 OK` response code, and a JSON object in the body. This JSON object **MUST** be a valid [ServerMetadata](../objects/server-metadata) object.

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
