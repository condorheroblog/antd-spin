import type { CSSProperties } from "react";

interface LoadingConfig {
	spinner?: string;
	rotate?: number;
	spin?: boolean;
	style?: CSSProperties;
	twoToneColor?: string;
}

interface IconFontConfig {
	// TODO: add properties for IconFont config
}

interface LoadingOptions {
	target?: HTMLElement | string;
	lock?: boolean;
	text?: string;
	background?: string;
	size?: "small" | "default" | "large";
	customClass?: string;
	loadingConfig?: LoadingConfig;
	indicator?: string;
	component?: SVGElement;
	IconFont?: IconFontConfig;
	log?: boolean;
}

/**
 * Initial configuration object for antSpin.
 *
 * @property {HTMLElement|string} target - The DOM element or selector string for the target element.
 * @property {boolean} lock - Whether or not to lock the target element while the component is active.
 * @property {string} text - The loading text to display beneath the loading icon.
 * @property {string} background - The background color for the component.
 * @property {string} size - The size of the component, can be one of "small", "default", or "large".
 * @property {string} customClass - A custom class name to add to the component.
 * @property {Object} loadingConfig - The configuration options for the loading icon.
 * @property {string} loadingConfig.spinner - The custom class name for the loading icon.
 * @property {number} loadingConfig.rotate - The rotation angle of the loading icon (not supported in IE9).
 * @property {boolean} loadingConfig.spin - Whether or not the loading icon should spin.
 * @property {Object} loadingConfig.style - Additional CSS styles to apply to the loading icon.
 * @property {string} loadingConfig.twoToneColor - The primary color for a two-tone loading icon.
 * @property {string} indicator - A custom indicator to display instead of the default loading icon.
 * @property {HTMLElement} component - An SVG element to use as the loading icon.
 * @property {Object} IconFont - An object containing configuration options for an icon font.
 * @property {boolean} log - Whether or not to log output to the console.
 */
const INITIAL_CONFIG = {
	target: null,
	lock: false,
	text: "",
	background: "transparent",
	size: "large",
	customClass: "",
	loadingConfig: {
		spinner: "",
		rotate: 0,
		spin: false,
		style: {},
		twoToneColor: "#eb2f96",
	},
	indicator: "",
	component: null,
	IconFont: {},
	log: false,
};

function loading(config?: LoadingOptions) {
	console.log(config, INITIAL_CONFIG);
	return {
		close: () => {
			console.log("closed");
		},
	};
}

export const antdSpin = {
	service: loading,
};
