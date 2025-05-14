import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import type { FC } from "react";

export const TeamMember: FC<{
    name: string;
    bio?: string;
    username?: string;
    avatarUrl: string;
    socials?: {
        name: string;
        url: string;
        icon: string;
    }[];
}> = ({ name, bio, socials, avatarUrl, username }) => {
    return (
        <div className="bg-stone-950 rounded-lg overflow-hidden pb-4 h-full ring-1 ring-black/10 dark:ring-white/10 flex flex-col">
            <div className="bg-pink-100 py-8" />

            <div className="px-4 -mt-6 flex items-center gap-2">
                <div className="border-8 border-stone-950 relative bg-white rounded-full ">
                    <img
                        className="rounded-full size-20"
                        src={avatarUrl}
                        alt={`${name}'s avatar`}
                    />
                    <div className="absolute bg-green-600 bottom-0 right-0 p-2 rounded-full border-[6px] border-gray-900" />
                </div>

                <div className="font-bold text-xl flex flex-col mt-4">
                    <h1 className="text-white">{name}</h1>
                    <span className="text-gray-400">@{username}</span>
                </div>
            </div>

            <div className="px-6 mt-4 text-gray-300">{bio}</div>

            <ul className="pt-6 mt-auto flex gap-5 list-none px-6 flex-wrap">
                {socials?.map((social) => (
                    <li className="m-0!" key={social.name}>
                        <a
                            href={social.url}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <Icon
                                icon={social.icon}
                                className="size-5 text-gray-300"
                                width="unset"
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
