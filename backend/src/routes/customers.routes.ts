import 'reflect-metadata';

import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Customer from '../models/Customer';
import CreateCustomerService from '../services/CreateCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';

const customersRouter = Router();

customersRouter.get('/', async (request: Request, response: Response) => {
  const customersRepository = getRepository(Customer);

  const customers = await customersRepository.find({
    relations: ['secondary_customer_address'],
  });

  return response.json(customers);
});

customersRouter.get('/:id', async (request: Request, response: Response) => {
  const { id } = request.params;

  const customersRepository = getRepository(Customer);

  const customer = await customersRepository.find({
    where: { id },
    relations: ['secondary_customer_address'],
  });

  return response.json(customer);
});

customersRouter.post('/', async (request: Request, response: Response) => {
  const {
    name,
    cpf,
    phone,
    email,
    zip_code,
    city,
    state,
    neighborhood,
    street,
    number,
    complement,
    type,
    secondary_customer_address,
  } = request.body;

  const createCustomer = new CreateCustomerService();

  const customer = await createCustomer.execute({
    name,
    cpf,
    phone,
    email,
    zip_code,
    city,
    state,
    neighborhood,
    street,
    number,
    complement,
    type,
    secondary_customer_address,
  });

  return response.json(customer);
});

customersRouter.put('/:id', async (request: Request, response: Response) => {
  const { id } = request.params;
  const {
    name,
    cpf,
    phone,
    email,
    zip_code,
    city,
    state,
    neighborhood,
    street,
    number,
    complement,
    type,
    secondary_customer_address,
  } = request.body;

  const updateCustomer = new UpdateCustomerService();

  const customer = await updateCustomer.execute({
    id,
    name,
    cpf,
    phone,
    email,
    zip_code,
    city,
    state,
    neighborhood,
    street,
    number,
    complement,
    type,
    secondary_customer_address,
  });

  return response.json(customer);
});

customersRouter.delete('/:id', async (request: Request, response: Response) => {
  const { id } = request.params;

  const deleteCustomer = new DeleteCustomerService();

  await deleteCustomer.execute({ id });

  return response.status(200).send();
});

export default customersRouter;
