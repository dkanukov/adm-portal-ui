import { format } from 'date-fns'

export const dateFormatter = (date: string) => {
	const d = new Date(date)
	return format(d, 'dd/MM/yy HH:mm')
}
