import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSecondaryCustomerAddresses1618924750167
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'secondary_customer_addresses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'zip_code_secondary',
            type: 'varchar',
          },
          {
            name: 'city_secondary',
            type: 'varchar',
          },
          {
            name: 'state_secondary',
            type: 'varchar',
          },
          {
            name: 'neighborhood_secondary',
            type: 'varchar',
          },
          {
            name: 'street_secondary',
            type: 'varchar',
          },
          {
            name: 'number_secondary',
            type: 'varchar',
          },
          {
            name: 'complement_secondary',
            type: 'varchar',
          },
          {
            name: 'type_secondary',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('secondary_customer_addresses');
  }
}
