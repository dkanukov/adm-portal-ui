import {defineComponent, ref,} from '#imports'
import {NuxtPage} from '#components'

defineComponent({
	setup() {
		const test = ref('')

		return {
			test
		}
	},

	render() {
		return (
			<div>
				<div>{this.test}</div>
				<NuxtPage />
			</div>
		)
	}
})
