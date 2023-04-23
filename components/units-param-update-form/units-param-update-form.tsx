import {defineComponent, ref, toRefs, useRoute, useRouter} from '#imports'
import {useToast} from 'vue-toast-notification'
import {VBtn, VDialog, VTextField, VSelect} from 'vuetify/components'
import {unitsStore} from '~/store/units'
import {UnitParam} from '../units-sidebar/units-sidebar'
import styles from './styles.module.css'

export default defineComponent({
	setup(){
		const units = unitsStore()
		const router = useRouter()
		const route = useRoute()
		const toast = useToast()
		const {
			query
		} = toRefs(route)
		const loading = ref(false)
		const unitParamName = ref('')
		const unitParamMultiplier = ref('')

		const isUpdateForm = ref<boolean>(false)

		const actionRange = ref({
			frontIncluded: true,
			backIncluded: true,
			lowerLimit: '0',
			upperLimit: '1000',

		})

		function handleDialogOpenStateChange(value: any){
			if (!value || value.type === 'click'){
				router.push({query:{update_unit_param: undefined}})
			}
		}

		function unitParamNameUpdateHandler(value: string){
			unitParamName.value=value
		}

		function unitParamMultiplierUpdateHandler(value: any){
			unitParamMultiplier.value=value
		}

		function handleStartIntervalBracketsChange(value: any){
			actionRange.value.frontIncluded = value === '['
		}

		function handleEndIntervalBracketsChange(value: any){
			actionRange.value.backIncluded = value === ']'
		}

		function handleNumParameterFirstIntervalChange(value: string){
			actionRange.value.lowerLimit = value
		}

		function handleNumParameterSecondIntervalChange(value: string){
			actionRange.value.upperLimit = value
		}

		async function onConfirmUnitParamUpdate(){
			const unitParamQuery:any = query.value.update_unit_param
			const unitId = unitParamQuery.split("-")[0]
			const existingUnit = units.unitsList.find((u) => {
				return u.unit_id === parseInt(unitId)
			})

			if (existingUnit) {
				const paramIndex = parseInt(unitParamQuery.split("-")[1])

				const paramMultiplierAlreadyExists = existingUnit.params.find((p, index) => {
					return (
						index !== paramIndex &&
						parseFloat(p.multiplier) === parseFloat(unitParamMultiplier.value)
					)
				})

				if (paramMultiplierAlreadyExists) {
					toast.error('Множитель должен быть уникальным')
					return
				}

				const param: UnitParam = {
					abbreviation: unitParamName.value,
					multiplier: unitParamMultiplier.value,
					action_range: {
						lower_limit: actionRange.value.lowerLimit,
						upper_limit: actionRange.value.upperLimit,
						back_included: actionRange.value.backIncluded,
						front_included: actionRange.value.frontIncluded,
					}
				}

				console.log(paramIndex)
				if (paramIndex !== undefined && !isNaN(paramIndex)) {
					// UPDATE EXISTING PARAM
					existingUnit.params[paramIndex] = param
				} else {
					// CREATE NEW PARAM
					existingUnit.params.push(param)
				}

				loading.value = true
				await units.updateExistingUnit(existingUnit)
				await units.getUnits()
				loading.value = false
				router.push({ query: { update_unit_param: undefined } })
			}
		}


		return {
			loading,
			query,
			actionRange,
			isUpdateForm,
			unitParamName,
			unitParamMultiplier,
			handleDialogOpenStateChange,
			unitParamNameUpdateHandler,
			unitParamMultiplierUpdateHandler,
			handleStartIntervalBracketsChange,
			handleNumParameterFirstIntervalChange,
			handleNumParameterSecondIntervalChange,
			handleEndIntervalBracketsChange,
			onConfirmUnitParamUpdate,
		}
	},

	watch: {
		query (newValue) {
			const units = unitsStore()
			if (newValue.update_unit_param) {
				const unitParamQuery: any = this.query.update_unit_param
				const unitId = unitParamQuery.split("-")[0]
				const paramIndex = parseInt(unitParamQuery.split("-")[1])

				const currentUnit = units.unitsList.find((unit)=>{
					return unit.unit_id === parseInt(unitId)
				})
				const currentUnitParametr = currentUnit ? currentUnit.params[paramIndex] : undefined

				this.isUpdateForm = unitParamQuery.split('-')[1] ? true : false
				this.unitParamName = currentUnitParametr ? currentUnitParametr.abbreviation : ''
				this.unitParamMultiplier = currentUnitParametr ? currentUnitParametr.multiplier : '1'
				this.actionRange.backIncluded = currentUnitParametr ? currentUnitParametr.action_range.back_included : true
				this.actionRange.frontIncluded = currentUnitParametr ? currentUnitParametr.action_range.front_included : true
				this.actionRange.lowerLimit = currentUnitParametr ? currentUnitParametr.action_range.lower_limit : '0'
				this.actionRange.upperLimit = currentUnitParametr ? currentUnitParametr.action_range.upper_limit : '1000'
			}
		} 
	},

	render() {
		return (
			<div class={styles.createForm}>
				<VDialog
					width={620}
					modelValue={Boolean(this.query.update_unit_param)}
					onUpdate:modelValue={this.handleDialogOpenStateChange}
				>
					<div class={styles.createFormBox}>
						<h3>{this.isUpdateForm ? 'Изменить параметр единицы измерения' : 'Добавить параметр единицы измерения'}</h3>
						<VTextField
							label='Параметр единицы измерения'
							modelValue={this.unitParamName}
							onUpdate:modelValue={this.unitParamNameUpdateHandler}
						/>

						<VTextField
							label='Множитель единицы измерения'
							modelValue={this.unitParamMultiplier}
							onUpdate:modelValue={this.unitParamMultiplierUpdateHandler}
						/>

						<div class={styles.row}>
							<VSelect
								class={styles.bracketsPicker}
								variant={'outlined'}
								items={['[', '(']}
								modelValue={this.actionRange.frontIncluded ? '[' : '('}
								onUpdate:modelValue={this.handleStartIntervalBracketsChange}
							/>
							<VTextField
								variant={'outlined'}
								modelValue={this.actionRange.lowerLimit}
								onUpdate:modelValue={this.handleNumParameterFirstIntervalChange}
							/>
							<VTextField
								variant={'outlined'}
								modelValue={this.actionRange.upperLimit}
								onUpdate:modelValue={this.handleNumParameterSecondIntervalChange}
							/>
							<VSelect
								class={styles.bracketsPicker}
								variant={'outlined'}
								items={[']', ')']}
								modelValue={this.actionRange.backIncluded ? ']' : ')'}
								onUpdate:modelValue={this.handleEndIntervalBracketsChange}
							/>
						</div>



						<div class={styles.createFormBox__Actions}>
							<VBtn
								/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
								/*@ts-ignore*/
								onClick={this.handleDialogOpenStateChange}
							>
								Отмена
							</VBtn>
							<VBtn
								color={'primary'}
								loading={this.loading}
								/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
								/*@ts-ignore*/
								onClick={this.onConfirmUnitParamUpdate}
							>
								Создать
							</VBtn>
						</div>
					</div>
				</VDialog>
			</div>
		)
	}
})
