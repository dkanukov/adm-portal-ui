import {defineComponent, definePageMeta} from '#imports'
import {VMenu, VBtn, VList, VListItem, VListItemTitle} from 'vuetify/components'
import styles from './styles.module.css'

export default defineComponent({
	render() {
		return (
			<div class={styles.header}>
				<VBtn color={'primary'}>
					Параметры
					<VMenu activator={'parent'}>
						<VList>
							<VListItem
								href={'/'}
								active={this.$router.currentRoute.value.fullPath === '/'}
							>
								<VListItemTitle>Единицы измерения</VListItemTitle>
							</VListItem>
							<VListItem
								href={'/options'}
								active={this.$router.currentRoute.value.fullPath === '/options'}
							>
								<VListItemTitle>Параметры</VListItemTitle>
							</VListItem>
						</VList>
					</VMenu>
				</VBtn>

			</div>
		)
	}
})
