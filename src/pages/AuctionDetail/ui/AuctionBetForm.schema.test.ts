import { describe, expect, it } from "vitest";
import { BetFormSchema } from "./AuctionBetForm";

describe("BetFormSchema", () => {
  it("accepts numeric strings", () => {
    expect(BetFormSchema.parse({ price: "124250" })).toEqual({
      price: 124250,
    });
  });

  it("rejects empty values with a human-readable message", () => {
    const result = BetFormSchema.safeParse({ price: undefined });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Укажите сумму ставки");
  });
});
