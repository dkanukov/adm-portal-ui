import {defineComponent} from '#imports'
import {ParametrsSidebar, ParametersInfo} from '#components'
import {parameterStore} from '~/store/parametrs'
import styles from './styles.module.css'

export default defineComponent({
	setup() {
		const parameter = parameterStore()
		console.log(parameter.selectedParameter)
		return {
			parameterStore: parameter,
		}
	},
	render() {
		return (
			<div class={styles.parametersPage}>
				<ParametrsSidebar
					parametersList={this.parameterStore.parametersList}
					whenSelectParameter={this.parameterStore.whenSelectParameter}
					selectedParameter={this.parameterStore.selectedParameter}
				/>
				{this.parameterStore.selectedParameter &&
					<ParametersInfo
					selectedParameter={this.parameterStore.selectedParameter}
				/>
				}
			</div>
		)
	}
})
