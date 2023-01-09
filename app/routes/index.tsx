import { json } from '@remix-run/node';
import {
	Form,
	useTransition,
	useLoaderData,
	useActionData,
} from '@remix-run/react';

import type { FormBuilderData } from '~/types';
import type { ActionArgs } from '@remix-run/node';

export async function action({ request }: ActionArgs) {
	let submission: Record<string, string> = {};
	const formData = await request.formData();

	formData.forEach((value, key) => {
		if (value instanceof File) {
			submission[key] = value.name;
		} else {
			submission[key] = value;
		}
	});

	return json({ submission });
}

export function loader() {
	/**
	 * The kyc information requested from a user in a real world differs based on previously inputted information,
	 * so this simulates when we do need to get additional information based on compliance reasons.
	 */
	const kycBuilder: Array<Array<FormBuilderData> | FormBuilderData> = [
		[
			{
				kind: 'input',
				type: 'text',
				placeholder: 'B12345',
				label: 'Passport number',
				required: true,
				validation: {
					type: 'pattern',
					pattern: '^[A-Z]{1}[0-9]{5}$',
					patternValidationMessage:
						'Passport number should start with a letter and must contain 6 charaters in all',
				},
				name: 'passportNumber',
			},
			{
				kind: 'input',
				type: 'file',
				label: 'Passport data page',
				name: 'passportDataPage',
			},
		],
		{
			label: 'Date of Birth',
			kind: 'input',
			type: 'date',
			required: true,
			name: 'dateOfBirth',
		},
	];

	return json({ kycBuilder });
}

function FormData({ data }: { data: FormBuilderData }) {
	const Field = data.kind;

	return (
		<div>
			<Field
				type={data.type}
				name={data.name}
				className="form-field"
				{...{ required: data.required || undefined }}
				{...{ placeholder: data.placeholder || undefined }}
				{...{ pattern: data?.validation?.pattern || undefined }}
				{...{
					title:
						data.title ||
						data?.validation?.patternValidationMessage ||
						undefined,
				}}
			></Field>
		</div>
	);
}

export default function Index() {
	const { kycBuilder } = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const transition = useTransition();

	const isSubmittingForm = transition.state === 'submitting';
	return (
		<div className="index-container">
			<section>
				<Form method="post" encType="multipart/form-data">
					{kycBuilder.map((data) => {
						if (Array.isArray(data)) {
							return data.map((item) => (
								<FormData key={item.name} data={item} />
							));
						}
						return <FormData key={data.name} data={data} />;
					})}
					<button type="submit" disabled={isSubmittingForm}>
						{isSubmittingForm ? 'Submitting' : 'Submit form'}
					</button>
				</Form>
			</section>

			<section>
				<h2> Submission </h2>
				{Object.keys(actionData?.submission || {}).map((submissionKey) => (
					<div key={submissionKey}>{actionData?.submission[submissionKey]}</div>
				))}
			</section>
		</div>
	);
}
