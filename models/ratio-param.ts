export class RatioParam {
	calcId!: number
	name!: string
	abbreviation!: string
	description!: string
	code!: string
	isCompiled!: boolean
	actionRange: {
		backIncluded: boolean
		frontIncluded: boolean
		lowerLimit: string
		upperLimit: string
	} = {
		backIncluded: false,
		frontIncluded: false,
		lowerLimit: '0',
		upperLimit: '0'
	}
	params!: RationParameter[]

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	constructor(dto) {
		if (!dto.calc_id) {
			return
		}
		this.calcId = dto.calc_id
		this.name = dto.name
		this.abbreviation = dto.abbreviation
		this.description = dto.description
		this.code = dto.code
		this.isCompiled = dto.is_compiled
		this.actionRange.lowerLimit = dto.action_range.lower_limit
		this.actionRange.backIncluded = dto.action_range.back_included
		this.actionRange.upperLimit = dto.action_range.upper_limit
		this.actionRange.frontIncluded = dto.action_range.front_included
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this.params = dto.params.map((param) => new RationParameter(param))
	}
}

class RationParameter {
	paramName!: string
	paramId!: number
	numParamName!: string
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	constructor(dto) {
		this.paramName = dto.param_name
		this.paramId = dto.param_id
		this.numParamName = dto.num_param_name
	}
}
