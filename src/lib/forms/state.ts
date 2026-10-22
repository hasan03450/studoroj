export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
  /** What the visitor typed, so the form can be refilled after an error. */
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };

export const CONTACT_SUBJECTS = ["Algemene vraag", "Lidmaatschap", "Activiteiten", "Sponsoring", "Anders"] as const;
