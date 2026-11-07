import {
    exampleKeys,
    fromBase64,
    type Message,
    signingParts,
    verify,
} from "./signing.ts";

// The message on the home page, which the playground on `/signatures` starts from. The signature
// is real: it covers these exact bytes, signed with the example key. `SignedNote.astro` fails the
// build if it stops verifying.

/** The text of the note, which the home page lets readers edit. */
export const noteText =
    "<p>Hello, @joe@b.example! How are you doing today?</p>";

/** The body, cut where the notes beside it change. */
export const bodyParts = [
    `{
    "id": "033r20svqa000",
    "type": "Note",
    "created_at": "2024-12-01T11:19:04Z",
    "attachments": [],
    "author": "a.example:034d45r3e6003",
    "category": "microblog",`,
    `    "content": "${noteText}",
    "visibility": "public",
    "is_sensitive": false,
    "mentions": [
        "b.example:034de9r4fr006"
    ],
    "previews": [],`,
    `    "extensions": {
        "pub.versia:custom_emojis": {
            "emojis": []
        }
    }
}`,
] as const;

export const sample = {
    method: "POST",
    domain: "b.example",
    path: "/.versia/v0.7/inbox",
    timestamp: "1733051946",
    body: bodyParts.join("\n"),
    signedBy: "a.example",
    signature:
        "lzNOr378PcwSYAZAKBd5zxZJyVKjTpZJPoN4FbOJW4O1O2lrUbYUmo3syTRXbOxqRRME0l8q3mcF/yIuoScZCw==",
};

/** Whether the sample's signature covers this message, with the example key. */
export const sampleSignatureCovers = async (message: Message) => {
    const { publicKey } = await exampleKeys();
    return verify(
        publicKey,
        fromBase64(sample.signature) as Uint8Array<ArrayBuffer>,
        await signingParts(message),
    );
};
