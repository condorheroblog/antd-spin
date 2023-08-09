import type { SpinProps } from "antd";
import { createPortal } from "react-dom";
import { Spin } from "antd";

import { classPrefix } from "./service";

export interface AntdSpinProps extends SpinProps {
	fullscreen?: boolean;
}

export const AntdSpin = (antdSpinProps: AntdSpinProps) => {
	const { fullscreen, ...spinProps } = antdSpinProps;

	if (fullscreen) {
		const { children, ...fullscreenProps } = spinProps;
		return (
			<>
				{children}
				{fullscreenProps.spinning
					? createPortal(
							<div className={`${classPrefix}-loading-mask is-fullscreen`}>
								<Spin {...fullscreenProps} style={{ maxHeight: "initial" }}>
									{/* tip: Customize description content when Spin has children */}
									{null}
								</Spin>
							</div>,
							document.body,
					  )
					: null}
			</>
		);
	}

	return <Spin {...spinProps} />;
};
