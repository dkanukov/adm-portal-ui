import {defineComponent} from '#imports'
import {UnitsInfoController} from '#components'
import styles from './styles.module.css'
import UnitsTable from '../units-table'

export default defineComponent({
	setup() {},

	render() {
		return (
			<div class={styles.unitsController}>
				<UnitsInfoController />
				<UnitsTable />
			</div>
		)
	}
})
