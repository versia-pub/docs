/** The tool's section, and how the rest of its script finds things inside it. */
export interface Tool {
    root: HTMLElement;
    field: (name: string) => HTMLInputElement | HTMLTextAreaElement;
    output: (name: string) => HTMLElement;
}

export const bindTool = (root: HTMLElement): Tool => ({
    root,
    field: (name) =>
        root.querySelector(`[name="${name}"]`) as
            | HTMLInputElement
            | HTMLTextAreaElement,
    output: (name) =>
        root.querySelector(`[data-output="${name}"]`) as HTMLElement,
});
