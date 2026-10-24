import type { Hono } from "hono";

import Timer from "../components/Timer.js";

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default function timerEndpoint(app: Hono): void {
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	app.get("/timer", async (c) => {
		const time = Number(c.req.query("time"));
		const title = `Countdown Timer to ${new Date(time).toLocaleString()}`;
		return c.html(
			<html lang="en-US">
				<head>
					<meta charset="utf-8" />
					<meta content="width=device-width, initial-scale=1" name="viewport" />
					<title>{title}</title>
					<meta content={title} name="description" />
					<link href="https://www.lakuna.pw/" rel="author" />
					<meta content="light" name="color-scheme" />
					<meta content="#000000" name="theme-color" />
					<meta content="Travis Martin" name="author" />
					<meta content="Travis Martin" name="creator" />
					<meta content="Travis Martin" name="publisher" />
					<meta content={title} property="og:title" />
					<meta content={title} property="og:description" />
					<meta content="https://maestro.lakuna.pw/timer" property="og:url" />
					<meta
						content="https://www.lakuna.pw/opengraph-image.png"
						property="og:image"
					/>
					<meta content="image/png" property="og:image:type" />
					<meta content="512" property="og:image:width" />
					<meta content="512" property="og:image:height" />
					<meta content="summary" name="twitter:card" />
					<meta content="1117270419298496513" name="twitter:site:id" />
					<meta content="1117270419298496513" name="twitter:creator:id" />
					<meta content={title} name="twitter:title" />
					<meta content={title} name="twitter:description" />
					<meta
						content="https://www.lakuna.pw/opengraph-image.png"
						name="twitter:image"
					/>
					<meta content="image/png" name="twitter:image:type" />
					<meta content="512" name="twitter:image:width" />
					<meta content="512" name="twitter:image:height" />
					<link
						href="https://www.lakuna.pw/favicon.ico"
						rel="icon"
						sizes="128x128"
						type="image/x-icon"
					/>
				</head>
				<body>
					<header />
					<main>
						<h1>{title}</h1>
						<p>
							<Timer time={time} />
						</p>
					</main>
					<footer />
				</body>
			</html>
		);
	});
}
