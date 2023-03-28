import {defineComponent} from '#imports'
import {NuxtPage, Header} from '#components'
import styles from './default.module.css'

export default defineComponent({
	render() {
		return (
			<div class={styles.layout}>
				<Header/>
				<NuxtPage/>
			</div>
		)
	}
})
