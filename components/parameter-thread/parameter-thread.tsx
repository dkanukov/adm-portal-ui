import {defineComponent} from '#imports'
import styles from './styles.module.css'
import {
	VBtn,
	VCard,
	VDialog,
	VSpacer,
	VToolbar,
	VToolbarTitle,
	VCardText,
	VList,
	VListItem,
	VListGroup,
	VListItemTitle,
} from 'vuetify/components'
import {mdiClose} from '@mdi/js'
import {PropType} from 'vue'
import {Parameter} from '~/components/parametrs-sidebar/parametrs-sidebar'

export default defineComponent({
	props: {
		isShowThread: {
			type: Boolean,
			required: true
		},
		handleCloseThreadButtonClick: {
			type: Function as PropType<() => void>,
			required: true
		},
		selectedParameter: {
			type: Object as PropType<Parameter>,
			required: true,
		},
	},
	render() {
		return (
			<VDialog
				class={styles.dialog}
				modelValue={this.isShowThread}
				fullscreen
				persistent
			>
				<VCard>
					<VToolbar
						color={'primary'}
					>
						<VToolbarTitle>
							{this.selectedParameter.name}
						</VToolbarTitle>
						<VSpacer/>
						<VBtn
							icon={mdiClose}
							variant={'text'}
							/*TODO: deal*/
							/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
							/*@ts-ignore*/
							onClick={this.handleCloseThreadButtonClick}
						/>
					</VToolbar>
					<VList>
						<VListGroup value={'Group'}>
							<template v-slot:activator='{props}'>
								<VListItem ref_key={'props'} title={'Open'}/>
							</template>
							<VListItem title={'test title'}/>
						</VListGroup>
					</VList>
				</VCard>
			</VDialog>
		)
	}
})
