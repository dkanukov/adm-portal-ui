import {defineComponent, definePageMeta} from '#imports'

export default defineComponent({
	setup() {
		definePageMeta({
			layout: 'default',
		})
		const test = 1
		return {
			test
		}
	},

	render() {
		return (
			<div>{this.test}</div>
		)
	}
})
