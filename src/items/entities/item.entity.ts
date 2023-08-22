import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity( 'items' )
@ObjectType(  )
export class Item {

  @PrimaryGeneratedColumn( 'uuid' )
  @Field( () => ID )
  id: string

  @Column( 'text' )
  @Field( () => String )
  name: string

  @Column()
  @Field( () => Float )
  quantity: number


  @Column({ nullable: true })
  @Field( () => String, { nullable: true } )
  quantityUnits?: string

  // @Column( 'bool', { default: true } )
  // @Field( () => Boolean )
  // status: boolean
}
