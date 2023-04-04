import {defineStore} from 'pinia'
import {Ref, ref, computed, unref, isReactive} from 'vue'
import {Unit} from '~/components/units-sidebar/units-sidebar'

export const unitsStore = defineStore('unitsStore', () =>{
	// TODO: убрать весь хардкор когда будет бэк
	const unitsList: Ref<Unit[]> = ref([
		{
			id: 1,
			name: 'unit 1',
			isCorrect: true,
			abbreviation: 'abbr1',
		},
		{
			id: 2,
			name: 'unit 2',
			isCorrect: true,
			abbreviation: 'abbr2',
		},
		{
			id: 3,
			name: 'unit 3',
			isCorrect: false,
			abbreviation: 'abbr3',
		}
	])
	const selectedUnit: Ref<Unit | null> = ref(null)


	function whenSelectUnit(unitId: number) {
		const newUnit = unitsList.value.find((unit) => unit.id === unitId)
		if (newUnit) {
			selectedUnit.value = newUnit
		}
	}

	function whenSelectedUnitFieldChange(newValue: Unit) {
		if (!selectedUnit.value) {
			return
		}
		selectedUnit.value = {...newValue}

		const unitToUpdate = unitsList.value.find((unit) => unit.id === newValue.id)
		if (unitToUpdate) {
			unitToUpdate.name = newValue.name
			unitToUpdate.abbreviation = newValue.abbreviation
		}
	}

	return {
		unitsList,
		selectedUnit,
		whenSelectUnit,
		whenSelectedUnitFieldChange
	}
})
