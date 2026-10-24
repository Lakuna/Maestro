import type { JSX } from "hono/jsx/jsx-runtime";

import { useCallback, useEffect, useRef, useState } from "hono/jsx";

export type TimerProps = JSX.IntrinsicElements["span"] & {
	/** Prevent children from being passed to the timer. */
	children?: never;

	/** The Unix timestamp of the end of the timer. */
	time: number;
};

const remainderToString = (remainder: number): string => {
	const milliseconds = remainder % 1000;
	const seconds = (remainder / 1000) % 60;
	const minutes = (remainder / 1000 / 60) % 60;
	const hours = remainder / 1000 / 60 / 60;

	const p = (n: number): string => Math.abs(n).toFixed().padStart(2, "0");
	return `${remainder < 0 ? "-" : ""}${p(hours)}:${p(minutes)}:${p(seconds)}.${p(milliseconds)}`;
};

/**
 * Create a timer component that counts down to the target time.
 * @param props - The properties of the timer.
 * @returns The timer.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default function Timer({ time, ...props }: TimerProps): JSX.Element {
	const animationFrame = useRef(0);
	const [remainder, setRemainder] = useState(time - Date.now());

	const tick = useCallback((): void => {
		animationFrame.current = requestAnimationFrame(tick);
		setRemainder(time - Date.now());
	}, []);

	useEffect(() => {
		animationFrame.current = requestAnimationFrame(tick);
		return (): void => {
			cancelAnimationFrame(animationFrame.current);
		};
	});

	return <span {...props}>{remainderToString(remainder)}</span>;
}
