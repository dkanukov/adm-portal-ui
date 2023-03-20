import {defineComponent, definePageMeta} from '#imports'

export default defineComponent({
	setup() {
		definePageMeta({
			layout: 'default',
		})
	},

	render() {
		return (
			<div>Here is page</div>
		)
	}
})
