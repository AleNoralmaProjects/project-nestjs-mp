import { Profesion } from '../../profesion/entities/profesion.entity';
import { OneToMany } from 'typeorm';
import { BrigadaEai } from '../../brigada-eais/entities/brigada-eai.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profesional {
  //------Id Profesional
  @PrimaryGeneratedColumn('uuid')
  id_profesional: string;
  //-----Id Profesional

  //RELACION UNO A VARIOS CON PROFESION.
  //...Id Profesion...
  @ManyToOne(() => Profesion, (profesion) => profesion.profesional, {
    onDelete: 'CASCADE',
  })
  profesion: Profesion;
  //...Id Profesion...

  //......
  @Column({
    type: 'text',
    nullable: false,
  })
  role: string;
  //......

  //......
  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  cedula: string;
  //......

  @Column({
    type: 'text',
    nullable: false,
  })
  nombres: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  apellidos: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  telefono: string;

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  user: string;

  @Column({
    type: 'text',
    nullable: false,
    select: false, //no se va a mostrar al usuario
  })
  password: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  state: boolean;

  //RELACION UNO A MUCHOS CON BRIGADA

  @OneToMany(() => BrigadaEai, (brigadaEai) => brigadaEai.profesional, {
    nullable: false,
    cascade: true,
  })
  brigadaEai: BrigadaEai;

  //TRIGGERS
  @BeforeInsert()
  checkProfesionalInsert() {
    this.cedula = this.cedula.replaceAll(' ', '');
  }

  @BeforeUpdate()
  checkProsesionalUpadate() {
    this.cedula = this.cedula.replaceAll(' ', '');
  }
}
