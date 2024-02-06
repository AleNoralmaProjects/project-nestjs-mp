import { Injectable } from '@nestjs/common';

import { Pool } from 'pg';

@Injectable()
export class PoolService {
  private queryRunner;
  constructor() {
    this.queryRunner = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'BD_FichaFamiliar',
      password: 'Inti2021',
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
