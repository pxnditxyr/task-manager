import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class ItemsService {

  constructor (
    @InjectRepository( Item )
    private readonly itemsRepository : Repository<Item>,
  ) {}

  async create ( createItemInput: CreateItemInput ) : Promise<Item> {
    const newItem = this.itemsRepository.create( createItemInput )
    return await this.itemsRepository.save( newItem )
  }

  async findAll () : Promise<Item[]> {
    return await this.itemsRepository.find()
  }

  async findOne ( term : string ) : Promise<Item> {
    if ( isUUID( term ) ) {
      const item = await this.itemsRepository.findOneBy({ id: term })
      if ( !item ) throw new NotFoundException( `Item with id ${ term } not found` )
      return item
    }
    const item = await this.itemsRepository.findOneBy({ name: term })
    if ( !item ) throw new NotFoundException( `Item with name ${ term } not found` )
    return item
  }

  async update ( id : string, updateItemInput : UpdateItemInput ) : Promise<Item> {
    const item = await this.itemsRepository.preload( updateItemInput )
    if ( !item ) throw new NotFoundException( `Item with id ${ id } not found` )
    return this.itemsRepository.save( item )
  }

  async remove( id : string  ) : Promise<Item> {
    const item = await this.findOne( id )
    await this.itemsRepository.remove( item )
    console.log({ item })
    return { ...item, id }
  }
}
