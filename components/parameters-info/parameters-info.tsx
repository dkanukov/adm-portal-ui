import {defineComponent} from '#imports'
import {ParametersInfoController} from '#components'
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
			type: Function as PropType<(newValue: Parameter)=> void>,
			required: true,
		}
	},
	render() {
		return (
			<div class={styles.parametersController}>
				<ParametersInfoController
					selectedParameter={this.selectedParameter}
					whenSelectedParameterFieldChange={this.whenSelectedParameterFieldChange}
				/>
			</div>
		)
	}
})