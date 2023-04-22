import {defineComponent, ref} from '#imports'
import {PropType} from 'vue'
import {VTable, VAutocomplete, VBtn} from 'vuetify/components'
import {NumParam} from '~/models/num-param'
import styles from './styles.module.css'
import {actionRangeToString} from '~/helpers/action-range-to-string'

export default defineComponent({
	props: {
		selectedParameter: {
			type: Object as PropType<NumParam>,
			required: true,
		},
	},
	setup(props) {
		// console.log(props.selectedParameter.units)
	},
	render() {
		return (
			<div>
				<VAutocomplete
					disabled
					variant={'outlined'}
					modelValue={this.selectedParameter.units.name}
				/>
				<VTable
					max-height={'calc(100vh - 315px)'}
				>
					<thead>
					<tr>
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
								<td class={styles.tableCell}>{param.abbreviation}</td>
								<td class={styles.tableCell}>{param.multiplier}</td>
								<td class={styles.tableCell}>{actionRangeToString(param.actionRange)}</td>
							</tr>
						))
					}
					</tbody>
				</VTable>
				{/*<VBtn*/}
				{/*	class={styles.submitButton}*/}
				{/*	variant={'flat'}*/}
				{/*	color={'success'}*/}
				{/*	onClick={this.handleSubmitButtonClick}*/}
				{/*>*/}
				{/*	Применить изменения123*/}
				{/*</VBtn>*/}
			</div>
		)
	}
})
