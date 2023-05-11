import {defineComponent} from '#imports'
import { PropType } from 'vue' 
import { RatioParamControll, RatioParamEditor } from '#components'
import { RatioParam } from '~/models/ratio-param'
import styles from './styles.module.css'
import { FieldName } from '~/store/ratios'

export default defineComponent({
	props: {
		selectedRatio: {
			type: Object as PropType<RatioParam>,
			required: true
		},
		whenRatioFieldChange: {
			type: Function as PropType<(value: string, field: FieldName) => void>,
			required: true,
		}
	},
	render() {
		return (
			<div class={styles.ratioController}>
				<RatioParamControll
					selectedRatio={this.selectedRatio}
					whenRatioFieldChange={this.whenRatioFieldChange}
				/>
				<RatioParamEditor
					selectedRatio={this.selectedRatio}
				/>
			</div>
		)
	}
})
