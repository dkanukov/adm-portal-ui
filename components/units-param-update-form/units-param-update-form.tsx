import {defineComponent, ref, toRefs, useRoute, useRouter} from '#imports'
import {VBtn, VDialog, VTextField, VSelect} from 'vuetify/components'
import {unitsStore} from '~/store/units'
import styles from './styles.module.css'
import { storeToRefs } from 'pinia'


export default defineComponent({
	setup(){
		const units = unitsStore()
		const router = useRouter()
		const route = useRoute()
		const {
			query
		} = toRefs(route)
		const loading = ref(false)

		const unitParamName = ref('')
		const unitParamMultiplier = ref(0)
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
			actionRange.value.frontIncluded = value === '[' ? true : false
		}

		function handleEndIntervalBracketsChange(value: any){
			console.log(value)
			actionRange.value.backIncluded = value === ']' ? true : false
		}

		function handleNumParameterFirstIntervalChange(value: string){
			actionRange.value.lowerLimit = value
		}

		function handleNumParameterSecondIntervalChange(value: string){
			actionRange.value.upperLimit = value
		}

		function onConfirmUnitParamUpdate(){
			console.log('Update')
		}


		return {
			loading,
			query,
			actionRange,
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

	render() {
		return (
			<div class={styles.createForm}>
				<VDialog
					width={620}
					modelValue={Boolean(this.query.update_unit_param)}
					onUpdate:modelValue={this.handleDialogOpenStateChange}
				>
					<div class={styles.createFormBox}>
						<h3>Изменить параметр единицы измерения</h3>
						<VTextField
							label='Параметр единицы измерения'
							modelValue={this.unitParamName}
							onUpdate:modelValue={this.unitParamNameUpdateHandler}
						/>

						<VTextField
							label='Множитель единицы измерения'
							modelValue={this.unitParamMultiplier}
							onUpdate:modelValue={this.unitParamMultiplierUpdateHandler}
							type="number"
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
