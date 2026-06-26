import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS configuration
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { name, email, phone, profile, service, message } = req.body;

  if (!name || !email || !phone || !profile || !service) {
    res.status(400).json({ error: "Faltan campos obligatorios" });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.warn("RESEND_API_KEY no configurada. Simulando éxito de envío.");
    res.status(200).json({
      success: true,
      simulated: true,
      message: "Formulario procesado con éxito (modo simulación sin API Key)",
    });
    return;
  }

  try {
    const resend = new Resend(resendApiKey);
    const { data, error } = await resend.emails.send({
      from: "PROSERCO Web <onboarding@resend.dev>",
      to: "contacto@proserco.com",
      subject: `Nueva Consulta de Cliente: ${service} - ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #0b132b; background-color: #f4f6fa; border-radius: 8px;">
          <h2 style="color: #1a365d; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Nueva Consulta Recibida</h2>
          <p><strong>Nombre del Cliente:</strong> ${name}</p>
          <p><strong>Correo de Contacto:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Teléfono:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Perfil:</strong> ${profile === "empresa" ? "Empresa (Persona Jurídica)" : "Persona Natural"}</p>
          <p><strong>Servicio de Interés:</strong> ${service}</p>
          <p><strong>Mensaje o Detalle:</strong></p>
          <div style="background-color: white; padding: 15px; border-left: 4px solid #d4af37; border-radius: 4px; margin-top: 10px; font-style: italic;">
            ${message ? message.replace(/\n/g, "<br/>") : "Sin comentarios adicionales."}
          </div>
          <hr style="border: 0; border-top: 1px solid #c9d3e7; margin: 20px 0;" />
          <p style="font-size: 10px; color: #6686b9;">Este es un correo automático enviado desde el portal corporativo de PROSERCO en Vercel.</p>
        </div>
      `,
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
