import { createPlayer, SHOW_ALL } from "./player";
import { setUpWireBlocks } from "./wire-blocks";

// Enhancement only: without JavaScript the controls stay hidden, and the trace is complete as it
// stands, with each step linking to its section.

const STEP_MS = 2500;

const setUp = (trace: HTMLElement) => {
    const output = (name: string) =>
        trace.querySelector(`[data-output="${name}"]`) as HTMLButtonElement;
    const steps = [...trace.querySelectorAll<HTMLElement>(".step")];
    const status = output("status");

    const player = createPlayer(steps.length, STEP_MS, (position, playing) => {
        steps.forEach((step, index) => {
            if (position === SHOW_ALL || index < position) {
                delete step.dataset.state;
            } else {
                step.dataset.state =
                    index === position ? "current" : "upcoming";
            }
        });
        if (position !== SHOW_ALL) {
            steps[position]?.scrollIntoView({ block: "nearest" });
        }

        const last = position === steps.length - 1;
        output("play").textContent = playing
            ? "Pause"
            : last
              ? "Replay"
              : "Play";
        output("previous").disabled = position <= 0;
        output("next").disabled = last;
        output("show-all").disabled = position === SHOW_ALL;
        // Announcing each step while it plays would talk over the reader.
        status.setAttribute("aria-live", playing ? "off" : "polite");
        status.textContent =
            position === SHOW_ALL
                ? `${steps.length} steps`
                : `Step ${position + 1} of ${steps.length}`;

        for (const event of ["wheel", "touchmove"]) {
            if (playing) addEventListener(event, player.pause);
            else removeEventListener(event, player.pause);
        }
    });

    // Playing is motion, so it is not offered to a reader who asked for less. The buttons still
    // walk through every step.
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotion = () => {
        output("play").hidden = reducedMotion.matches;
        if (reducedMotion.matches) player.pause();
    };
    reducedMotion.addEventListener("change", applyMotion);
    applyMotion();

    output("play").addEventListener("click", player.toggle);
    output("previous").addEventListener("click", player.previous);
    output("next").addEventListener("click", player.next);
    output("show-all").addEventListener("click", player.showAll);
    document.addEventListener("visibilitychange", player.pause);
    setUpWireBlocks(trace, player.pause);

    player.showAll();
    trace
        .querySelector<HTMLElement>("[data-controls]")
        ?.removeAttribute("hidden");
    trace.dataset.enhanced = "";
};

for (const trace of document.querySelectorAll<HTMLElement>(
    ".trace[data-stepper]",
)) {
    setUp(trace);
}
