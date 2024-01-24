import { fakerVI as faker } from "@faker-js/faker";
import fs from "fs";
import moment from "moment";

function getRandomLists(numb, genItemFunc) {
  if (numb <= 0) return [];
  const listing = [];

  Array.from(new Array(numb)).forEach((_, idx) => {
    const item = genItemFunc();

    listing.push(item);
  });

  return listing;
}

(() => {
  const createdAt = faker.date.past({ years: 4, });

  const listings = getRandomLists(100, () => ({
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
  }));

  const listBds = getRandomLists(100, () => ({
    sell: faker.datatype.boolean(),
    active: faker.datatype.boolean(),
    bdId: faker.number.int({ min: 100000, max: 999999 }),
    bdCode: faker.number.int(),
    bdName: faker.person.fullName(),
    totalAgents: faker.number.int({ min: 0, max: 100 }),
    revenue: faker.finance.amount({ min: 10000, max: 100000000 }),
    comission: faker.finance.amount({ min: 1000, max: 1000000 }),
    sellName: faker.person.fullName(),
    createdAt: moment(createdAt).format("DD-MM-YYYY"),
    activeName: faker.string.alpha(),
    phoneNumber: "0389921111",
    commissionRate: faker.number.int(),
    index: faker.number.int(),
  }));

  // prepare data
  const db = {
    agents: listings,
    bd: listBds,
    infos: {
      createdBy: "gnoluv",
    }
  };
  // write to db.json
  fs.writeFile("./db.json", JSON.stringify(db), () => {
    console.log("Write Successfully =))");
  });
})();
