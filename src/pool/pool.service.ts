import { Injectable } from '@nestjs/common';

import { Pool } from 'pg';

@Injectable()
export class PoolService {
  private queryRunner;
  constructor() {
    this.queryRunner = new Pool({
      user: 'postgres',
      host: '181.112.228.13',
      database: 'cscdb_chambo',
      password: 'Datatics.2024',
      port: 5432,
    });
  }

  /**
   *
   * @param query: sentencia a ejecutar
   * @param parametres: criterios de busqueda
   * @returns retorna los datos obtenidos
   */
  async excecutionQuerys(query: string, parametres?: any[]): Promise<any> {
    return await this.queryRunner.query(query, parametres);
  }
}
