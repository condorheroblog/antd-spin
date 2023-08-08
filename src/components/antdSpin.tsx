import type { SpinProps } from "antd";
import { createRoot } from "react-dom/client";
import { Spin } from "antd";
import "./index.less";

const classPrefix = "AntdSpin";
export interface LoadingOptions {
	target?: HTMLElement | string;
	fullscreen?: boolean;
	lock?: boolean;
	background?: string;
	customClass?: string;
	spinProps?: SpinProps;
	log?: boolean;
}

export interface LoadingInstance {
	close: () => void;
}

let fullscreenInstance: LoadingInstance | undefined = undefined;

function loading(options: LoadingOptions = {}) {
	const resolved = resolveOptions(options);

	if (resolved.fullscreen && fullscreenInstance) {
		return fullscreenInstance;
	}

	const spinContainer = document.createElement("div");
	spinContainer.classList.add(`${classPrefix}-loading-mask`, resolved.customClass);
	if (resolved.fullscreen) {
		spinContainer.classList.add("is-fullscreen");
	}
	spinContainer.style.setProperty("background-color", resolved.background);

	const parentPosition = globalThis.getComputedStyle(resolved.parent).getPropertyValue("position");
	if (!["absolute", "fixed", "sticky"].includes(parentPosition)) {
		resolved.parent.classList.add(`${classPrefix}-loading-parent--relative`);
	}
	if (resolved.lock) {
		resolved.parent.classList.add(`${classPrefix}-loading-parent--hidden`);
	}

	const root = createRoot(spinContainer);

	let rootClassName = "";
	if (resolved.spinProps.children) {
		if (resolved.spinProps.rootClassName) {
			rootClassName += `${resolved.spinProps.rootClassName}`;
		}
	} else {
		rootClassName = `${classPrefix}-loading-spinner`;
		if (resolved.spinProps.rootClassName) {
			rootClassName += ` ${resolved.spinProps.rootClassName}`;
		}
	}

	root.render(<Spin {...resolved.spinProps} rootClassName={rootClassName} />);
	resolved.parent.appendChild(spinContainer);

	const instance = {
		close: () => {
			resolved.parent.classList.remove(
				`${classPrefix}-loading-parent--relative`,
				`${classPrefix}-loading-parent--hidden`,
			);
			spinContainer.parentNode?.removeChild(spinContainer);
			root.unmount();
			fullscreenInstance = undefined;
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
		background: options.background || "transparent",
		spinProps: options.spinProps || {},
		log: false,
	};
};

export const antdSpin = {
	service: loading,
};
