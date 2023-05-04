import {defineComponent} from '#imports'
import { PropType } from 'vue' 
import { RatioParam } from '~/models/ratio-param'

export default defineComponent({
	props: {
		selectedRatio: {
			type: Object as PropType<RatioParam>,
			required: true
		}
	},
	render() {
		return (
			<div>
				
			</div>
		)
	}
})
