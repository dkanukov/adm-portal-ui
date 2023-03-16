import {defineComponent} from '#imports'
import {NuxtPage, Header} from '#components'

export default defineComponent({
	render() {
		return (
			<div>
				<Header/>
				<NuxtPage/>
			</div>
		)
	}
})
