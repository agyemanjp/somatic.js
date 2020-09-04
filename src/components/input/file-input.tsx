/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable brace-style */
import { hasValue } from '@agyemanjp/standard'
import * as Request from 'request'
import { createElement } from '../../core'
import { idProvider } from '../../utils'
import { Props, Icon, CSSProperties, Component } from '../../types'
import { config, mergeProps } from '../../utils'
import { StackPanel } from '../panels/stack-panel'
import { TooltipBox } from '../boxes/tooltip-box'
import { HoverBox } from '../boxes/hover-box'
import { CommandBox } from '../boxes/command-box'

type InternalProps = { showUrlInput?: boolean; uri?: string }
type Props = Props.Html & Props.Themed & InternalProps & {
	onDataLoading?: (fileName: string) => unknown
	onDataLoaded?: (data: unknown, fileName: string) => unknown
	fileNameUploaded?: string,
	uploadTitle?: string,
	dragTitle?: string,
	loadAs?: "array" | "string"
	content?: JSX.Element
	labelStyle: CSSProperties
	onLoadingError?: (err: Error) => void
	icon?: Icon
}
type Messages = ({ type: "SHOW_URL_INPUT" } | { type: "URL_INPUT_CHANGE", data: { uri: string } })

const defaultProps = {
	loadAs: "string" as Props["loadAs"],
	theme: config.theme,
	style: {},
	labelStyle: {},
	showUrlInput: false,
	uri: ""
}

export const _: Component<Props> = async (props) => {
	const { postMsgAsync, onDataLoaded, uri } = mergeProps(defaultProps, props)

	const loadRaw = (file?: File | null | undefined) => {
		try {
			if (file) {
				const reader = new FileReader()
				// eslint-disable-next-line fp/no-mutation
				reader.onload = (loadInfo) => {

					// eslint-disable-next-line fp/no-let, @typescript-eslint/no-explicit-any
					const buffer = (loadInfo.target as any).result as ArrayBuffer
					if (!props.loadAs || props.loadAs === "array") {
						if (props.onDataLoaded)
							props.onDataLoaded(buffer, file.name.toLowerCase())
					}
					else {
						// eslint-disable-next-line fp/no-let
						let binaryDataString = ""
						// eslint-disable-next-line fp/no-mutation, @typescript-eslint/no-explicit-any
						const bytes = new Uint8Array(buffer)
						const length = bytes.byteLength
						// eslint-disable-next-line fp/no-mutation, fp/no-let, fp/no-loops
						for (let i = 0; i < length; i++) {
							// eslint-disable-next-line fp/no-mutation
							binaryDataString += String.fromCharCode(bytes[i])
						}

						if (props.onDataLoaded)
							props.onDataLoaded(binaryDataString, file.name.toLowerCase())
					}
				}

				if (props.onDataLoading)
					props.onDataLoading(file.name)

				console.log(`Reading file "${file.name}" ...`)
				reader.readAsArrayBuffer(file)
			}
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
			color: props.theme?.colors.secondary.dark,
			border: `dashed thin ${props.theme.colors.secondary.dark}`,
			fontVariant: "normal",
			fontWeight: "normal",
			padding: "0.5em",
			display: "inline-block",
			minWidth: "530px",
			...props.style
		}}>

		<input id="files" name="file" type="file"
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			multiple={(props as any)["multiple"]}
			onChange={ev => loadRaw(ev.target.files?.item(0))}
			style={{ opacity: 0, overflow: "hidden", position: "absolute", zIndex: -1 }}>
		</input>

		<label htmlFor="files"
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
				// eslint-disable-next-line fp/no-mutation
				(ev.target as HTMLElement).style.backgroundColor = "rgb(217, 237, 247)"
			}}
			onDragEnter={ev => {
				ev.preventDefault()
				ev.stopPropagation()
				// eslint-disable-next-line fp/no-mutation
				ev.currentTarget.style.backgroundColor = "rgb(217, 237, 247)"
			}}
			onDragLeave={ev => {
				ev.preventDefault()
				ev.stopPropagation()
				// eslint-disable-next-line fp/no-mutation
				ev.currentTarget.style.backgroundColor = "transparent"
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
				<div
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
						? <props.icon style={{ height: "80%", width: "80%", position: "absolute", left: "10%", top: "5%" }} />
						: undefined
					}
				</div>
				<div style={{ display: "flex", flexDirection: "row", alignItems: "center", textAlign: "left" }}>
					{props.title ? <div style={{ fontSize: "1.5em" }}> {props.title} </div> : null}
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
						style={{ textDecoration: "underline" }}
						onClick={e => {
							e.preventDefault()
							if (props.postMsgAsync)
								props.postMsgAsync({
									type: "SHOW_URL_INPUT",
									data: {
										defaultHandler: FileInput.defaultHandler
									}
								})
						}}>
						<div style={{ display: "inline" }}>{"Drag the file into this box, OR"}</div>
					</HoverBox>
					</p>
					{
						props.showUrlInput
							? <StackPanel style={{ fontSize: "1rem" }}>
								<textarea name="dataset_url"
									onChange={e => {
										e.preventDefault()
										if (postMsgAsync) postMsgAsync({
											type: "URL_INPUT_CHANGE",
											data: {
												uri: e.target.value,
												defaultHandler: FileInput.defaultHandler
											}
										})
									}}
									rows={2}
									style={{
										fontWeight: 300,
										width: "300px",
										border: "thin solid silver",
										fontSize: "1rem",
										borderRadius: "0.25em"
									}}>
								</textarea>

								<HoverBox
									theme={props.theme}
									hoverStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
									style={{ height: "2rem", marginLeft: "0.5em" }}>
									<CommandBox
										theme={props.theme}
										style={{ height: "2rem", padding: "0 0.5em", width: "60px" }}
										iconPlacement={"before"}
										onClick={() => {
											Request.get({ uri: props.uri || "", encoding: null }, (err, response, body) => {
												if (err) {
													if (props.onLoadingError !== undefined) {
														props.onLoadingError(new Error(`Could not load data from this url. Try to download it as a file then upload it here`))
													}
													throw new Error(`Could not load data from the url. Parsing canceled`)
												}
												if (onDataLoaded && uri) onDataLoaded(body, uri)

											})
										}}> Submit
									</CommandBox>
								</HoverBox>
							</StackPanel>

							: undefined
					}

				</div>
			</div>
		</label>
	</div>
}

// eslint-disable-next-line fp/no-mutating-assign
export const FileInput = Object.assign(_, {
	defaultHandler: function <T>(props: Partial<Props>, msg: Messages): InternalProps {
		const fullProps = { ...defaultProps, ...props }
		// eslint-disable-next-line fp/no-let, init-declarations
		let newProps: Partial<InternalProps>

		switch (msg.type) {
			case "SHOW_URL_INPUT": {
				// eslint-disable-next-line fp/no-mutation
				newProps = { showUrlInput: fullProps.showUrlInput ? false : true }
				break
			}
			case "URL_INPUT_CHANGE": {
				// eslint-disable-next-line fp/no-mutation
				newProps = { uri: msg.data.uri }
				break
			}
			default:
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				throw new Error(`Unknown table view message type: ${(msg as any).type}`)
		}

		return { ...newProps }
	}
})