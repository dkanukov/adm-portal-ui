import {defineStore} from 'pinia'
import {ref, useFetch} from '#imports'
import {api} from '~/constants/api'
import {NumParam} from '~/models/num-param'
import {SampleParam} from '~/models/sample-param'
import {Unit} from '~/models/unit'
import {Component} from '~/models/component'
import {Ref} from 'vue'

export const parameterStore = defineStore('parameterStore', () => {
	const selectedParameter: Ref<NumParam | SampleParam | null> = ref(null)
	const numParams: Ref<NumParam[] | null> = ref(null)
	const sampleParams: Ref<SampleParam[] | null> = ref(null)
	const units: Ref<Unit[]> = ref([])
	const allParams: Ref<(NumParam | SampleParam)[] | null> = ref(null)
	const paramById: Ref<Record<number, NumParam | SampleParam>> = ref({})

	const fetchNumParams = async () => {
		const {data} = await useFetch(`${api}/get_num_param/`)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		numParams.value = data.value.map((param) => new NumParam(param))
	}

	const fetchUnits = async () => {
		const {data} = await useFetch(`${api}/get_units/`)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		units.value = data.value.map((unit) => new Unit(unit))
	}

	const fetchSampleParams = async () => {
		const {data} = await useFetch(`${api}/get_sample_param/`)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		sampleParams.value = data.value.map((param) => new SampleParam(param))
	}

	const fetchAllParams = async () => {
		await Promise.all([
			fetchSampleParams(),
			fetchNumParams(),
			fetchUnits(),
		])
		if (!numParams.value || !sampleParams.value) {
			return
		}
		allParams.value = [...numParams.value, ...sampleParams.value]
		for (const param of allParams.value) {
			paramById.value[param.paramId] = param
		}
	}

	const whenSelectParameter = (parameterId: number) => {
		selectedParameter.value = paramById.value[parameterId]
	}

	const whenSelectedParameterUnitChange = (unitId: number) => {
		const selectedUnit = units.value.find((unit) => unit.unitId === unitId)
		if (!selectedParameter.value || !('units' in selectedParameter.value) || !selectedUnit) {
			return
		}
		selectedParameter.value.units = selectedUnit
	}

	const whenSelectedParameterDefaultMultiplierChange = (multiplier: number) => {
		if (!selectedParameter.value || !('units' in selectedParameter.value)) {
			return
		}

		selectedParameter.value.defaultMultiplier = multiplier
	}

	const whenSelectedParameterFieldChange = (newValue: NumParam | SampleParam) => {
		if (!selectedParameter.value || !allParams.value) {
			return
		}

		selectedParameter.value = {...newValue}

		const parameterToUpdate = allParams.value.find((param) => param.paramId === newValue.paramId)
		if (parameterToUpdate) {
			parameterToUpdate.name = newValue.name
			parameterToUpdate.abbreviation = newValue.abbreviation
			parameterToUpdate.description = newValue.description
			parameterToUpdate.kind = newValue.kind
			if ('units' in parameterToUpdate && 'units' in newValue) {
				parameterToUpdate.isInteger = newValue.isInteger
			}
		}
	}

	const whenNumParameterBracketsChange = (newValue: string) => {
		if (!selectedParameter.value || !('units' in selectedParameter.value) || !allParams.value) {
			return
		}

		switch (newValue) {
			case '(':
				selectedParameter.value.actionRange.backIncluded = false
				break
			case ')':
				selectedParameter.value.actionRange.frontIncluded = false
				break
			case '[':
				selectedParameter.value.actionRange.backIncluded = true
				break
			case ']':
				selectedParameter.value.actionRange.frontIncluded = true
				break
		}

		const paramToUpdate = allParams.value.find((param) => param.paramId === selectedParameter.value?.paramId) as NumParam
		if (paramToUpdate && ('units' in selectedParameter.value)) {
			switch (newValue) {
				case '(':
					selectedParameter.value.actionRange.backIncluded = false
					break
				case ')':
					selectedParameter.value.actionRange.frontIncluded = false
					break
				case '[':
					selectedParameter.value.actionRange.backIncluded = true
					break
				case ']':
					selectedParameter.value.actionRange.frontIncluded = true
					break
			}
		}
	}

	const whenNumParameterFirstIntervalChange = (newValue: string) => {
		if (!selectedParameter.value || !('units' in selectedParameter.value) || !allParams.value) {
			return
		}

		selectedParameter.value.actionRange.lowerLimit = newValue

		const paramToUpdate = allParams.value.find((param) => param.paramId === selectedParameter.value?.paramId) as NumParam
		if (paramToUpdate && ('units' in selectedParameter.value)) {
			paramToUpdate.actionRange.lowerLimit = newValue
		}
	}

	const whenNumParameterSecondIntervalChange = (newValue: string) => {
		if (!selectedParameter.value || !('units' in selectedParameter.value) || !allParams.value) {
			return
		}

		selectedParameter.value.actionRange.upperLimit = newValue

		const paramToUpdate = allParams.value.find((param) => param.paramId === selectedParameter.value?.paramId) as NumParam
		if (paramToUpdate && ('units' in selectedParameter.value)) {
			paramToUpdate.actionRange.upperLimit = newValue
		}
	}

	const whenNumParamSubmitButtonClick = async (numParam: NumParam): Promise<boolean> => {
		const {error} = await useFetch(`${api}/update_num_param/`, {
			method: 'PUT',
			body: {
				name: numParam.name,
				description: numParam.description,
				abbreviation: numParam.abbreviation,
				kind: numParam.kind,
				is_integer: numParam.isInteger,
				action_range: {
					front_included: numParam.actionRange.frontIncluded,
					lower_limit: numParam.actionRange.lowerLimit,
					upper_limit: numParam.actionRange.upperLimit,
					back_included: numParam.actionRange.backIncluded,
				},
				param_calculations: [],
				unit_id: numParam.units.unitId,
				default_multiplier: numParam.defaultMultiplier,
				param_id: numParam.paramId
			}
		})
		return !error.value
	}

	const whenAddNewComponent = async (paramId: number, name: string): Promise<boolean> => {
		const {error} = await useFetch(`${api}/create_param_component/`, {
			method: 'POST',
			body: JSON.stringify([{
				param_id: paramId,
				name,
			}])
		})

		const updatedParam = paramById.value[paramId] as SampleParam
		if (!error.value) {
			updatedParam.components?.push(new Component({
				param_id: paramId,
				comp_name: name
			}))
		}

		return !error.value
	}

	const whenCreateNewNumberParameter = async (name: string, description: string, abbreviation: string, kind: string, isInteger: boolean, actionRange: {
		backIncluded: boolean,
		lowerLimit: string,
		upperLimit: string,
		frontIncluded: boolean,
	}, unitId: string) => {
		const {error} = await useFetch(`${api}/create_num_param/`, {
			method: 'POST',
			body: {
				name,
				description,
				abbreviation,
				kind,
				is_integer: isInteger,
				action_range: {
					front_included: actionRange.frontIncluded,
					lower_limit: Number(actionRange.lowerLimit),
					upper_limit: Number(actionRange.upperLimit),
					back_included: actionRange.backIncluded,
				},
				param_calculations: [],
				unit_id: Number(unitId),
				// default_multiplier: 1
			}
		})
		return !error.value
	}

	const whenCreateNewSampleParameter = async (name: string, description: string, abbreviation: string, kind: string,) => {
		const {error} = await useFetch(`${api}/create_sample_param/`, {
			method: 'POST',
			body: {
				name,
				description,
				abbreviation,
				kind,
			}
		})
		return !error.value
	}

	return {
		numParams,
		sampleParams,
		allParams,
		units,
		selectedParameter,
		whenSelectParameter,
		whenSelectedParameterFieldChange,
		whenNumParameterBracketsChange,
		whenNumParameterFirstIntervalChange,
		whenNumParameterSecondIntervalChange,
		whenNumParamSubmitButtonClick,
		whenCreateNewNumberParameter,
		whenSelectedParameterUnitChange,
		whenSelectedParameterDefaultMultiplierChange,
		whenAddNewComponent,
		whenCreateNewSampleParameter,
		fetchNumParams,
		fetchSampleParams,
		fetchAllParams,
		fetchUnits,
	}
})
