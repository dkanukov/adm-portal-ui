import {defineComponent, ref} from '#imports'
import styles from './styles.module.css'
import {
	VBtn,
	VCard,
	VDialog,
	VSpacer,
	VToolbar,
	VToolbarTitle,
    VExpansionPanel,
    VExpansionPanels,
    VExpansionPanelText,
    VTextField,
    VTextarea,
} from 'vuetify/components'
import {mdiClose} from '@mdi/js'
import {PropType} from 'vue'
import {NumParam} from '~/models/num-param'
import {SampleParam} from '~/models/sample-param'
import { Accusation } from '~/models/accusation'
import { dateFormatter } from '~/helpers/date-formatter'
import { mdiSendCircle } from '@mdi/js'
import { Ref } from 'nuxt/dist/app/compat/capi'

export default defineComponent({
	props: {
		accusations: {
			required: true,
			type: Array as PropType<Accusation[]>
		},
		isShowThread: {
			type: Boolean,
			required: true
		},
		handleCloseThreadButtonClick: {
			type: Function as PropType<() => void>,
			required: true
		},
		selectedParameter: {
			type: Object as PropType<NumParam | SampleParam>,
			required: true,
		},
		whenSendMessageToAccusation: {
			type: Function as PropType<(accusationId: number, message: string) => Promise<boolean>>,
			required: true,
		}
	},

	setup(props) {
		const inputValue = ref('')
		const accusationId: Ref<null | number> = ref(null)

		const handleMessageInput = (value: string) => {
			inputValue.value = value
		}

		const sendMessageWithKeyboardHandler = async (e: KeyboardEvent) => {
			if(e.key === 'Enter' && e.ctrlKey && accusationId.value) {
				const isOk = await props.whenSendMessageToAccusation(accusationId.value, inputValue.value)
				if (isOk) {
					inputValue.value = ''
				}
			}
		}

		const handleInputFocus = (isFocused: boolean, _accusationId: number) => {
			if (isFocused) {
				accusationId.value = _accusationId
				window.addEventListener('keydown', sendMessageWithKeyboardHandler)
				return
			}
			accusationId.value = null
			window.removeEventListener('keydown', sendMessageWithKeyboardHandler)
		}
		const handleSendMessageButtonClick = async (accusationId: number) => {
			const isOk = await props.whenSendMessageToAccusation(accusationId, inputValue.value)
			inputValue.value = ''
		}

		return {
			inputValue,
			handleSendMessageButtonClick,
			handleMessageInput,
			handleInputFocus,
		}
	},
	render() {
		return (
			<VDialog
				class={styles.dialog}
				modelValue={this.isShowThread}
				onUpdate:modelValue={this.handleCloseThreadButtonClick}
				fullscreen
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
							/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
							/*@ts-ignore*/
							onClick={this.handleCloseThreadButtonClick}
						/>
					</VToolbar>
					<VExpansionPanels>
					{
						this.accusations.map((accusation) => (
							<VExpansionPanel key={accusation.accusationId} title={accusation.comments[0].text}>
								<VExpansionPanelText>
										<div class={styles.expPanel}>
										{
											accusation.comments.map((comment) => (
												<div class={styles.message}>
													<div>{comment.authorId} {dateFormatter(comment.changeDate)}</div>
													{
														comment.text
													}	
												</div>
											))
										}
										</div>
										<VTextarea
											ref={'messageInput'}
											variant='outlined'
											placeholder='Сообщение'
											appendInnerIcon={mdiSendCircle}
											autoGrow
											rows={1}
											maxRows={8}
											modelValue={this.inputValue}
											onClick:appendInner={() => this.handleSendMessageButtonClick(accusation.accusationId)}
											onUpdate:modelValue={this.handleMessageInput}
											onUpdate:focused={(value) => this.handleInputFocus(value, accusation.accusationId)}
										/>
								</VExpansionPanelText>
							</VExpansionPanel>
						))
					}
					</VExpansionPanels>
			</VCard>
			</VDialog>
		)
	}
})
