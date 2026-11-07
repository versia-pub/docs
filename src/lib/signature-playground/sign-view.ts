import { exampleKeys, exportPublicKey, generateKeys, sign } from "../signing";
import type { Tool } from "./dom";

/** Holds the key in use, wires up the buttons that change it, and draws the signed result. */
export const createSignView = async (
    { field, output }: Tool,
    onKeyChange: () => void,
) => {
    const example = await exampleKeys();
    let keys = example;
    let keyLabel = "the example key";
    let lastSignature = "";

    output("generate").addEventListener("click", async () => {
        keys = await generateKeys();
        keyLabel = "a new key, made just now";
        output("use-example").hidden = false;
        onKeyChange();
    });

    output("use-example").addEventListener("click", () => {
        keys = example;
        keyLabel = "the example key";
        output("use-example").hidden = true;
        onKeyChange();
    });

    return {
        publicKey: () => exportPublicKey(keys.publicKey),
        lastSignature: () => lastSignature,
        show: async (parts: string[], isCurrent: () => boolean) => {
            const signature = await sign(keys.privateKey, parts);
            const publicKey = await exportPublicKey(keys.publicKey);
            if (!isCurrent()) return;
            output("headers").textContent = [
                `Versia-Signed-By: ${field("signed-by").value}`,
                `Versia-Signed-At: ${field("timestamp").value}`,
                `Versia-Signature: ${signature}`,
            ].join("\n");
            output("public-key").textContent = publicKey;
            output("key-label").textContent = keyLabel;
            lastSignature = signature;
        },
    };
};
