import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Customer from '../models/Customer';

interface Request {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: Request): Promise<void> {
    const customersRepository = getRepository(Customer);

    const customer = await customersRepository.findOne({
      where: { id },
    });

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
