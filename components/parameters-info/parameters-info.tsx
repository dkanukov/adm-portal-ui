import {computed, defineComponent, ref} from '#imports'
import {PropType} from 'vue'
import {
	ParametersInfoController,
	ParametersNumparam, ParametersSampleParam,
} from '#components'
import styles from './styles.module.css'
import {NumParam} from '~/models/num-param'
import {SampleParam} from '~/models/sample-param'
import {ParamType} from '~/types/param-type'
import {Unit} from '~/models/unit'
import { Accusation, AccusationStatus } from '~/models/accusation'

export default defineComponent({
	props: {
		selectedParameter: {
			type: Object as PropType<SampleParam | NumParam>,
			required: true,
		},
		units: {
			required: true,
			type: Array as PropType<Unit[]>
		},
		accusations: {
			required: true,
			type: Array as PropType<Accusation[]>
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
		},
		whenSelectedParameterUnitChange: {
			type: Function as PropType<(unitId: number) => void>,
			required: true,
		},
		whenSelectedParameterDefaultMultiplierChange: {
			type: Function as PropType<(multiplier: number) => void>,
			required: true,
		},
		whenSendMessageToAccusation: {
			type: Function as PropType<(accusationId: number, message: string) => Promise<boolean>>,
			required: true,
		},
		whenChangeAccustationStatus: {
			type: Function as PropType<(accusationId: number, status: AccusationStatus) => Promise<boolean>>,
			required: true,
		}
	},

	render() {
		return (
			<div class={styles.parametersController}>
				<ParametersInfoController
					accusations={this.accusations}
					selectedParameter={this.selectedParameter}
					whenSelectedParameterFieldChange={this.whenSelectedParameterFieldChange}
					whenSendMessageToAccusation={this.whenSendMessageToAccusation}
					whenChangeAccustationStatus={this.whenChangeAccustationStatus}
				/>
				<div>
					{
						this.selectedParameter.paramType === ParamType.numParam ? (
							<ParametersNumparam
								selectedParameter={this.selectedParameter as NumParam}
								units={this.units}
								whenSelectedParameterFieldChange={this.whenSelectedParameterFieldChange}
								whenNumParameterBracketsChange={this.whenNumParameterBracketsChange}
								whenNumParameterFirstIntervalChange={this.whenNumParameterFirstIntervalChange}
								whenNumParameterSecondIntervalChange={this.whenNumParameterSecondIntervalChange}
								whenNumParamSubmitButtonClick={this.whenNumParamSubmitButtonClick}
								whenSelectedParameterUnitChange={this.whenSelectedParameterUnitChange}
								whenSelectedParameterDefaultMultiplierChange={this.whenSelectedParameterDefaultMultiplierChange}
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
