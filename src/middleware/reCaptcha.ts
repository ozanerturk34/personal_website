import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const reCaptcha = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers["x-re-captcha"];
      const secretKey = process.env.RECAPTCHA_SECRET_KEY!;
      const verificationServer = process.env.RECAPTCHA_VERIFICATION_SERVER!;

      const verificationUrl = `${verificationServer}?secret=${secretKey}&response=${token}`;
      const reCaptchaResponse = await fetch(verificationUrl, {
        method: "POST",
      });
      const data = await reCaptchaResponse.json();
      if (!data.success || data.score < 0.5) {
        // TODO IP CONTROL
        return res.status(500).json({
          success: false,
          error: { message: "Something went wrong, try again" },
        });
      }
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
    return handler(req, res);
  };
};

export default reCaptcha;
