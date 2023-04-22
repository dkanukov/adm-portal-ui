import {defineComponent, ref, watch, reactive} from '#imports'
import {PropType} from 'vue'
import {NumParam} from '~/models/num-param'
import {VSelect, VTextField} from 'vuetify/components'
import styles from './styles.module.css'

export const BRACKETS = {
	'[': true,
	']': true,
	'(': false,
	')': false
}

export default defineComponent({
	props: {
		selectedParameter: {
			required: true,
			type: Object as PropType<NumParam>
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
		}
	},

	setup(props) {
		const interval = ref(props.selectedParameter.actionRange)

		const handleIntervalBracketsChange = (newValue: string) => {
			props.whenNumParameterBracketsChange(newValue)
		}

		const handleFirstNumChange = (newValue: string) => {
			props.whenNumParameterFirstIntervalChange(newValue)
		}
		const handleSecondNumChange = (newValue: string) => {
			props.whenNumParameterSecondIntervalChange(newValue)
		}
		return {
			interval,
			handleIntervalBracketsChange,
			handleFirstNumChange,
			handleSecondNumChange
		}
	},

	render() {
		return (
			<div class={styles.row}>
				<VSelect
					class={styles.bracketsPicker}
					variant={'outlined'}
					items={['[', '(']}
					modelValue={this.selectedParameter.actionRange.backIncluded ? '[' : '('}
					onUpdate:modelValue={this.handleIntervalBracketsChange}
				/>
				<VTextField
					variant={'outlined'}
					modelValue={this.selectedParameter.actionRange.lowerLimit}
					onUpdate:modelValue={this.handleFirstNumChange}
				/>
				<VTextField
					variant={'outlined'}
					modelValue={this.selectedParameter.actionRange.upperLimit}
					onUpdate:modelValue={this.handleSecondNumChange}
				/>
				<VSelect
					class={styles.bracketsPicker}
					variant={'outlined'}
					items={[']', ')']}
					modelValue={this.selectedParameter.actionRange.frontIncluded ? ']' : ')'}
					onUpdate:modelValue={this.handleIntervalBracketsChange}
				/>
			</div>
	)}
})
