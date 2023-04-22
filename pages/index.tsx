import {defineComponent, useApiRequest} from '#imports'
import {UnitsSidebar, UnitsInfo, UnitsParamUpdateForm} from '#components'
import {unitsStore} from '~/store/units'
import styles from './styles.module.css'
import {Unit} from '~/components/units-sidebar/units-sidebar'

export default defineComponent({
	async setup() {
		const unitsStoreInstance = unitsStore()
		const units = await useApiRequest<Unit[]>('/get_units')

		if (units.data.value) {
			unitsStoreInstance.unitsList = units.data.value
		}

		return {
			unitsStore: unitsStoreInstance,
		}
	},

	render() {
		return (
			<div class={styles.unitsPage}>
				<UnitsSidebar/>
				{this.unitsStore.selectedUnit &&
					<UnitsInfo/>
				}
				<UnitsParamUpdateForm/>
			
			</div>
		)
	}
})
