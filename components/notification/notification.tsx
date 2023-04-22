import {defineComponent} from '#imports'
import {VAlert} from 'vuetify/components'

export default defineComponent({
	props: {
		isShowNotification: {
			required: true,
			type: Boolean
		},
		isOk: {
			required: true,
			type: Boolean
		}
	},
	render() {
		return (
			<VAlert
				position={'fixed'}
				title={this.isOk ? 'Данные сохранены' : 'Произошла ошибка'}
				type={this.isOk ? 'success' : 'error'}
				modelValue={this.isShowNotification}
				density={'compact'}
				style={{
					top: '20px',
					right: '20px',
				}}
			/>
		)
	}
})
