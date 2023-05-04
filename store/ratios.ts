import {defineStore} from 'pinia'
import { useFetch, ref } from '#imports'
import {Ref} from 'vue'
import { api } from '~/constants/api'
import { RatioParam } from '~/models/ratio-param'

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
	return {
		ratioParams,
		selectedRatio,
		fetchRatioParams,
		whenRatioParamSelect
	}
})
