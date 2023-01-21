import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Profesional } from '../../profesional/entities/profesional.entity';

@Entity()
export class Profesion {
  //------Id Profesion
  @PrimaryGeneratedColumn('uuid')
  id_profesion: string;
  //-----Id Profesion

  //...Descripcion...
  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  descripcion: string;
  //....Descripcion...

  //
  @OneToMany(() => Profesional, (profesional) => profesional.profesion, {
    nullable: false,
    cascade: true,
  })
  profesional: Profesional;
}
