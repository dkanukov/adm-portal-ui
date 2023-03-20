import {defineComponent, ref, isReactive} from '#imports'
import {VTextField} from 'vuetify/components'
import styles from './styles.module.css'

export default defineComponent({
	setup() {
		const inputValue = ref('')

		function handelInputChange (value: string) {
			inputValue.value = value
		}

		return {
			inputValue,
			handelInputChange,
		}
	},

	render() {
		return (
			<div class={styles.sidebar}>
				<VTextField
					variant={'outlined'}
					hideDetails={'auto'}
					label={'Название'}
					onUpdate:modelValue={this.handelInputChange}
				/>
			</div>
		)
	}
})
