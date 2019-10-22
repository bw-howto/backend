const db = require("../data/dbConfig");
const request = require("supertest");
const Posts = require("./post-model");
const server = require("../api/server");

describe("Get /", () => {
  it('has process.env.DB_ENV as "testing"', () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  it("returns 200", async () => {
    const expectedStatusCode = 200;
    const response = await request(server).get("/api");

    expect(response.status).toBe(expectedStatusCode);
  });
});

describe('posts model', () => {
    beforeEach(async () => {
        await db('posts').truncate()
    })

    describe('add function', () => {
        it('adds posts into the db', async () => {
            let postsNumber
            postsNumber = await db('posts')
            expect(postsNumber).toHaveLength(0)
            await Posts.add({postName: 'testPost1', description: 'testPost1'})
            postsNumber = await db('posts')
            expect(postsNumber).toHaveLength(1)
        })
    })

})
