import {defineComponent, definePageMeta} from '#imports'
import {Sidebar} from '#components'

export default defineComponent({
	setup() {
		definePageMeta({
			layout: 'default',
		})
	},

	render() {
		return (
			<div>
				<Sidebar/>
			</div>
		)
	}
})
