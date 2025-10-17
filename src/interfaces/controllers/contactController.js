import { sendContactMessage } from "../../application/usecases/SendContactMessage.js";

export const contactController = {
  async send(req, res, next) {
    try {
      const result = await sendContactMessage(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
};
