import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Space, Button, Typography, Row, Col } from "antd";

import { antdSpin, AntdSpin } from "../../src";

const { Title, Paragraph } = Typography;

export const Demo = () => {
	const [loading, setLoading] = useState(false);

	const handleDirective = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 5000);
	};

	const handleService = () => {
		const spinInstance1 = antdSpin.service();
		const spinInstance2 = antdSpin.service();
		// true
		console.log(spinInstance1 === spinInstance2);
		setTimeout(() => {
			spinInstance2.close();
		}, 5000);
	};

	const startTarget = () => {
		const spinInstance = antdSpin.service({
			target: "#demo-target",
			background: "rgba(0, 0, 0, 0.3)",
			spinProps: { tip: "Loading", children: null },
		});
		setTimeout(() => {
			spinInstance.close();
		}, 5000);
	};

	return (
		<Typography>
			<Row gutter={[20, 20]}>
				<Col span={12}>
					<Title>Service</Title>
					<Button onClick={handleService}>As a fullscreen service</Button>

					<Space direction="vertical">
						<br />
						<Paragraph>using target in service mode</Paragraph>
						<div
							id="demo-target"
							style={{
								width: 200,
								lineHeight: "200px",
								border: "1px solid #eee",
								textAlign: "center",
							}}
						>
							set a target
						</div>
						<Button onClick={startTarget}>Start</Button>
					</Space>
				</Col>
				<Col span={12}>
					<Title>Directive</Title>

					<Paragraph>It is not a fullscreen Spin</Paragraph>
					<AntdSpin spinning={true}>
						<div style={{ height: 200, border: "1px solid #ddd" }}></div>
					</AntdSpin>

					<br />

					<Space direction="vertical">
						<Paragraph>It is a fullscreen Spin</Paragraph>
						<AntdSpin spinning={loading} fullscreen={true} indicator={<LoadingOutlined />}>
							<div
								style={{
									width: 200,
									lineHeight: "200px",
									border: "1px solid #eee",
									textAlign: "center",
								}}
							>
								Fixed Here
							</div>
						</AntdSpin>
						<Button onClick={handleDirective}>As a fullscreen directive</Button>
					</Space>
				</Col>
			</Row>
		</Typography>
	);
};
