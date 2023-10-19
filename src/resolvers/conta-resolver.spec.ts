import { ContaResolver } from "./conta-resolver"

describe("Create Account", () => {

  it("Should be able to create a new user", async () => {
    const resolver = new ContaResolver()
    const conta = 1
    const account = await resolver.saldo({conta})

    expect(account).toBeTruthy()
  })
})