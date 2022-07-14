import { Recipe } from "./entities/recipe";
import { Rate } from "./entities/rate";
import { User } from "./entities/user";

export async function seedDatabase() {
  const defaultUser = await User.create({
    id: 1,
    email: "not@existing.mail",
    nickname: "Karl",
    password: "blubb0r",
  }).save();

  // const recipes = Recipe.create([
  //   {
  //     title: "Recipe 1",
  //     description: "Desc 1",
  //     author: defaultUser,
  //     ratings: Rate.create([
  //       { value: 2, user: defaultUser },
  //       { value: 4, user: defaultUser },
  //       { value: 5, user: defaultUser },
  //       { value: 3, user: defaultUser },
  //       { value: 4, user: defaultUser },
  //     ]),
  //   },
  //   {
  //     title: "Recipe 2",
  //     author: defaultUser,
  //     ratings: Rate.create([
  //       { value: 2, user: defaultUser },
  //       { value: 4, user: defaultUser },
  //     ]),
  //   },
  // ]);

  // await Promise.all(recipes.map(r => r.save()))

  return {
    defaultUser,
  };
}
