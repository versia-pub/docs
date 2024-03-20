# Reports

The Reports extension enables users to flag content or users that violate the server's rules. This feature is important for maintaining a safe community environment.

If the reporting user (reporter) and the reported user (reportee) are on the same server, the report can be handled directly without the need for federation. However, if the reporter and reportee are on different servers, the report **MUST** be federated to the reportee's server.

## Report Object

The report object encapsulates the details of the report. It is structured as follows:

```json5
{
    "type": "Extension",
    "extension_type": "org.lysand:reports/Report",
    "author": "https://example.com/users/6f3001a1-641b-4763-a9c4-a089852eec84",
    "id": "6f3001a1-641b-4763-a9c4-a089852eec84",
    "uri": "https://example.com/actions/f7bbf7fc-88d2-47dd-b241-5d1f770a10f0",
    "objects": [
        "https://test.com/publications/46f936a3-9a1e-4b02-8cde-0902a89769fa",
        "https://test.com/publications/213d7c56-fb9b-4646-a4d2-7d70aa7d106a"
    ],
    "reason": "spam",
    "comment": "This is spam."
}
```

Report events **MUST** be sent to the server actor's inbox.

## Fields

### Objects

| Name    | Type            | Required |
| :------ | :-------------- | :------- |
| objects | Array of String | Yes      |

URIs of the objects that are being reported.

If `objects` contains Actors, then these Actors **MUST** be treated as the reported users.

If `objects` contains Notes, then these Notes **MUST** be treated as the reported content.

`objects` can contain any URI to any kind of objects, however, typically only Actors or Notes should be reportable.

### Reason

| Name   | Type   | Required |
| :----- | :----- | :------- |
| reason | String | Yes      |

The reason for the report. This should be a concise summary of the report, such as `"spam"`, `"hate speech"`, `"tos violation"`, etc.

### Comment

| Name    | Type   | Required |
| :------ | :----- | :------- |
| comment | String | No       |

Additional comments about the report. This is meant to provide a more detailed description of the report, such as `"This user has been spamming my inbox with advertisements."`.

## Types

```typescript
interface Report extends Extension {
    extension_type: "org.lysand:reports/Report";
    objects: string[];
    reason: string;
    comment?: string;
}
```