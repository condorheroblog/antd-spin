import type { CSSProperties } from "react";
import { createRoot } from "react-dom/client";
import { Spin } from "antd";
import "./index.css";

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
	fullscreen?: boolean;
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

interface LoadingInstance {
	close: () => void;
}

let fullscreenInstance: LoadingInstance | undefined = undefined;

function loading(options: LoadingOptions = {}) {
	const resolved = resolveOptions(options);

	if (resolved.fullscreen && fullscreenInstance) {
		return fullscreenInstance;
	}

	console.log(resolved);

	const spinContainer = document.createElement("div");
	spinContainer.classList.add("el-loading-mask", resolved.customClass);

	const parentPosition = globalThis.getComputedStyle(resolved.parent).getPropertyValue("position");
	if (!["absolute", "fixed", "sticky"].includes(parentPosition)) {
		resolved.parent.classList.add("el-loading-parent--relative");
	}

	const root = createRoot(spinContainer);
	root.render(<Spin />);
	resolved.parent.appendChild(spinContainer);

	const instance = {
		close: () => {
			resolved.parent.classList.remove("el-loading-parent--relative");
			spinContainer.parentNode?.removeChild(spinContainer);
			root.unmount();
			console.log("closed");
		},
	};
	if (resolved.fullscreen) {
		fullscreenInstance = instance;
	}
	return instance;
}

const resolveOptions = (options: LoadingOptions) => {
	let target: HTMLElement;
	if (typeof options.target === "string") {
		target = document.querySelector<HTMLElement>(options.target) ?? document.body;
	} else {
		target = options.target ?? document.body;
	}

	return {
		parent: target,
		fullscreen: target === document.body && (options.fullscreen ?? true),
		lock: options.lock ?? false,
		customClass: options.customClass || "",
		text: "",
		background: "transparent",
		size: "large",
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
};

export const antdSpin = {
	service: loading,
};
