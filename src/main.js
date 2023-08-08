const { db } = require("../db/connection.js");
const Pokemon = require("./model");

async function main() {
  await db.sync({ force: true });

  //   CREATE
  const Pikachu = await Pokemon.create({
    name: "Pikachu",
    type: "Electric",
    weight: 6,
  });

  await Pokemon.bulkCreate([
    {
      name: "Bulbasaur",
      type: "Grass/Poison",
      weight: 6.9,
    },
    {
      name: "Charmander",
      type: "Fire",
      weight: 8.5,
    },
    {
      name: "Squirtle",
      type: "Water",
      weight: 9,
    },
  ]);

  //READ
  const currentPokemon = await Pokemon.findByPk(3);
  const allPokemon = await Pokemon.findAll();

  // UPDATE
  const updateResult = await Pokemon.update(
    { name: "Ivysaur", weight: 13 },
    { where: { name: "Bulbasaur" } }
  );

  //DELETE
  const deleteResult = await Pokemon.destroy({ where: { name: "Squirtle" } });

  console.log(JSON.stringify(deleteResult, null, 2));
}

main();
