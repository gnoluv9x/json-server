import { faker } from "@faker-js/faker";
import fs from "fs";
import moment from "moment";
// const fs = require("fs");
//locale
faker.locale = "vi";

const LIST_STATUS = [
  "moi-tao",
  "da-tham-chieu",
  "dang-ky-so",
  "da-ky-so",
  "qua-thoi-gian",
  "loi",
  "huy",
];

const LIST_INSURANCE_TYPES = [
  {
    code: "DF1",
    name: "Trễ chuyến bay ePTI",
  },
  {
    code: "C1",
    name: "TNDS Ô tô",
  },
  {
    code: "C2",
    name: "Vật chất Ô tô",
  },
  {
    code: "C3",
    name: "Tai nạn lái xe và phụ xe",
  },
  {
    code: "M1",
    name: "TNDS xe máy",
  },
  {
    code: "VC",
    name: "Vaccine",
  },
  {
    code: "NCV",
    name: "Ncovid",
  },
  {
    code: "M2",
    name: "TNDS xe máy và người ngồi trên xe",
  },
  {
    code: "H1",
    name: "Nhà tư nhân",
  },
  {
    code: "T1",
    name: "Du lịch trong nước",
  },
  {
    code: "T2",
    name: "Du lịch quốc tế",
  },
  {
    code: "A1",
    name: "Tai nạn cá nhân",
  },
  {
    code: "A2",
    name: "Tai nạn gia đình",
  },
  {
    code: "HC1",
    name: "Sức khỏe Phúc An Sinh",
  },
  {
    code: "HC2",
    name: "Sức khỏe Elite Care",
  },
  {
    code: "HC3",
    name: "Hỗ trợ viện phí",
  },
  {
    code: "DL",
    name: "Droplet",
  },
  {
    code: "G1",
    name: "Golf",
  },
  {
    code: "DF2",
    name: "Trễ chuyến bay VietNam Airlines",
  },
  {
    code: "M3",
    name: "Vật chất xe máy",
  },
  {
    code: "U1",
    name: "Vay tin chap co tai san dam bao",
  },
  {
    code: "HC4",
    name: "Bảo an tính dụng",
  },
  {
    code: "HC6",
    name: "Bảo An Khang",
  },
  {
    code: "HC5",
    name: "An tâm chống dịch",
  },
  {
    code: "HC7",
    name: "Bảo hiểm chủ thẻ tín dụng",
  },
  {
    code: "A4",
    name: "Vững Tâm An",
  },
  {
    code: "EI",
    name: "Bảo hành mở rộng",
  },
  {
    code: "A3",
    name: "An Sinh Mai Linh",
  },
  {
    code: "PI",
    name: "Tài sản Mai Linh",
  },
  {
    code: "H2",
    name: "Nhà chung cư",
  },
  {
    code: "A5",
    name: "An sinh Y Chi",
  },
  {
    code: "A6",
    name: "An tâm chống dịch",
  },
  {
    code: "A7",
    name: "An tâm mua sắm",
  },
  {
    code: "HC8",
    name: "Hỗ trợ viện phí HC8",
  },
  {
    code: "HI",
    name: "Rơi vỡ thiết bị",
  },
  {
    code: "HC10",
    name: "Bảo hiểm sức khỏe HC10",
  },
  {
    code: "A8",
    name: "An Sinh Gia Đình",
  },
  {
    code: "HC3B",
    name: "Hỗ trợ viện phí HC3B",
  },
  {
    code: "A2B",
    name: "Tai nạn gia đình A2B",
  },
  {
    code: "HC11",
    name: "HODO",
  },
];

function getRandomIdxInArray(list) {
  const randomIdx = Math.floor(Math.random() * list.length);

  return list[randomIdx];
}

function randomListInsurances(numb) {
  if (numb <= 0) return [];
  const listInsurances = [];
  let insuranceIdx = 0;

  Array.from(new Array(numb)).forEach(() => {
    if (insuranceIdx === LIST_INSURANCE_TYPES.length) {
      insuranceIdx = 0;
    }

    const insuranceItem = LIST_INSURANCE_TYPES[insuranceIdx];
    const effectivedAt = faker.date.between("2020-01-01T00:00:00.000Z", "2023-01-01T00:00:00.000Z");

    const insurance = {
      id: faker.datatype.uuid(),
      code: faker.address.zipCodeByState(),
      refCode: faker.address.zipCodeByState(),
      ownerFullname: faker.name.lastName() + " " + faker.name.firstName(),
      insuranceTypeName: insuranceItem.name,
      insuranceTypeCode: insuranceItem.code,
      insuranceFee: Number(faker.commerce.price(100000, 100000000, 0)),
      effectivedAt,
      expiredAt: moment(effectivedAt).add(1, "year").toISOString(),
      status: getRandomIdxInArray(LIST_STATUS),
    };

    listInsurances.push(insurance);
    insuranceIdx++;
  });

  return listInsurances;
}

(() => {
  const data = randomListInsurances(2000);
  // prepare data
  const db = {
    data,
    info: {
      createdBy: "gnoluv",
    },
  };
  // write to db.json
  fs.writeFile("./db.json", JSON.stringify(db), () => {
    console.log("Write Successfully =))");
  });
})();
