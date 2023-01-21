import { Profesional } from '../../profesional/entities/profesional.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class BrigadaEai {
  //------Id Brigada
  @PrimaryGeneratedColumn('uuid')
  id_brigadaeais: string;
  //-----Id Brigada

  //...ID EAIS...
  @Column({
    type: 'text',
    nullable: false,
  })
  eais: string;
  //....ID EAIS...

  //...ID PROFESIONAL...
  @OneToOne(() => Profesional, (profesional) => profesional.brigadaEai, {
    nullable: false,
    cascade: true,
  })
  profesional: Profesional;
  //...ID PROFESIONAL...

  //fechacreacion
  @Column({
    type: 'timestamp without time zone',
    nullable: false,
    default: () => 'NOW()',
  })
  fecha_creacion: Date;
  //fechacreacion
}
