import { type } from "node:os";
import { Column, Entity, OneToMany} from "typeorm";

import { BaseEntity } from './base.entity';
import { Variation } from "./variation.entity";

@Entity('Products')
export class Product extends BaseEntity {
    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'double precision' })
    price: number;

    @OneToMany(type => Variation, variation => variation.product)
    variations: Variation[]
}