/** `fields[0].key`, or `extensions["pub.versia:polls"]` for a key that would not read as a name. */
export const childPath = (path: string, key: string | number) => {
    if (typeof key === "number") return `${path}[${key}]`;
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key))
        return `${path}[${JSON.stringify(key)}]`;
    return path === "" ? key : `${path}.${key}`;
};
