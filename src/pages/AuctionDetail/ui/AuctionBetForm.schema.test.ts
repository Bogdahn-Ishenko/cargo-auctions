import { describe, expect, it } from "vitest";
import { BetFormSchema } from "./AuctionBetForm";

describe("BetFormSchema", () => {
  it("accepts numeric strings", () => {
    expect(BetFormSchema.parse({ price: "124250" })).toEqual({
      price: 124250,
    });
  });

  it("accepts max values that are not aligned to native input step", () => {
    expect(BetFormSchema.parse({ price: "166750" })).toEqual({
      price: 166750,
    });
  });

  it("rejects empty values with a human-readable message", () => {
    const result = BetFormSchema.safeParse({ price: undefined });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Укажите сумму ставки");
  });
});
