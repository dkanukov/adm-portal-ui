import {defineComponent, ref, computed} from '#imports'
import {ParameterUnitsTable, RangeInput} from '#components'
import {NumParam} from '~/models/num-param'
import {VBtn, VAlert} from 'vuetify/components'
import styles from '~/components/parameters-info/styles.module.css'
import {PropType} from 'vue'
import {SampleParam} from '~/models/sample-param'
import {updatedDiff} from 'deep-object-diff'
import {Unit} from '~/models/unit'
export default defineComponent({
	props: {
		selectedParameter: {
			type: Object as PropType<NumParam>,
			required: true,
		},
		whenSelectedParameterFieldChange: {
			type: Function as PropType<(newValue: NumParam | SampleParam) => void>,
			required: true,
		},
		whenNumParameterBracketsChange: {
			type: Function as PropType<(newValue: string) => void>,
			required: true,
		},
		whenNumParameterFirstIntervalChange: {
			type: Function as PropType<(newValue: string) => void>,
			required: true,
		},
		whenNumParameterSecondIntervalChange: {
			type: Function as PropType<(newValue: string) => void>,
			required: true,
		},
		whenNumParamSubmitButtonClick: {
			type: Function as PropType<(numParam: NumParam) => Promise<boolean>>,
			required: true,
		},
		whenSelectedParameterUnitChange: {
			type: Function as PropType<(unitIdL: number) => void>,
			required: true,
		},
		units: {
			required: true,
			type: Array as PropType<Unit[]>
		},
		whenSelectedParameterDefaultMultiplierChange: {
			type: Function as PropType<(multiplier: number) => void>,
			required: true,
		}
	},
	setup(props) {
		const isOk = ref(false)
		const isShowNotification = ref(false)

		const handleSubmitButtonClick = async () => {
			isOk.value = await props.whenNumParamSubmitButtonClick(props.selectedParameter)
			isShowNotification.value = true
			setTimeout(() => {
				isShowNotification.value = false
			}, 1500)
		}

		return {
			handleSubmitButtonClick,
			isOk,
			isShowNotification,
		}
	},
	render() {
		return (
			<div>
				{/*TODO: вынести в компонент*/}
				<VAlert
					position={'fixed'}
					title={this.isOk ? 'Данные сохранены' : 'Произошла ошибка'}
					type={this.isOk ? 'success' : 'error'}
					modelValue={this.isShowNotification}
					density={'compact'}
					style={{
						top: '20px',
						right: '20px',
					}}
				/>
				<RangeInput
					selectedParameter={this.selectedParameter as NumParam}
					whenNumParameterBracketsChange={this.whenNumParameterBracketsChange}
					whenNumParameterFirstIntervalChange={this.whenNumParameterFirstIntervalChange}
					whenNumParameterSecondIntervalChange={this.whenNumParameterSecondIntervalChange}
				/>
				<ParameterUnitsTable
					units={this.units}
					whenSelectedParameterUnitChange={this.whenSelectedParameterUnitChange}
					whenSelectedParameterDefaultMultiplierChange={this.whenSelectedParameterDefaultMultiplierChange}
					selectedParameter={this.selectedParameter as NumParam}
				/>
				<VBtn
					class={styles.submitButton}
					variant={'flat'}
					color={'success'}
					/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
					/*@ts-ignore*/
					onClick={this.handleSubmitButtonClick}
				>
					Применить изменения
				</VBtn>
			</div>
		)
	}
})
