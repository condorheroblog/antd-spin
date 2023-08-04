import React from "react";
import ReactDOM from "react-dom/client";
import { antdSpin } from "../../src";
import "./index.css";

const Demo = () => {
	const loading = antdSpin.service({
		lock: true,
		text: "Loading",
		background: "rgba(0, 0, 0, 0.7)",
	});
	setTimeout(() => {
		loading.close();
	}, 2000);
	return <h1>Hi</h1>;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Demo />
	</React.StrictMode>,
);
