import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	worker: {
		format: "es"
	},
	//@ts-expect-error
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
