import { run } from '../src/mergeability'

jest.mock("@actions/core")
jest.mock("@actions/github")

afterAll(() => jest.restoreAllMocks())

describe("run", () => {
    it('run action', async () => {
        await run()
    })
})