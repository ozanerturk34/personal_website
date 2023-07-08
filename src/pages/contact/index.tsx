import { useCallback, useState, useReducer } from "react";
import { useRouter } from "next/router";
import { Alert, Button, Form } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { setup } from "@lib/csrf";

import PageLayout from "@components/PageLayout";

import { DEFAULT_ERROR_MESSAGE } from "@constants/errorMessages";

import { type ContactData, contactValidationSchema } from "@models/Validation";

type ErrorState =
  | {
      has: true;
      message: string;
    }
  | { has: false };

type ErrorAction =
  | {
      type: "has_error";
      message: string;
    }
  | {
      type: "no_error";
    };

const INITIAL_ERROR_STATE: ErrorState = { has: false };

const errorReducer = (_: ErrorState, action: ErrorAction): ErrorState => {
  switch (action.type) {
    case "has_error":
      return {
        has: true,
        message: action.message,
      };
    case "no_error":
      return {
        has: false,
      };
    default:
      return {
        has: false,
      };
  }
};

const Contact = () => {
  const router = useRouter();

  const [isContacted, setIsContacted] = useState<boolean>(false);

  const [error, dispatchError] = useReducer(errorReducer, INITIAL_ERROR_STATE);

  const formOptions = { resolver: yupResolver(contactValidationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit: SubmitHandler<ContactData> = useCallback(
    async (data) => {
      try {
        dispatchError({ type: "no_error" });
        if (!executeRecaptcha) {
          return;
        }

        const reCaptcha = await executeRecaptcha();
        if (!reCaptcha) {
          dispatchError({ message: "ReCaptcha failed!", type: "has_error" });
          return;
        }
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "x-re-captcha": reCaptcha,
          },
          body: JSON.stringify(data),
        });
        const responseJson = await response.json();
        if (responseJson.success) {
          setIsContacted(true);
        } else {
          const errorMessage =
            responseJson?.error?.message || DEFAULT_ERROR_MESSAGE;
          dispatchError({ message: errorMessage, type: "has_error" });
        }
      } catch (error) {
        console.error(error);
        dispatchError({
          message: DEFAULT_ERROR_MESSAGE,
          type: "has_error",
        });
      }
    },
    [executeRecaptcha]
  );

  return (
    <PageLayout>
      <div>
        {!isContacted ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            {error.has && (
              <Alert variant="danger">
                <Alert.Heading>{error.message}</Alert.Heading>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button
                    onClick={() => dispatchError({ type: "no_error" })}
                    variant="outline-danger"
                    className="mt-3"
                  >
                    Okay
                  </Button>
                </div>
              </Alert>
            )}
            <Form.Text className="text-white">
              You want to contact me?? Go ahead you
            </Form.Text>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Your Name</Form.Label>
              <Form.Control
                {...register("name")}
                placeholder=""
                aria-label="Name"
                aria-describedby="name"
                aria-invalid={!!errors.name}
                isInvalid={!!errors.name}
              />
              {!!errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Your Email</Form.Label>
              <Form.Control
                {...register("email")}
                placeholder=""
                aria-label="Email"
                aria-describedby="email"
                aria-invalid={!!errors.email}
                isInvalid={!!errors.email}
              />
              {!!errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="description">
                Let me know what is on your mind 🙂
              </Form.Label>
              <Form.Control
                {...register("description")}
                as="textarea"
                rows={5}
                placeholder=""
                aria-label="Description"
                aria-describedby="description"
                aria-invalid={!!errors.description}
                isInvalid={!!errors.description}
              />
              {!!errors.description && (
                <Form.Control.Feedback type="invalid">
                  {errors.description.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        ) : (
          <Alert variant="success">
            <Alert.Heading>
              Thanks for getting into contact. I will reach out to you as soon
              as possible!
            </Alert.Heading>
            <hr />
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => router.push("/")}
                variant="outline-success"
                className="mt-3"
              >
                Thanks! Take me back to homepage
              </Button>
            </div>
          </Alert>
        )}
      </div>
    </PageLayout>
  );
};

export const getServerSideProps = setup(async () => {
  return { props: {} };
});

export default Contact;
