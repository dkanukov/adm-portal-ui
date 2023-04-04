import {defineComponent, PropType} from '#imports'
import {VBtn, VIcon} from 'vuetify/components'
import {unitsStore} from '~/store/units'
import {mdiDelete} from '@mdi/js'
import styles from './styles.module.css'

export interface Unit {
	id: number,
	name: string,
	isCorrect: boolean
	abbreviation: string
}

export default defineComponent({
	setup(props){
		const units = unitsStore()
		function handleUnitSelect(selectedItemId: number) {
			units.whenSelectUnit(selectedItemId)
		}

		return {
			handleUnitSelect,
			unitsList: units.unitsList,
			selectedUnit: units.selectedUnit
		}
	},

	render() {
		return (
			<div class={styles.aside}>
				{
					this.unitsList.map((unit) => (
						<div class={styles.deleteBtn}>
							<span>
								<VBtn
									variant={'text'}
									value={unit.id}
									active={this.selectedUnit?.id === unit.id}
									/*TODO: разобраться почему нет onClick*/
									/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
									/*@ts-ignore*/
									onClick={() => this.handleUnitSelect(unit.id)}
									color={!unit.isCorrect ? 'error' : ''}
								>
									{unit.name}
								</VBtn>
							</span>

							<VBtn
								class={styles.deleteIcon}
								color={'#BDBDBD'}
								icon={mdiDelete}
								variant={'text'}
								height={36}
							/>
						</div>
					))
				}
			</div>
		)
	}
})
