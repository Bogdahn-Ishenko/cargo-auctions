import { z } from "zod";

export const BetFormSchema = z.object({
  price: z
    .string({ error: "Укажите сумму ставки" })
    .trim()
    .min(1, { message: "Укажите сумму ставки" })
    .transform((rawValue, context) => {
      const price = Number(rawValue.replace(",", "."));

      if (!Number.isFinite(price)) {
        context.addIssue({
          code: "custom",
          message: "Укажите корректную сумму",
        });
        return z.NEVER;
      }

      if (price <= 0) {
        context.addIssue({
          code: "custom",
          message: "Укажите сумму больше 0",
        });
        return z.NEVER;
      }

      return price;
    }),
});

export interface BetFormInput {
  price: string;
}

export type BetFormValues = z.output<typeof BetFormSchema>;
