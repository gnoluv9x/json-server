import { faker } from "@faker-js/faker";
import fs from "fs";
// const fs = require("fs");
//locale
faker.locale = "vi";

function randomCategoriesList(numb) {
  if (numb <= 0) return [];
  const listCategories = [];

  Array.from(new Array(numb)).forEach(item => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    listCategories.push(category);
  });

  return listCategories;
}
function randomProduct(categoriesList, numberOfProduct) {
  if (!Array.isArray(categoriesList) || numberOfProduct <= 0) return [];

  const productList = [];

  for (const category of categoriesList) {
    Array.from(new Array(numberOfProduct)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        thumbnail: faker.image.imageUrl(400, 400, "food"),
      };

      productList.push(product);
    });
  }
  return productList;
}

(() => {
  const listCategories = randomCategoriesList(4);
  const listProduct = randomProduct(listCategories, 5);
  // prepare data
  const db = {
    categories: listCategories,
    products: listProduct,
    info: {
      createdBy: "VuLong",
    },
  };
  // write to db.json
  fs.writeFile("./db.json", JSON.stringify(db), () => {
    console.log("Write Successfully =))");
  });
})();
