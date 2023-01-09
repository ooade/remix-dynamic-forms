import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Dynamic forms with Remix ✨',
	viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
				<style>
					{`
            * {
              margin: 0px;
              padding: 0px;
              box-sizing: border-box;
            }

            body {
              font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
              margin-block: 20px;
            }

            .index-container {
              margin-inline: 10px;
              display: flex;
            }

            section {
              flex: 1;
            }

            .form-field {
              margin-block-end: 10px;
            }

            .page-title {
              margin-block: 30px;
            }

            input {
              height: 40px;
              border: 1px solid #000;
              padding-inline: 10px;
              width: 300px;
            }

            button {
              border: 0px;
              width: 300px;
              height: 40px;
            }
          `}
				</style>
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
