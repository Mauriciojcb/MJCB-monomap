import { Router } from 'express';
import { createCase, getAllCases, getRecentCases, updateCase, deleteCase } from '../controllers/caseController';

const router = Router();

router.post('/cases', createCase); //crear un caso
router.get('/cases', getAllCases); //obtener todos los casos
router.get('/cases/recent', getRecentCases); //obtener los casos de la ultima semana
router.put('/cases/:id', updateCase); //Actualizar un caso
router.delete('/cases/:id', deleteCase); //Eliminar un caso

export default router;
