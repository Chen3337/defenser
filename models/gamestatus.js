const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GameStatusSchema = new Schema({ 
	user: { 
		type: String, 
		required: [true, 'The text field is required'],
		unique: true
	},
	characterone: {
		type: Number,
		default: 1
	},
	charactertwo: {
		type: Number,
		default: 1
	},
	characterthree: {
		type: Number,
		default: 1
	},
	characterfour: {
		type: Number,
		default: 1
	},
	castle: {
		type: Number,
		default: 1
	},
	money: {
		type: Number,
		default: 10
	},
	level: {
		type: Number,
		default: 1
	}
});

const GameStatus = mongoose.model('GameStatus', GameStatusSchema);

module.exports = GameStatus;