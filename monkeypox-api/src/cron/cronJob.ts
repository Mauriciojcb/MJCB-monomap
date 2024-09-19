import cron from 'node-cron';
import { Case } from '../models/case';
import { sendEmail } from '../utils/mailer';
import { getMapboxImage } from '../utils/mapbox';

// Configuración del cron job para cada 10 segundos
cron.schedule('*/10 * * * * *', async () => {
  try {
    const casesToSend = await Case.find({ isSent: false });

    for (const caseEntry of casesToSend) {
      const mapImageUrl = await getMapboxImage(caseEntry.lat, caseEntry.lng);

      const emailHtml = `
        <h1>Nuevo caso de Viruela del Mono</h1>
        <p>Género: ${caseEntry.genre}</p>
        <p>Edad: ${caseEntry.age}</p>
        <img src="${mapImageUrl}" alt="Mapa del caso" />
      `;

      // Enviar correo
      await sendEmail(
        'mjcb003@gmail.com', // Correo de destino
        'Nuevo caso de Viruela del Mono',
        'Se ha registrado un nuevo caso',
        emailHtml
      );

      // Marcar el caso como enviado
      caseEntry.isSent = true;
      await caseEntry.save();
    }
  } catch (error) {
    console.error('Error en el cron job:', error);
  }
});
