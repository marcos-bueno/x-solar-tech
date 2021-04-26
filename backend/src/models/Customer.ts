import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import SecondaryCustomerAddress from './SecondaryCustomerAddress';

@Entity('customers')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  zip_code: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  type: 'Comercial' | 'Residencial' | 'Rural' | 'Casa de Praia';

  @OneToOne(() => SecondaryCustomerAddress, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'secondary_address_id' })
  secondary_customer_address: SecondaryCustomerAddress;

  @Column()
  secondary_address_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
