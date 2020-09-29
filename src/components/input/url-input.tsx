/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Request from 'request'
import { createElement } from '../../core'
import { Props, Component } from '../../types'
import { StackPanel } from '../panels/stack-panel'
import { HoverBox } from '../boxes/hover-box'

export type Messages = (
    | { type: "DATA_LOADED", data: { data: ArrayBuffer, fileName: string } }
    | { type: "LOADING_ERROR", data: { error: Error } }
)

export const UrlInput: Component<Props.Themed, Messages> = (props) => {
    return <StackPanel
        style={{
            fontSize: "1rem"
        }}>
        <textarea
            name="dataset_url"
            onClick={ev => {
                ev.stopPropagation()
            }}
            rows={2}
            style={{
                fontWeight: 300,
                width: "300px",
                border: "thin solid silver",
                fontSize: "1rem",
                borderRadius: "0.25em"
            }} />

        <HoverBox
            theme={props.theme}
            hoverStyle={{
                backgroundColor: "rgba(0,0,0,0.1)"
            }}
            style={{
                height: "2rem",
                marginLeft: "0.5em"
            }}>
            <button
                style={{
                    height: "2rem",
                    padding: "0 0.5em",
                    width: "60px"
                }}
                onClick={(ev) => {
                    ev.preventDefault()
                    ev.stopPropagation()
                    const url = (document.querySelector(`textarea[name="dataset_url"]`) as HTMLInputElement).value

                    Request.get(
                        {
                            uri: url,
                            encoding: null
                        },
                        (err: Error, response: Request.Response, body) => {
                            if (err) {
                                if (props.postMsgAsync)
                                    props.postMsgAsync({
                                        type: "LOADING_ERROR",
                                        data: {
                                            error: new Error(`Could not load data from this url. Try to download it as a file then upload it here`)
                                        }
                                    })
                            }
                            else {
                                if (props.postMsgAsync)
                                    props.postMsgAsync({
                                        type: "DATA_LOADED",
                                        data: { data: body.buffer, fileName: url }
                                    })
                            }

                        })
                }}> Submit
					</button>
        </HoverBox>
    </StackPanel>
}