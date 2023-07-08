import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { type AnySchema } from "yup";

const validate = (schema: AnySchema, handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await schema.validate(JSON.parse(req.body), { stripUnknown: true });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
    return handler(req, res);
  };
};

export default validate;
