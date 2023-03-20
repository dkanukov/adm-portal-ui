import {defineComponent, definePageMeta} from '#imports'
import {NuxtLink} from '#components'
import {VMenu, VBtn, VList, VListItem, VListItemTitle} from 'vuetify/components'
import styles from './styles.module.css'

export default defineComponent({
	render() {
		return (
			<div class={styles.header}>
				<VBtn variant={'tonal'} color={'primary'}>
					Параметры
					<VMenu activator={'parent'}>
						<VList>
							<VListItem to={'/'}>
								<VListItemTitle>
									Ед. измерения
								</VListItemTitle>
							</VListItem>
							<VListItem to={'/options'}>
								<VListItemTitle>
									Параметры
								</VListItemTitle>
							</VListItem>
						</VList>
					</VMenu>
				</VBtn>

			</div>
		)
	}
})
