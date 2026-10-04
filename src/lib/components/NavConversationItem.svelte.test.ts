import { describe, expect, it } from "vitest";

import { renderWithApp } from "$lib/components/__tests__/renderWithApp";
import { ACTIVE_GENERATIONS_CONTEXT_KEY } from "$lib/stores/activeGenerations.svelte";
import NavConversationItem from "./NavConversationItem.svelte";

describe("NavConversationItem", () => {
	it("keeps long conversation titles in a truncating wrapper", () => {
		const title = "A".repeat(200);
		const { baseElement } = renderWithApp(
			NavConversationItem,
			{
				conv: {
					id: "conv-1",
					title,
					updatedAt: new Date(),
				},
				readOnly: true,
			},
			{
				context: new Map([
					[
						ACTIVE_GENERATIONS_CONTEXT_KEY,
						{
							has: () => false,
							statusFor: () => undefined,
						},
					],
				]),
			}
		);

		const link = baseElement.querySelector(`a[href="/conversation/conv-1"]`);
		expect(link).not.toBeNull();
		expect(link?.className).toContain("min-w-0");
		expect(link?.className).toContain("flex-1");

		const titleSpan = link?.querySelector("span");
		expect(titleSpan?.textContent).toBe(title);
		expect(titleSpan?.className).toContain("truncate");
	});
});
