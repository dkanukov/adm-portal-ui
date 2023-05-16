import {defineComponent} from '#imports'
import {ParametrsSidebar, ParametersInfo} from '#components'
import {parameterStore} from '~/store/parametrs'
import styles from './styles.module.css'

export default defineComponent({
	async setup() {
		const parameter = parameterStore()
		await parameter.fetchAllParams()

		return {
			parameterStore: parameter,
		}
	},
	render() {
		return (
			<div class={styles.parametersPage}>
				{this.parameterStore.allParams &&
					<ParametrsSidebar
						parametersList={this.parameterStore.allParams}
						whenSelectParameter={this.parameterStore.whenSelectParameter}
						selectedParameter={this.parameterStore.selectedParameter}
						whenCreateNewNumberParameter={this.parameterStore.whenCreateNewNumberParameter}
						whenCreateNewSampleParameter={this.parameterStore.whenCreateNewSampleParameter}
						units={this.parameterStore.units}
				/>}
				{this.parameterStore.selectedParameter && this.parameterStore.accusation &&
					<ParametersInfo
						class={styles.info}
						selectedParameter={this.parameterStore.selectedParameter}
						units={this.parameterStore.units}
						accusations={this.parameterStore.accusation}
						whenSendMessageToAccusation={this.parameterStore.whenSendMessageToAccusation}
						whenSelectedParameterUnitChange={this.parameterStore.whenSelectedParameterUnitChange}
						whenSelectedParameterFieldChange={this.parameterStore.whenSelectedParameterFieldChange}
						whenNumParameterBracketsChange={this.parameterStore.whenNumParameterBracketsChange}
						whenNumParameterFirstIntervalChange={this.parameterStore.whenNumParameterFirstIntervalChange}
						whenNumParameterSecondIntervalChange={this.parameterStore.whenNumParameterSecondIntervalChange}
						whenNumParamSubmitButtonClick={this.parameterStore.whenNumParamSubmitButtonClick}
						whenAddNewComponent={this.parameterStore.whenAddNewComponent}
						whenSelectedParameterDefaultMultiplierChange={this.parameterStore.whenSelectedParameterDefaultMultiplierChange}
						whenChangeAccustationStatus={this.parameterStore.whenChangeAccustationStatus}
				/>}
			</div>
		)
	}
})
