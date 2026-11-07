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
export const noteText = "Hello, @joe@b.example! How are you doing today?";

/** The body, cut where the notes beside it change. */
export const bodyParts = [
    `{
    "id": "782addd9-c051-4eea-8ba4-23d561d0c5bb",
    "type": "Note",
    "created_at": "2024-12-01T11:19:04Z",
    "attachments": [],
    "author": "a.example:ac41xk9dfe7302",
    "category": "microblog",`,
    `    "content": {
        "text/plain": {
            "content": "${noteText}"
        }
    },
    "visibility": "public",
    "is_sensitive": false,
    "mentions": [
        "b.example:bde22zi3ca8762"
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
        "GlHqOSGrz+nyATm8GqbgkmVJinCJ11NurstGMaeEQVDdNyQSNFdbFEHxj6XPUVEf2jh7aFwEKYznd0d/a4mGCA==",
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
