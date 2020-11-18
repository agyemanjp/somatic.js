/* eslint-disable fp/no-mutation */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dictionary, Obj, keys, deepMerge } from "@sparkwave/standard"

import { createElement, mergeProps } from "../../core"
import { Component, CSSProperties, PropsExtended } from "../../types"
import { StackPanel, HoverBox, CheckBoxInput } from "../index"


export interface FormField<E extends Obj = Obj> {
	name: keyof E,
	validation?: (val: string) => string | undefined
	isRequired: boolean
	label: string
	placeholder: string
	isCheckbox?: boolean
	preFilled?: boolean
	defaultValue?: string | boolean
}

type InternalProps = {
	validationErrors: Obj<string>
}

export type InputFieldGroupProps = {
	fields: FormField[]
	labelsPosition?: "left" | "top"
}
export type InputFieldGroupMessages = (
	| {
		type: "FIELD_UPDATED",
		data: { name: string, value: string | boolean }
	}
	| {
		type: "RETURN_KEY_PRESSED",
		// data: { name: string, value: string | boolean }
	}
)

const defaultProps = ({
	fields: [] as FormField[],
	validationErrors: {} as Obj<string>,
	labelsPosition: "top" as "left" | "top"
})

export const InputFieldGroup: Component<InputFieldGroupProps, InputFieldGroupMessages> = async (props) => {
	// const fieldInputs: { [key: string]: HTMLInputElement | undefined } = {}

	const { fields, validationErrors, labelsPosition, postMsgAsync, key } = mergeProps(defaultProps, props)

	/*const validateFields = async (props: Props, onAttempt?: boolean) => {
		// return
		let validationErrors = new Dictionary(props.validationErrors.entries())

		fields.forEach(field => {
			const correspondingElem = fieldInputs[field.name]!
			if (field.isRequired && correspondingElem.value === "") {
				validationErrors = validationErrors.set([field.name, config.displayStrings.FORM_MANDATORY_FIELD])
			}
			else if (field.validation && field.validation(correspondingElem.value) !== undefined) {
				validationErrors = validationErrors.set([field.name, field.validation(correspondingElem.value)!])
			}
			else {
				const otherEntries = validationErrors.entries().filter(entry => entry[0] !== field.name)
				validationErrors = new Dictionary(otherEntries)
			}
		})
		// INFORM THE MODEL THAT THERE ARE VALIDATION ERRORS
	}*/

	const shouldMarkError = (fieldName: string) => validationErrors[fieldName] !== undefined

	return <div style={{ width: "100%" }}>
		{
			fields.map((field) => {
				return <div style={{ margin: "auto", textAlign: "left" }}>
					{field.isCheckbox
						? <HoverBox
							style={{
								marginBottom: "0.5em",
								backgroundColor: "transparent",
								fontWeight: 300,
								lineHeight: "1.5em",
								textAlign: "center"
							}}
							hoverStyle={{ cursor: "pointer", backgroundColor: "transparent" }}>
							<div
								onClick={() => {
									// That update should have changed the hidden input, we report all input values to the parent
									if (postMsgAsync) {
										postMsgAsync({
											type: "FIELD_UPDATED",
											data: {
												name: field.name,
												value: !(fields.find(f => f.name === field.name)?.defaultValue as boolean || false)
											}
										})
									}
								}}>

								<CheckBoxInput
									icons={{ checked: () => <svg />, unchecked: () => <svg /> }}
									iconSize="1.5em"
									style={{ display: "inline-block", verticalAlign: "middle" }}
									isChecked={fields.find(f => f.name === field.name)?.defaultValue as boolean || false}
									isDisabled={false}>
								</CheckBoxInput>

								<input
									onKeyPress={(e) => {
										const code = e.keyCode || e.which
										if (code === 13)
											if (postMsgAsync) postMsgAsync!({
												type: "RETURN_KEY_PRESSED"
											})
									}}
									type="hidden"
									name={`${field.name}`}
									value={fields.find(f => f.name === field.name)?.defaultValue ? "true" : "false"}>
								</input>

								<span style={{ paddingLeft: "0.5em" }}>{field.label}</span>
							</div>
						</HoverBox>

						: <StackPanel style={{ margin: "0rem 1rem" }}
							orientation={labelsPosition === "left" ? "horizontal" : "vertical"
							}>

							<label style={{ flex: "1 1 35%", paddingTop: "0.4em", textAlign: "left", whiteSpace: "nowrap" }}>
								{`${field.label}`}:
							</label>

							<div style={{ flex: "1 1 65%" }}>
								<HoverBox
									style={{
										marginTop: "0.2rem",
										marginBottom: "0.2em",
										backgroundColor: "#fff",
										border: `thin solid black}`,
										fontSize: "1.15rem",
										fontWeight: 300,
										lineHeight: "1.5em",
										width: "300px",
										padding: "0 0.25em",
										display: "block",
										marginRight: "auto",
										borderColor: shouldMarkError(field.name) ? "red" : "inherit"
									}}
									hoverStyle={{
										border: `thin solid ${`gray`}`,
										background: "#fff"
									}}>

									<input
										onKeyUp={(e) => {
											const code = e.keyCode || e.which
											if (code === 13) {
												if (postMsgAsync) postMsgAsync!({
													type: "RETURN_KEY_PRESSED"
												})
											}
											else if (postMsgAsync) postMsgAsync!({
												type: "FIELD_UPDATED",
												data: {
													name: field.name,
													value: e.currentTarget.value
												}
											})
										}}
										type={field.name === "password" ? "password" : field.name === "emailAddress" ? "email" : "text"}
										name={field.name}
										id={field.name}
										autoComplete={
											field.preFilled === false
												? "new-password"
												: undefined
										}
										placeholder={field.placeholder}
										value={typeof (field.defaultValue) === "string" ? field.defaultValue : ""}
										onChange={(e) => {
											/*validateFields(fullProps).then(() => {
												() => {
													// That update should have changed the hidden input, we report all input values to the parent
													if (postMsgAsync) {
														postMsgAsync!({
															type: "FIELD_UPDATED",
															data: {
																name: field.label,
																value: e.target.value
															},
															needsRender: false
														} as FieldUpdateMessage)
													}
												}
											})*/
										}}
										// eslint-disable-next-line @typescript-eslint/no-empty-function
										onBlur={(e) => { }}>
									</input>
								</HoverBox>

								<div style={{ color: "red", height: "1em" }}>
									{validationErrors[field.name] !== undefined
										? validationErrors[field.name]
										: null
									}
								</div>
							</div>
						</StackPanel>
					}

				</div>
			})
		}
	</div>
}

/** Form validator
 * @param requiredFieldsState object that maps field with their current content
 * @param validationErrorsState object that maps fields with their errors. Empty string if not
 * @param fieldsToEvaluate array with the fields to evaluate. If undefined, all fields are evaluated. 
 */
export const validateForm = <T extends Obj>(args:
	{
		requiredFieldsState: { [key in keyof T]: string },
		validationErrorsState: { [key in keyof T]: string },
		fieldsToEvaluate?: (keyof T)[],
		emailValidator: (email: string) => string | undefined
		pwdValidator: (email: string) => string | undefined
	}) => {
	const { requiredFieldsState, validationErrorsState, fieldsToEvaluate, pwdValidator, emailValidator } = args

	const requiredFields = { ...requiredFieldsState }
	const validationErrors = { ...validationErrorsState }

	keys(requiredFields).forEach(field => {
		if (fieldsToEvaluate === undefined || fieldsToEvaluate.includes(field as any)) {
			requiredFields[field] = requiredFields[field].trim()

			const emailValidation = emailValidator(requiredFields[field])
			const pwdValidation = pwdValidator(requiredFields[field])

			if (requiredFields[field] === "") {
				validationErrors[field] = `Fields should not be empty`
			}
			else if (field === "emailAddress" && emailValidation) {
				validationErrors[field] = emailValidation
			}
			else if (field === "password" && pwdValidation) {
				validationErrors[field] = pwdValidation
			}
			else
				validationErrors[field] = ""
		}
		else {
			validationErrors[field] = ""
		}
	})

	return {
		validationErrors,
		requiredFields
	}
}