const data = require("../../public/data/properties.json");

test("properties JSON contains properties", () => {
  expect(data.properties.length).toBeGreaterThan(0);
});

test("each property has required fields", () => {
  const property = data.properties[0];

  expect(property).toHaveProperty("id");
  expect(property).toHaveProperty("type");
  expect(property).toHaveProperty("price");
  expect(property).toHaveProperty("location");
});
