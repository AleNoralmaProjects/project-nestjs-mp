import { Profesional } from '../../profesional/entities/profesional.entity';
import { InfoEai } from '../../info-eais/entities/info-eai.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BrigadaEai {
  @PrimaryGeneratedColumn('uuid')
  id_brigadaeais: string;

  @ManyToOne(() => InfoEai, (infoEai) => infoEai.brigadaEai, {
    onDelete: 'CASCADE',
  })
  eais: InfoEai;

  @ManyToOne(() => Profesional, (profesional) => profesional.brigadaEai, {
    onDelete: 'CASCADE',
  })
  profesional: Profesional;

  @Column({
    type: 'timestamp without time zone',
    nullable: false,
    default: () => 'NOW()',
  })
  fecha_creacion: Date;

  @Column({
    type: 'timestamp without time zone',
    nullable: false,
    default: () => 'NOW()',
  })
  fecha_actualizacion: Date;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  state: boolean;
}
