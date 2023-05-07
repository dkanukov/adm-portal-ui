import {defineStore} from 'pinia'
import { useFetch, ref } from '#imports'
import {Ref} from 'vue'
import { api } from '~/constants/api'
import { RatioParam } from '~/models/ratio-param'
export type FieldName = 'name' | 'abbreveation' | 'description'

export const ratiosStore = defineStore('ratioStore', () => {
	const ratioParams: Ref<RatioParam[] | null> = ref(null)
	const selectedRatio: Ref<RatioParam | null> = ref(null)

	const whenRatioParamSelect = (paramId: number) => {
		const ratioToSelect = ratioParams.value?.find((param) => param.calcId === paramId)
		if (!ratioToSelect) {
			return
		}
		selectedRatio.value = ratioToSelect 
	}

	const fetchRatioParams = async () => {
		const { data } = await useFetch(`${api}/get_param_calc/`)
		console.log(data)
		if (data) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			ratioParams.value = data.value.map((param: any) => new RatioParam(param))
		}
	}

	const whenRatioFieldChange = (value: string, field: FieldName) => {
		if (!selectedRatio.value) {
			return
		}
		switch (field) {
			case 'name': selectedRatio.value.name = value; return
			case 'abbreveation': selectedRatio.value.abbreviation = value; return
			case 'description': selectedRatio.value.description = value; return
		}
	}

	return {
		ratioParams,
		selectedRatio,
		fetchRatioParams,
		whenRatioParamSelect,
		whenRatioFieldChange ,
	}
})
