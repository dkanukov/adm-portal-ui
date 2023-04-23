import {defineComponent, ref} from '#imports'
import {VBtn, VIcon, VTextField} from 'vuetify/components'
import {unitsStore} from '~/store/units'
import { UnitsCreateForm } from '#components'
import styles from './styles.module.css'
import {storeToRefs} from 'pinia'
import {mdiDelete} from '@mdi/js'

export interface ActionRange {
	back_included: boolean
	front_included: boolean
	lower_limit: string
	upper_limit: string
}

export interface UnitParam {
	abbreviation: string
	multiplier: string
	action_range: ActionRange
}

export interface Unit {
	unit_id: number,
	name: string,
	isCorrect: boolean
	description: string
	params: UnitParam[]
}

export default defineComponent({
	setup(){
		const newUnitButtonLoading = ref(false)
		const unitSearch = ref('')

		const units = unitsStore()
		const { unitsList } = storeToRefs(units)
		const filtredUnitsList = ref(unitsList.value)
		function handleUnitSelect(selectedItemId: number) {
			units.whenSelectUnit(selectedItemId)
		}

		async function handleUnitDelete (unitId: number) {
			await units.deleteUnit(unitId)
		}

		function handleUnitInputSearch(event: any){
			const value = event.target.value

			if (!value) {
				filtredUnitsList.value = unitsList.value
				return
			}

			filtredUnitsList.value = unitsList.value.filter(
				(unit)=>{
					return unit.name.toLowerCase().includes(value.toLowerCase())
				}
			)
		}

		async function onClickDeleteUnit (unitId:number) {
			await units.deleteUnit(unitId)
			filtredUnitsList.value = units.unitsList
		}

		return {
			unitsList,
			filtredUnitsList,
			handleUnitSelect,
			handleUnitDelete,
			handleUnitInputSearch,
			unitSearch,
			onClickDeleteUnit,
			newUnitButtonLoading,
			selectedUnit: units.selectedUnit
		}
	},

	render() {
		return (
			<div class={styles.aside}>
				<VTextField
					class={styles.inputFixedHeight}
					variant={'outlined'}
					label={'Название'}
					modelValue={this.unitSearch}
					/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
					/*@ts-ignore*/
					onInput={this.handleUnitInputSearch}
				/>

				<UnitsCreateForm />

				<div class={styles.scrollContainer}>
					{
						this.filtredUnitsList.map((item) => (
							<div class={styles.item} key={item.unit_id}>
								<div
									class={[
										styles.itemText,
									  item.unit_id === this.selectedUnit?.unit_id && styles.activeItem
									]}
									/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
									/*@ts-ignore*/
									vRipple
									onClick={() => this.handleUnitSelect(item.unit_id)}
								>
									{item.name}
									<VIcon
										class={styles.deleteIcon}
										icon={mdiDelete}
										size={'x-small'}
										color={'red'}
										data-unit-id={item.unit_id}
										/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
										/*@ts-ignore*/
										onClick={(event: MouseEvent) => {
											event.stopPropagation()
											event.preventDefault()
											this.onClickDeleteUnit(item.unit_id)
										}}
									/>
								</div>
							</div>
						))
					}
				</div>

			</div>
		)
	}
})
