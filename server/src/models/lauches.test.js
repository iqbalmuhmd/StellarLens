const request = require("supertest");
const app = require("../app");

describe("Test /GET launches", () => {
  test("It should respond with 200 success", async () => {
    await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test /POST launches", () => {
  const LaunchData = {
    mission: "NASA Enterprise",
    rocket: "b-2",
    target: "kepler-186 f",
    launchDate: "January 10, 2034",
  };

  const LaunchDataWithoutDate = {
    mission: "NASA Enterprise",
    rocket: "b-2",
    target: "kepler-186 f",
  };

  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(LaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(LaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(LaunchDataWithoutDate);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(LaunchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });

  test("It should catch invalid date", async () => {
    const LauncDataWithInvalidDate = {
      mission: "NASA Enterprise",
      rocket: "b-2",
      target: "kepler-186 f",
      launchDate: "not a date",
    };

    const response = await request(app)
      .post("/launches")
      .send(LauncDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
