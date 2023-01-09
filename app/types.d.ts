import type { InputHTMLAttributes, ElementType } from "react";

interface FormBuilderPatternValidation {
	type: 'pattern';
	pattern: string;
	patternValidationMessage: string;
}

type SupportedFormBuilderProperties = 'type' | 'placeholder' | 'name' | 'required' | 'title';
export interface FormBuilderData
	extends Pick<InputHTMLAttributes<unknown>, SupportedFormBuilderProperties> {
	label: string;
	kind: ElementType;
	validation?: FormBuilderPatternValidation | undefined;
}