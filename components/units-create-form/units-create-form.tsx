import {defineComponent, ref} from '#imports'
import {VBtn, VDialog, VTextField} from 'vuetify/components'
import {unitsStore} from '~/store/units'
import styles from './styles.module.css'

export default defineComponent({
	setup(){
		const units = unitsStore()

		const loading = ref(false)
		const unitName = ref('')
		const unitDescription = ref('')

		const dialogIsOpen = ref(false)

		function handleDialogOpenStateChange () {
			dialogIsOpen.value = !dialogIsOpen.value
		}

		function unitNameUpdateHandler (value: string) {
			unitName.value = value
		}

		function unitDescriptionUpdateHandler (value: string) {
			unitDescription.value = value
		}

		async function onConfirmCreateUnit () {
			loading.value = true
			await units.createNewUnit({
				name: unitName.value,
				description: unitDescription.value
			})
			loading.value = false
			handleDialogOpenStateChange()
		}

		return {
			loading,

			unitName,
			unitDescription,

			unitNameUpdateHandler,
			unitDescriptionUpdateHandler,

			dialogIsOpen,
			onConfirmCreateUnit,
			handleDialogOpenStateChange
		}
	},

	render() {
		return (
			<div class={styles.createForm}>
				<VBtn
					/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
					/*@ts-ignore*/
					onClick={this.handleDialogOpenStateChange}
				>Добавить единицу измерения</VBtn>

				<VDialog
					width={620}
					modelValue={this.dialogIsOpen}
					onUpdate:modelValue={this.handleDialogOpenStateChange}
				>
					<div class={styles.createFormBox}>
						<h3>Добавить единицу измерения</h3>
						<VTextField
							placeholder='Название единицы измерения'
							modelValue={this.unitName}
							onUpdate:modelValue={this.unitNameUpdateHandler}
						/>

						<VTextField
							placeholder='Описание единицы измерения'
							modelValue={this.unitDescription}
							onUpdate:modelValue={this.unitDescriptionUpdateHandler}
						/>

						<div class={styles.createFormBox__Actions}>
							<VBtn onClick={this.handleDialogOpenStateChange}>Отмена</VBtn>
							<VBtn color={'primary'} loading={this.loading} onClick={this.onConfirmCreateUnit}>Создать</VBtn>
						</div>
					</div>
				</VDialog>
			</div>
		)
	}
})
