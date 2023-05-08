import { computed, defineComponent, definePageMeta, ref, useFetch } from '#imports' 
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VTextField } from 'vuetify/components'
import styles from './styles.module.css'

export default defineComponent({
	setup() {
		definePageMeta({
			layout: 'empty-layout'
		})

		const login = ref('')
		const password = ref('')

		const handleAuthButtonClick = async () => {
			console.log(name, password)
			const {data} = await useFetch('http://lab2222.auditory.ru/ift_asonika_k/auth/api-token-auth/', {
				method: 'POST',
				body: {
					username: 'admin',
					password: 'Q2w3e4r5!'
				}
			})
			console.log(data.value)
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
			</div>
		)
	}
})
