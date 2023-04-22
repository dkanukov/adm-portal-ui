import {ParamKind, ParamType} from '~/types/param-type'
import {Unit} from '~/models/unit'

export class NumParam {
	paramId!: number
	name!: string
	description!: string
	abbreviation!: string
	defaultMultiplier!: number
	kind!: ParamKind
	isInteger!: boolean
	units!: Unit
	createDate!: string
	updateDate!: string
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

	// TODO: попросить бэк класс для возвращаемых данных
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	constructor(dto) {
		this.paramId = dto.param_id
		this.name = dto.name
		this.description = dto.description
		this.abbreviation = dto.abbreviation
		this.defaultMultiplier = dto.default_multiplier
		this.isInteger = dto.is_integer
		this.units = new Unit(dto.unit)
		this.createDate = dto.create_date
		this.updateDate = dto.update_date
		this.kind = dto.kind
		this.kind = dto.kind === 'reference' ? ParamKind.reference : ParamKind.relatedToScheme
		this.actionRange.backIncluded = dto.action_range.back_included
		this.actionRange.frontIncluded = dto.action_range.front_included
		this.actionRange.lowerLimit = dto.action_range.lower_limit
		this.actionRange.upperLimit = dto.action_range.upper_limit

	}
	paramType = ParamType.numParam
}

