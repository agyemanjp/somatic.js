/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from '../../core'
import { Component, CSSProperties, Theme } from '../../types'

interface Props { theme: Theme, style?: CSSProperties }

export const create = (svgElement: JSX.Element): Component<Props> => {
	return async (props) => {
		const elt = await svgElement
		return <svg
			{...elt.props}

			preserveAspectRatio='xMidYMid meet'
			fill={props.theme.colors.primary.dark}
			stroke={props.theme.colors.primary.dark}
			style={{
				color: props.theme.colors.primary.dark,
				backgroundColor: props.theme.colors.primary.light,
				...props.style
			}}>

			{elt.children}
		</svg>
	}
}

export const Azure = create(
	<svg version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		x="0px" y="0px"
		viewBox="0 0 100 100"
		enableBackground="new 0 0 100 100"
		xmlSpace="preserve">

		<path
			fill="#fff"
			d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
			<animateTransform
				attributeName="transform"
				attributeType="XML"
				type="rotate"
				dur="2s"
				from="0 50 50"
				to="360 50 50"
				repeatCount="indefinite" />
		</path>

		<path
			fill="#fff"
			d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
			<animateTransform
				attributeName="transform"
				attributeType="XML"
				type="rotate"
				dur="1s"
				from="0 50 50"
				to="-360 50 50"
				repeatCount="indefinite" />
		</path>

		<path
			fill="#fff"
			d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5 L82,35.7z">
			<animateTransform
				attributeName="transform"
				attributeType="XML"
				type="rotate"
				dur="2s"
				from="0 50 50"
				to="360 50 50"
				repeatCount="indefinite" />
		</path>
	</svg>
)

export const Oscilloscope = create(
	<svg version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		x="0px" y="0px"
		viewBox="0 0 100 100"
		enableBackground="new 0 0 100 100"
		xmlSpace="preserve">
		<rect
			fill="#fff"
			width="3"
			height="100"
			transform="translate(0) rotate(180 3 50)">
			<animate
				attributeName="height"
				attributeType="XML"
				dur="1s"
				values="30; 100; 30"
				repeatCount="indefinite" />
		</rect>
		<rect
			x="17"
			fill="#fff"
			width="3"
			height="100"
			transform="translate(0) rotate(180 20 50)">
			<animate
				attributeName="height"
				attributeType="XML"
				dur="1s"
				values="30; 100; 30"
				repeatCount="indefinite"
				begin="0.1s" />
		</rect>
		<rect
			x="40"
			fill="#fff"
			width="3"
			height="100"
			transform="translate(0) rotate(180 40 50)">
			<animate
				attributeName="height"
				attributeType="XML"
				dur="1s"
				values="30; 100; 30"
				repeatCount="indefinite"
				begin="0.3s" />
		</rect>
		<rect
			x="60"
			fill="#fff"
			width="3"
			height="100"
			transform="translate(0) rotate(180 58 50)">
			<animate
				attributeName="height"
				attributeType="XML"
				dur="1s"
				values="30; 100; 30"
				repeatCount="indefinite"
				begin="0.5s" />
		</rect>
		<rect
			x="80"
			fill="#fff"
			width="3"
			height="100"
			transform="translate(0) rotate(180 76 50)">
			<animate
				attributeName="height"
				attributeType="XML"
				dur="1s"
				values="30; 100; 30"
				repeatCount="indefinite"
				begin="0.1s" />
		</rect>
	</svg>
)

export const BouncingBalls: Component<Props> = () => <svg style={{ verticalAlign: "middle" }} height="100 % " version="1.1" id="L5"
	xmlns="http://www.w3.org/2000/svg"
	xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve" >
	<circle stroke="none" cx="6" cy="50" r="6">
		<animateTransform
			attributeName="transform"
			dur="1s"
			type="translate"
			values="0 15 ; 0 -15; 0 15"
			repeatCount="indefinite"
			begin="0.1" />
	</circle>
	<circle stroke="none" cx="30" cy="50" r="6">
		<animateTransform
			attributeName="transform"
			dur="1s"
			type="translate"
			values="0 10 ; 0 -10; 0 10"
			repeatCount="indefinite"
			begin="0.2" />
	</circle>
	<circle stroke="none" cx="54" cy="50" r="6">
		<animateTransform
			attributeName="transform"
			dur="1s"
			type="translate"
			values="0 5 ; 0 -5; 0 5"
			repeatCount="indefinite"
			begin="0.3" />
	</circle>
</svg >

export const Box = create(
	<svg version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		x="0px" y="0px"
		viewBox="0 0 100 100"
		enableBackground="new 0 0 100 100"
		xmlSpace="preserve">
		<rect fill="none" stroke="#fff"
			strokeWidth="4"
			x="25" y="25"
			width="50" height="50">
			<animateTransform
				attributeName="transform"
				dur="0.5s"
				from="0 50 50"
				to="180 50 50"
				type="rotate"
				id="strokeBox"
				attributeType="XML"
				begin="rectBox.end" />
		</rect>
		<rect x="27" y="27" fill="#fff" width="46" height="50">
			<animate
				attributeName="height"
				dur="1.3s"
				attributeType="XML"
				from="50"
				to="0"
				id="rectBox"
				fill="freeze"
				begin="0s;strokeBox.end" />
		</rect>
	</svg>
)

export const Bars = create(
	<svg width="135" height="140"
		viewBox="0 0 135 140"
		xmlns="http://www.w3.org/2000/svg" fill="#fff">
		<rect y="10" width="15" height="120" rx="6">
			<animate attributeName="height"
				begin="0.5s" dur="1s"
				values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
				repeatCount="indefinite" />
			<animate attributeName="y"
				begin="0.5s" dur="1s"
				values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
				repeatCount="indefinite" />
		</rect>
		<rect x="30" y="10" width="15" height="120" rx="6">
			<animate attributeName="height"
				begin="0.25s" dur="1s"
				values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
				repeatCount="indefinite" />
			<animate attributeName="y"
				begin="0.25s" dur="1s"
				values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
				repeatCount="indefinite" />
		</rect>
		<rect x="60" width="15" height="140" rx="6">
			<animate attributeName="height"
				begin="0s" dur="1s"
				values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
				repeatCount="indefinite" />
			<animate attributeName="y"
				begin="0s" dur="1s"
				values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
				repeatCount="indefinite" />
		</rect>
		<rect x="90" y="10" width="15" height="120" rx="6">
			<animate attributeName="height"
				begin="0.25s" dur="1s"
				values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
				repeatCount="indefinite" />
			<animate attributeName="y"
				begin="0.25s" dur="1s"
				values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
				repeatCount="indefinite" />
		</rect>
		<rect x="120" y="10" width="15" height="120" rx="6">
			<animate attributeName="height"
				begin="0.5s" dur="1s"
				values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
				repeatCount="indefinite" />
			<animate attributeName="y"
				begin="0.5s" dur="1s"
				values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
				repeatCount="indefinite" />
		</rect>
	</svg>

)

export const RingsConcentric = create(
	<svg
		width="45"
		height="45"
		viewBox="0 0 45 45"
		xmlns="http://www.w3.org/2000/svg"
		stroke="#fff">
		<g fill="none"
			fillRule="evenodd"
			transform="translate(1 1)"
			strokeWidth="2">
			<circle cx="22"
				cy="22" r="6"
				strokeOpacity="0">
				<animate attributeName="r"
					begin="1.5s" dur="3s"
					values="6;22"
					calcMode="linear"
					repeatCount="indefinite" />
				<animate attributeName="stroke-opacity"
					begin="1.5s" dur="3s"
					values="1;0" calcMode="linear"
					repeatCount="indefinite" />
				<animate attributeName="stroke-width"
					begin="1.5s" dur="3s"
					values="2;0" calcMode="linear"
					repeatCount="indefinite" />
			</circle>
			<circle cx="22" cy="22" r="6" strokeOpacity="0">
				<animate attributeName="r"
					begin="3s" dur="3s"
					values="6;22"
					calcMode="linear"
					repeatCount="indefinite" />
				<animate attributeName="stroke-opacity"
					begin="3s" dur="3s"
					values="1;0" calcMode="linear"
					repeatCount="indefinite" />
				<animate attributeName="stroke-width"
					begin="3s" dur="3s"
					values="2;0" calcMode="linear"
					repeatCount="indefinite" />
			</circle>
			<circle cx="22" cy="22" r="8">
				<animate attributeName="r"
					begin="0s" dur="1.5s"
					values="6;1;2;3;4;5;6"
					calcMode="linear"
					repeatCount="indefinite" />
			</circle>
		</g>
	</svg>
)

export const RingAsymmetric: Component<Props> = () => <div
	style={{
		position: "absolute",
		top: 0, left: 0,
		width: "100vw",
		height: "100vh"
	}}>

	<div className="spinner">
		<div className="windows8">
			<div className="wBall" id="wBall_1">
				<div className="wInnerBall"></div>
			</div>
			<div className="wBall" id="wBall_2">
				<div className="wInnerBall"></div>
			</div>
			<div className="wBall" id="wBall_3">
				<div className="wInnerBall"></div>
			</div>
			<div className="wBall" id="wBall_4">
				<div className="wInnerBall"></div>
			</div>
			<div className="wBall" id="wBall_5">
				<div className="wInnerBall"></div>
			</div>
		</div>
	</div>

</div>


const spinners = {
	"azure": Azure,
	"box": Box,
	"bouncing-balls": BouncingBalls,
	"oscilloscpoe": Oscilloscope,
	"ring-asymm": RingAsymmetric,
	"ring-concentric": RingsConcentric
}

export const Spinners = spinners