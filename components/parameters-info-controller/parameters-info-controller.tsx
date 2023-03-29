import {defineComponent, ref, isReactive, toRef, reactive} from '#imports'
import {VTextField, VTextarea, VChip, VBtn, VSelect} from 'vuetify/components'
import {mdiCommentMultipleOutline} from '@mdi/js'
import styles from './styles.module.css'
import {PropType} from 'vue'
import {Parameter} from '~/components/parametrs-sidebar/parametrs-sidebar'

export default defineComponent({
	props: {
		selectedParameter: {
			type: Object as PropType<Parameter>,
			required: true,
		},
		whenSelectedParameterFieldChange: {
			type: Function as PropType<(newValue: Parameter) => void>,
			required: true,
		}
	},

	setup(props) {
		const parameterName = ref(props.selectedParameter.name)
		const parameterAbbr = ref(props.selectedParameter.abbreviation)
		const parameterDescription = ref(props.selectedParameter.description)

		function handleParameterNameInput(value: string) {
			parameterName.value = value
			props.whenSelectedParameterFieldChange({
				...props.selectedParameter,
				name: parameterName.value,
			})
		}

		function handleParameterAbbrInput(value: string) {
			parameterAbbr.value = value
			props.whenSelectedParameterFieldChange({
				...props.selectedParameter,
				abbreviation: parameterAbbr.value,
			})
		}

		function handleParameterDescriptionInput(value: string) {
			parameterDescription.value = value
			props.whenSelectedParameterFieldChange({
				...props.selectedParameter,
				description: parameterDescription.value,
			})
		}

		return {
			handleParameterNameInput,
			handleParameterAbbrInput,
			handleParameterDescriptionInput,
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
						onClick={() => console.log('open chat')}
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
					<VTextarea
						label={'Описание'}
						variant={'outlined'}
						modelValue={this.selectedParameter.description}
						onUpdate:modelValue={this.handleParameterDescriptionInput}
					/>
				</div>
				<div class={styles.row}>

				</div>
			</div>
		)
	}
})
