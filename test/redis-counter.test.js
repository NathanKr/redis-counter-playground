const { TestScheduler } = require("jest");
const client = require("../src/redis-counter");

describe("counter tests", () => {
  beforeAll(async () => {
    await client.init();
  });

  afterAll(async () => {
    await client.finish();
  });

  test("increment is incrementing by 1", async () => {
    const expiredTimeSec = 100; // very long
    await client.setTo1("key7", expiredTimeSec);
    await client.increment("key7");
    const result = await client.get("key7");
    expect(result).toBe(2);
  });

  test("exist return 1 on exist", async () => {
    const expiredTimeSec = 100; // very long
    await client.setTo1("key5", expiredTimeSec);
    const result = await client.exist("key5");
    expect(result).toBe(1);
  });

  test("exist return 0 on not exist", async () => {
    const result = await client.exist("key123");
    expect(result).toBe(0);
  });

  test("get is working correctly with setTo1 not expire", async () => {
    const expiredTimeSec = 100; // very long
    await client.setTo1("key3", expiredTimeSec);
    const value = await client.get("key3");
    expect(value).toBe(1);
  });

  test("exist is working correctly with setTo1 expire", async () => {
    const expiredTimeSec = 2; // short
    await client.setTo1("key4", expiredTimeSec);

    function wait() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, expiredTimeSec * 1000);
      });
    }
    await wait();
    const result = await client.exist("key4"); // not exist 0
    expect(result).toBe(0);
  });

  test("exist is working correctly with setTo1 not expire", async () => {
    const expiredTimeSec = 100; // long
    await client.setTo1("key6", expiredTimeSec);
    const result = await client.exist("key6"); //  exist 1
    expect(result).toBe(1);
  });

  test("negative expired time do not return OK", async () => {
    const expiredTimeSec = -1;
    let result;
    try {
      result = await client.setTo1("key1", expiredTimeSec);
    } catch (error) {
      result = error;
    }

    expect(result).not.toBe(client.okResult);
  });

  test("positive expired time return OK", async () => {
    const expiredTimeSec = 12;
    const result = await client.setTo1("key2", expiredTimeSec);
    expect(result).toBe(client.okResult);
  });
});
