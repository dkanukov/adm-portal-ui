import {defineNuxtConfig} from 'nuxt/config'
import vuetify from 'vite-plugin-vuetify'
export default defineNuxtConfig({
	css: ['vuetify/lib/styles/main.sass', '~/layouts/global.css'],
	build: {
		transpile: ['vuetify'],
	},
	typescript: {
		strict: true,
		typeCheck: true,
	},
	modules: [
		'@pinia/nuxt',
		async (options, nuxt) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(
				vuetify()
			))
		},
		'nuxt-monaco-editor'
	],
	components: [
		{
			path: '~/components',
			extensions: ['.tsx'],
			pathPrefix: false,
		}
	],
	ssr: false,
	runtimeConfig: {
		public: {
			baseURL: 'http://94.103.87.41:8000/api'
		}
	}
})
