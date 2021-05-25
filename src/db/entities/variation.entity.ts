import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Product } from "./products.entity";

@Entity('Variations')
export class Variation extends BaseEntity {
    @Column()
    title: string;

    @Column({ type: "double precision" })
    price: number;

    @ManyToOne(type => Product, product => product.variations)
    product: Product;
}