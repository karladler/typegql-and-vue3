import { Resolver, Query, FieldResolver, Arg, Root, Mutation, Ctx, Int } from "type-graphql"
import { Recipe } from "../entities/recipe";
import { Rate } from "../entities/rate";
import { User } from "../entities/user";
import { RecipeInput } from "./types/recipe-input";
import { RateInput } from "./types/rate-input";
import { Context } from "../server";

@Resolver(of => Recipe)
export class RecipeResolver {
  @Query(returns => Recipe, { nullable: true })
  recipe(@Arg("recipeId", type => Int) recipeId: number) {
    return Recipe.findOne({where: {id: recipeId}});
  }

  @Query(returns => [Recipe])
  recipes(): Promise<Recipe[]> {
    return Recipe.find();
  }

  @Mutation(returns => Recipe)
  async addRecipe(
    @Arg("recipe") recipeInput: RecipeInput,
    @Ctx() { user }: Context,
  ): Promise<Recipe> {
    const recipe = Recipe.create({
      ...recipeInput,
      authorId: user.id,
    });
    return await Recipe.save(recipe);
  }

  @Mutation(returns => Recipe)
  async rate(@Arg("rate") rateInput: RateInput, @Ctx() { user }: Context): Promise<Recipe> {
    // find the recipe
    const recipe = await Recipe.findOne({
      where: { id: rateInput.recipeId },
      relations: ["ratings"],
    });
    if (!recipe) {
      throw new Error("Invalid recipe ID");
    }

    // set the new recipe rate
    const newRate = Rate.create({
      recipe,
      value: rateInput.value,
      user,
    });
    recipe.ratings.push(newRate);

    // update the recipe
    await Recipe.save(recipe);
    return recipe;
  }

  @FieldResolver()
  ratings(@Root() recipe: Recipe) {
    return Rate.find({
      cache: 1000,
      where: { recipe: { id: recipe.id } },
    });
  }

  @FieldResolver()
  async author(@Root() recipe: Recipe): Promise<User> {
    return User.findOneOrFail({
      where: { id: recipe.authorId},
      cache: 1000
    });
  }
}
