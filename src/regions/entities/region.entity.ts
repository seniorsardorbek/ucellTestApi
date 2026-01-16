import { Column, Entity } from 'typeorm';

@Entity('regions')
export class Region {
  @Column({ primary: true, generated: 'increment' })
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  item: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  units: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  subribers: number;
}
