import { fakerVI as faker } from "@faker-js/faker";
import fs from "fs";
import moment from "moment";

function getRandomLists(numb, genItemFunc) {
  if (numb <= 0) return [];
  const listing = [];

  Array.from(new Array(numb)).forEach((_, idx) => {
    const item = genItemFunc(idx + 1);

    listing.push(item);
  });

  return listing;
}

(() => {
  const createdAt = faker.date.past({ years: 4, });

  const listings = getRandomLists(100, (index) => ({
    sell: faker.datatype.boolean(),
    active: faker.datatype.boolean(),
    agentId: faker.number.int({ min: 10000, max: 100000 }).toString(),
    sellName: faker.person.firstName(),
    agentName: faker.person.fullName(),
    createdAt: moment(createdAt).format("DD-MM-YYYY"),
    activeName: faker.string.alpha(),
    phoneNumber: faker.phone.number(),
    commissionRate: faker.number.int({ min: 0.1, max: 99.9 }),
    index,
  }));

  const listBds = getRandomLists(100, (index) => ({
    sell: faker.datatype.boolean(),
    active: faker.datatype.boolean(),
    bdId: faker.number.int({ min: 100000, max: 999999 }),
    bdCode: faker.number.int({ min: 1000, max: 10000 }),
    bdName: faker.person.fullName(),
    totalAgents: faker.number.int({ min: 0, max: 100 }),
    revenue: faker.finance.amount(100000, 10000000),
    comission: faker.finance.amount(100000, 100000000),
    sellName: faker.person.fullName(),
    createdAt: moment(createdAt).format("DD-MM-YYYY"),
    activeName: faker.string.alpha(),
    phoneNumber: faker.phone.number(),
    commissionRate: faker.number.int({ min: 0.1, max: 99.9 }),
    index,
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
