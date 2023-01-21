import { BrigadaEai } from '../../brigada-eais/entities/brigada-eai.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
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

  @OneToOne(() => BrigadaEai)
  @JoinColumn()
  brigadaEai: BrigadaEai;

  // .. ESTA FUNCION ME SIRVE PARA QUE NO HAYA ESPACIO VACIOS
  @BeforeInsert()
  checkCIInsert() {
    this.cod_eais = this.cod_eais.replaceAll(' ', '');
  }

  /* A function that is executed before the update of the entity. */
  @BeforeUpdate()
  /**
   * It removes all spaces from the string.
   */
  checkCIUpadate() {
    this.cod_eais = this.cod_eais.replaceAll(' ', '');
  }
}
