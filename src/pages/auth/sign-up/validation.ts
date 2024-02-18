import zod from "zod";

const passwordValidationRegex = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
const mobileNumberValidationRegex = "^01[3-9]\\d{8}$";

export const SignUpFormSchema = zod
  .object({
    name: zod.string().min(1, "Must contain atleast one character"),
    mobileNumber: zod
      .string()
      .regex(new RegExp(mobileNumberValidationRegex), { message: "Must be a valid Bangladeshi mobile number" }),
    password: zod.string().regex(new RegExp(passwordValidationRegex), {
      message:
        "Must be at least 8 characters long and include at least one letter, one digit, and one special character (@$!%*?&)",
    }),
    confirmPassword: zod.string().regex(new RegExp(passwordValidationRegex), {
      message: "Invalid password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignUpFormFields = zod.infer<typeof SignUpFormSchema>;
