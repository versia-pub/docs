# Groups

Groups are a way to organize the visibility of objects on the server. Groups can be thought of as something similar to a Matrix room or a Discord channel, while also being similar to a Mastodon list.

> [!NOTE]
> Groups replace the old "visibility" system for Notes, which was designed for a microblogging context. Groups are more flexible and can be used for any application.
>
> Notes can still use visibility in cases where groups are not needed with the `followers` and `public` values where you'd typically put a group URI (for example, in a [Publication](./objects/publications.md)'s `group` field').

# Group Entity

The group entity encapsulates the details of a group. It adheres to the following structure:

```json5
{
    "type": "Group",
    "id": "ed480922-b095-4f09-9da5-c995be8f5960",
    "uri": "https://example.com/groups/ed480922-b095-4f09-9da5-c995be8f5960",
    "name": {
        "text/html": {
            "content": "The <strong>Woozy</strong> fan club"
        }
    },
    "description": {
        "text/plain": {
            "content": "A group for fans of the Woozy emoji."
        }
    },
    "members": "https://example.com/groups/ed480922-b095-4f09-9da5-c995be8f5960/members",
}
```

## Fields

### Name

| Name | Type          | Required |
| :--- | :------------ | :------- |
| name | ContentFormat | No       |

The name of the group. This field is optional. Can contain custom emojis, like most other text fields.

### Description

| Name        | Type          | Required |
| :---------- | :------------ | :------- |
| description | ContentFormat | No       |

A description of the group. This field is optional. Can contain custom emojis, like most other text fields.

### Members

| Name    | Type   | Required |
| :------ | :----- | :------- |
| members | String | Yes      |

The URI of the group's members list. This field is required. Resolves to a [Collection](./structures/collection) of [User](./objects/user) objects.

## Implementation

`Note` objects can be posted to groups by setting the `group` field to the URI of the group. If there is no `group` field, the note is posted to whoever is mentioned in the `to` field.

Other values for `group` are:
- `public` for public notes, which can be seen by anyone.
- `followers` for notes that can be seen by the author's followers only.

If the `group` field is empty, and nobody is mentioned in the `to` field, the note is only visible to the author.