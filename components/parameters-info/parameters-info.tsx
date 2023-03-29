import {defineComponent, ref} from '#imports'
import {ParametersInfoController, ParametersTable, ParametersReferenceList} from '#components'
import styles from './styles.module.css'
import {PropType} from 'vue'
import {Parameter} from '~/components/parametrs-sidebar/parametrs-sidebar'
import {parameterTypes} from '~/constants/parameter-types'

// TODO: вынести в константы

export default defineComponent({
	props: {
		selectedParameter: {
			type: Object as PropType<Parameter>,
			required: true,
		},
		whenSelectedParameterFieldChange: {
			type: Function as PropType<(newValue: Parameter) => void>,
			required: true,
		},
	},

	setup() {
		const parameterType = ref(parameterTypes[0])

		function handleParameterTypeChange(value: { value: string, option: string }) {
			parameterType.value = value
		}

		return {
			parameterType,
			handleParameterTypeChange
		}
	},

	render() {
		return (
			<div class={styles.parametersController}>
				<ParametersInfoController
					parameterType={this.parameterType}
					handleParameterTypeChange={this.handleParameterTypeChange}
					selectedParameter={this.selectedParameter}
					whenSelectedParameterFieldChange={this.whenSelectedParameterFieldChange}
				/>
				<div>
					{
						this.parameterType.value === 'relatedToScheme' ? (
							<div>
								тут будет кастомный элемент для выбора диапазона
								<ParametersTable/>
							</div>
						) : (
							<ParametersReferenceList/>
						)
					}
				</div>
			</div>
		)
	}
})
