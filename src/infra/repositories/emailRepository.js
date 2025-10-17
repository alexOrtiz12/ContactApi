import { transporter } from "../../config/emailConfig.js";
import dotenv from "dotenv";

dotenv.config();

export const emailRepository = {
  async send(contactMessage) {
    const mailOptions = {
      from: `"Formulario de Contacto" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      subject: `Nuevo mensaje de contacto Solicitud de informacion para proyecto: ${contactMessage.projectType}`,
      text: `
        Nombre: ${contactMessage.name} ${contactMessage.lastName}
        Correo: ${contactMessage.email}
        Teléfono: ${contactMessage.phone}
        Empresa: ${contactMessage.company}
        Tipo de Proyecto: ${contactMessage.projectType}

        Mensaje:
        ${contactMessage.message}
      `,
    };

    await transporter.sendMail(mailOptions);
  },
};
