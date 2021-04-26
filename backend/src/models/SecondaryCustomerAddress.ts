import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('secondary_customer_addresses')
class SecondaryCustomerAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  zip_code_secondary: string;

  @Column()
  city_secondary: string;

  @Column()
  state_secondary: string;

  @Column()
  neighborhood_secondary: string;

  @Column()
  street_secondary: string;

  @Column()
  number_secondary: string;

  @Column()
  complement_secondary: string;

  @Column()
  type_secondary: 'Comercial' | 'Residencial' | 'Rural' | 'Casa de Praia';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SecondaryCustomerAddress;
