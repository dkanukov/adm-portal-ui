import {defineComponent, ref} from '#imports'
import {ParameterThread} from '#components'
import {VBtn, VCheckbox, VSelect, VTextarea, VTextField} from 'vuetify/components'
import {mdiCommentMultipleOutline} from '@mdi/js'
import styles from './styles.module.css'
import {PropType} from 'vue'
import {NumParam} from '~/models/num-param'
import {SampleParam} from '~/models/sample-param'
import {ParamKind} from '~/types/param-type'

export const DROPDOWN_ITEMS = [
	{
		value: ParamKind.relatedToScheme,
		label: 'Зависящий от схемы'
	},
	{
		value: ParamKind.reference,
		label: 'Справочный параметр'
	}
]

export default defineComponent({
	props: {
		selectedParameter: {
			type: Object as PropType<SampleParam | NumParam>,
			required: true,
		},
		whenSelectedParameterFieldChange: {
			type: Function as PropType<(newValue: NumParam) => void>,
			required: true,
		},
	},

	setup(props) {
		const parameterName = ref(props.selectedParameter.name)
		const parameterAbbr = ref(props.selectedParameter.abbreviation)
		const parameterDescription = ref(props.selectedParameter.description)
		const isInteger = ref(props.selectedParameter instanceof NumParam ? props.selectedParameter.isInteger : false)
		const isShowThread= ref(false)

		const handleParameterNameInput = (value: string) => {
			parameterName.value = value
			props.whenSelectedParameterFieldChange({
				...props.selectedParameter,
				name: parameterName.value,
			})
		}

		const handleParameterAbbrInput = (value: string) => {
			parameterAbbr.value = value
			props.whenSelectedParameterFieldChange({
				...props.selectedParameter,
				abbreviation: parameterAbbr.value,
			})
		}

		const handleParameterDescriptionInput = (value: string) => {
			parameterDescription.value = value
			props.whenSelectedParameterFieldChange({
				...props.selectedParameter,
				description: parameterDescription.value,
			})
		}

		const handleIntegerStatusToggle = () => {
			if (!(props.selectedParameter instanceof NumParam)) {
				return
			}

			isInteger.value = !isInteger.value
			props.whenSelectedParameterFieldChange({
				...props.selectedParameter,
				isInteger: isInteger.value,
			})
		}

		const handleCloseThreadButtonClick = () => {
			isShowThread.value = false
		}

		const handleParameterKindChange = (newValue: {label: string, value: ParamKind}) => {
			props.whenSelectedParameterFieldChange({
				...props.selectedParameter,
				kind: newValue.value
			})
		}

		return {
			isShowThread,
			isInteger,
			handleParameterNameInput,
			handleParameterAbbrInput,
			handleParameterDescriptionInput,
			handleCloseThreadButtonClick,
			handleIntegerStatusToggle,
			handleParameterKindChange
		}
	},

	render() {
		return (
			<div>
				<div class={styles.row}>
					<VBtn
						icon={mdiCommentMultipleOutline}
						variant={'text'}
						color={'#616161'}
						/*TODO: deal*/
						/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
						/* @ts-ignore */
						onClick={() => this.isShowThread = !this.isShowThread}
					/>
					<VTextField
						class={styles.inputFixedHeight}
						variant={'outlined'}
						label={'Название'}
						modelValue={this.selectedParameter.name}
						onUpdate:modelValue={this.handleParameterNameInput}
					/>
					<VTextField
						class={styles.inputFixedHeight}
						variant={'outlined'}
						label={'Сокращение'}
						modelValue={this.selectedParameter.abbreviation}
						onUpdate:modelValue={this.handleParameterAbbrInput}
					/>
				</div>
				ratioController
				<div class={styles.row}>
					<VSelect
						class={styles.selectFixedWidth}
						modelValue={this.selectedParameter.kind === ParamKind.relatedToScheme ? DROPDOWN_ITEMS[0] : DROPDOWN_ITEMS[1]}
						variant={'outlined'}
						items={DROPDOWN_ITEMS}
						itemTitle={'label'}
						itemValue={'value'}
                        returnObject
						onUpdate:modelValue={this.handleParameterKindChange}
					/>
					{'units' in this.selectedParameter && (
						<VCheckbox
							label={'Целочисленный параметр'}
							color={'success'}
							modelValue={this.selectedParameter.isInteger}
							/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
							/*@ts-ignore*/
							onClick={this.handleIntegerStatusToggle}
						/>)}
				</div>
				<ParameterThread
					handleCloseThreadButtonClick={this.handleCloseThreadButtonClick}
					isShowThread={this.isShowThread}
					selectedParameter={this.selectedParameter}
				/>
			</div>
		)
	}
})
