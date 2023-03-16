import {defineComponent, definePageMeta} from '#imports'
import {VMenu, VBtn, VList, VListItem, VListItemTitle} from 'vuetify/components'
import styles from './styles.module.css'

export default defineComponent({
	render() {
		return (
			<div class={styles.header}>
				123
				<VBtn color={'primary'}>
					Параметры
					<VMenu activator={'parent'}>
						<VList>
							<VListItem>
								<VListItemTitle>Link 1</VListItemTitle>
								<VListItemTitle>Link 2</VListItemTitle>
							</VListItem>
						</VList>
					</VMenu>
				</VBtn>

			</div>
		)
	}
})
