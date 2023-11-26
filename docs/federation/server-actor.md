# Server Actor

Servers **MUST** have an Actor object that represents the server. This Actor object **MUST** be a valid User object.

The Actor object can be found by sending a WebFinger request to the server's WebFinger endpoint for `actor@server.com`. For more information about WebFinger, please see [User Discovery](/federation/user-discovery).

The Actor object **MUST** contain a `public_key` field that contains the public key of the server. This public key **MUST** be used to sign all requests sent by the server when the `author` field of an object is the server actor.

The server actor **MUST** be used to sign all requests sent by the server when the `author` field of an object is the server actor.

The server actor **SHOULD** contain empty data fields, such as `display_name` and `bio`. However, if the server actor does contain data fields, they **MUST** be valid, as with any actor.