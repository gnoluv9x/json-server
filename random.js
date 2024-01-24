import { fakerVI as faker } from "@faker-js/faker";
import fs from "fs";
import moment from "moment";

function getRandomList(numb) {
  if (numb <= 0) return [];
  const listing = [];

  Array.from(new Array(numb)).forEach((_, idx) => {
    const createdAt = faker.date.past({ years: 4, });

    const item = {
      sell: faker.datatype.boolean(),
      active: faker.datatype.boolean(),
      agentId: faker.database.mongodbObjectId(),
      sellName: faker.person.bio(),
      agentName: faker.person.fullName(),
      createdAt: moment(createdAt).format("DD-MM-YYYY"),
      activeName: faker.string.alpha(),
      phoneNumber: faker.phone.number(),
      commissionRate: faker.number.int(),
      index: faker.number.int(),
    };

    listing.push(item);
  });

  return listing;
}

(() => {
  const listings = getRandomList(100);
  // prepare data
  const db = {
    data: listings,
    infos: {
      createdBy: "gnoluv",
    }
  };
  // write to db.json
  fs.writeFile("./db.json", JSON.stringify(db), () => {
    console.log("Write Successfully =))");
  });
})();
