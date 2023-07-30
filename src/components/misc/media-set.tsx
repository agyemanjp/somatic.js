import { deepMerge, isNullOrUndefined } from '@agyemanjp/standard'
import * as cuid from '@paralleldrive/cuid2'
import { createElement, invalidateUI } from '../../core'
import { CSSProperties, Component, DragEvent, HtmlProps, PanelProps } from '../../types'
import { StackPanel } from '../panels'

export type MediaSetProps = PanelProps & HtmlProps & {
    mediaItems?: File[],
    onMediaChange?: (newItems: File[]) => void,
    accept?: string
	itemsStyle?: CSSProperties
};

export const MediaSet: Component<MediaSetProps> = function* (_props) {
	const defaultProps = {
		id: cuid.createId(),
		orientation: 'horizontal',
		mediaItems: [],
		accept: 'image/*,video/*',
		style: {
			border: 'thin solid gray',
			overflow: 'hidden',
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

	const { id, orientation, mediaItems, onMediaChange, accept, style, itemsStyle, ...htmlProps } = props as Required<MediaSetProps>

	let state = {
		mediaItems: mediaItems as File[],
	}

	const handleDrop = (event: DragEvent) => {
		event.preventDefault()

		const files = Array.from(event.dataTransfer.files) as File[]
		if (files.length > 0) {
			state = { mediaItems: [...state.mediaItems, ...files] }
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
				<input
					type='file'
					accept={accept}
					onChange={event => {
						const files = Array.from(event.target.files ?? [])
						if (files.length > 0) {
							state = { mediaItems: [...state.mediaItems, ...files] }
							if (!isNullOrUndefined(onMediaChange)) {
								onMediaChange(state.mediaItems)
							}
							invalidateUI([id])
						}
					}} 
					multiple
				/>
				
				<div
					onDrop={handleDrop}
					style={itemsStyle}
					onDragOver={(event: DragEvent) => event.preventDefault()}>
					{state.mediaItems.map((mediaItem, index) => (
						<div id={index.toString()}>
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
			</StackPanel>
		)
	}
}

MediaSet.isPure = true
