import { BadRequestException, Injectable } from '@nestjs/common';
import { PoolService } from 'src/pool/pool.service';

@Injectable()
export class FichaFamiliarService {
  constructor(private poolService: PoolService) {}

  /*  async getFamilias(id: number, year: string) {
    try {
      let sql = `select * from csctbfamilia where csctbfamiliaid = $1 `;
      if (year) {
        sql += ` and anios = ${year}`;
      }
      // console.log(sql);
      const consult = await this.poolService.excecutionQuerys(sql, [id]);
      return consult.rows;
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  } */

  async getLocation(
    year: string,
    age: string,
    rbiological: number,
    renvironmental: string,
    rsocioeconomic: string,
    gpriority: string,
    gvulnerable: string,
  ) {
    try {
      let consult;

      const array = new Array();
      let variable_number = 0;

      const sql_base = ` select  b.csctbfamiliaid, longitud1, latitud1, 
      nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
      (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
      (case when genero = 'MASCULINO' then 'man.svg' else 'woman.svg' end ) as icon 
        from csctbvivienda a, csctbfamilia b 
        where a.csctbfamiliaid= b.csctbfamiliaid 
         `;
      console.log(sql_base);

      let sql: string;

      if (
        !year &&
        !age &&
        !rbiological &&
        !renvironmental &&
        !rsocioeconomic &&
        !gpriority &&
        !gvulnerable
      ) {
        /* console.log('Array Vacio'); */
        sql = sql_base;
        consult = await this.poolService.excecutionQuerys(sql);
        return consult.rows;
      }

      /* cambiar a year */
      if (year) {
        console.log('ENTRO A ANIO');
        sql = `${sql_base} and extract(year from date(fecreacion_fam)) in (${year})`;
        consult = await this.poolService.excecutionQuerys(sql);
        array.push(...consult.rows);
        variable_number += 1;
      }

      if (age) {
        sql = `${sql_base} and anios in ( ${age})`;
        consult = await this.poolService.excecutionQuerys(sql);
        array.push(...consult.rows);
        variable_number += 1;
      }

      if (rbiological) {
        sql = `  select b.csctbfamiliaid, longitud1,latitud1, 'rb' as riesgo, 
        nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
        (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
        (case when genero = 'MASCULINO' then 'man.svg' else 'woman.svg' end ) as icon 
          from csctbvivienda a
          inner join csctbfamilia b on a.csctbfamiliaid=b.csctbfamiliaid
          inner join csctbrbiolofamilia c on b.csctbfamiliaid=c.csctbfamiliaid
          where csctbriesgobioloid  in (${rbiological})`;
        console.log(sql);
        consult = await this.poolService.excecutionQuerys(sql);
        array.push(...consult.rows);
        variable_number += 1;
      }

      if (renvironmental) {
        sql = `select b.csctbfamiliaid, longitud1,latitud1, 're' as riesgo, 
        nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
        (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
        (case when genero = 'MASCULINO' then 'man.svg' else 'woman.svg' end ) as icon  
        from csctbvivienda a
        inner join csctbfamilia b on a.csctbfamiliaid=b.csctbfamiliaid
        inner join csctbrambientalfamilia c on b.csctbfamiliaid=c.csctbfamiliaid
        where csctbrambientalesid in (${renvironmental})`;
        consult = await this.poolService.excecutionQuerys(sql);
        array.push(...consult.rows);
        variable_number += 1;
      }

      if (rsocioeconomic) {
        sql = `select b.csctbfamiliaid, longitud1,latitud1, 
        nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
        (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
        (case when genero = 'MASCULINO' then 'man.svg' else 'woman.svg' end ) as icon  
        from csctbvivienda a
        inner join csctbfamilia b on a.csctbfamiliaid=b.csctbfamiliaid
        inner join csctbrsociofamilia c on b.csctbfamiliaid=c.csctbfamiliaid
        where csctbrsocioid in (${rsocioeconomic})`;
        consult = await this.poolService.excecutionQuerys(sql);
        array.push(...consult.rows);
        variable_number += 1;
      }

      if (gpriority) {
        sql = `select b.csctbfamiliaid, longitud1,latitud1,
        nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
        (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
        (case when genero = 'MASCULINO' then 'man.svg' else 'woman.svg' end ) as icon  
        from csctbvivienda a
        inner join csctbfamilia b on a.csctbfamiliaid=b.csctbfamiliaid
        inner join csctbrsociofamilia c on b.csctbfamiliaid=c.csctbfamiliaid
        where csctbrsocioid in (${gpriority})`;
        consult = await this.poolService.excecutionQuerys(sql);
        array.push(...consult.rows);
        variable_number += 1;
      }

      if (gvulnerable) {
        sql = `select b.csctbfamiliaid, longitud1,latitud1,
        nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
        (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
        (case when genero = 'MASCULINO' then 'man.svg' else 'woman.svg' end ) as icon  
        from csctbvivienda a
        inner join csctbfamilia b on a.csctbfamiliaid=b.csctbfamiliaid
        inner join csctbprioritariofamilia c on b.csctbfamiliaid=c.csctbfamiliaid
        where csctbprioritarioid in (${gvulnerable})`;
        consult = await this.poolService.excecutionQuerys(sql);
        array.push(...consult.rows);
        variable_number += 1;
      }

      console.log(sql);
      /* const newArray = array.filter((objeto, index) => {
        const indice = array.findIndex(
          (obj) => obj.csctbfamiliaid === objeto.csctbfamiliaid,
        );
        return index === indice;
      }); */
      const objetosUnicos = [];
      const newArray = [];
      /*   let objetosCombinados = []; */

      if (variable_number > 1) {
        array.forEach((objeto) => {
          if (
            objetosUnicos.some(
              (element) => element.csctbfamiliaid === objeto.csctbfamiliaid,
            )
          ) {
            newArray.push(objeto);
          } else {
            objetosUnicos.push(objeto);
          }
        });

        /*  objetosCombinados = objetosUnicos.map((objeto) => {
          const objetoDuplicado = newArray.find(
            (duplicado) => duplicado.csctbfamiliaid === objeto.csctbfamiliaid,
          );
          if (objetoDuplicado) {
            return {
              ...objeto,
              riesgo: objeto.riesgo + ' ' + objetoDuplicado.riesgo,
            };
          } else {
            return objeto;
          }
        }); */
      } else {
        return array;
      }

      return newArray;
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }

  async getCategories() {
    const data = {
      risk_biological: [],
      risk_environmental: [],
      risk_socioeconomic: [],
      group_priority: [],
      group_vulnerable: [],
    };

    try {
      let sql: string;
      let consult;

      sql = `select csctbriesgobioloid as value, rango_edad || ' - ' || nom_rbiolo as label 
      from csctbriesgobiolo a , csctbedades b 
      where a.csctbedadesid = b.csctbedadesid 
      order by label`;

      consult = await this.poolService.excecutionQuerys(sql);
      data.risk_biological = consult.rows;

      sql = `Select csctbrambientalesid as value, nom_rambiental as label 
      from csctbrambientales a 
      order by label`;

      consult = await this.poolService.excecutionQuerys(sql);
      data.risk_environmental = consult.rows;

      sql = `Select csctbrsocioid as value, rango_edad || ' - ' || nom_rsocio as label 
      from csctbriesgosocio a , csctbedades b 
      where a.csctbedadesid = b.csctbedadesid 
      order by label`;

      consult = await this.poolService.excecutionQuerys(sql);
      data.risk_socioeconomic = consult.rows;

      sql = `Select csctbprioritarioid as value, nom_prioritario as label 
      from csctbprioritario
      order by label
      `;

      consult = await this.poolService.excecutionQuerys(sql);
      data.group_priority = consult.rows;

      sql = `Select csctbvulnerableid as value, nom_vulnerable as label 
      from csctbvulnerable
      order by label
      `;

      consult = await this.poolService.excecutionQuerys(sql);
      data.group_vulnerable = consult.rows;

      return data;
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }

  async getSearchId(cedula: string) {
    try {
      console.log('cedula)', cedula);
      const sql_base = ` select b.csctbfamiliaid, longitud1,latitud1,
      nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
      (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
      (case when genero = 'MASCULINO' then 'man.svg' else 'woman.svg' end ) as icon  
      from csctbvivienda a
      inner join csctbfamilia b on a.csctbfamiliaid=b.csctbfamiliaid
      where b.cedula_fam = '${cedula}'
         `;

      const data = await this.poolService.excecutionQuerys(sql_base);
      console.log('data>>>>>', data);

      return data.rows;
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }

  async getPregnats(year?: string) {
    try {
      let sql = ` select count(case  when b.csctbtiporiesgoid = 4 then  csctbriesembarazadaid end) as nada,
      count(case  when b.csctbtiporiesgoid = 1 then  csctbriesembarazadaid end) as Riesgo_Bajo,
      count(case  when b.csctbtiporiesgoid = 2 then  csctbriesembarazadaid end) as Riesgo_Alto,
      count(case  when b.csctbtiporiesgoid = 3 then  csctbriesembarazadaid end) as Riesgo_Inminente
      from csctbriesgoembarazada a
      inner join csctbriesgobste b on a.csctbriesgobsteid = b.csctbriesgobsteid
      where estado_rembarazada = true
         `;
      if (year) {
        sql += ` and extract(year from date(fecha_embarazada)) in (${year})
      `;
      }

      const data = await this.poolService.excecutionQuerys(sql);
      console.log('data>>>>>', data);

      return data.rows[0];
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }
}
