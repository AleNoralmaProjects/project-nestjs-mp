import { Profesional } from '../../profesional/entities/profesional.entity';
import { InfoEai } from '../../info-eais/entities/info-eai.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BrigadaEai {
  //------Id Brigada
  @PrimaryGeneratedColumn('uuid')
  id_brigadaeais: string;
  //-----Id Brigada

  //...ID EAIS...
  @ManyToOne(() => InfoEai, (infoEai) => infoEai.brigadaEai, {
    onDelete: 'CASCADE',
  })
  eais: InfoEai;
  //....ID EAIS...

  //...ID PROFESIONAL...RELACION
  @ManyToOne(() => Profesional, (profesional) => profesional.brigadaEai, {
    onDelete: 'CASCADE',
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

  //fechacreacion
  @Column({
    type: 'timestamp without time zone',
    nullable: false,
    default: () => 'NOW()',
  })
  fecha_actualizacion: Date;
  //fechacreacion

  @Column({
    type: 'boolean',
    nullable: false,
  })
  state: boolean;
}
