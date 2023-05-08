import { defineComponent } from '#imports'
import { NuxtPage } from '~/.nuxt/components'
import styles from './default.module.css'

export default defineComponent({
	name: 'empty-layout',
	render() {
		return (
			<div class={styles.layout}>
				<NuxtPage/>
			</div>
		)
	}
})
