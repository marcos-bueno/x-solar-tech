import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Customer from '../models/Customer';

interface ISecondaryCustomerAddress {
  id?: string;
  zip_code_secondary?: string;
  city_secondary?: string;
  state_secondary?: string;
  neighborhood_secondary?: string;
  street_secondary?: string;
  number_secondary?: string;
  complement_secondary?: string;
  type_secondary?: 'Comercial' | 'Residencial' | 'Rural' | 'Casa de Praia';
}

interface IRequest {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  zip_code: string;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
  type: 'Comercial' | 'Residencial' | 'Rural' | 'Casa de Praia';
  secondary_customer_address: ISecondaryCustomerAddress;
}

class UpdateCustomerService {
  public async execute({
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
  }: IRequest): Promise<Customer> {
    const customersRepository = getRepository(Customer);

    const checkCustomerExists = await customersRepository.findOne({
      where: { id },
    });

    if (!checkCustomerExists) {
      throw new AppError('Customer not found.');
    }

    const secondaryAddressData = {
      ...secondary_customer_address,
    };

    const customer = customersRepository.save({
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
      secondary_customer_address: secondaryAddressData,
    });

    return customer;
  }
}

export default UpdateCustomerService;
