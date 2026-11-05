import type { Metadata } from "next";
import Image from "next/image";
import { Guide } from "@/components/Guides";
import { wrapper as Wrapper } from "@/components/mdx";
import { Resource } from "@/components/Resources";
import { TeamMember } from "@/components/Team";
import fastlyLogo from "@/images/logos/fastly.svg";
import { features, team } from "@/lib/home";

export const metadata: Metadata = {
    title: "Versia Documentation",
    description:
        "Introduction to the Versia Protocol, a communication medium for federated applications, using the HTTP stack.",
};

export default function Page() {
    return (
        <Wrapper>
            <div className="relative z-10 max-w-2xl lg:pt-6">
                <p className="mt-0 mb-6 text-5xl font-semibold tracking-tight leading-3 text-brand-600 dark:text-brand-400">
                    Versia
                </p>
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                    Federation, simpler
                </h1>
                <p className="mt-6 text-lg">
                    A simple, extensible federated protocol for building useful
                    applications. Formerly known as Lysand.
                </p>
            </div>

            <h2>Made by developers</h2>

            <p className="lead">
                Versia is designed and maintained by the developers of the
                Versia Server, which uses Versia for federation. This community
                could include you! Check out our{" "}
                <a
                    href="https://github.com/versia-pub/server"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Git repository
                </a>{" "}
                to see how you can contribute.
            </p>

            <div className="not-prose mt-4 grid grid-cols-1 max-w-full gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
                {features.map((resource) => (
                    <Resource key={resource.name} resource={resource} />
                ))}
            </div>

            <h2>Try it out</h2>

            <p className="lead">
                Use the reference implementation, <strong>Versia Server</strong>
                ! It's a microblogging server with a focus on feeling like
                current Fediverse platforms, like Sharkey and Mastodon.
            </p>

            <Guide
                name="Versia Server"
                href="https://github.com/versia-pub/server"
                description="The reference implementation of the Versia protocol."
            />

            <h2>Try a Versia instance</h2>

            <p className="lead">
                If you want to try out Versia without setting up your own
                instance, you can use one of the following public instances:
            </p>
            <ul>
                <li>
                    <a
                        href="https://beta.versia.social"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <code>beta.versia.social</code>
                    </a>{" "}
                    (send an email to{" "}
                    <a
                        href={`mailto:aprl@versia.pub?subject=${encodeURIComponent("beta.versia.social Account Request")}&body=${encodeURIComponent("Hello, I would like to request an account on beta.versia.social.")}`}
                    >
                        <code>aprl@versia.pub</code>
                    </a>{" "}
                    for an account)
                </li>
            </ul>

            <h2 id="team">People</h2>

            <p className="lead">
                You can ask <code>Jesse</code> for help with anything
                Versia-related, or if you just want to chat!
            </p>

            <div className="not-prose mt-4 grid grid-cols-1 max-w-full gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-3 dark:border-white/5">
                {team.map((member) => (
                    <TeamMember key={member.name} {...member} />
                ))}
            </div>

            <h2 id="thanks">Thanks</h2>

            <p className="lead">
                Thanks to{" "}
                <a
                    href="https://fastly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Fastly
                </a>{" "}
                for supporting us with their resources!
            </p>

            <p>
                <Image
                    src={fastlyLogo}
                    alt="Fastly logo"
                    height={144}
                    className="p-10 rounded-sm border border-zinc-900/10 dark:border-white/10"
                    unoptimized={true}
                />
            </p>
        </Wrapper>
    );
}
