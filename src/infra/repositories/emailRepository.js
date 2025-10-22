import { transporter } from "../../config/emailConfig.js";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailRepository = {
  async send(contactMessage) {
    // 🔹 Detectar entorno
    const isRender = process.env.RENDER === "true"; // Render define esta variable automáticamente

    if (isRender) {
      // Usar Resend API en Render
      console.log("📤 [EMAIL] Enviando correo vía Resend API...");
      try {
        await resend.emails.send({
          from: "Formulario <onboarding@resend.dev>",
          to: process.env.CONTACT_RECEIVER,
          subject: `Nuevo mensaje de contacto: ${contactMessage.projectType}`,
          text: `
            Nombre: ${contactMessage.name} ${contactMessage.lastName}
            Correo: ${contactMessage.email}
            Teléfono: ${contactMessage.phone}
            Empresa: ${contactMessage.company}
            Tipo de Proyecto: ${contactMessage.projectType}

            Mensaje:
            ${contactMessage.message}
          `,
        });
        console.log("✅ [EMAIL] Correo enviado exitosamente vía Resend.");
      } catch (error) {
        console.error("❌ [EMAIL ERROR - Resend]:", error.message);
        throw error;
      }
    } else {
      // Usar SMTP local
      console.log("📤 [EMAIL] Enviando correo vía SMTP...");
      const mailOptions = {
        from: `"Formulario de Contacto" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER,
        subject: `Nuevo mensaje de contacto: ${contactMessage.projectType}`,
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
      try {
        await transporter.sendMail(mailOptions);
        console.log("✅ [EMAIL] Correo enviado exitosamente vía SMTP.");
      } catch (error) {
        console.error("❌ [EMAIL ERROR - SMTP]:", error.message);
        throw error;
      }
    }
  },
};
