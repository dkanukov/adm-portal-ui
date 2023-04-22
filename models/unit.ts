export class Unit {
	unitId!: number
	name!: string
	params!: {
		multiplier: number;
		abbreviation: string;
		actionRange: {
			backIncluded: boolean
			frontIncluded: boolean
			lowerLimit: string
			upperLimit: string
		}
	}[]

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	constructor(dto) {
		this.unitId = dto.unit_id
		this.name = dto.unit_name || dto.name
		if (dto.params && dto.params.length) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			this.params = dto.params.map((param) => {
				return {
					multiplier: param.multiplier,
					abbreviation: param.abbreviation,
					actionRange: {
						backIncluded: param.action_range.back_included,
						frontIncluded: param.action_range.front_included,
						lowerLimit: param.action_range.lower_limit,
						upperLimit: param.action_range.upper_limit
					}
				}
			})
		} else {
			this.params = []
		}
	}
}

// export class UnitV2 {
// 	description!: string
// 	name!: string
// 	unitId!: number
// 	params!: {
// 		multiplier: string;
// 		abbreviation: string;
// 		actionRange: {
// 			backIncluded: boolean
// 			frontIncluded: boolean
// 			lowerLimit: string
// 			upperLimit: string
// 		}
// 	}[]
//
// 	constructor(dto) {
// 		description = dto.description
// 	}
// }
