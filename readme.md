You can run:

# npm start

# yarn start

- Main.js:
  Cấu hình router cho json server.
  Tự động thêm createdAt và updatedAt vào trong req.body
- random.js
  Dùng "@faker-js/faker" để random dữ liệu
  Dùng fs system built in nodejs để đọc và ghi file vào trong db.json

# Router

- /api/data: list data
- /api/data?limit=10&page=1: pagination
