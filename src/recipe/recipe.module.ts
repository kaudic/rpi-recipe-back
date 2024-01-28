import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { RecipeDatamapper } from './recipe.datamapper';
import { RecipeIngredientDatamapper } from './recipe-ingredient.datamapper';
import { DbqueryModule } from 'src/dbquery/dbquery.module';

@Module({
  imports: [DbqueryModule],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeDatamapper, RecipeIngredientDatamapper],
})
export class RecipeModule {}
