/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from '../../core'
import { Component, Props, CSSProperties } from '../../types'
import { mergeProps, colorLuminance } from '../../utils'
import { StackPanel } from '../panels/stack-panel'
import { HoverBox } from '../boxes/hover-box'

export type Props = Props.Themed & Partial<Props.Panel> & Props.View & {
    /** Enable multiple or single items selection */
    selectionMode?: "single" | "multiple"

    /** Selected item style */
    selectedStyle: CSSProperties

    /** Enable style based on linear gradient colors */
    appearance?: "modern" | "minimalist"

    /** Indexes of the selected items */
    selectedItems: number[]
}

const defaultProps = {
    selectionMode: "single" as const,
    appearance: "minimalist" as const,
    itemTemplate: (async (datum: string, index: number) => {
        return <span >{datum}</span>
    }) as Component
}

type Messages = { type: "ITEM_SELECTION", data: { selectedIndexes: number[] } }

export const StackView: Component<Props, Messages> = async (props) => {
    const {
        selectionMode,
        sourceData,
        itemTemplate,
        selectedStyle,
        appearance,
        selectedItems,
        theme,
        postMsgAsync,
        ...panelProps
    } = mergeProps(defaultProps, props)

    const colors = {
        background: {
            default: appearance === "minimalist"
                ? colorLuminance(theme.colors.primary.light, 0.35)
                : `linear-gradient(180deg, rgba(0,0,0,0.85}) 0%, rgba(0,0,0,0.4}) 100%)`,
            selected: appearance === "minimalist"
                ? colorLuminance(theme.colors.primary.dark, 0.5)
                : `linear-gradient(180deg, ${theme.colors.secondary.dark} 0%, ${colorLuminance(theme.colors.secondary.light, 0.5)} 100%)`,
            hover: appearance === "minimalist"
                ? colorLuminance(theme.colors.primary.light, 0.30)
                : `linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)`,
            selectedHover: appearance === "minimalist"
                ? colorLuminance(theme.colors.primary.dark, 0.35)
                : `linear-gradient(180deg, ${colorLuminance(theme.colors.secondary.dark, 0.2)} 0%, ${colorLuminance(theme.colors.secondary.light, 0.9)} 100%)`
        },
        foreground: {
            default: appearance === "minimalist" ? theme.colors.blackish : "white",
            selected: "white",
            hover: appearance === "minimalist" ? "black" : "white"
        }
    }

    return <StackPanel {...panelProps}>
        {
            [...sourceData].map((item, index) => {
                const isSelected = selectedItems.includes(index)
                return <HoverBox
                    theme={theme}
                    style={{
                        backgroundColor: isSelected
                            ? colors.background.selected
                            : colors.background.default,
                        color: isSelected
                            ? colors.foreground.selected
                            : colors.foreground.default,
                        ...selectedStyle
                    }}
                    hoverStyle={{
                        color: isSelected ? colors.foreground.selected : colors.foreground.default,
                        background: isSelected ? colors.background.selectedHover : colors.background.hover,
                    }}
                    onClick={() => {
                        if (postMsgAsync) {
                            const selectedIndexes = selectionMode === "single"
                                ? [index]
                                : [...selectedItems, index]
                            postMsgAsync({
                                type: "ITEM_SELECTION",
                                data: {
                                    selectedIndexes
                                }
                            })
                        }
                    }}>
                    {itemTemplate({ datum: item, index: index, style: {} })}
                </HoverBox>
            })
        }
    </StackPanel>
}