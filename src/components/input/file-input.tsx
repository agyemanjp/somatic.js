/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable brace-style */
import { createElement, mergeProps, getSimpleStateCache } from '../../core'
import { HtmlProps, Icon, CSSProperties, Component, PropsExtended } from '../../types'
import { objectCurry, noop } from "@sparkwave/standard/functional"
import { TooltipBox } from '../boxes/tooltip-box'
import { HoverBox } from '../boxes/hover-box'
import { UrlInput } from './url-input'


type State = {
	/** If enabled it will show the url input */
	showUrlInput?: boolean

	/** Default uri to show in the url input */
	uri?: string
}

type Props = HtmlProps & {
	/** Click upload prompt text */
	clickPrompt?: string,

	/** Drag/drop upload prompt text */
	dragPrompt?: string,

	/** URL upload prompt text */
	urlPrompt?: string,

	/** Whether to receive the data as a string or an array of bytes */
	loadAs?: "array" | "string"

	/** Style for the label */
	labelStyle?: CSSProperties

	/** File upload icon */
	icon?: Icon

	/** Enable loading of multiple files */
	multiple?: boolean
}

type Messages = (
	| { type: "SHOW_URL_INPUT", defaultHandler: (props: Partial<Props>) => State }
	| { type: "ON_DATA_LOADING", data: { fileName: string } }
	| { type: "ON_DATA_LOADED", data: { data: unknown, fileName: string } }
	| { type: "ON_LOADING_ERROR", data: { err: Error } }
	| { type: "URL_INPUT_CHANGE", data: { uri: string } }
)

const defaultProps = {
	clickPrompt: "Click in this box",
	dragPrompt: "Drag the file into this box",
	urlPrompt: "Enter a URL",

	multiple: false,
	loadAs: "string" as Props["loadAs"],
	style: {} as CSSProperties,
	labelStyle: {} as CSSProperties,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	postMsgAsync: async () => { }
}

export async function FileInput(props: PropsExtended<Props, Messages, State>) {
	const {
		key,

		clickPrompt,
		dragPrompt,
		urlPrompt,

		multiple,
		title,
		style,
		labelStyle,
		children,
		postMsgAsync
	} = mergeProps(defaultProps, props)

	const stateCache = getSimpleStateCache(props, { uri: "", showUrlInput: false })
	const { showUrlInput, uri } = await stateCache.getAsync()

	const loadRaw = (file: File) => {
		try {
			const reader = new FileReader()
			// eslint-disable-next-line fp/no-mutation
			reader.onload = (loadInfo) => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const bytes = (loadInfo.target as any).result as ArrayBuffer
				// if (!loadAs || loadAs === "array") {
				postMsgAsync({
					type: "ON_DATA_LOADED",
					data: {
						data: bytes,
						fileName: file.name.toLowerCase()
					}
				})
			}

			postMsgAsync({ type: "ON_DATA_LOADING", data: { fileName: file.name } })

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
			border: `dashed thin black`,
			fontVariant: "normal",
			fontWeight: "normal",
			padding: "0.5em",
			display: "inline-block",
			minWidth: "530px",
			...style
		}}>

		<input id="files" name="file" type="file"
			multiple={multiple}
			onChange={(ev) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				loadRaw((ev.target).files![0])
			}}
			style={{ opacity: 0, overflow: "hidden", position: "absolute", zIndex: -1 }}>
		</input>

		<div
			onClick={ev => {
				const fileInput = (document.querySelector("input#files") as HTMLInputElement)
				fileInput.click()
			}}
			style={{ padding: "0.5em", cursor: "pointer", display: "flex", height: "100%", width: "100%" }}
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
					...labelStyle
				}}>

				<div /* icon */
					style={{
						border: "solid 3px currentColor",
						borderRadius: "2.5em",
						width: "5em",
						height: "5em",
						position: "absolute",
						right: 0,
						top: 0,
						color: "rgb(200,200,200)"
					}}>

					{props.icon
						? <props.icon style={{ height: "80%", width: "80%", position: "absolute", left: "10%", top: "5%", }} />
						: undefined
					}
				</div>

				<div style={{ display: "flex", flexDirection: "row", alignItems: "center", textAlign: "left" }}>
					{title
						? <div style={{ fontSize: "1.5em" }}> {title} </div>
						: null
					}
					<span>
						<b>{"To upload a "}
							<TooltipBox
								explicitContent={"Accepted formats: csv, xls, xlsx, json, ods, txt, html, prn, dbf"}>
								<span>{"data file"}</span>
							</TooltipBox>
						</b>
					</span>
				</div>

				<div /* prompts */ style={{ textAlign: "left", width: "100%" }}>
					<p>• {`${clickPrompt}, OR`}</p>
					<p>• {`${dragPrompt}, OR`}</p>
					<p style={{ marginBottom: "0.5em" }}>•
						<HoverBox
							style={{ textDecoration: "underline" }}>
							<div style={{ display: "inline" }}
								onMouseEnter={() => { /*console.log("Mouse enter") */ }}
								onClick={e => {
									e.preventDefault()
									e.stopPropagation()
									// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
									stateCache.setAsync({ showUrlInput: !showUrlInput })
								}}>
								{`${urlPrompt}`}
							</div>
						</HoverBox>
					</p>
					{
						showUrlInput
							? <UrlInput
								postMsgAsync={async msg => {
									switch (msg.type) {
										case "LOADING_ERROR":
											if (postMsgAsync) {
												postMsgAsync({
													type: "ON_LOADING_ERROR",
													data: {
														err: msg.data.error,
													}
												})
											}
											break
										case "DATA_LOADED":
											if (postMsgAsync) {
												postMsgAsync({
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
								}}>
							</UrlInput>

							: undefined
					}
				</div>
			</div>
		</div>
	</div>
}
