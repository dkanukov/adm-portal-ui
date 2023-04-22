import {defineComponent, ref} from '#imports'
import {VTextarea, VSelect, VTextField, VBtn, VAutocomplete} from 'vuetify/components'
import {Prop, PropType} from 'vue'
import styles from './styles.module.css'
import {Unit} from '~/models/unit'

export default defineComponent({
	props: {
		actionRange: {
			required: true,
			type: Object as PropType<{
				backIncluded: boolean,
				lowerLimit: string,
				upperLimit: string,
				frontIncluded: boolean,
			}>
		},
		handleIntervalBracketsChange: {
			type: Function as PropType<(newValue: string) => void>,
			required: true,
		},
		handleSubmitNumParameter: {
			type: Function as PropType<() => Promise<void>>,
			required: true
		},
		handleNumParameterFirstIntervalChange: {
			type: Function as PropType<(newValue: string) => void>,
			required: true
		},
		handleNumParameterSecondIntervalChange: {
			type: Function as PropType<(newValue: string) => void>,
			required: true
		},
		units: {
			type: Array as PropType<Unit[]>,
			required: true
		},
		handleSelectUnitId: {
			type: Function as PropType<(newValue: string) => void>,
			required: true,
		}
	},
	render() {
		return (
			<div>
				<VAutocomplete
					label={'Единица измерения'}
					variant={'outlined'}
					items={this.units}
					/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
					/*@ts-ignore*/
					// modelValue={this.selectedParameter}
					/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
					/*@ts-ignore*/
					onUpdate:modelValue={(unit) => this.handleSelectUnitId(unit.unitId)}
					itemTitle={'name'}
					itemValue={'unitId'}
					returnObject
					menuProps={{
						maxWidth: '100%'
					}}
					hideDetails
				/>
				<div class={styles.row}>
					<VSelect
						class={styles.bracketsPicker}
						variant={'outlined'}
						items={['[', '(']}
						modelValue={this.actionRange.backIncluded ? '[' : '('}
						onUpdate:modelValue={this.handleIntervalBracketsChange}
					/>
					<VTextField
						variant={'outlined'}
						modelValue={this.actionRange.lowerLimit}
						onUpdate:modelValue={this.handleNumParameterFirstIntervalChange}
					/>
					<VTextField
						variant={'outlined'}
						modelValue={this.actionRange.upperLimit}
						onUpdate:modelValue={this.handleNumParameterSecondIntervalChange}
					/>
					<VSelect
						class={styles.bracketsPicker}
						variant={'outlined'}
						items={[']', ')']}
						modelValue={this.actionRange.frontIncluded ? ']' : ')'}
						onUpdate:modelValue={this.handleIntervalBracketsChange}
					/>
				</div>
				<div class={styles.btnRow}>
					<VBtn
						variant={'tonal'}
						color={'success'}
						/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
						/*@ts-ignore*/
						onClick={this.handleSubmitNumParameter}
					>
						Сохранить
					</VBtn>
					<VBtn
						variant={'tonal'}
						color={'error'}
						/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
						/*@ts-ignore*/
						onClick={this.handleCloseForm}
					>
						Отменить
					</VBtn>
				</div>
			</div>

		)
	}
})
