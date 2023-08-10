import { describe, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { antdSpin, classPrefix, AntdSpin } from "../src";
import React from "react";

// @vitest-environment happy-dom
describe("The structure of the antSpin object", () => {
	test("antdSpin is defined", async ({ expect }) => {
		expect(antdSpin).toBeDefined();
	});

	test("Is there a service attribute", async ({ expect }) => {
		expect(antdSpin).toHaveProperty("service");
	});

	test("Is there return a close attribute", async ({ expect }) => {
		const { service } = antdSpin;
		expect(service()).toHaveProperty("close");
	});

	test("The close returned by service can be called", async ({ expect }) => {
		const service = antdSpin.service();
		const spinInstanceSpy = vi.spyOn(service, "close");
		expect(spinInstanceSpy).not.toHaveBeenCalled();
		service.close();
		expect(spinInstanceSpy).toHaveBeenCalled();
	});

	test("Singleton pattern", async ({ expect }) => {
		const service1 = antdSpin.service();
		const service2 = antdSpin.service();
		expect(service1 === service2).toBeTruthy();
	});

	test("Calling any close function in singleton mode", async ({ expect }) => {
		const service1 = antdSpin.service();
		const service2 = antdSpin.service();
		const spinInstanceSpy1 = vi.spyOn(service1, "close");
		const spinInstanceSpy2 = vi.spyOn(service2, "close");
		expect(spinInstanceSpy1).not.toHaveBeenCalled();
		expect(spinInstanceSpy2).not.toHaveBeenCalled();
		service2.close();
		expect(spinInstanceSpy1).toHaveBeenCalled();
	});
});

describe("Service", () => {
	test("Render a fullscreen Spin", async ({ expect }) => {
		const service = antdSpin.service();
		const container = document.querySelector(`.${classPrefix}-loading-parent--relative`);
		expect(container?.contains(container.querySelector(`.${classPrefix}-loading-mask`))).toBeTruthy();
		expect(container?.contains(container.querySelector(`.is-fullscreen`))).toBeTruthy();
		expect(container === document.body).toBeTruthy();
		service.close();
	});

	test("lock of options", async ({ expect }) => {
		const service = antdSpin.service({ lock: true });
		const container = document.querySelector(`.${classPrefix}-loading-parent--hidden`);
		expect(container).not.toBeNull();
		service.close();
	});

	test("fullscreen of options", async ({ expect }) => {
		const service = antdSpin.service({ fullscreen: true });
		const container = document.querySelector(`.${classPrefix}-loading-parent--relative`);
		expect(container).not.toBeNull();
		service.close();
	});

	test("target of options", async ({ expect }) => {
		const main = document.createElement("main");
		const service = antdSpin.service({
			target: main,
		});
		const isTarget = main.getAttribute("class")?.includes(`${classPrefix}-loading-parent--relative`);
		expect(isTarget).toBeTruthy();
		service.close();
	});

	test("background of options", async ({ expect }) => {
		const backgroundColor = "rgba(0, 0, 0, 0.5)";
		const service = antdSpin.service({ background: backgroundColor });
		const firstElementChild = document.body.firstElementChild as HTMLElement;
		expect(firstElementChild.style.backgroundColor === backgroundColor).toBeTruthy();
		service.close();
	});

	test("customClass of options", async ({ expect }) => {
		const customClass = "xxx-bbb";
		const service = antdSpin.service({ customClass });
		expect(document.body.firstElementChild!.getAttribute("class")?.includes(customClass)).toBeTruthy();
		service.close();
	});

	// test("spinProps of options", async ({ expect }) => {
	// 	const tip = "Hello Spin!";
	// 	const service = antdSpin.service({ spinProps: { tip, children: null } });
	// 	expect(document.querySelector(`.ant-spin-text`)?.innerHTML.includes(tip)).toBeTruthy();
	// 	service.close();
	// });
});

describe("Directive", () => {
	test("A normal Spin", async ({ expect }) => {
		render(
			<AntdSpin spinning={true}>
				<div style={{ height: 200, border: "1px solid #ddd" }}>Hello</div>
			</AntdSpin>,
		);
		expect(screen.getByText("Hello")).toBeTruthy();
	});

	test("A fullscreen Spin", async ({ expect }) => {
		const { container } = render(
			<AntdSpin spinning={true} fullscreen={true}>
				<div style={{ height: 200, border: "1px solid #ddd" }}>Hello</div>
			</AntdSpin>,
		);
		expect(container.querySelector(".is-fullscreen")).toBeDefined();
	});
});
