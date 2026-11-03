"use client";

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, DefaultValues, FieldPath, FieldValues, Path, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface AuthFormProps<T extends FieldValues> {
  formType: "SIGN_IN" | "SIGN_UP";
  schema: z.ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
}

const AuthForm = <T extends FieldValues>({ formType, schema, defaultValues, onSubmit }: AuthFormProps<T>) => {
  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";
  const form = useForm<z.infer<typeof schema>>({
    resolver: standardSchemaResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 space-y-6">
      <FieldGroup>
        {Object.keys(defaultValues).map((fieldName) => (
          <Controller
            key={fieldName}
            name={fieldName as FieldPath<T>}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex w-full flex-col gap-2.5">
                <FieldLabel htmlFor={`form-${fieldName}`} className="paragraph-medium text-dark400_light700">
                  {fieldName === "email"
                    ? "Enter email address"
                    : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                </FieldLabel>

                <Input
                  {...field}
                  id={`form-${fieldName}`}
                  aria-invalid={fieldState.invalid}
                  type={fieldName === "password" ? "password" : "text"}
                  className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus rounded-1.5 min-h-12 border"
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        ))}

        <Button
          type="submit"
          className="primary-gradient paragraph-medium rounded-2 font-inter !text-light-900 min-h-12 w-full px-4 py-3"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (buttonText === "Sign In" ? "Signin In..." : "Signing Up...") : buttonText}
        </Button>

        {formType === "SIGN_IN" ? (
          <p>
            Don't have an account?{" "}
            <Link href={ROUTES.SIGN_UP} className="paragraph-semibold primary-text-gradient">
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link href={ROUTES.SIGN_IN} className="paragraph-semibold primary-text-gradient">
              Sign in
            </Link>
          </p>
        )}
      </FieldGroup>
    </form>
  );
};

export default AuthForm;
