import { deepMerge, isNullOrUndefined } from '@agyemanjp/standard'
import * as cuid from '@paralleldrive/cuid2'
import Cropper from 'cropperjs'
import { createElement, invalidateUI } from '../../core'
import { CSSProperties, Component, DragEvent, HtmlProps, PanelProps } from '../../types'
import { StackPanel } from '../panels'

export type MediaSetProps = PanelProps & HtmlProps & {
	mediaItems?: File[],
	onMediaChange?: (newItems: File[]) => void,
	accept?: string,
	itemsStyle?: CSSProperties,
	uploadPreset?: string,
	cloudName?: string,
};

// Create a cropping area
const cropArea = document.createElement('div')
cropArea.style.position = 'fixed'
cropArea.style.left = '50%'
cropArea.style.top = '50%'
cropArea.style.transform = 'translate(-50%, -50%)'
cropArea.style.width = '50vw'
cropArea.style.height = '50vh'
cropArea.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
cropArea.style.display = 'none'
document.body.appendChild(cropArea)

// Create an image element for the Cropper.js instance
const cropImage = document.createElement('img')
cropArea.appendChild(cropImage)

// Create a Cropper.js instance
const cropper = new Cropper(cropImage, { aspectRatio: 1 })

// Create a "Done" button
const doneButton = document.createElement('button')
doneButton.textContent = 'Done'
cropArea.appendChild(doneButton)

export const MediaSet: Component<MediaSetProps> = function* (_props) {
	const defaultProps = {
		id: cuid.createId(),
		orientation: 'horizontal',
		mediaItems: [],
		accept: 'image/*,video/*',
		style: {
			border: 'thin solid gray',
			overflow: 'hidden',
			flexDirection: 'column',

		},
		itemsStyle: {
			display: "grid",
			height: "100%",
			gridTemplateColumns: "25% 25% 25% 25%",

			gridGap: "10px",
			padding: "20px",
			justifyContent: "space-evenly",
			alignContent: "space-evenly"
		}
	} satisfies MediaSetProps

	const props = deepMerge(defaultProps, _props)

	const {
		id,
		orientation,
		mediaItems,
		onMediaChange,
		accept,
		style,
		uploadPreset,
		cloudName,
		itemsStyle,
		...htmlProps
	} = props as Required<MediaSetProps>

	let state = {
		mediaItems: mediaItems as File[],
	}

	const uploadToCloudinary = async (file: File) => {
		const formData = new FormData()
		formData.append('file', file)
		formData.append('upload_preset', uploadPreset)
		formData.append('cloud_name', cloudName)

		const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
			method: 'POST',
			body: formData,
		})

		return response.json()
	}

	const handleDrop = (event: DragEvent) => {
		event.preventDefault()

		const files = Array.from(event.dataTransfer.files) as File[]
		if (files.length > 0) {
			state = { mediaItems: [...state.mediaItems, ...files] }
			for (const file of files) {
				uploadToCloudinary(file)
			}

			if (!isNullOrUndefined(onMediaChange)) {
				onMediaChange(state.mediaItems)
			}
			invalidateUI([id])
		}
	}

	while (true) {
		yield (
			<StackPanel
				id={id}
				orientation={orientation}
				style={style}
				{...htmlProps}

			>
				<div style={{ display: 'block flex' }}>
					<div style={{ display: 'block' }}>
						<input
							type='file'
							accept={accept}
							onChange={event => {
								const files = Array.from(event.target.files ?? [])
								if (files.length > 0) {
									state = { mediaItems: [...state.mediaItems, ...files] }
									for (const file of files) {
										uploadToCloudinary(file)
									}
									if (!isNullOrUndefined(onMediaChange)) {
										onMediaChange(state.mediaItems)
									}
									invalidateUI([id])
								}
							}}
							multiple
						/>
						{/* <button>Upload</button> */}
					</div>


					<div
						onDrop={handleDrop}
						style={itemsStyle}
						onDragOver={(event: DragEvent) => event.preventDefault()}>
						{state.mediaItems.map((mediaItem, index) => (
							<div
								id={index.toString()} onClick={() => {
									// Show the cropping area
									cropArea.style.display = 'block'

									// Load the image into the Cropper.js instance
									cropper.reset().clear().replace(URL.createObjectURL(mediaItem))

									doneButton.onclick = () => {
										// Hide the cropping area
										cropArea.style.display = 'none'

										// Get the cropped image as a Blob
										cropper.getCroppedCanvas().toBlob(blob => {
											if (blob) {
												// Convert the Blob to a File
												const file = new File([blob], 'cropped.jpg', {
													type: 'image/jpeg',
												})

												// Replace the original image with the cropped image
												state = {
													...state,
													mediaItems: state.mediaItems.map((item, i) => i === index ? file : item),
												}
												if (!isNullOrUndefined(onMediaChange)) {
													onMediaChange(state.mediaItems)
												}
												invalidateUI([id])
											}
										})
									}
								}}>
								{mediaItem.type.startsWith('image') ?
									<img src={URL.createObjectURL(mediaItem)} alt={`Media ${index}`} style={{ width: '50%', height: 'auto' }} />
									:
									<video width='320' height='240' controls>
										<source src={URL.createObjectURL(mediaItem)} type={mediaItem.type} />
										Your browser does not support the video tag.
									</video>
								}
								<button onClick={() => {
									state = { mediaItems: state.mediaItems.filter((_, i) => i !== index) }
									if (!isNullOrUndefined(onMediaChange)) {
										onMediaChange(state.mediaItems)
									}
									invalidateUI([id])
								}}>Remove</button>
							</div>
						))}
					</div>
				</div>

			</StackPanel>
		)
	}
}

MediaSet.isPure = true
