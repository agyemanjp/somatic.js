/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable brace-style */
import { createElement } from '../../core'
import { Props, Icon, CSSProperties, Component } from '../../types'
import { config, mergeProps } from '../../utils'
import { TooltipBox } from '../boxes/tooltip-box'
import { HoverBox } from '../boxes/hover-box'
import { UrlInput } from './url-input'

type InternalProps = {
	/** If enabled it will show the url input */
	showUrlInput?: boolean

	/** Default uri to show in the url input */
	uri?: string
}

type Props = Props.Html & Props.Themed & InternalProps & {
	/** Title to be shown in the file input box */
	uploadTitle?: string,

	/** Title to be show as the drag and drop description */
	dragTitle?: string,

	/** Option to enable if we want to receive the data as a string or an array of bytes */
	loadAs?: "array" | "string"

	/** Style for the label */
	labelStyle: CSSProperties

	/** Icon to be shown next to the label */
	icon: Icon

	/** Enable the input to support loading of multiple files */
	multiple?: boolean
}

type Messages = (
	{ type: "SHOW_URL_INPUT", defaultHandler: (props: Partial<Props>) => InternalProps }
	| { type: "ON_DATA_LOADING", data: { fileName: string } }
	| { type: "ON_DATA_LOADED", data: { data: unknown, fileName: string } }
	| { type: "ON_LOADING_ERROR", data: { err: Error } }
	| { type: "URL_INPUT_CHANGE", data: { uri: string } })

const defaultProps = {
	loadAs: "string" as Props["loadAs"],
	theme: config.theme,
	style: {},
	labelStyle: {},
	showUrlInput: false,
	uri: ""
}

export const FileInput: Component<Props, Messages> = async (props) => {
	const fullProps = mergeProps(defaultProps, props)
	const loadRaw = (file: File) => {
		try {
			const reader = new FileReader()
			// eslint-disable-next-line fp/no-mutation
			reader.onload = (loadInfo) => {
				// var binaryDataString = ""
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const bytes = (loadInfo.target as any).result as ArrayBuffer
				// if (!props.loadAs || props.loadAs === "array") {
				if (props.postMsgAsync) {
					props.postMsgAsync({
						type: "ON_DATA_LOADED",
						data: {
							data: bytes,
							fileName: file.name.toLowerCase()
						}
					})
				}
				// }
				// else {
				// 	let bytes = new Uint8Array((loadInfo.target as any).result);
				// 	let length = bytes.byteLength;
				// 	for (let i = 0; i < length; i++) {
				// 		binaryDataString += String.fromCharCode(bytes[i]);
				// 	}

				// 	if (props.onDataLoaded) {
				// 		props.onDataLoaded(binaryDataString, file.name.toLowerCase());
				// 	}
				// }
			}

			if (props.postMsgAsync) {
				props.postMsgAsync({
					type: "ON_DATA_LOADING",
					data: {
						fileName: file.name
					}
				})
			}

			console.log(`Reading file "${file.name}" ...`)
			reader.readAsArrayBuffer(file)
		}
		catch (e) {
			throw new Error(`FileInput loadRaw: ${e}`)
		}
	}

	return <div
		style={{
			overflow: "hidden",
			position: "relative",
			width: "100%",
			height: "100%",
			borderRadius: "0.25em",
			color: fullProps.theme.colors.secondary.dark,
			border: `dashed thin ${fullProps.theme.colors.secondary.dark}`,
			fontVariant: "normal",
			fontWeight: "normal",
			padding: "0.5em",
			display: "inline-block",
			minWidth: "530px",
			...fullProps.style
		}}>

		<input id="files" name="file" type="file"
			multiple={fullProps.multiple}
			onChange={(ev) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				loadRaw((ev.target).files![0])
			}}
			style={{ opacity: 0, overflow: "hidden", position: "absolute", zIndex: -1 }}>
		</input>

		<div onClick={ev => {
			const fileInput = (document.querySelector("input#files") as HTMLInputElement)
			fileInput.click()
		}}
			style={{
				padding: "0.5em",
				cursor: "pointer",
				display: "flex",
				height: "100%",
				width: "100%"
			}}
			onDragOver={(ev) => {
				ev.preventDefault()
				ev.stopPropagation();
				// eslint-disable-next-line fp/no-mutation, @typescript-eslint/no-explicit-any
				(ev.target as any).style.backgroundColor = "rgb(217, 237, 247)"
			}}
			onDragEnter={(ev) => {
				ev.preventDefault()
				ev.stopPropagation();
				// eslint-disable-next-line fp/no-mutation, @typescript-eslint/no-explicit-any
				(ev.target as any).style.backgroundColor = "rgb(217, 237, 247)"
			}}
			onDragLeave={(ev) => {
				ev.preventDefault()
				ev.stopPropagation();
				// eslint-disable-next-line fp/no-mutation, @typescript-eslint/no-explicit-any
				(ev.target as any).style.backgroundColor = "transparent"
			}}
			onDrop={(ev) => {
				ev.preventDefault()
				ev.stopPropagation()
				loadRaw(ev.dataTransfer.files[0])
			}}>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "start",
					width: "500px",
					margin: "auto",
					height: "auto",
					position: "relative",
					...props.labelStyle
				}}>
				<div style={{
					border: "solid 3px currentColor",
					borderRadius: "2.5em",
					width: "5em",
					height: "5em",
					position: "absolute",
					right: 0,
					top: 0,
					color: "rgb(200,200,200)"
				}}>
					<fullProps.icon style={{
						height: "80%",
						width: "80%",
						position: "absolute",
						left: "10%",
						top: "5%",
					}} />
				</div>
				<div style={{ display: "flex", flexDirection: "row", alignItems: "center", textAlign: "left" }}>
					{
						props.title
							? <div style={{ fontSize: "1.5em" }}> {props.title} </div>
							: null
					}
					<span>
						<b>{"To upload a "}
							<TooltipBox
								explicitTooltip={"Accepted formats: csv, xls, xlsx, json, ods, txt, html, prn, dbf"}>
								<span>{"data file"}</span>
							</TooltipBox>
						</b>
					</span>
				</div>

				<div style={{ textAlign: "left", width: "100%" }}>
					<p>• {"Click in this box,"}</p>
					<p>• {"Drag the file into this box, OR"}</p>
					<p style={{ marginBottom: "0.5em" }}>• <HoverBox
						theme={props.theme}
						style={{
							textDecoration: "underline"
						}}>
						<div style={{ display: "inline" }}
							onMouseEnter={() => { /*console.log("Mouse enter") */ }}
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								if (props.postMsgAsync)
									props.postMsgAsync({
										type: "SHOW_URL_INPUT",
										defaultHandler: () => ({
											showUrlInput: fullProps.showUrlInput ? false : true
										})
									})
							}}
						>{"Enter a URL"}</div>
					</HoverBox>
					</p>
					{
						props.showUrlInput
							? <UrlInput
								theme={config.theme}
								postMsgAsync={async msg => {
									switch (msg.type) {
										case "LOADING_ERROR":
											if (props.postMsgAsync) {
												props.postMsgAsync({
													type: "ON_LOADING_ERROR",
													data: {
														err: msg.data.error,
													}
												})
											}
											break
										case "DATA_LOADED":
											if (props.postMsgAsync) {
												props.postMsgAsync({
													type: "ON_DATA_LOADED",
													data: {
														data: msg.data.data,
														fileName: msg.data.fileName
													}
												})
											}
											break
										default:
									}
								}}
							/>
							: undefined
					}
				</div>
			</div>
		</div>
	</div>
}