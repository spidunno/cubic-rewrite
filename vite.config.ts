import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	worker: {
		format: "es"
	},
	//@ts-expect-error process is expected to exist but we don't want to install node types just for vite.config.ts
	base: process.env.BASE_PATH || "/",
	plugins: [
    svgr(),
		react(),
		VitePWA({
			registerType: "prompt",
			injectRegister: "script-defer",

			pwaAssets: {
				disabled: false,
				config: true,
			},
			includeAssets: ["fonts/afacad/*.css", "fonts/afacad/files/*", "fonts/azeret-mono/*.css", "fonts/azeret-mono/files/*", "fonts/inter/*.css", "fonts/inter/files/*", "material-symbols/*.css", "material-symbols/*.woff2"],
			manifest: {
				name: "qbq - Speedcubing Timer",
				short_name: "qbq",
				description: "qbq (pronounced \"cubic\"), a sleek, modern speedcubing timer",
				theme_color: "#ffffff",
			},
			// injectManifest: {
			// 	rollupFormat: "es"
			// },
			workbox: {
				globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
			},

			devOptions: {
				enabled: true,
				navigateFallback: "index.html",
				suppressWarnings: true,
				type: "module",
			},
		}),
	],
});
