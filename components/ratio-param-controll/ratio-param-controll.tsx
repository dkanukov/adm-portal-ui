import { defineComponent } from '#imports'
import { PropType, Ref } from 'nuxt/dist/app/compat/capi'
import { onMounted, ref } from '#imports'
import { VTextField, VTextarea } from 'vuetify/components'
import { RatioParam } from '~/models/ratio-param'
import styles from './styles.module.css'
import { FieldName } from '~/store/ratios'

export default defineComponent({
	props: {
		selectedRatio: {
			required: true,
			type: Object as PropType<RatioParam>
		},
		whenRatioFieldChange: {
			type: Function as PropType<(value: string, field: FieldName) => void>,
			required: true,
		}
	},

	setup(props) {
		const handleParameterFieldChange = (value: string, field: FieldName) => {
			props.whenRatioFieldChange(value, field)	
		}

		return {
			handleParameterFieldChange,
		}
	},


	render() {
		return (
			<div>
				<div class={styles.row}>
					<VTextField
						class={styles.inputFixedHeight}
						variant={'outlined'}
						label={'Название'}
						modelValue={this.selectedRatio.name}
						onUpdate:modelValue={(value: string) => this.handleParameterFieldChange(value, 'name')}
					/>
					<VTextField
						class={styles.inputFixedHeight}
						variant={'outlined'}
						label={'Сокращение'}
						modelValue={this.selectedRatio.abbreviation}
						onUpdate:modelValue={(value: string) => this.handleParameterFieldChange(value, 'abbreveation')}
					/>
				</div>
				<VTextarea
					class={styles.description}
					rows={3}
					maxRows={8}
					density={'compact'}
					label={'Описание'}
					variant={'outlined'}
					modelValue={this.selectedRatio.description}
					onUpdate:modelValue={(value: string) => this.handleParameterFieldChange(value, 'description')}
				/>
			</div>
		)
	}
})
