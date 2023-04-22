import {computed, defineComponent, ref, PropType} from '#imports'
import {
	ParametersInfoController,
	ParameterUnitsTable,
	RangeInput,
	ParametersNumparam, ParametersSampleParam,
} from '#components'
import styles from './styles.module.css'
import {NumParam} from '~/models/num-param'
import {SampleParam} from '~/models/sample-param'
import {VBtn} from 'vuetify/components'
import {ParamType} from '~/types/param-type'

export default defineComponent({
	props: {
		selectedParameter: {
			type: Object as PropType<SampleParam | NumParam>,
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
		whenAddNewComponent: {
			type: Function as PropType<(paramId: number, name: string) => Promise<boolean>>,
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
				<div>
					{
						this.selectedParameter.paramType === ParamType.numParam ? (
							<ParametersNumparam
								selectedParameter={this.selectedParameter as NumParam}
								whenSelectedParameterFieldChange={this.whenSelectedParameterFieldChange}
								whenNumParameterBracketsChange={this.whenNumParameterBracketsChange}
								whenNumParameterFirstIntervalChange={this.whenNumParameterFirstIntervalChange}
								whenNumParameterSecondIntervalChange={this.whenNumParameterSecondIntervalChange}
								whenNumParamSubmitButtonClick={this.whenNumParamSubmitButtonClick}
							/>
						) : (
							<ParametersSampleParam
								selectedParameter={this.selectedParameter as SampleParam}
								whenAddNewComponent={this.whenAddNewComponent}
							/>
						)
					}
				</div>
			</div>
		)
	}
})
