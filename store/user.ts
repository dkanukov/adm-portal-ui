import { defineStore } from 'pinia'
import { ref, useFetch } from '#imports'


export const userStore = defineStore('userStore', () => {
	const userRole = ref('')
	const token = ref('')

	const whenUserAuth = async (login: string, password: string) => {
		const { data } = await useFetch('https://lab2222.auditory.ru/ift_asonika_k/auth/api-token-auth/', {	
			method: 'POST',
			body: {
				username: 'admin',
				password: 'Q2w3e4r5!'
			}
		}) as any

		if(data.value.token) {
			token.value = data.value.token
			localStorage.setItem('token', token.value)
			return true
		}

		return false
	}

	return {
		userRole,
		token,
		whenUserAuth,
	}
})
