import * as z from "zod";

export const eggFormSchema = z.object({
  quantity: z.coerce
    .number()
    .min(1, "Ilość musi być większa od 0"),
  date: z.string().nonempty("Data jest wymagana"),
});

export type EggFormData = z.infer<typeof eggFormSchema>;
