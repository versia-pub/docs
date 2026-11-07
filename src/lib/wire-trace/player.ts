/** Nothing selected: the whole trace is showing, as it does without JavaScript. */
export const SHOW_ALL = -1;

/** Where the reader is in a trace, and the timer that moves them when it plays. */
export const createPlayer = (
    count: number,
    stepMs: number,
    onChange: (position: number, playing: boolean) => void,
) => {
    let position = SHOW_ALL;
    let timer: ReturnType<typeof setInterval> | undefined;

    const stop = () => {
        clearInterval(timer);
        timer = undefined;
    };

    const moveTo = (next: number) => {
        position = next;
        if (position === count - 1) stop();
        onChange(position, timer !== undefined);
    };

    const pause = () => {
        if (timer === undefined) return;
        stop();
        onChange(position, false);
    };

    const play = () => {
        const finished = position === count - 1;
        timer = setInterval(() => moveTo(position + 1), stepMs);
        moveTo(finished ? 0 : position + 1);
    };

    return {
        pause,
        toggle: () => (timer === undefined ? play() : pause()),
        next: () => {
            stop();
            moveTo(Math.min(position + 1, count - 1));
        },
        previous: () => {
            stop();
            moveTo(Math.max(position - 1, 0));
        },
        showAll: () => {
            stop();
            moveTo(SHOW_ALL);
        },
    };
};
