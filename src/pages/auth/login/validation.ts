import zod from "zod";

const passwordValidationRegex = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
// const mobileNumberValidationRegex = "^\\+8801[3-9]\\d{8}$";
const mobileNumberValidationRegex = "^01[3-9]\\d{8}$";

export const LoginFormSchema = zod.object({
  mobileNumber: zod
    .string()
    .regex(new RegExp(mobileNumberValidationRegex), { message: "Must be a valid Bangladeshi mobile number" }),
  password: zod.string().regex(new RegExp(passwordValidationRegex), {
    message:
      "Password must be at least 8 characters long and include at least one letter, one digit, and one special character (@$!%*?&)",
  }),
});

export type LoginFormFields = zod.infer<typeof LoginFormSchema>;
