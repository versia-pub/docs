import type { ComponentPropsWithoutRef, ReactNode } from "react";

// From Iconify. Licenses: Tabler (MIT), BoxIcons (CC BY 4.0), Material Design
// Icons (Apache 2.0), Simple Icons (CC0 1.0).

type IconProps = ComponentPropsWithoutRef<"svg">;

function Icon({ children, ...props }: IconProps & { children: ReactNode }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="inline-block size-5 align-baseline"
            {...props}
        >
            {children}
        </svg>
    );
}

export function CodeDotsIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12h.01M12 12h.01M9 12h.01M6 19a2 2 0 0 1-2-2v-4l-1-1l1-1V7a2 2 0 0 1 2-2m12 14a2 2 0 0 0 2-2v-4l1-1l-1-1V7a2 2 0 0 0-2-2"
            />
        </Icon>
    );
}

export function LicenseIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 21H6a3 3 0 0 1-3-3v-1h10v2a2 2 0 0 0 4 0V5a2 2 0 1 1 2 2h-2m2-4H8a3 3 0 0 0-3 3v11M9 7h4m-4 4h4"
            />
        </Icon>
    );
}

export function PuzzleIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 7h3a1 1 0 0 0 1-1V5a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-1a2 2 0 0 0-4 0v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a2 2 0 0 0 0-4H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1"
            />
        </Icon>
    );
}

export function CodeIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7 8l-4 4l4 4m10-8l4 4l-4 4M14 4l-4 16"
            />
        </Icon>
    );
}

export function ShieldCheckIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.46 20.846A12 12 0 0 1 3.5 6A12 12 0 0 0 12 3a12 12 0 0 0 8.5 3a12 12 0 0 1-.09 7.06M15 19l2 2l4-4"
            />
        </Icon>
    );
}

export function DatabaseIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            >
                <path d="M4 6a8 3 0 1 0 16 0A8 3 0 1 0 4 6" />
                <path d="M4 6v6a8 3 0 0 0 16 0V6" />
                <path d="M4 12v6a8 3 0 0 0 16 0v-6" />
            </g>
        </Icon>
    );
}

export function ShieldIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3a12 12 0 0 0 8.5 3A12 12 0 0 1 12 21A12 12 0 0 1 3.5 6A12 12 0 0 0 12 3"
            />
        </Icon>
    );
}

export function PlugIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.785 6L18 14.215l-2.054 2.054a5.81 5.81 0 1 1-8.215-8.215zM4 20l3.5-3.5M15 4l-3.5 3.5M20 9l-3.5 3.5"
            />
        </Icon>
    );
}

export function CodeAsteriskIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 19a2 2 0 0 1-2-2v-4l-1-1l1-1V7a2 2 0 0 1 2-2m6 6.875l3-1.687m-3 1.687v3.375m0-3.375l-3-1.687m3 1.687l3 1.688M12 8.5v3.375m0 0l-3 1.688M18 19a2 2 0 0 0 2-2v-4l1-1l-1-1V7a2 2 0 0 0-2-2"
            />
        </Icon>
    );
}

export function BuildingBankIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 21h18M3 10h18M5 6l7-3l7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3"
            />
        </Icon>
    );
}

export function LinkIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="currentColor"
                d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707l1.414-1.414l-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.01 5.01 0 0 0 0 7.071a4.98 4.98 0 0 0 3.535 1.462A4.98 4.98 0 0 0 12 19.071l.707-.707l-1.414-1.414l-.707.707a3.007 3.007 0 0 1-4.243 0a3.005 3.005 0 0 1 0-4.243z"
            />
            <path
                fill="currentColor"
                d="m12 4.929l-.707.707l1.414 1.414l.707-.707a3.007 3.007 0 0 1 4.243 0a3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414l.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.01 5.01 0 0 0 0-7.071a5.006 5.006 0 0 0-7.071 0"
            />
        </Icon>
    );
}

export function ServerIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="currentColor"
                d="M20 3H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2M4 9V5h16v4zm16 4H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2M4 19v-4h16v4z"
            />
            <path
                fill="currentColor"
                d="M17 6h2v2h-2zm-3 0h2v2h-2zm3 10h2v2h-2zm-3 0h2v2h-2z"
            />
        </Icon>
    );
}

export function EnvelopeIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7l-8 5.334L4 8.7V6.297l8 5.333l8-5.333V8.7z"
                fill="currentColor"
            />
        </Icon>
    );
}

export function GithubIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974c0 4.406 2.857 8.145 6.821 9.465c.499.09.679-.217.679-.481c0-.237-.008-.865-.011-1.696c-2.775.602-3.361-1.338-3.361-1.338c-.452-1.152-1.107-1.459-1.107-1.459c-.905-.619.069-.605.069-.605c1.002.07 1.527 1.028 1.527 1.028c.89 1.524 2.336 1.084 2.902.829c.091-.645.351-1.085.635-1.334c-2.214-.251-4.542-1.107-4.542-4.93c0-1.087.389-1.979 1.024-2.675c-.101-.253-.446-1.268.099-2.64c0 0 .837-.269 2.742 1.021a9.6 9.6 0 0 1 2.496-.336a9.6 9.6 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021c.545 1.372.203 2.387.099 2.64c.64.696 1.024 1.587 1.024 2.675c0 3.833-2.33 4.675-4.552 4.922c.355.308.675.916.675 1.846c0 1.334-.012 2.41-.012 2.737c0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974C22 6.465 17.535 2 12.026 2"
                clipRule="evenodd"
            />
        </Icon>
    );
}

export function MastodonIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="currentColor"
                d="M16 17.24c2.5-.3 4.69-1.84 5-3.25a33.6 33.6 0 0 0 .4-5.42C21.33 4.23 18.48 3 18.48 3A17.6 17.6 0 0 0 12 2a17.6 17.6 0 0 0-6.48 1S2.68 4.23 2.68 8.57v3.44c.1 4.24.78 8.42 4.7 9.46A14.7 14.7 0 0 0 12 22a9.2 9.2 0 0 0 3.54-.81l-.07-1.64A11.4 11.4 0 0 1 12 20c-1.8-.06-3.71-.19-4-2.4a4 4 0 0 1 0-.63a22.7 22.7 0 0 0 4 .54a23.6 23.6 0 0 0 4-.27m-6.54-9.8q-1.35 0-1.35 1.62v5.1H6V8.9a3.78 3.78 0 0 1 .82-2.56a2.85 2.85 0 0 1 2.23-1a2.68 2.68 0 0 1 2.4 1.23l.52.87l.52-.87a2.68 2.68 0 0 1 2.4-1.23a2.85 2.85 0 0 1 2.23 1A3.78 3.78 0 0 1 18 8.9v5.26h-2.11v-5.1q0-1.62-1.35-1.62c-1 0-1.51.64-1.51 1.92v2.79H11V9.36c0-1.28-.54-1.92-1.54-1.92"
            />
        </Icon>
    );
}

export function MatrixIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="currentColor"
                d="M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033a3.3 3.3 0 0 1 1.117-1.024c.433-.245.936-.365 1.5-.365q.81.002 1.481.314c.448.208.785.582 1.02 1.108q.382-.562 1.034-.992q.651-.43 1.546-.43q.679 0 1.26.167c.388.11.716.286.993.53c.276.245.489.559.646.951q.229.587.23 1.417v5.728h-2.349V11.52q0-.43-.032-.812a1.8 1.8 0 0 0-.18-.66a1.1 1.1 0 0 0-.438-.448q-.292-.165-.785-.166q-.498 0-.803.189a1.4 1.4 0 0 0-.48.499a2 2 0 0 0-.231.696a6 6 0 0 0-.06.785v4.768h-2.35v-4.8q.002-.38-.018-.752a2.1 2.1 0 0 0-.143-.688a1.05 1.05 0 0 0-.415-.503c-.194-.125-.476-.19-.854-.19q-.168 0-.439.074c-.18.051-.36.143-.53.282a1.64 1.64 0 0 0-.439.595q-.18.39-.18 1.02v4.966H5.46V7.81zm15.693 15.64V.55H21.72V0H24v24h-2.28v-.55z"
            />
        </Icon>
    );
}

export function SignalIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="currentColor"
                d="M12 0q-.934 0-1.83.139l.17 1.111a11 11 0 0 1 3.32 0l.172-1.111A12 12 0 0 0 12 0M9.152.34A12 12 0 0 0 5.77 1.742l.584.961a10.8 10.8 0 0 1 3.066-1.27zm5.696 0l-.268 1.094a10.8 10.8 0 0 1 3.066 1.27l.584-.962A12 12 0 0 0 14.848.34M12 2.25a9.75 9.75 0 0 0-8.539 14.459c.074.134.1.292.064.441l-1.013 4.338l4.338-1.013a.62.62 0 0 1 .441.064A9.7 9.7 0 0 0 12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m-7.092.068a12 12 0 0 0-2.59 2.59l.909.664a11 11 0 0 1 2.345-2.345zm14.184 0l-.664.909a11 11 0 0 1 2.345 2.345l.909-.664a12 12 0 0 0-2.59-2.59M1.742 5.77A12 12 0 0 0 .34 9.152l1.094.268a10.8 10.8 0 0 1 1.269-3.066zm20.516 0l-.961.584a10.8 10.8 0 0 1 1.27 3.066l1.093-.268a12 12 0 0 0-1.402-3.383M.138 10.168A12 12 0 0 0 0 12q0 .934.139 1.83l1.111-.17A11 11 0 0 1 1.125 12q0-.848.125-1.66zm23.723.002l-1.111.17q.125.812.125 1.66c0 .848-.042 1.12-.125 1.66l1.111.172a12.1 12.1 0 0 0 0-3.662M1.434 14.58l-1.094.268a12 12 0 0 0 .96 2.591l-.265 1.14l1.096.255l.36-1.539l-.188-.365a10.8 10.8 0 0 1-.87-2.35m21.133 0a10.8 10.8 0 0 1-1.27 3.067l.962.584a12 12 0 0 0 1.402-3.383zm-1.793 3.848a11 11 0 0 1-2.345 2.345l.664.909a12 12 0 0 0 2.59-2.59zm-19.959 1.1L.357 21.48a1.8 1.8 0 0 0 2.162 2.161l1.954-.455l-.256-1.095l-1.953.455a.675.675 0 0 1-.81-.81l.454-1.954zm16.832 1.769a10.8 10.8 0 0 1-3.066 1.27l.268 1.093a12 12 0 0 0 3.382-1.402zm-10.94.213l-1.54.36l.256 1.095l1.139-.266c.814.415 1.683.74 2.591.961l.268-1.094a10.8 10.8 0 0 1-2.35-.869zm3.634 1.24l-.172 1.111a12.1 12.1 0 0 0 3.662 0l-.17-1.111q-.812.125-1.66.125a11 11 0 0 1-1.66-.125"
            />
        </Icon>
    );
}

export function GithubRoundIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
            />
        </Icon>
    );
}
