import { Profesional } from '../../profesional/entities/profesional.entity';
import { InfoEai } from '../../info-eais/entities/info-eai.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

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

  //...ID PROFESIONAL...
  @OneToOne(() => Profesional, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
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
