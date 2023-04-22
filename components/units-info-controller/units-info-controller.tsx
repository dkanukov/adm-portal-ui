import {defineComponent, ref } from '#imports'
import {unitsStore} from '~/store/units'
import {VTextField, VBtn} from 'vuetify/components'
import {mdiCommentMultipleOutline} from '@mdi/js'
import styles from './styles.module.css'
import {storeToRefs} from 'pinia'
import {Unit} from '../units-sidebar/units-sidebar'

export default defineComponent({
	setup() {
		const units = unitsStore()
		const { selectedUnit } = storeToRefs(units)

		const unitName = ref(units.selectedUnit?.name || '')
		const unitDescription = ref(units.selectedUnit?.description || '')

		units.$subscribe(() => {
			unitName.value = selectedUnit.value ? selectedUnit.value?.name : ''
			unitDescription.value = selectedUnit.value ? selectedUnit.value?.description : ''
		})

		function handleUnitNameInput(value: string) {
			unitName.value = value
		}

		function handleUnitAbbrInput(value: string) {
			unitDescription.value = value
		}

		async function onClickUpdateUnit () {
			if (!selectedUnit.value) return

			const unit: Unit = {
				...selectedUnit.value,
				name: unitName.value,
				description: unitDescription.value
			}

			await units.updateExistingUnit(unit)
		}

		return {
			unitName,
			unitDescription,

			handleUnitNameInput,
			handleUnitAbbrInput,
			onClickUpdateUnit,
			selectedUnit
		}
	},

	render() {
		return (
			<div>
				{this.selectedUnit && (
					<div class={styles.row}>
						<VBtn
							icon={mdiCommentMultipleOutline}
							variant={'text'}
							color={'#616161'}
							/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
							/* @ts-ignore */
							onClick={() => console.log('open chat')}
						/>
						<VTextField
							class={styles.inputFixedHeight}
							variant={'outlined'}
							label={'Название единицы измерения'}
							modelValue={this.unitName}
							onUpdate:modelValue={this.handleUnitNameInput}
						/>
						<VTextField
							class={styles.inputFixedHeight}
							variant={'outlined'}
							label={'Описание единицы измерения'}
							modelValue={this.unitDescription}
							onUpdate:modelValue={this.handleUnitAbbrInput}
						/>
						<VBtn
							/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
							/* @ts-ignore */
							onClick={this.onClickUpdateUnit}
						>
							Обновить
						</VBtn>
					</div>
				)}
			</div>
		)
	}
})
