# Patch

A `Patch` object represents a modification to a [Note](./note). It is primarily used to update a [Note](./note), for instance, to correct a typographical error.

`Patch` objects are intended for internal server use and are not designed to be displayed to the user.

Each subsequent patch is applied to the original object, not the preceding patch. The server is responsible for presenting the most recent patch stored to the client.

> [!NOTE]
> A `Patch` object should replace the object it is patching when displayed to the client. Therefore, if a Patch object lacks some fields from the previous object, these fields should be removed in the edit.

Here is a sample `Patch` for the aforementioned object:

```json5
{
    "type": "Patch",
    "id": "4c21fdea-1318-4d14-b3aa-1ac2f3db2e53",
    "uri": "https://example.com/publications/4c21fdea-1318-4d14-b3aa-1ac2f3db2e53",
    "patched_id": "f08a124e-fe90-439e-8be4-15a428a72a19",
    "patched_at": "2021-01-01T00:00:00.000Z",
    "contents": [
        {
            "content": "This is patched!",
            "content_type": "text/plain"
        },
    ],
    // ...
}
```

## Fields

### ID

This ID must be distinct from the original Note object, but it does not replace the original Note object's ID. It serves to identify the Patch object.

### Patched ID

| Name       | Type   | Required |
| :--------- | :----- | :------- |
| patched_id | String | Yes      |

This is the URI of the object being patched. It must be a [Note](./note).

### Patched At

| Name       | Type   | Required |
| :--------- | :----- | :------- |
| patched_at | String | Yes      |

This is the date and time when the object was patched. It must be in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.

### Other

`Patch` objects inherit all other properties from [Publications](./publications).

## Types

```typescript
interface Patch extends Publication {
    type: "Patch";
    patched_id: string;
    patched_at: string;
}
```
