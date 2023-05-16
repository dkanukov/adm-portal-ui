export class Accusation {
	accusationId!: number
	comments!: {
		authorId: number,
		changeDate: string,
		text: string,
	}[]
	creatorId!: number
	entity!: string
	entityField?: string
	entityId!: number
	stages!: {
		changeDate: string
		changerId: number
		status: string //TODO: заменить статусы енамом
	}

	constructor(dto: any) {
		this.accusationId = dto.accusation_id
		this.comments = dto.comments.map((comment: {author_id: string; change_date: string; text: string}) => {
			return {
				authorId: comment.author_id,
				changeDate: comment.change_date,
				text: comment.text,
			}
		})
		this.creatorId = dto.creator_id
		this.entity = dto.entity
		this.entityField = dto.entity_field || undefined
		this.entityId = dto.entity_id
		this.stages = dto.stages.map((stage: {change_date: string; change_id: string; status: string}) => {
			return {
				changeDate: stage.change_date,
				changerId: stage.change_id,
				status: stage.status,
			}
		})
	}
}
