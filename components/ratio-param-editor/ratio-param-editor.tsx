import { defineComponent, ref, onMounted } from '#imports'
import { PropType, Ref } from 'nuxt/dist/app/compat/capi'
import { RatioParam } from '~/models/ratio-param'
import { MonacoEditor } from '#components'
import styles from './styles.module.css'

export default defineComponent({
	props: {
		selectedRatio: {
			required: true,
			type: Object as PropType<RatioParam>
		}
	},

	setup() {
		const code = ref('')

		const handleCodeInput = (value: string) => {
			code.value = value
		}
		
		return {
			code,
			handleCodeInput
		}
	},

	render() {
		return (
			<div>
				<MonacoEditor
					lang={'csharp'}
					class={styles.editor}
					modeValue={this.selectedRatio.code}
				/>
			</div>
		)
	}
})
