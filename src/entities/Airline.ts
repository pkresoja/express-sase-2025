import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./Ticket";

@Entity("airline", { schema: "sde_sase_2025" })
export class Airline {
  @PrimaryGeneratedColumn({ type: "int", name: "airline_id", unsigned: true })
  airlineId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "website", length: 255 })
  website: string;

  @Column("datetime", { name: "created_at" })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Ticket, (ticket) => ticket.airline)
  tickets: Ticket[];
}
