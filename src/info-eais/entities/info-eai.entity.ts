import { BrigadaEai } from '../../brigada-eais/entities/brigada-eai.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class InfoEai {
  //------Id EAIS
  @PrimaryGeneratedColumn('uuid')
  id_eais: string;
  //-----Id EAIS

  //...Cod EAIS...
  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  cod_eais: string;
  //....Cod EAIS...

  //......
  @Column({
    type: 'text',
    nullable: false,
  })
  parroquia: string;
  //......

  //......
  @Column({
    type: 'text',
    nullable: false,
  })
  canton: string;
  //......

  @Column({
    type: 'text',
    nullable: false,
  })
  provincia: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  distrito: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  zona: string;

  @OneToMany(() => BrigadaEai, (brigadaEai) => brigadaEai.eais, {
    nullable: false,
    cascade: true,
  })
  brigadaEai: BrigadaEai;

  // .. ESTA FUNCION ME SIRVE PARA QUE NO HAYA ESPACIO VACIOS
  @BeforeInsert()
  checkEAISInsert() {
    this.cod_eais = this.cod_eais.replaceAll(' ', '');
    this.cod_eais = this.cod_eais.toUpperCase();
  }

  @BeforeUpdate()
  checkEAISUpadate() {
    this.cod_eais = this.cod_eais.replaceAll(' ', '');
  }
}
