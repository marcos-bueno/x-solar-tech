import { getRepository } from 'typeorm';
import nodemailer from 'nodemailer';

import AppError from '../errors/AppError';
import Customer from '../models/Customer';

interface ISecondaryCustomerAddress {
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
  secondary_customer_address?: ISecondaryCustomerAddress;
}

class CreateCustomerService {
  public async execute({
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

    const checkCpfExists = await customersRepository.findOne({
      where: { cpf },
    });

    if (checkCpfExists) {
      throw new AppError('CPF already exists.');
    }

    const checkPhoneExists = await customersRepository.findOne({
      where: { phone },
    });

    if (checkPhoneExists) {
      throw new AppError('Phone already exists.');
    }

    const checkEmailExists = await customersRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) {
      throw new AppError('E-mail already exists.');
    }

    const checkStreetExists = await customersRepository.findOne({
      where: { street },
    });

    if (checkStreetExists) {
      throw new AppError('Street already exists.');
    }

    const secondaryAddressData = {
      ...secondary_customer_address,
    };

    const customer = customersRepository.create({
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

    await customersRepository.save(customer);

    const fromEmail = process.env.NODEMAILER_USER;
    const toEmail = process.env.NODEMAILER_FROM;

    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: 'Novo cliente',
      text: 'Olá, um novo cliente foi cadastrado no sistema.',
    });

    return customer;
  }
}
export default CreateCustomerService;
