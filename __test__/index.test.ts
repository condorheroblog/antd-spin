import { describe, test, vi } from "vitest";
import { antdSpin } from "../src";

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
		const closeSpy = vi.spyOn(service, "close");
		expect(closeSpy).not.toHaveBeenCalled();
		service.close();
		expect(closeSpy).toHaveBeenCalled();
	});
});
