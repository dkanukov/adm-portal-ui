import { computed, defineComponent, definePageMeta, navigateTo, ref, useFetch } from '#imports' 
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VTextField } from 'vuetify/components'
import styles from './styles.module.css'
import { userStore } from '~/store/user'
import Notification from '~/components/notification/notification'

export default defineComponent({
	setup() {
		definePageMeta({
			layout: 'empty-layout'
		})

		const login = ref('')
		const password = ref('')
		const isShowNotification = ref(false)
		const user = userStore()

		const handleAuthButtonClick = async () => {
			const isOk = await user.whenUserAuth(login.value, password.value)
			if (isOk) {
				navigateTo('/')
			} else {
				isShowNotification.value = true
				setTimeout(() => isShowNotification.value = false, 2000)
			}
		}

		const isAuthButtonDisabled = computed(() => {
			return Boolean(login.value.length && password.value.length)
		})

		const handlePasswordInput = (value: string) => {
			password.value = value
		}

		const handleLoginInput = (value: string) => {
			login.value = value
		}

		return {
			login,
			password,
			isShowNotification,
			handleAuthButtonClick,
			isAuthButtonDisabled,
			handlePasswordInput,
			handleLoginInput
		}
	},
	render() {
		return (
			<div class={styles.authPage}>
				<VCard
					class={styles.authModule}
					variant='outlined'
				>
					<VCardTitle>
						Авторизуйтесь
					</VCardTitle>
					<VCardText>
						<VTextField
							variant={'outlined'}
							placeholder={'Логин'}
							modelValue={this.login}
							onUpdate:modelValue={this.handleLoginInput}
						/>
						<VTextField
							variant={'outlined'}
							placeholder={'Пароль'}
							modelValue={this.password}
							onUpdate:modelValue={this.handlePasswordInput}
						/>
					</VCardText>
					<VCardActions>
						<VBtn
							disabled={!this.isAuthButtonDisabled}
							class={styles.extraMargin8px }
							variant={'flat'}
							color={'success'}
							/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
							/*@ts-ignore*/
							onClick={() => this.handleAuthButtonClick()}
						>
							Войти
						</VBtn>
					</VCardActions>
				</VCard>
				<Notification
					isShowNotification={this.isShowNotification}
					isOk={false}
				/>
			</div>
		)
	}
})
