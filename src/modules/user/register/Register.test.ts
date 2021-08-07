import { Connection } from "typeorm";
import { gCall } from "../../../test-utils/gCall";
import { testConn } from "../../../test-utils/testConn";

let conn: Connection;

beforeAll(async () => {
    conn = await testConn();
});

afterAll(async () => {
    await conn.close();
});

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Register resolver", () => {
    it("create user", async () => {
        console.log(
            await gCall({
                source: registerMutation,
                variableValues: {
                    data: {
                        firstName: "bob",
                        lastName: "bob2",
                        email: "bob@bob.com",
                        password: "asdfasdf"
                    }
                }
            })
        );
    });
});