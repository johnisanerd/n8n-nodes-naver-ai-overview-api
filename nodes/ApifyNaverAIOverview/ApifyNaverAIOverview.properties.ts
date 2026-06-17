import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

/**
 * Build the Apify Actor input from node parameters.
 * Only the real Actor inputs are sent; the Output / Fields parameters shape the
 * data we return, they are not part of the Actor input.
 */
export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	return {
		...defaultInput,
		query: context.getNodeParameter('query', itemIndex),
	};
}

const resourceProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'AI Overview',
				value: 'aiOverview',
			},
		],
		default: 'aiOverview',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['aiOverview'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get the AI overview for a query',
				description: 'Get the Naver AI Overview summary and references for a query',
			},
		],
		default: 'get',
	},
];

const actorProperties: INodeProperties[] = [
	{
		displayName: 'Search Query',
		name: 'query',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 당뇨병 증상',
		description: 'The query to fetch the Naver AI Overview for',
		displayOptions: { show: { resource: ['aiOverview'], operation: ['get'] } },
	},
];

const outputProperties: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['aiOverview'], operation: ['get'] } },
		options: [
			{
				name: 'Raw',
				value: 'raw',
				description: 'Return every field the API produces',
			},
			{
				name: 'Selected Fields',
				value: 'selected',
				description: 'Choose exactly which fields to return',
			},
			{
				name: 'Simplified',
				value: 'simplified',
				description: 'Return a compact object with the overview text and references',
			},
		],
		default: 'simplified',
		description: 'How much data to return',
	},
	{
		displayName: 'Fields to Include',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: { resource: ['aiOverview'], operation: ['get'], output: ['selected'] },
		},
		options: [
			{ name: 'AI Overview Present', value: 'ai_overview_present' },
			{ name: 'Fetched At', value: 'fetched_at' },
			{ name: 'Markdown', value: 'markdown' },
			{ name: 'Media', value: 'media' },
			{ name: 'Query', value: 'query' },
			{ name: 'References', value: 'references' },
			{ name: 'Related Questions', value: 'related_questions' },
			{ name: 'Result Type', value: 'result_type' },
			{ name: 'Text Blocks', value: 'text_blocks' },
		],
		default: ['query', 'ai_overview_present', 'markdown', 'references'],
		description: 'Which fields to return when Output is set to Selected Fields',
	},
];

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const properties: INodeProperties[] = [
	...resourceProperties,
	...actorProperties,
	...outputProperties,
	...authenticationProperties,
];
