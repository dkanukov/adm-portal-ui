import {defineComponent} from '#imports'
import {PropType} from 'vue'
import {
	VAutocomplete,
	VBtn,
} from 'vuetify/components'
import styles from './styles.module.css'
import {mdiPlus} from '@mdi/js'
import {RatioParam} from '~/models/ratio-param'

export default defineComponent({
	props: {
		parametersList: {
			type: Array as PropType<RatioParam[]>,
			required: true,
		},
		selectedParameter: {
			type: (Object || null) as PropType<RatioParam | null>,
			required: true,
		},
		whenRatioParamSelect: {
			type: Function as PropType<(param: number) => void>,
			required: true
		}
	},

	setup(props) {
		const handleParameterSelect = (paramId: number) => {
			props.whenRatioParamSelect(paramId)
		}

		return {
			handleParameterSelect
		}
	},

	render() {
		return (
			<div class={styles.aside}>
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
							<div class={styles.item} key={parameter.calcId}>
								<div
									class={[styles.itemText,
										parameter.calcId === this.selectedParameter?.calcId && styles.activeItem]}
									/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
									/*@ts-ignore*/
									vRipple
									onClick={() => this.handleParameterSelect(parameter.calcId)}
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
