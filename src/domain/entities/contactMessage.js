export class ContactMessage {
  constructor({ name, lastName, email, phone, company, projectType, message }) {
    if (!name || !lastName || !email || !phone || !projectType || !message) {
      throw new Error("Los campos nombre, apellido, correo, teléfono, tipo de proyecto y mensaje son obligatorios.");
    }
    this.name = name;
    this.lastName = lastName; 
    this.email = email;
    this.phone = phone;
    this.company = company || "Sin especificar";
    this.projectType = projectType;
    this.message = message;
  }
}
