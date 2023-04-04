import {defineComponent} from '#imports'
import {UnitsSidebar, UnitsInfo} from '#components'
import {unitsStore} from '~/store/units'
import styles from './styles.module.css'

export default defineComponent({
	setup() {
		const units = unitsStore()
		console.log(units.selectedUnit)
		return {
			unitsStore: units,
		}
	},
	render() {
		return (
			<div class={styles.parametersPage}>
				<UnitsSidebar/>
				{this.unitsStore.selectedUnit &&
					<UnitsInfo/>
				}
			</div>
		)
	}
})
