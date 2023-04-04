import {defineComponent, ref} from '#imports'
import {UnitsInfoController} from '#components'
import styles from './styles.module.css'

export default defineComponent({
	setup() {
	},

	render() {
		return (
			<div class={styles.unitsController}>
				<UnitsInfoController/>
			</div>
		)
	}
})
