import {defineComponent, ref} from '#imports'
import {PropType} from 'vue'
import {VTable, VAutocomplete, VBtn, VCheckbox} from 'vuetify/components'
import {NumParam} from '~/models/num-param'
import styles from './styles.module.css'
import {actionRangeToString} from '~/helpers/action-range-to-string'
import {Unit} from '~/models/unit'

export default defineComponent({
	props: {
		selectedParameter: {
			type: Object as PropType<NumParam>,
			required: true,
		},
		whenSelectedParameterUnitChange: {
			type: Function as PropType<(unitId: number) => void>,
			required: true,
		},
		units: {
			required: true,
			type: Array as PropType<Unit[]>
		},
		whenSelectedParameterDefaultMultiplierChange: {
			type: Function as PropType<(multiplier: number) => void>,
			required: true,
		}
	},
	setup(props) {
		const handleSelectUnitId = (id: number) => {
			props.whenSelectedParameterUnitChange(id)
		}

		const handleDefaultMultiplierChange = (multiplier: number) => {
			props.whenSelectedParameterDefaultMultiplierChange(multiplier)
		}

		return {
			handleSelectUnitId,
			handleDefaultMultiplierChange
		}
	},
	render() {
		return (
			<div>
				<VAutocomplete
					items={this.units}
					variant={'outlined'}
					/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
					/*@ts-ignore*/
					modelValue={this.selectedParameter.units.name}
					label={'Единица измерения'}
					onUpdate:modelValue={(unit) => this.handleSelectUnitId(unit.unitId)}
					itemTitle={'name'}
					itemValue={'unitId'}
					returnObject
					menuProps={{
						maxWidth: '100%'
					}}
					hideDetails
				/>
				<VTable
					max-height={'calc(100vh - 315px)'}
				>
					<thead>
					<tr>
						<th class={styles.tableCell}/>
						<th class={styles.tableCell}>
							Сокращение
						</th>
						<th class={styles.tableCell}>
							Множитель
						</th>
						<th class={styles.tableCell}>
							Диапазон действия
						</th>
					</tr>
					</thead>
					<tbody>
					{
						this.selectedParameter.units.params.map((param) => (
							<tr key={param.multiplier}>
								<td class={styles.tableCell}>
									<VCheckbox
										hideDetails={'auto'}
										color={'info'}
										modelValue={this.selectedParameter.defaultMultiplier == param.multiplier}
										/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
										/*@ts-ignore*/
										// onClick={(param) => this.handleDefaultMultiplierChange(param)}
										onUpdate:modelValue={() => this.handleDefaultMultiplierChange(param.multiplier)}
									/>
								</td>
								<td class={styles.tableCell}>{param.abbreviation}</td>
								<td class={styles.tableCell}>{param.multiplier}</td>
								<td class={styles.tableCell}>{actionRangeToString(param.actionRange)}</td>
							</tr>
						))
					}
					</tbody>
				</VTable>
			</div>
		)
	}
})
