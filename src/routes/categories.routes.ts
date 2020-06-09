import { Router } from 'express';
import { getRepository } from 'typeorm';

import Category from '../models/Category';

const categoriesRouter = Router();

categoriesRouter.post('/', async (request, response) => {
  try {
    const { title } = request.body;
    const categoryRepository = getRepository(Category);
    const category = categoryRepository.create({ title });
    await categoryRepository.save(category);
    return response.json({ category });
  } catch (error) {
    return response.status(400).json({ error });
  }
});

export default categoriesRouter;
