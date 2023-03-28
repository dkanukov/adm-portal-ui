import {defineComponent, PropType} from '#imports'
import {VBtn, VIcon} from 'vuetify/lib/components'
import {mdiDelete} from '@mdi/js'
import styles from './styles.module.css'

export default defineComponent({
	props: {
		optionsList: {
			type: Array as PropType<{id: number, name: string}[]>,
			required: true,
		},
	},
	// setup(){},

	render() {
		return (
			<div class={styles.aside}>
				{
					this.$props.optionsList.map((option) => (
						<div class={styles.deleteBtn}>
							<span>
								<VBtn
									variant={'text'}
									value={option.id}
									onCLick={(e) => console.log(e)}
									// onClick={(e) => console.log(e)}
								>
									{option.name}
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
