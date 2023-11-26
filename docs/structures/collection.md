# Collections

Collections are JSON objects that contain a list of other objects. They are used to represent a list of objects, such as a list of publications or a list of users.

Collections can be represented as such in TypeScript:

```ts
interface Collection<T> {
    first: string;
    last: string;
    total_items: number;
    author: string;
    next?: string;
    prev?: string;
    items: T[];
}
```

Collections **MUST** contain a `first` field that contains the URI of the first item in the collection, and a `last` field that contains the URI of the last item in the collection.

Collections **MUST** contain a `total_items` field that contains the total number of items in the collection.

Collections **MUST** contain a `next` field that contains the URI of the next page of items in the collection, and a `prev` field that contains the URI of the previous page of items in the collection, unless the user is on the first or last page of the collection.

Collections **MUST** contain an `items` field that contains an array of items in the collection. (for example, a list of publications or a list of users)

## Properties

### Author

Collections **MUST** contain an `author` field that contains the URI of the user that created the collection. It is used to identify the author of the collection. If this collection is made by the server and not by a specific user (such as the Endorserment collection with the [ServerEndorsement Extension](/extensions/server-endorsement)), it must be the server actor's URI.