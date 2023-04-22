export enum ParamType {
	numParam = 'numParam',
	sampleParam = 'sampleParam'
}

export enum ParamKind {
	'relatedToScheme' = 'relatedToScheme',
	'reference' = 'reference'
}

export const PARAM_KIND_READABLE = [
	{
		value: ParamType.sampleParam,
		label: 'Сэмпл параметр'
	},
	{
		value: ParamType.numParam,
		label: 'Числовой параметр'
	}
]
