import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation( () => Item )
  async createItem (
    @Args( 'createItemInput' ) createItemInput: CreateItemInput
  ) : Promise<Item> {
    console.log({  createItemInput})
    return this.itemsService.create( createItemInput );
  }

  @Query( () => [ Item ], { name: 'items' } )
  async findAll () : Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Query( () => Item, { name: 'item' } )
  async findOne(
    @Args( 'term', { type: () => String } ) term : string
  ) : Promise<Item> {
    return this.itemsService.findOne( term );
  }

  @Mutation( () => Item )
  async updateItem(
    @Args( 'updateItemInput' ) updateItemInput: UpdateItemInput
  ) : Promise<Item> {
    return this.itemsService.update( updateItemInput.id, updateItemInput );
  }

  @Mutation(() => Item)
  removeItem(
    @Args( 'id', { type: () => ID } ) id : string
  ) : Promise<Item> {
    return this.itemsService.remove( id );
  }
}
