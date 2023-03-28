import {defineNuxtPlugin} from '#app'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/_styles.scss'

export default defineNuxtPlugin(nuxtApp => {
	const vuetify = createVuetify({
		ssr: true,
		components,
		directives,
		icons: {
			defaultSet: 'mdi',
			aliases,
			sets: {
				mdi
			}
		}
	})
	nuxtApp.vueApp.use(vuetify)
})