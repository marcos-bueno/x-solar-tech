import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddSecondaryCustomerAddressIdToCustomer1618925458739
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'customers',
      new TableColumn({
        name: 'secondary_address_id',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    );

    await queryRunner.createForeignKey(
      'customers',
      new TableForeignKey({
        name: 'SecondaryCustomerAddressCustomer',
        columnNames: ['secondary_address_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'secondary_customer_addresses',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'customers',
      'SecondaryCustomerAddressCustomer',
    );
    await queryRunner.dropColumn('customers', 'secondary_address_id');
  }
}
