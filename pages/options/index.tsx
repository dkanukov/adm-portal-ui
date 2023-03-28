import {defineComponent} from '#imports'
import {Sidebar} from '#components'

export default defineComponent({
	setup() {
		// TODO: убрать весь хардкор когда будет бэк
		const optionsList = [
			{
				id: 1,
				name: 'option 1'
			},
			{
				id: 2,
				name: 'option 2'
			},
			{
				id: 3,
				name: 'option 3'
			}
		]
		return {
			optionsList
		}
	},
	render() {
		return (
			<div>
				<Sidebar
					optionsList={this.optionsList}
				/>
			</div>
		)
	}
})
