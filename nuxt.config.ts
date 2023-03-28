import {defineNuxtConfig} from 'nuxt/config'

export default defineNuxtConfig({
	css: ['vuetify/lib/styles/main.sass', '~/layouts/global.css'],
	build: {
		transpile: ['vuetify'],
	},
	typescript: {
		strict: true,
		typeCheck: true,
	},
	modules: ['@pinia/nuxt'],
	components: [
		{
			path: '~/components',
			extensions: ['.tsx'],
			pathPrefix: false,
		}
	],
	ssr: false,
})