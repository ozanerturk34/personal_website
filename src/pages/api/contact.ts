import type { NextApiRequest, NextApiResponse } from "next";

import validate from "@middleware/validate";
import reCaptcha from "@middleware/reCaptcha";

import { csrf } from "@lib/csrf";
import { writeClient } from "@lib/sanity";

import { DEFAULT_ERROR_MESSAGE } from "@constants/errorMessages";

import { contactValidationSchema } from "@models/Validation";

interface ContactBody {
  name: string;
  email: string;
  description: string;
}

type ContactHandlerResponse =
  | { success: true }
  | { success: false; error: { message: string } };

const contactHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ContactHandlerResponse>
) => {
  try {
    if (req.method !== "POST") {
      res.status(405).send({
        success: false,
        error: { message: "Only POST requests allowed" },
      });
      return;
    }
    const body: ContactBody = JSON.parse(req.body);
    const sanityResp = await writeClient.create({ _type: "contact", ...body });
    // TODO send email to me
    if (!sanityResp) {
      res.status(500).send({
        success: false,
        error: { message: DEFAULT_ERROR_MESSAGE },
      });
    }
    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: { message: DEFAULT_ERROR_MESSAGE },
    });
  }
};

export default csrf(
  reCaptcha(validate(contactValidationSchema, contactHandler))
);
