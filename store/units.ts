import {defineStore} from 'pinia'
import {Ref, ref, computed, unref, isReactive} from 'vue'
import {Unit, UnitParam} from '~/components/units-sidebar/units-sidebar'
import {useApiRequest} from '~/composables/useApiRequest'

export const unitsStore = defineStore('unitsStore', () =>{
	const unitsList: Ref<Unit[]> = ref([])
	const selectedUnit: Ref<Unit | null> = ref(null)

	function whenSelectUnit(unitId: number) {
		const newUnit = unitsList.value.find((unit) => unit.unit_id === unitId)

		if (newUnit) {
			selectedUnit.value = newUnit
		}
	}

	function whenSelectedUnitFieldChange(newValue: Unit) {
		if (!selectedUnit.value) {
			return
		}
		selectedUnit.value = {...newValue}

		const unitToUpdate = unitsList.value.find((unit) => unit.unit_id === newValue.unit_id)
		if (unitToUpdate) {
			unitToUpdate.name = newValue.name
			unitToUpdate.description = newValue.description
		}
	}

	async function getUnits (): Promise<Unit[]> {
		const response = await useApiRequest<Unit[]>('/get_units')
		if (!response || !response.data || !response.data.value) {
			return []
		}

		unitsList.value = response.data.value

		return response.data.value
	}

	async function deleteUnit (unitId:any): Promise<any> {
		const response = await useApiRequest<any>('/delete_unit/?unit_id=' + unitId, {
			method: 'DELETE',
		})
			await getUnits()
			return response
	}

	async function createNewUnit (payload: { name: string, description: string }): Promise<any> {
		const response = await useApiRequest<any>('/create_unit/', {
			method: 'POST',
			body: {
				name: payload.name,
				description: payload.description,

				params: [{
					abbreviation: 'Новый параметр',
					multiplier: 1,
					action_range: {
						front_included: true,
						lower_limit: 0,
						upper_limit: 1000,
						back_included: true
					}
				}],
			}
		})

		await getUnits()

		return response.data
	}

	async function updateExistingUnit (payload: Unit): Promise<any> {
		if (!payload) {
			return
		}

		const response = await useApiRequest<any>('/update_unit/', {
			method: 'PUT',
			body: {
				unit_id: payload.unit_id,
				name: payload.name,
				description: payload.description,
				params: payload.params,
			}
		})

		await getUnits()

		return response.data
	}

	async function addNewParamToExistingUnit (): Promise<Unit|null> {
		if (!selectedUnit.value) { return null }
		const payload = { ...selectedUnit.value }
		payload.params.push({
			abbreviation: 'Новый параметр',
			multiplier: '1',
			action_range: {
				back_included: true,
				front_included: true,
				lower_limit: '0',
				upper_limit: '1000',
			}
		})
		const unit = await updateExistingUnit(payload)
		return unit
	}

	async function removeSelectedUnitParam (index: number): Promise<Unit|null> {
		if (typeof index !== 'number' || !selectedUnit.value) { return null }
		const payload = { ...selectedUnit.value }
		payload.params.splice(index, 1)
		const unit = await updateExistingUnit(payload)
		return unit
	}

	async function updateSelectedUnitParam (index: number, updatedValue: UnitParam): Promise<Unit|null> {
		if (typeof index !== 'number' || !selectedUnit.value || !updatedValue) { return null }
		const payload = { ...selectedUnit.value }
		payload.params[index] = updatedValue
		const unit = await updateExistingUnit(payload)
		return unit
	}

	return {
		unitsList,
		selectedUnit,
		deleteUnit,
		createNewUnit,
		whenSelectUnit,
		updateExistingUnit,
		removeSelectedUnitParam,
		updateSelectedUnitParam,
		addNewParamToExistingUnit,
		whenSelectedUnitFieldChange
	}
})
