import { string, object, InferType } from "yup";

export const contactValidationSchema = object().shape({
  name: string().required("Name is required"),
  email: string().required("Email is required").email("Email is invalid"),
  description: string().required(
    "Let me know the reason you are reaching out to me"
  ),
});

export type ContactData = InferType<typeof contactValidationSchema>;
