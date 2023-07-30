import { deepMerge, isUndefined } from '@agyemanjp/standard'
import * as cuid from '@paralleldrive/cuid2'
import axios from 'axios'
import imageCompression from 'browser-image-compression'
import { createElement, invalidateUI } from '../core'
import { Component, HtmlProps, PanelProps } from '../types'
import { StackPanel } from './panels'

export type MediaSetProps = PanelProps & HtmlProps & {
    mediaItems?: string[],
    onMediaChange?: (newItems: string[]) => void,
    accept?: string,
    maxFileSize?: number,
    imageCompressionOptions?: imageCompression.ImageCompressionOptions,
    uploadUrl?: string
}

export const MediaSet: Component<MediaSetProps> = function* (_props) {
	const defaultProps = {
		id: cuid.createId(),
		orientation: 'horizontal',
		mediaItems: [],
		accept: 'image/*,video/*',
		maxFileSize: 10485760, // 10 MB
		imageCompressionOptions: { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true },
		uploadUrl: '/upload',
		style: {
			border: 'thin solid gray',
			overflow: 'hidden',
		}
	} satisfies MediaSetProps

	const props = deepMerge(defaultProps, _props)

	const { id, orientation, mediaItems, onMediaChange, accept, maxFileSize, imageCompressionOptions, uploadUrl, style, ...htmlProps } = props as Required<MediaSetProps>

	let state = {
		mediaItems: mediaItems as string[]
	}

	while (true) {
		yield (
			<StackPanel id={id} orientation={orientation} style={style} {...htmlProps}>
				<input
					type='file'
					accept={accept}
					onChange={async event => {
						const file = event.target.files[0]
						if (!file || file.size > maxFileSize) {
							console.error('File is too large or not selected.')
							return
						}

						if (file.type.startsWith('image/')) {
							const compressedFile = await imageCompression(file, imageCompressionOptions)
							const formData = new FormData()
							formData.append('file', compressedFile)

							try {
								const response = await axios.post(uploadUrl, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
								if (response.status === 200) {
									state = { mediaItems: [...state.mediaItems, response.data.file] }
									if (!isUndefined(onMediaChange)) {
										onMediaChange(state.mediaItems)
									}
									invalidateUI([id])
								}
							}
							catch (err) {
								console.error('Error uploading file:', err)
							}
						}
						else if (file.type.startsWith('video/')) {
							// Handle video files...
						}
					}} />

				{state.mediaItems.map((mediaItem, index) => (
					<div key={index}>
						<img src={mediaItem} alt={`Media ${index}`} style={{ width: '100%', height: 'auto' }} />
						<button onClick={() => {
							state = { mediaItems: state.mediaItems.filter((_, i) => i !== index) }
							if (!isUndefined(onMediaChange)) {
								onMediaChange(state.mediaItems)
							}
							invalidateUI([id])
						}}>Remove</button>
					</div>
				))}
			</StackPanel>
		)
	}
}

MediaSet.isPure = true