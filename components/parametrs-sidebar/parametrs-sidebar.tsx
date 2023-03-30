import {defineComponent, PropType} from '#imports'
import {VBtn, VIcon} from 'vuetify/components'
import {mdiDelete} from '@mdi/js'
import styles from './styles.module.css'

export interface Parameter {
	id: number,
	name: string,
	isCorrect: boolean
	abbreviation: string
	description: string,
}

export default defineComponent({
	props: {
		parametersList: {
			type: Array as PropType<Parameter[]>,
			required: true,
		},
		selectedParameter: {
			type: (Object || null) as PropType<Parameter | null>,
			required: true,
		},
		whenSelectParameter: {
			type: Function as PropType<(parameterId: number) => void>,
			required: true,
		},
	},

	setup(props){
		function handleParameterSelect(selectedItemId: number) {
			props.whenSelectParameter(selectedItemId)
		}

		return {
			handleParameterSelect,
		}
	},

	render() {
		return (
			<div class={styles.aside}>
				{
					this.parametersList.map((parameter) => (
						<div class={styles.deleteBtn}>
							<span>
								<VBtn
									variant={'text'}
									value={parameter.id}
									active={this.selectedParameter?.id === parameter.id}
									/*TODO: deal*/
									/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
									/*@ts-ignore*/
									onClick={() =>this.handleParameterSelect(parameter.id)}
									color={!parameter.isCorrect ? 'error' : ''}
								>
									{parameter.name}
								</VBtn>
							</span>

							<VBtn
								class={styles.deleteIcon}
								color={'#BDBDBD'}
								icon={mdiDelete}
								variant={'text'}
								height={36}
							/>
						</div>
					))
				}
			</div>
		)
	}
})
