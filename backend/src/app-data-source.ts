import { DataSource } from "typeorm";
import {resolve} from "path"

import { Recipe } from "./entities/recipe";
import { Rate } from "./entities/rate";
import { User } from "./entities/user";

export const root: string = resolve(__dirname, "..")

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: `${root}/data/db.sqlite`,
  synchronize: true,
  logging: true,
  entities: [Recipe, Rate, User],
})

export const initDataSource = () => {

  return new Promise((resolve, reject) => {
    AppDataSource.initialize()
      .then(() => {
          console.log("Data Source has been initialized!")
          resolve(AppDataSource);
      })
      .catch((err) => {
        console.error('Problem initilaizing data source', err);
        reject();
      })
    });
};
