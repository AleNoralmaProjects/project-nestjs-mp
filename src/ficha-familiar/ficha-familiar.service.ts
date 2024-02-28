import { BadRequestException, Injectable } from '@nestjs/common';
import { PoolService } from 'src/pool/pool.service';

@Injectable()
export class FichaFamiliarService {
  constructor(private poolService: PoolService) {}

  async getLocation(
    year: string,
    age: string,
    gender: string,
    rbiological: string,
    renvironmental: string,
    rsocioeconomic: string,
    gpriority: string,
    gvulnerable: string,
  ) {
    try {
      let consult;

      /* const array = new Array(); */
      const array = [];
      let variable_number = 0;

      const sql_fichas = `select distinct(b.csctbfamiliaid), longitud1, latitud1, 'n/a' as riesgo,
      nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
      (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
      (case when genero = 'MASCULINO' then 'man.png' else 'woman.png' end ) as icon 
        from csctbvivienda a, csctbfamilia b 
        where a.csctbfamiliaid= b.csctbfamiliaid and estado_fam = true
`;

      const sql_base = ` select  distinct(b.csctbfamiliaid),b.id_jefe_hogar, 'n/a' as riesgo,
      nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
      (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
      (case when genero = 'MASCULINO' then 'man.png' else 'woman.png' end ) as icon,
      (select longitud1 from csctbvivienda  where csctbfamiliaid=b.id_jefe_hogar limit 1 ),
      (select latitud1 from csctbvivienda where csctbfamiliaid=b.id_jefe_hogar limit 1 )
      from csctbvivienda a
      right join csctbfamilia b on a.csctbfamiliaid=b.csctbfamiliaid
      where estado_fam=true
         `;

      let sql: string;

      if (
        !year &&
        !age &&
        !gender &&
        !rbiological &&
        !renvironmental &&
        !rsocioeconomic &&
        !gpriority &&
        !gvulnerable
      ) {
        consult = await this.poolService.excecutionQuerys(sql_fichas);
        return consult.rows;
      }

      /* cambiar a year */
      if (year) {
        sql = `${sql_base} and extract(year from date(fecreacion_fam)) in ( ${year})`;
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
      if (gender) {
        let genders;
        const position = gender.indexOf(',');
        if (position > 0) {
          genders = `'${gender.slice(0, position)}','${gender.slice(position + 1, gender.length)}'`;
        } else {
          genders = `'${gender}'`;
        }

        sql = `${sql_base} and genero in ( ${genders}) `;
        consult = await this.poolService.excecutionQuerys(sql);
        array.push(...consult.rows);
        variable_number += 1;
      }

      if (rbiological) {
        sql = `  select distinct(b.csctbfamiliaid), b.id_jefe_hogar,'rb' as riesgo, 
        nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
        (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
        (case when genero = 'MASCULINO' then 'man.png' else 'woman.png' end ) as icon ,
        (select longitud1 from csctbvivienda  where csctbfamiliaid=b.id_jefe_hogar limit 1 ),
        (select latitud1 from csctbvivienda where csctbfamiliaid=b.id_jefe_hogar limit 1 )
          from csctbvivienda a
          right join csctbfamilia b on a.csctbfamiliaid=b.csctbfamiliaid
          inner join csctbrbiolofamilia c on b.csctbfamiliaid=c.csctbfamiliaid
          where csctbriesgobioloid  in (${rbiological}) and estado_rbiologico = true`;
        consult = await this.poolService.excecutionQuerys(sql);
        array.push(...consult.rows);
        variable_number += 1;
      }

      if (renvironmental) {
        sql = `select distinct(b.csctbfamiliaid), b.id_jefe_hogar, 're' as riesgo, 
        nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
        (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
        (case when genero = 'MASCULINO' then 'man.png' else 'woman.png' end ) as icon  , 
        (select longitud1 from csctbvivienda  where csctbfamiliaid=b.id_jefe_hogar limit 1 ),
        (select latitud1 from csctbvivienda where csctbfamiliaid=b.id_jefe_hogar limit 1 )
        from csctbvivienda a
        right join csctbfamilia b on a.csctbfamiliaid=b.csctbfamiliaid
        inner join csctbrambientalfamilia c on b.csctbfamiliaid=c.csctbfamiliaid
        where csctbrambientalesid in (${renvironmental})  and estado_rambiental = true`;
        consult = await this.poolService.excecutionQuerys(sql);
        array.push(...consult.rows);
        variable_number += 1;
      }

      if (rsocioeconomic) {
        sql = `select distinct(b.csctbfamiliaid), b.id_jefe_hogar , 'rs' as riesgo,
        nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
        (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
        (case when genero = 'MASCULINO' then 'man.png' else 'woman.png' end ) as icon ,
        (select longitud1 from csctbvivienda  where csctbfamiliaid=b.id_jefe_hogar limit 1 ),
        (select latitud1 from csctbvivienda where csctbfamiliaid=b.id_jefe_hogar limit 1 ) 
        from csctbvivienda a
        right join csctbfamilia b on a.csctbfamiliaid=b.csctbfamiliaid
        inner join csctbrsociofamilia c on b.csctbfamiliaid=c.csctbfamiliaid
        where csctbrsocioid in (${rsocioeconomic})  and estado_rsocioeconomico = true`;
        consult = await this.poolService.excecutionQuerys(sql);
        array.push(...consult.rows);
        variable_number += 1;
      }

      if (gpriority) {
        sql = `select distinct(b.csctbfamiliaid), b.id_jefe_hogar, 'na' as riesgo,
        nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
        (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
        (CASE 
          WHEN csctbprioritarioid = 1 THEN 'adultomayor.png'
          WHEN csctbprioritarioid = 2 THEN 'pregnant.png'
          WHEN csctbprioritarioid = 3 THEN 'children.png'
          WHEN csctbprioritarioid = 4 THEN 'malnutrition.png'
          WHEN csctbprioritarioid = 5 THEN 'vaccine.png'
          WHEN csctbprioritarioid = 6 THEN 'pdiscapacidad.png'
          WHEN csctbprioritarioid = 7 THEN 'psaludmental.png'
          WHEN csctbprioritarioid = 8 THEN 'prisoner.png'
          WHEN csctbprioritarioid = 9 THEN 'no-crowd.png'
          WHEN csctbprioritarioid = 10 THEN 'pviolencia.png'
          WHEN csctbprioritarioid = 11 THEN 'ptuberculosis.png'
          WHEN csctbprioritarioid = 12 THEN 'pvih.png'
          ELSE (CASE WHEN genero = 'MASCULINO' THEN 'man.png' ELSE 'woman.png' END)
        END ) AS icon   ,
        (select longitud1 from csctbvivienda  where csctbfamiliaid=b.id_jefe_hogar limit 1 ),
        (select latitud1 from csctbvivienda where csctbfamiliaid=b.id_jefe_hogar limit 1 ) 
        from csctbvivienda a
        right join csctbfamilia b on a.csctbfamiliaid=b.csctbfamiliaid
        inner join csctbprioritariofamilia c on b.csctbfamiliaid=c.csctbfamiliaid
        where csctbprioritarioid in (${gpriority}) and estado_prioritario = true
       `;

        consult = await this.poolService.excecutionQuerys(sql);
        array.push(...consult.rows);
        variable_number += 1;
      }

      if (gvulnerable) {
        sql = `select distinct(b.csctbfamiliaid),  b.id_jefe_hogar, 'na' as riesgo,
        nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
        (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
        (CASE 
          WHEN csctbvulnerableid = 1 THEN 'riskpregnant.png'
          WHEN csctbvulnerableid = 2 THEN 'desnutrition.png'
          WHEN csctbvulnerableid = 3 THEN 'homeless.png'
          WHEN csctbvulnerableid = 4 THEN 'enfermosvunerables.png'
          WHEN csctbvulnerableid = 5 THEN 'riesgosgeneticos.png'
          WHEN csctbvulnerableid = 6 THEN 'violenciagenero.png'
        ELSE (CASE WHEN genero = 'MASCULINO' THEN 'man.png' ELSE 'woman.png' END)
        END ) AS icon ,
        (select longitud1 from csctbvivienda  where csctbfamiliaid=b.id_jefe_hogar limit 1 ),
        (select latitud1 from csctbvivienda where csctbfamiliaid=b.id_jefe_hogar limit 1 )   
        from csctbvivienda a
        right join csctbfamilia b on a.csctbfamiliaid=b.csctbfamiliaid
        inner join csctbvulnerablefamilia c on b.csctbfamiliaid=c.csctbfamiliaid
        where csctbvulnerableid in (${gvulnerable}) and estado_vulnerable = true`;
        consult = await this.poolService.excecutionQuerys(sql);
        array.push(...consult.rows);
        variable_number += 1;
      }

      /* const newArray = array.filter((objeto, index) => {
        const indice = array.findIndex(
          (obj) => obj.csctbfamiliaid === objeto.csctbfamiliaid,
        );
        return index === indice;
      }); */
      const objetosUnicos = [];
      let newArray = [];
      const objetosCombinados = [];

      if (variable_number > 1) {
        /*  array.forEach((objeto) => {
          if (
            objetosUnicos.some(
              (element) => element.csctbfamiliaid === objeto.csctbfamiliaid,
            )
          ) {
            newArray.push(objeto);
          } else {
            objetosUnicos.push(objeto);
          }
        }); */
        const contador: { [key: string]: number } = {};

        // Contar las ocurrencias de cada objeto en el array
        array.forEach((objeto) => {
          // Convertir el objeto a string para usarlo como clave en el contador
          contador[objeto.csctbfamiliaid] =
            (contador[objeto.csctbfamiliaid] || 0) + 1;
        });

        // Filtrar los objetos que se repiten n veces
        newArray = array.filter((objeto) => {
          if (
            year &&
            age &&
            !gender &&
            !rbiological &&
            !renvironmental &&
            !rsocioeconomic &&
            !gpriority &&
            !gvulnerable
          ) {
            return contador[objeto.csctbfamiliaid] === variable_number;
          }
          if (
            year &&
            !age &&
            gender &&
            !rbiological &&
            !renvironmental &&
            !rsocioeconomic &&
            !gpriority &&
            !gvulnerable
          ) {
            return contador[objeto.csctbfamiliaid] === variable_number;
          }
          if (
            !year &&
            age &&
            gender &&
            !rbiological &&
            !renvironmental &&
            !rsocioeconomic &&
            !gpriority &&
            !gvulnerable
          ) {
            return contador[objeto.csctbfamiliaid] === variable_number;
          }
          if (
            year &&
            age &&
            gender &&
            !rbiological &&
            !renvironmental &&
            !rsocioeconomic &&
            !gpriority &&
            !gvulnerable
          ) {
            return contador[objeto.csctbfamiliaid] === variable_number;
          }

          return (
            objeto.riesgo != 'n/a' &&
            contador[objeto.csctbfamiliaid] === variable_number
          );
        });
        newArray.forEach((objeto) => {
          if (
            objetosUnicos.some(
              (element) => element.csctbfamiliaid === objeto.csctbfamiliaid,
            )
          ) {
            objetosCombinados.push(objeto);
          } else {
            objetosUnicos.push(objeto);
          }
        });
      } else {
        return array;
      }
      return objetosUnicos;
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
      const sql_base = ` select b.csctbfamiliaid, b.id_jefe_hogar,
      nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
      (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
      (case when genero = 'MASCULINO' then 'man.png' else 'woman.png' end ) as icon  ,
      (select longitud1 from csctbvivienda  where csctbfamiliaid=b.id_jefe_hogar limit 1),
      (select latitud1 from csctbvivienda where csctbfamiliaid=b.id_jefe_hogar limit 1) 
      from csctbvivienda a
      right join csctbfamilia b on a.csctbfamiliaid=b.csctbfamiliaid
      where b.cedula_fam = '${cedula}'
         `;

      const data = await this.poolService.excecutionQuerys(sql_base);

      return data.rows;
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }

  async getLocationPregnats(type_risk: number) {
    try {
      const sql = ` select distinct(a.csctbfamiliaid),c.id_jefe_hogar,
      nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
      (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
      (CASE 
        WHEN csctbtiporiesgoid = 1 THEN 'embarazorbajo.png'
        WHEN csctbtiporiesgoid = 2 THEN 'embarazormedio.png'
        WHEN csctbtiporiesgoid = 3 THEN 'embarazoriesgoalto.png'
        WHEN csctbtiporiesgoid = 4 THEN 'embarazosinriesgo.png'
      END ) AS icon ,
      (select longitud1 from csctbvivienda where csctbfamiliaid=c.id_jefe_hogar),
      (select latitud1 from csctbvivienda where csctbfamiliaid=c.id_jefe_hogar)
      from csctbriesgoembarazada a
      inner join csctbriesgobste b on a.csctbriesgobsteid = b.csctbriesgobsteid
      inner join csctbfamilia c on a.csctbfamiliaid=c.csctbfamiliaid
      where estado_rembarazada=true and b.csctbtiporiesgoid=$1
         `;
      const data = await this.poolService.excecutionQuerys(sql, [type_risk]);

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

      return data.rows[0];
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }

  async getLocationObesity(children_scholar: boolean) {
    let sql = '';
    try {
      if (children_scholar) {
        sql = ` select  distinct(c.csctbfamiliaid),c.id_jefe_hogar,
        nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
        (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 'obesidadcincoaños.png' as icon, 
      (select longitud1 from csctbvivienda where csctbfamiliaid=c.id_jefe_hogar),
        (select latitud1 from csctbvivienda where csctbfamiliaid=c.id_jefe_hogar)
        from csctbenferfam a , csctbenfermedad  b , csctbfamilia c
        where a.csctbenfermedadid = b.csctbenfermedadid and a.csctbfamiliaid = c.csctbfamiliaid 
        and estado_enfermedad = true and anios < 5 and b.csctbenfermedadid = 2272`;
      } else {
        sql = ` select  c.csctbfamiliaid,c.id_jefe_hogar,
        nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
        (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 'obesidadedadescolar.png' as icon ,
      (select longitud1 from csctbvivienda where csctbfamiliaid=c.id_jefe_hogar),
        (select latitud1 from csctbvivienda where csctbfamiliaid=c.id_jefe_hogar)
        from csctbenferfam a , csctbenfermedad  b , csctbfamilia c
        where a.csctbenfermedadid = b.csctbenfermedadid and a.csctbfamiliaid = c.csctbfamiliaid 
        and estado_enfermedad = true and anios >=  5  and anios <9 and b.csctbenfermedadid = 2272`;
      }

      const consult = await this.poolService.excecutionQuerys(sql);
      return consult.rows;
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }

  async getObesityChildren(year?: string) {
    try {
      const data = {
        obesityMenorCinco: '',
        obesityEdadEscolar: '',
      };
      let sql = ` select  count(csctbenfermeriesgoid) as obesity_children
      from csctbenferfam a , csctbenfermedad  b , csctbfamilia c
      where a.csctbenfermedadid = b.csctbenfermedadid and a.csctbfamiliaid = c.csctbfamiliaid 
      and estado_enfermedad = true and anios < 5 and b.csctbenfermedadid = 2272
         `;
      if (year) {
        sql += ` and extract(year from date(fecha_add_enfer)) in (${year})
      `;
      }

      let consult = await this.poolService.excecutionQuerys(sql);

      data.obesityMenorCinco = consult.rows[0].obesity_children;

      sql = ` select  count(csctbenfermeriesgoid) as obesity_children
      from csctbenferfam a , csctbenfermedad  b , csctbfamilia c
      where a.csctbenfermedadid = b.csctbenfermedadid and a.csctbfamiliaid = c.csctbfamiliaid 
      and estado_enfermedad = true and anios >=  5  and anios <9 and b.csctbenfermedadid = 2272
         `;
      if (year) {
        sql += ` and extract(year from date(fecha_add_enfer)) in (${year})
      `;
      }

      consult = await this.poolService.excecutionQuerys(sql);
      data.obesityEdadEscolar = consult.rows[0].obesity_children;

      return data;
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }

  async getDisability(year?: string) {
    try {
      let sql = ` select count(case  when tipo_discapacidad = 'AUDITIVA' then  csctbriesgosid end) as d_auditiva,
      count(case  when tipo_discapacidad = 'FISICA' then  csctbriesgosid end) as d_fisica,
      count(case  when tipo_discapacidad = 'VISUAL' then  csctbriesgosid end) as d_visual,
      count(case  when tipo_discapacidad = 'LENGUAJE' then  csctbriesgosid end) as  d_lenguaje,
	    count(case  when tipo_discapacidad = 'INTELECTUAL' then  csctbriesgosid end) as d_intelectual, 
	    count(case  when tipo_discapacidad = 'PROBLEMAS DE SALUD MENTAL' then  csctbriesgosid end) 
	    as d_problemas_salud_mental
      from csctbriesgos a, csctbfamilia b 
      where a.csctbfamiliaid = b.csctbfamiliaid and tiene_discapacidad = true
         `;
      if (year) {
        sql += `and extract(year from date(fecreacion_fam)) in (${year})
      `;
      }

      const data = await this.poolService.excecutionQuerys(sql);

      return data.rows[0];
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }

  async getLocationDisability(type_disability: string) {
    try {
      const sql = ` select distinct(a.csctbfamiliaid),b.id_jefe_hogar,
      nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
      (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
      (CASE 
        WHEN tipo_discapacidad = 'AUDITIVA' THEN 'dauditiva.png'
        WHEN tipo_discapacidad = 'FISICA' THEN 'dfisica.png'
        WHEN tipo_discapacidad = 'VISUAL' THEN 'dvisual.png'
        WHEN tipo_discapacidad = 'LENGUAJE' THEN 'dlenguaje.png'
        WHEN tipo_discapacidad = 'INTELECTUAL' THEN 'dintelectual.png'
        WHEN tipo_discapacidad = 'PROBLEMAS DE SALUD MENTAL' THEN 'prosaludmental.png'
      END ) AS icon ,
      (select longitud1 from csctbvivienda where csctbfamiliaid=b.id_jefe_hogar limit 1),
      (select latitud1 from csctbvivienda where csctbfamiliaid=b.id_jefe_hogar limit 1)
      from csctbriesgos a, csctbfamilia b 
      where a.csctbfamiliaid = b.csctbfamiliaid and tiene_discapacidad = true and tipo_discapacidad = $1
         `;
      const data = await this.poolService.excecutionQuerys(sql, [
        type_disability,
      ]);

      return data.rows;
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }

  async getDiseases(year?: string) {
    try {
      let sql = ` select count( case when b.nom_enfermedad like 'DIABETES MELLITUS%' then csctbenfermeriesgoid end) as diabetes_mellitus,
      count( case when b.nom_enfermedad like 'HIPERTENSIÓN%' then csctbenfermeriesgoid end) as hipertension,
      count( case when b.nom_enfermedad like 'DIABETES MELLITUS%' or b.nom_enfermedad like 'HIPERTENSIÓN%' then csctbenfermeriesgoid end) as diabetes_hipertension
      from csctbenferfam a, csctbenfermedad b 
      where a.csctbenfermedadid = b.csctbenfermedadid and estado_enfermedad = true
       `;
      if (year) {
        sql += `and extract(year from date(fecha_add_enfer)) in (${year})
      `;
      }
      const data = await this.poolService.excecutionQuerys(sql);
      return data.rows[0];
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }

  async getLocationDiseases(type_diseases: string, type_diseases_2: string) {
    try {
      let sql = `  select distinct(a.csctbfamiliaid), c.id_jefe_hogar,
      nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
      (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
      (CASE 
        WHEN nom_enfermedad like 'DIABETES MELLITUS%' THEN 'diabetes.png'
        WHEN nom_enfermedad like 'HIPERTENSIÓN%' THEN 'hipertensionarterial.png'
        WHEN nom_enfermedad like 'DIABETES MELLITUS%' or nom_enfermedad like 'HIPERTENSIÓN%' THEN 'hipertensionarteydiabetes.png'
      END ) AS icon ,
      (select longitud1 from csctbvivienda where csctbfamiliaid=c.id_jefe_hogar limit 1),
      (select latitud1 from csctbvivienda where csctbfamiliaid=c.id_jefe_hogar limit 1)
      from csctbenferfam a
	  inner join csctbfamilia c on a.csctbfamiliaid = c.csctbfamiliaid
	  inner join csctbenfermedad b on a.csctbenfermedadid = b.csctbenfermedadid
	    where estado_enfermedad = true and nom_enfermedad like '${type_diseases}%'
         `;
      if (type_diseases_2) {
        sql += ` or nom_enfermedad like '${type_diseases_2}%'`;
      }

      const data = await this.poolService.excecutionQuerys(sql);

      return data.rows;
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }

  async getPersonPrior(year?: string) {
    try {
      let sql = ` select count( case when b.nom_prioritario = 'PERSONAS CON VIH' then csctbprioritariofamiliaid end) as pvih,
      count( case when b.nom_prioritario = 'PERSONASS CON TUBERCULOSIS' then csctbprioritariofamiliaid end) as ptuberculosis, 
      count( case when b.nom_prioritario = 'PERSONAS VICTIMAS DE VIOLENCIA' then csctbprioritariofamiliaid end) as pviolencia
  	  from csctbprioritariofamilia a, csctbprioritario b 
      where a.csctbprioritarioid = b.csctbprioritarioid and estado_prioritario = true
       `;
      if (year) {
        sql += `and extract(year from date(fecha_add_prioritario)) in (${year})
      `;
      }

      const data = await this.poolService.excecutionQuerys(sql);

      return data.rows[0];
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }

  async getLocationPersonPrior(type_personprior: string) {
    try {
      const sql = ` select distinct(a.csctbfamiliaid), c.id_jefe_hogar,
      nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
      (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
      (CASE 
        WHEN nom_prioritario = 'PERSONAS CON VIH' THEN 'vih.png'
        WHEN nom_prioritario = 'PERSONASS CON TUBERCULOSIS' THEN 'tuberculosis.png'
        WHEN nom_prioritario = 'PERSONAS VICTIMAS DE VIOLENCIA' THEN 'violencia.png'
      END ) AS icon ,
      (select longitud1 from csctbvivienda where csctbfamiliaid=c.id_jefe_hogar limit 1),
      (select latitud1 from csctbvivienda where csctbfamiliaid=c.id_jefe_hogar limit 1)
      from csctbprioritariofamilia a, csctbprioritario b , csctbfamilia c
      where a.csctbprioritarioid = b.csctbprioritarioid   and a.csctbfamiliaid = c.csctbfamiliaid 
	    and estado_prioritario = true and nom_prioritario = $1

         `;
      const data = await this.poolService.excecutionQuerys(sql, [
        type_personprior,
      ]);

      return data.rows;
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }

  async getMalnutritionChildren(year?: string) {
    try {
      const data = {
        acuteMalnutrition: '',
        chronicMalnutrition: '',
      };
      let sql = ` select count (csctbrbiolofamiliaid) as acute_malnutrition_child
      from csctbrbiolofamilia a, csctbriesgobiolo b,  csctbfamilia c
      where a.csctbriesgobioloid =  b.csctbriesgobioloid and a.csctbfamiliaid = c.csctbfamiliaid 
      and estado_rbiologico = true and b.csctbriesgobioloid = 61
         `;
      if (year) {
        sql += ` and extract(year from date(fecha_rbiologico)) in (${year})
      `;
      }

      let consult = await this.poolService.excecutionQuerys(sql);

      data.acuteMalnutrition = consult.rows[0].acute_malnutrition_child;

      sql = ` select count (csctbrbiolofamiliaid) as chronic_malnutrition_child
      from csctbrbiolofamilia a, csctbriesgobiolo b,  csctbfamilia c
      where a.csctbriesgobioloid =  b.csctbriesgobioloid and a.csctbfamiliaid = c.csctbfamiliaid 
      and estado_rbiologico = true and b.csctbriesgobioloid = 62
         `;
      if (year) {
        sql += ` and extract(year from date(fecha_rbiologico)) in (${year})
      `;
      }

      consult = await this.poolService.excecutionQuerys(sql);
      data.chronicMalnutrition = consult.rows[0].chronic_malnutrition_child;

      return data;
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }

  async getLocationMalnutrition(type_malnutrition: number) {
    try {
      const sql = ` select distinct(a.csctbfamiliaid),c.id_jefe_hogar,
      nom_fam || ' ' || ape_fam as name, anios as age, genero, cedula_fam as cedula , celular ,
      (case when genero = 'MASCULINO' then 'blue' else 'red' end ) as color , 
      (CASE 
        WHEN b.csctbriesgobioloid = 61 THEN 'daguda.png'
        WHEN b.csctbriesgobioloid = 62 THEN 'dcronica.png'
              END ) AS icon ,
      (select longitud1 from csctbvivienda where csctbfamiliaid=c.id_jefe_hogar limit 1),
      (select latitud1 from csctbvivienda where csctbfamiliaid=c.id_jefe_hogar limit 1)    
      from csctbrbiolofamilia a, csctbriesgobiolo b,  csctbfamilia c
      where a.csctbriesgobioloid =  b.csctbriesgobioloid and a.csctbfamiliaid = c.csctbfamiliaid 
      and estado_rbiologico = true and b.csctbriesgobioloid = $1
         `;
      const data = await this.poolService.excecutionQuerys(sql, [
        type_malnutrition,
      ]);

      return data.rows;
    } catch (e) {
      throw new BadRequestException({
        message: 'Ocurrio un error al realizar el Query',
        e,
      });
    }
  }
}
