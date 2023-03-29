import {defineStore} from 'pinia'
import {Ref, ref, computed, unref} from 'vue'
import {Parameter} from '~/components/parametrs-sidebar/parametrs-sidebar'

export const parameterStore = defineStore('parameterStore', () =>{
	// TODO: убрать весь хардкор когда будет бэк
	const parametersList: Ref<Parameter[]> = ref([
		{
			id: 1,
			name: 'option 1',
			isCorrect: true,
		},
		{
			id: 2,
			name: 'option 2',
			isCorrect: true,
		},
		{
			id: 3,
			name: 'option 3',
			isCorrect: false,
		}
	])
	const selectedParameter: Ref<Parameter | null> = ref(null)
	function whenSelectParameter(parameterId: number) {
		const newParameter = parametersList.value.find((parameter) => parameter.id === parameterId)
		if (newParameter) {
			selectedParameter.value = newParameter
		}
	}

	return {
		parametersList,
		selectedParameter,
		whenSelectParameter
	}
})
