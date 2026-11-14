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
    "id": "1hw10cxvnwbv17qfbc",
    "type": "pub.versia:social/Note",
    "created_at": "2024-12-01T11:19:04Z",
    "attachments": [],
    "author": "a.example:1j6j2w1q3b50qja183",
    "category": "microblog",`,
    `    "content": "${noteText}",
    "visibility": "public",
    "is_sensitive": false,
    "mentions": [
        "b.example:1j6q4w27wacfeazw5v"
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
        "4Zv1p9WXcZyrvjPIIkN+Ozop6voLapxYI+n6tP4515KkILOj/t+wHxLrM8GljiugZG4G5rYcwljSLrO5EYE/Aw==",
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
