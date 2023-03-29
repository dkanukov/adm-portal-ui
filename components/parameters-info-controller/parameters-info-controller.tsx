import {defineComponent, ref} from '#imports'
import {VTextField, VTextarea} from 'vuetify/components'
import styles from './styles.module.css'
import {PropType} from 'vue'
import {Parameter} from '~/components/parametrs-sidebar/parametrs-sidebar'

export default defineComponent({
	props: {
		selectedParameter: {
			type: Object as PropType<Parameter>,
			required: true,
		}
	},

	setup(props) {
		const parameterName = ref(props.selectedParameter.name)
		const parameterAbbr = ref(props.selectedParameter.abbreviation)
		const parameterDescription = ref('')

		function handleParameterNameInput(value: string) {
			parameterName.value = value
		}

		function handleParameterAbbrInput(value: string) {
			parameterAbbr.value = value
		}

		function handleParameterDescriptionInput(value: string) {
			parameterDescription.value = value
		}

		return {
			parameterName,
			parameterAbbr,
			parameterDescription,
			handleParameterNameInput,
			handleParameterAbbrInput,
			handleParameterDescriptionInput,
		}
	},

	render() {
		return (
			<div>
				<div>
					<div class={styles.row}>
						<VTextField
							class={styles.inputFixedHeight}
							variant={'outlined'}
							label={'Название'}
							modelValue={this.parameterName}
							onUpdate:modelValue={this.handleParameterNameInput}
						/>
						<VTextField
							class={styles.inputFixedHeight}
							variant={'outlined'}
							label={'Сокращение'}
							modelValue={this.parameterAbbr}
							onUpdate:modelValue={this.handleParameterAbbrInput}
						/>
						<VTextarea
							label={'Описание'}
							variant={'outlined'}
							modelValue={this.parameterDescription}
							onUpdate:modelValue={this.handleParameterDescriptionInput}
						/>
					</div>
				</div>
			</div>
		)
	}
})
