import {defineComponent, ref, isReactive, toRef, reactive} from '#imports'
import {unitsStore} from '~/store/units'
import {VTextField, VTextarea, VChip, VBtn, VSelect, VCheckbox} from 'vuetify/components'
import {mdiCommentMultipleOutline} from '@mdi/js'
import styles from './styles.module.css'
import {PropType} from 'vue'

export default defineComponent({
	setup(props) {
		const units = unitsStore()
		const unitName = ref(units.selectedUnit?.name)
		const unitAbbr = ref(units.selectedUnit?.abbreviation)

		function handleUnitNameInput(value: string) {
			unitName.value = value
			units.selectedUnit && units.whenSelectedUnitFieldChange({
				...units.selectedUnit,
				name: unitName.value,
			})
		}

		function handleUnitAbbrInput(value: string) {
			unitAbbr.value = value
			units.selectedUnit && units.whenSelectedUnitFieldChange({
				...units.selectedUnit,
				abbreviation: unitAbbr.value,
			})
		}

		return {
			handleUnitNameInput,
			handleUnitAbbrInput,
			selectedUnit: units.selectedUnit
		}
	},

	render() {
		return (
			<div>
				<div class={styles.row}>
					<VBtn
						icon={mdiCommentMultipleOutline}
						variant={'text'}
						color={'#616161'}
						/*TODO: deal*/
						/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
						/* @ts-ignore */
						onClick={() => console.log('open chat')}
					/>
					<VTextField
						class={styles.inputFixedHeight}
						variant={'outlined'}
						label={'Название'}
						modelValue={this.selectedUnit?.name}
						onUpdate:modelValue={this.handleUnitNameInput}
					/>
					<VTextField
						class={styles.inputFixedHeight}
						variant={'outlined'}
						label={'Сокращение'}
						modelValue={this.selectedUnit?.abbreviation}
						onUpdate:modelValue={this.handleUnitAbbrInput}
					/>
				</div>
			</div>
		)
	}
})
