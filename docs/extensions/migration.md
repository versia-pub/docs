# Migration

Sometimes, users may wish to move from one instance to another. This could be due to a change in administration, a desire to be closer to friends, or any other reason. This document outlines an extension to make the process of moving instances easier.

## User migrations

The following object is used to represent a user migration:

```json5
{
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "type": "Extension",
    "extension_type": "org.lysand:migration/Migration",
    "author": "https://example.com/users/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "uri": "https://example.com/actions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "created_at": "2021-01-01T00:00:00.000Z",
    "destination": "https://otherinstance.social/users/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
}
```

### Fields

#### Author

| Name   | Type | Required |
| :----- | :--- | :------- |
| author | URI  | Yes      |

URI of the [Actor](../objects/actors) who initiated the action. This Actor will be the user migrating.

#### Destination

| Name        | Type | Required |
| :---------- | :--- | :------- |
| destination | URI  | Yes      |

URI of the user's new account.

### Implementation

When an instance receives a `Migration` object, the client **SHOULD** display a notification to all followers of the migrating user. This notification **SHOULD** include a link to the user's new account.

Furthermore, all following relationships of the migrating user **SHOULD** be transferred to the new account. This includes followers, following, and any other relationship that may exist. The old account **SHOULD** be marked as inactive and display a message indicating that the user has migrated to a new account.

#### Server Actors

If the user in question is a server actor, then it should be considered that the entire instance is migrating to a new address. In this case, the above process should be applied to all users on the instance.