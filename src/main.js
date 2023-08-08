const { db } = require('../db/connection.js')
const { Pokemon, Badge, Trainer } = require('./models/index.js')

async function main() {
	// await db.sync({ force: true })

	const trainers = await Trainer.findAll()
	const pokemon = await Pokemon.findAll()
	const badges = await Badge.findAll()

	await trainers[0].addPokemon(pokemon[0])
	await trainers[0].addPokemon([pokemon[1], pokemon[2]])

	const trainer = await Trainer.findOne({
		where: {
			name: 'Red'
		},
		include: [Pokemon]
	})

	//console.log(JSON.stringify(trainer, null, 2))

	await trainers[0].addBadge(badges[0])
	await trainers[1].addBadge(badges[0])
	await trainers[1].addBadge(badges[1])

	const trainersWBadges = await Trainer.findAll({ include: Badge })
	// console.log(JSON.stringify(trainersWBadges, null, 2))
}

main()
