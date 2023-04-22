import {defineComponent, ref} from '#imports'
import {PropType, Ref} from 'vue'
import {
	VAutocomplete,
	VBtn,
	VCard,
	VCardText,
	VCardTitle,
	VDialog,
	VSelect,
	VTextarea,
	VTextField
} from 'vuetify/components'
import {Notification} from '#components'
import styles from './styles.module.css'
import {NumParam} from '~/models/num-param'
import {SampleParam} from '~/models/sample-param'
import {mdiPlus} from '@mdi/js'
import {DROPDOWN_ITEMS} from '~/components/parameters-info-controller/parameters-info-controller'
import {PARAM_KIND_READABLE, ParamKind, ParamType} from '~/types/param-type'
import NumberParameterForm from '~/components/number-parameter-form/number-parameter-form'
import SampleParameterForm from '~/components/sample-parameter-form/sample-parameter-form'
import {Unit} from '~/models/unit'

export default defineComponent({
	props: {
		parametersList: {
			type: Array as PropType<(NumParam | SampleParam)[]>,
			required: true,
		},
		selectedParameter: {
			type: (Object || null) as PropType<NumParam | SampleParam | null>,
			required: true,
		},
		whenSelectParameter: {
			type: Function as PropType<(parameterId: number) => void>,
			required: true,
		},
		whenCreateNewNumberParameter: {
			type: Function as PropType<(name: string, description: string, abbreviation: string, kind: string, isInteger: boolean, actionRange: {
				backIncluded: boolean,
				lowerLimit: string,
				upperLimit: string,
				frontIncluded: boolean,
			},  unitId: string) => Promise<boolean>>,
			required: true
		},
		whenCreateNewSampleParameter: {
			type: Function as PropType<(name: string, description: string, abbreviation: string, kind: string) => Promise<boolean>>,
			required: true
		},
		units: {
			type: Array as PropType<Unit[]>,
			required: true
		}
	},

	setup(props) {
		const isShowCreateParameterForm = ref(false)
		const type: Ref<ParamType> = ref(ParamType.numParam)
		const kind: Ref<ParamKind> = ref(ParamKind.reference)
		const name = ref('')
		const abbreviation = ref('')
		const description = ref('')
		const actionRange = ref({
			backIncluded: false,
			lowerLimit: '',
			upperLimit: '',
			frontIncluded: false,
		})
		const selectedUnitId = ref('')
		const isOk = ref(false)
		const isShowNotification = ref(false)

		const handleIntervalBracketsChange = (newValue: string) => {
			switch (newValue) {
				case '(': actionRange.value.backIncluded = false; break
				case ')': actionRange.value.frontIncluded = false; break
				case '[': actionRange.value.backIncluded = true; break
				case ']': actionRange.value.frontIncluded = true; break
			}
		}

		const handleParameterSelect = (selectedItemId: number) => {
			props.whenSelectParameter(selectedItemId)
		}

		const handleAddParameter = () => {
			isShowCreateParameterForm.value = true
		}

		const handleCloseForm = () => {
			isShowCreateParameterForm.value = false
		}

		const handleParameterKindChange = (value: {label: string, value: ParamKind}) => {
			kind.value = value.value
		}

		const handleParameterTypeChange = (value: {label: string, value: ParamType}) => {
			type.value = value.value
		}

		const handleNameChange = (value: string) => {
			name.value = value
		}

		const handleAbbreviationChange = (value: string) => {
			abbreviation.value = value
		}

		const handleDescriptionChange = (value: string) => {
			description.value = value
		}

		const handleNumParameterFirstIntervalChange = (newValue: string) => {
			actionRange.value.lowerLimit = newValue
		}

		const handleNumParameterSecondIntervalChange = (newValue: string) => {
			actionRange.value.upperLimit = newValue
		}

		const handleSubmitNumParameter = async () => {
			isOk.value = await props.whenCreateNewNumberParameter(name.value, description.value, abbreviation.value, kind.value, false, actionRange.value, selectedUnitId.value)
			isShowNotification.value = true
			setTimeout(() => {
				isShowNotification.value = false
			}, 1500)
		}

		const handleSubmitSampleParam = async () => {
			isOk.value = await props.whenCreateNewSampleParameter(name.value, description.value, abbreviation.value, kind.value)
			isShowNotification.value = true
			setTimeout(() => {
				isShowNotification.value = false
			}, 1500)
		}

		const handleSelectUnitId = (value: string) => {
			selectedUnitId.value = value
		}

		return {
			handleParameterSelect,
			handleAddParameter,
			handleCloseForm,
			handleParameterKindChange,
			handleParameterTypeChange,
			handleNumParameterFirstIntervalChange,
			handleNumParameterSecondIntervalChange,
			handleNameChange,
			handleAbbreviationChange,
			handleDescriptionChange,
			handleIntervalBracketsChange,
			handleSubmitNumParameter,
			handleSubmitSampleParam,
			isShowCreateParameterForm,
			type,
			actionRange,
			selectedUnitId,
			handleSelectUnitId,
			isOk,
			isShowNotification,
		}
	},

	render() {
		return (
			<div class={styles.aside}>
				<Notification
					isOk={this.isOk}
					isShowNotification={this.isShowNotification}
				/>
				<VDialog
					modelValue={this.isShowCreateParameterForm}
					onUpdate:modelValue={this.handleCloseForm}
				>
					<VCard>
						<VCardTitle>Добавление нового параметра</VCardTitle>
						<VCardText>
							<div class={styles.selectsRow}>
								<VSelect
									variant={'outlined'}
									label={'Тип параметра'}
									items={PARAM_KIND_READABLE}
									itemTitle={'label'}
									itemValue={'value'}
									returnObject
									onUpdate:modelValue={this.handleParameterTypeChange}
								/>
								<VSelect
									variant={'outlined'}
									label={'Тип параметра'}
									items={DROPDOWN_ITEMS}
									itemTitle={'label'}
									itemValue={'value'}
									returnObject
									onUpdate:modelValue={this.handleParameterKindChange}
								/>
							</div>
							<VTextField
								variant={'outlined'}
								label={'Название'}
								onUpdate:modelValue={this.handleNameChange}
							/>
							<VTextField
								variant={'outlined'}
								label={'Сокращение'}
								onUpdate:modelValue={this.handleAbbreviationChange}
							/>
							<VTextarea
								variant={'outlined'}
								label={'Описание'}
								onUpdate:modelValue={this.handleDescriptionChange}
							/>
							{
								this.type === ParamType.numParam ? (
									<NumberParameterForm
										actionRange={this.actionRange}
										handleIntervalBracketsChange={this.handleIntervalBracketsChange}
										handleSubmitNumParameter={this.handleSubmitNumParameter}
										handleNumParameterFirstIntervalChange={this.handleNumParameterFirstIntervalChange}
										handleNumParameterSecondIntervalChange={this.handleNumParameterSecondIntervalChange}
										handleSelectUnitId={this.handleSelectUnitId}
										units={this.units}
									/>
								) : (
									<div class={styles.row}>
										<VBtn
											variant={'tonal'}
											color={'success'}
											/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
											/*@ts-ignore*/
											onClick={this.handleSubmitSampleParam}
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
								)
							}
						</VCardText>
					</VCard>
				</VDialog>
				<div>
					<VAutocomplete
						class={styles.sidebarSearch}
						label={'Поиск'}
						variant={'outlined'}
						items={this.parametersList}
						/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
						/*@ts-ignore*/
						modelValue={this.selectedParameter}
						/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
						/*@ts-ignore*/
						onUpdate:modelValue={(param) => this.handleParameterSelect(param.paramId)}
						itemTitle={'name'}
						itemValue={'paramId'}
						returnObject
						menuProps={{
							maxWidth: '100%'
						}}
						hideDetails
					/>
					<VBtn
						class={styles.addButton}
						color={'info'}
						variant={'outlined'}
						prependIcon={mdiPlus}
						/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
						/*@ts-ignore*/
						onClick={this.handleAddParameter}
					>
						Добавить
					</VBtn>
				</div>
				<div class={styles.scrollContainer}>
					{
						this.parametersList.map((parameter) => (
							<div class={styles.item} key={parameter.paramId}>
								<div
									class={[styles.itemText,
										parameter.paramId === this.selectedParameter?.paramId && styles.activeItem]}
									/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
									/*@ts-ignore*/
									vRipple
									onClick={() => this.handleParameterSelect(parameter.paramId)}
								>
									{parameter.name}
								</div>
							</div>
						))
					}
				</div>

			</div>
		)
	}
})
