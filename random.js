import { faker } from "@faker-js/faker";
import fs from "fs";
import moment from "moment";
// const fs = require("fs");
//locale
faker.locale = "vi";

const LIST_STATUS = [
  { title: "Thành công", code: "success" },
  { title: "Thất bại", code: "fail" },
];

function getRandomIdxInArray(list) {
  const randomIdx = Math.floor(Math.random() * list.length);

  return list[randomIdx];
}

function getRandomList(numb) {
  if (numb <= 0) return [];
  const listing = [];

  Array.from(new Array(numb)).forEach(() => {
    const createdAt = faker.date.between("2020-01-01T00:00:00.000Z", "2024-01-01T00:00:00.000Z");
    const randomStatus = getRandomIdxInArray(LIST_STATUS);

    const insurance = {
      id: faker.datatype.uuid(),
      orderId: faker.database.mongodbObjectId(),
      phoneNumber: faker.phone.number("09########"),
      productName: faker.name.fullName(),
      createdAt: moment(createdAt).format("DD-MM-YYYY"),
      status: randomStatus.title,
      statusCode: randomStatus.code,
    };

    listing.push(insurance);
  });

  return listing;
}

(() => {
  // prepare data
  const db = {
    data: getRandomList(100),
    info: {
      createdBy: "gnoluv",
    },
  };
  // write to db.json
  fs.writeFile("./db.json", JSON.stringify(db), () => {
    console.log("Write Successfully =))");
  });
})();
