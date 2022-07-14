import { Resolver, FieldResolver, Root } from "type-graphql";
import { Repository } from "typeorm";

import { Rate } from "../entities/rate";
import { User } from "../entities/user";

@Resolver(of => Rate)
export class RateResolver {
  @FieldResolver()
  async user(@Root() rate: Rate): Promise<User> {
    return User.findOneOrFail({
      where: {id: rate.userId},
      cache: 1000
    });
  }
}
