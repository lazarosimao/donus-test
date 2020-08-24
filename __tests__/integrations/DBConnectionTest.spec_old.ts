// // import { getConnection, closeConnection } from "../utils/db-connection-test";
// import { Connection } from "typeorm";

// describe("Database NODE_ENV:test", () => {
  
//   let connection: Connection;

//   beforeAll(async () => {
//     connection = await getConnection();
//   });

//   beforeEach(async () => {
//     await connection.synchronize(true);
//   });

//   afterAll(async () => {
//     await closeConnection();
//   });

//   it('should create a connection', () => {
//     expect(connection).toBeDefined();
//   })
  
//   // it("Testing connection with test database", async () => {

//   // })
// });