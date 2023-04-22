export class Component {
	paramId!: string
	componentName!: string
	updateDate!: string

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	constructor(dto) {
		this.componentName = dto.comp_name
		this.updateDate = dto.update_date
		this.paramId = dto.param_id
	}
}
