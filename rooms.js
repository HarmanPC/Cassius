/**
 * Rooms
 * Cassius - https://github.com/sirDonovan/Cassius
 *
 * This file tracks information about the rooms that the bot joins.
 *
 * @license MIT license
 */

'use strict';

class Room {
	constructor(id) {
		this.id = id;
		this.users = new Map();
	}

	onJoin(user, rank) {
		this.users.set(user, 1);
		user.rooms.set(this, rank);
	}

	onLeave(user) {
		this.users.delete(user);
		user.rooms.delete(this);
	}

	onRename(user, name) {
		name = Tools.toName(name);
		let id = Tools.toId(name);
		if (id === user.id) {
			user.name = name;
			return;
		}
		delete Users.users[user.id];
		if (Users.users[id]) {
			Users.users[id].name = name;
			return;
		}
		user.name = name;
		user.id = id;
		Users.users[id] = user;
	}

	say(message) {
		message = Tools.normalizeMessage(message);
		if (!message) return;
		Client.send((this.id === 'lobby' ? '' : this.id) + '|' + message);
	}

	parseMessage(messageType, splitMessage) {
		let user, rank;
		switch (messageType) {
		case 'J':
		case 'j':
			user = Users.add(splitMessage[0]);
			if (!user) return;
			this.onJoin(user, splitMessage[0].charAt(0));
			break;
		case 'L':
		case 'l':
			user = Users.add(splitMessage[0]);
			if (!user) return;
			this.onLeave(user);
			break;
		case 'N':
		case 'n':
			user = Users.add(splitMessage[1]);
			if (!user) return;
			this.onRename(user, splitMessage[0]);
			break;
		case 'c':
			user = Users.add(splitMessage[0]);
			if (!user) return;
			rank = splitMessage[0].charAt(0);
			if (user.rooms.get(this) !== rank) user.rooms.set(this, rank);
			if (user.id === Users.self.id) return;
			CommandParser.parse(splitMessage.slice(1).join('|'), this, user);
			break;
		case 'c:':
			user = Users.add(splitMessage[1]);
			if (!user) return;
			rank = splitMessage[1].charAt(0);
			if (user.rooms.get(this) !== rank) user.rooms.set(this, rank);
			if (user.id === Users.self.id) return;
			CommandParser.parse(splitMessage.slice(2).join('|'), this, user, splitMessage[0] * 1000);
			break;
		}
	}
}

class Rooms {
	constructor() {
		this.rooms = {};
	}

	get(id) {
		if (id && id.users) return id;
		return this.rooms[id];
	}

	add(id) {
		let room = this.get(id);
		if (!room) {
			room = new Room(id);
			this.rooms[id] = room;
		}
		return room;
	}

	destroy(room) {
		room = this.get(room);
		if (!room) return;
		room.users.forEach(function (value, user) {
			user.rooms.delete(room);
		});
		delete this.rooms[room.id];
	}
}

module.exports = new Rooms();
