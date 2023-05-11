import { navigateTo } from 'nuxt/app'

export const getTokenFromStorage = () => {
	const token = localStorage.getItem('token')

	if (!token) {
		navigateTo('/auth')
		return ''
	}

	return `Bearer ${ token }`
}
