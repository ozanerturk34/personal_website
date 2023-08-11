import { useCallback, useState, useReducer } from "react";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

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
    <PageLayout activeLink={"/contact"}>
      <div>
        {!isContacted ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            {error.has && (
              <div>
                <h1>{error.message}</h1>
                <hr />
                <div className="flex  justify-end">
                  <button
                    onClick={() => dispatchError({ type: "no_error" })}
                    className="mt-3"
                  >
                    Okay
                  </button>
                </div>
              </div>
            )}
            <h2>You want to contact me?? Go ahead you</h2>
            <div className="mb-3">
              <label htmlFor="name">Your Name</label>
              {/* <Form.Control
                {...register("name")}
                placeholder=""
                aria-label="Name"
                aria-describedby="name"
                aria-invalid={!!errors.name}
                isInvalid={!!errors.name}
              /> */}
              {/* {!!errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
                </Form.Control.Feedback>
              )} */}
            </div>
            <div className="mb-3">
              <label htmlFor="email">Your Email</label>
              {/* <Form.Control
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
              )} */}
            </div>
            <div className="mb-3">
              <label htmlFor="description">
                Let me know what is on your mind 🙂
              </label>
              {/* <Form.Control
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
              )} */}
            </div>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <div>
            <h1>
              Thanks for getting into contact. I will reach out to you as soon
              as possible!
            </h1>
            <hr />
            <div className="flex justify-content">
              <button onClick={() => router.push("/")} className="mt-3">
                Thanks! Take me back to homepage
              </button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export const getServerSideProps = setup(async () => {
  return { props: {} };
});

const ContactContainer = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      scriptProps={{ async: true, defer: true, appendTo: "body" }}
    >
      <Contact />
    </GoogleReCaptchaProvider>
  );
};

export default ContactContainer;
