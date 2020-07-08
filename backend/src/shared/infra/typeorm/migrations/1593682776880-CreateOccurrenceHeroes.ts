import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOccurrenceHeroes1593682776880
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'occurrences_heroes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'occurrence_id',
            type: 'varchar',
          },
          {
            name: 'hero_id',
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
        foreignKeys: [
          {
            name: 'HeroId',
            referencedTableName: 'heroes',
            referencedColumnNames: ['id'],
            columnNames: ['hero_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'OccurrenceId',
            referencedTableName: 'occurrences',
            referencedColumnNames: ['id'],
            columnNames: ['occurrence_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('occurrences_heroes');
  }
}
