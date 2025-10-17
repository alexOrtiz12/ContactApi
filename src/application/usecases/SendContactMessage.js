import { ContactMessage } from "../../domain/entities/contactMessage.js";
import { emailRepository } from "../../infra/repositories/emailRepository.js";

export const sendContactMessage = async (data) => {
  const contactMessage = new ContactMessage(data);
  await emailRepository.send(contactMessage);
  return { success: true, message: "Mensaje enviado correctamente." };
};

