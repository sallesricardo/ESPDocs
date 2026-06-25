// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'ESP Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/sallesricardo/ESPDocs' }],
            sidebar: [
                {
                    label: 'ESP32-DevKitC',
                    items: [{ autogenerate: { directory: "esp32-devkitc" } }],
                },
                {
                    label: 'ESP-IDF',
                    items: [{ autogenerate: { directory: "esp-idf" } }],
                },
                {
                    label: 'Funcionalidades',
                    items: [{ autogenerate: { directory: "functions" } }],
                },
            ],
		}),
	],
});
