import {defineComponent} from '#imports'
import {UnitsSidebar, UnitsInfo} from '#components'
import {unitsStore} from '~/store/units'
import styles from './styles.module.css'

export default defineComponent({
	setup() {
		const units = unitsStore()
		return {
			unitsStore: units,
		}
	},
	render() {
		return (
			<div class={styles.unitsPage}>
				<UnitsSidebar/>
				{this.unitsStore.selectedUnit &&
					<UnitsInfo/>
				}
			</div>
		)
	}
})
