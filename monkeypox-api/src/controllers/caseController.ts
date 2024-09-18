import { Request, Response } from 'express';
import { Case } from '../models/case';
import { sendEmail } from '../utils/mailer';
import { getMapboxImage } from '../utils/mapbox';

// Crear un nuevo caso
export const createCase = async (req: Request, res: Response) => {
  try {
    // Crear el nuevo caso con los datos del cuerpo de la solicitud
    const newCase = new Case(req.body);
    await newCase.save();

    // Obtener la imagen del mapa usando Mapbox
    const mapImageUrl = await getMapboxImage(newCase.lat, newCase.lng);

    // Crear el contenido del correo
    const emailHtml = `
      <h1>Nuevo caso de Viruela del Mono</h1>
      <p>Género: ${newCase.genre}</p>
      <p>Edad: ${newCase.age}</p>
      <img src="${mapImageUrl}" alt="Mapa del caso" />
    `;

    // Enviar el correo electrónico
    await sendEmail(
      'mjcb003@gmail.com', // Cambia esto por el email de destino adecuado
      'Nuevo caso de Viruela del Mono registrado',
      'Se ha registrado un nuevo caso de Viruela del Mono',
      emailHtml
    );

    // Respuesta exitosa con el nuevo caso creado
    res.status(201).json(newCase);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: 'Failed to create case' });
  }
};

// Obtener todos los casos
export const getAllCases = async (req: Request, res: Response) => {
  try {
    const cases = await Case.find();
    res.json(cases);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: 'Failed to fetch cases' });
  }
};

// Obtener los casos de la última semana
export const getRecentCases = async (req: Request, res: Response) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const cases = await Case.find({ creationDate: { $gte: oneWeekAgo } });
    res.json(cases);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: 'Failed to fetch recent cases' });
  }
};

// Actualizar un caso
export const updateCase = async (req: Request, res: Response) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCase);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: 'Failed to update case' });
  }
};

// Eliminar un caso
export const deleteCase = async (req: Request, res: Response) => {
  try {
    await Case.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: 'Failed to delete case' });
  }
};
