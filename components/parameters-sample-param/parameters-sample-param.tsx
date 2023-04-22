import {defineComponent, ref, computed} from '#imports'
import {VBtn, VTable, VDialog, VCard, VCardTitle, VCardText, VCardActions, VTextField} from 'vuetify/components'
import {PropType} from 'vue'
import {SampleParam} from '~/models/sample-param'
import styles from './styles.module.css'
import {mdiPlus} from '@mdi/js'

export default defineComponent({
	props: {
		selectedParameter: {
			required: true,
			type: Object as PropType<SampleParam>
		},
		whenAddNewComponent: {
			type: Function as PropType<(paramId: number, name: string) => Promise<boolean>>,
			required: true,
		}
	},
	setup(props) {
		const isShowFormModal = ref(false)
		const newComponentName = ref('')

		const isButtonSubmitDisable = computed(() =>{
			return newComponentName.value.length !== 0
		})

		const handleAddComponentButtonClick = () => {
			isShowFormModal.value = true
		}

		const handleNewComponentInputNameChange = (value: string) => {
			newComponentName.value = value
		}

		const handleCloseForm = () => {
			newComponentName.value = ''
			isShowFormModal.value = false
		}

		const handleSubmitButtonClick = async () => {
			const isOk = await props.whenAddNewComponent(props.selectedParameter.paramId, newComponentName.value)
			if (isOk) {
				handleCloseForm()
				//TODO: добавить нотификацию
			}
		}

		return {
			handleAddComponentButtonClick,
			handleNewComponentInputNameChange,
			handleSubmitButtonClick,
			handleCloseForm,
			newComponentName,
			isShowFormModal,
			isButtonSubmitDisable
		}
	},
	render() {
		return(
			<div>
				<VDialog
					modelValue={this.isShowFormModal}
					onUpdate:modelValue={this.handleCloseForm}
				>
					<VCard>
						<VCardTitle>Добавление нового компонента</VCardTitle>
						<VCardText>
							<VTextField
								class={styles.inputFixedHeight}
								variant={'outlined'}
								label={'Название компонента'}
								modelValue={this.newComponentName}
								onUpdate:modelValue={this.handleNewComponentInputNameChange}
							/>
						</VCardText>
						<VCardActions>
							<VBtn
								disabled={!this.isButtonSubmitDisable}
								variant={'text'}
								color={'success'}
								/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
								/*@ts-ignore*/
								onClick={this.handleSubmitButtonClick}
							>
								Сохранить
							</VBtn>
							<VBtn
								variant={'text'}
								color={'error'}
								/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
								/*@ts-ignore*/
								onClick={this.handleCloseForm}
							>
								Отменить
							</VBtn>
						</VCardActions>
					</VCard>
				</VDialog>
				<VBtn
					variant={'text'}
					color={'info'}
					prependIcon={mdiPlus}
					/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
					/*@ts-ignore*/
					onClick={this.handleAddComponentButtonClick}
				>
					Добавить
				</VBtn>
				<VTable
					height={'calc(100vh - 315px)'}
				>
					<tbody>
					{
						this.selectedParameter.components?.length ? (
							this.selectedParameter.components.map((component) => (
								<tr>
									<th>
										{component.componentName}
									</th>
								</tr>
							))
						) : (
							<h1 class={styles.emptyMessage}>Пока нет компонентов</h1>
						)
					}
					</tbody>
				</VTable>
			</div>
		)
	}
})
