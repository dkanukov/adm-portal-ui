import { BRACKETS } from '~/components/range-input/range-input'

export const parseIntervalString = (range: string): {interval: [number, number], includedInterval: [boolean, boolean]} => {
	const interval: [number, number] = [0, 0]
	const includedInterval: [boolean, boolean] = [false, false]

	includedInterval[0] = BRACKETS[range[0] as keyof typeof BRACKETS] ?? false
	includedInterval[1] = BRACKETS[range[range.length - 1] as keyof typeof BRACKETS] ?? false

	const splitted = range.split(';')
	if (splitted.length !== 2) {
		return ({interval, includedInterval})
	}
	interval[0] = Number(splitted[0].substring(1))
	interval[1] = Number(splitted[1].substring(0, splitted[1].length - 1))

	return {
		interval,
		includedInterval,
	}
}
