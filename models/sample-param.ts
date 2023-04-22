import {Component} from '~/models/component'
import {ParamKind, ParamType} from '~/types/param-type'


export class SampleParam {
	paramId!: number
	name!: string
	description!: string
	abbreviation!: string
	kind!: ParamKind
	components?: Component[]
	createDate!: string

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	constructor(dto) {
		this.paramId = dto.param_id
		this.name = dto.name
		this.description = dto.description
		this.abbreviation = dto.abbreviation
		this.kind = dto.kind === 'reference' ? ParamKind.reference : ParamKind.relatedToScheme
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this.components = dto.components.map((comp) => new Component(comp)) ?? []
		this.createDate = dto.create_date
	}
	paramType = ParamType.sampleParam
}
