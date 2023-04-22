export const actionRangeToString = (actionRange:{
	backIncluded: boolean
	frontIncluded: boolean
	lowerLimit: string
	upperLimit: string
}) => {
	let fb = '('
	let sb = ')'
	switch (actionRange.backIncluded) {
			case true: fb = '['; break
			case false: fb = '('; break
	}

	switch (actionRange.frontIncluded) {
		case true: sb = ']'; break
		case false: sb = ')'; break
	}

	return `${fb} ${actionRange.lowerLimit}; ${actionRange.upperLimit} ${sb}`
}
