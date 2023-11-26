# Reports

The Reports extension allows users to report objects to their server. This is useful for reporting content that violates the server's rules to admin. (also called "flagging")

If the reporter and reportee are on the same server, there is no need for federation and reporting can happen directly. If the reporter and reportee are on different servers, the report **MUST** be federated to the reportee's server.

## Report Object

The report object is an object that contains information about the report. It is formatted as follows:

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

The `objects` field is an array that contains a list of the URIs of the objects that are being reported. This field is required on all Report objects.

If `objects` contains Actors, then these Actors **MUST** be treated as the reported actors.

If `objects` contains Publications, then these Publications **MUST** be treated as the reported objects.

`objects` can contain any URI to any kind of objects, however typically only Actors or Publications should be reportable

### Reason

The `reason` field is a string that represents the reason for the report. This field is required on all Report objects. This is meant to be a short summary of the report, such as `"spam"`, `"hate speech"`, `"tos violation"` or such.

### Comment

The `comment` field is a string that represents the comment of the report. This field is not required on a Report object. This is meant to be a longer description of the report, such as `"This user has been spamming my inbox with advertisements."`.