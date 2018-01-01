'use strict';

const fs = require('fs');
const Player = require('./games').Player;

class Ratings {
    constructor() {
        this.ratings = {};
    }

    onLoad() {
        let file = '{}';
        try {
            file = fs.readFileSync('./databases/ratings.json').toString();
        } catch (e) {}
        this.ratings = JSON.parse(file);
    }

    save() {
        fs.writeFileSync('./databases/ratings.json', JSON.stringify(this.ratings));
    }

    /**
     * Updates the Scrabble ratings for the given players
     * @param {{string: number}} players
     */
    onMatchEnd(players) {
        console.log("sup");
        let changes = {};
        for (const playerid in players) {
            if (!(playerid in this.ratings)) this.ratings[playerid] = [1000, 0];
            changes[playerid] = 0;
        }
        for (const playerid1 in players) {
            for (const playerid2 in players) {
                if (playerid1 === playerid2) continue;
                // @ts-ignore
                changes[playerid1] += this.getRatingChange(playerid1, players[playerid1], playerid2, players[playerid2]);
            }
        }
        for (const playerid in changes) {
            let ratingChange = changes[playerid];
            ratingChange *= 2 / Object.keys(players).length;
            let info = this.ratings[playerid];
            let oldrating = this.ratings[playerid][0];
            info[0] += ratingChange;
            info[0] = Math.floor(info[0]);
            if (info[0] < 1000) info[0] = 1000;
            info[1] += Object.keys(players).length - 1;
            let user = Users.get(playerid);
            if (user) user.say("Rating change: **" + oldrating + "** => **" + info[0] + "**.");
            this.ratings[playerid] = info;
        }
        
        this.save();
    }

    /**
     * @param {string} playerid1
     * @param {number} points1
     * @param {string} playerid2
     * @param {number} points2
     */
    getRatingChange(playerid1, points1, playerid2, points2) {
        const curPlayer1Rating = this.ratings[playerid1][0];
        const curPlayer1Games = this.ratings[playerid1][1];
        const curPlayer2Rating = this.ratings[playerid2][0];
        const result = points2 > points1 ? 0 : points2 < points1 ? 1 : 0.5;
        const expected = 1 / (1 + Math.pow(10, (curPlayer2Rating - curPlayer1Rating) / 400));
        const diff = result - expected;
        const k = this.getK(curPlayer1Rating, curPlayer1Games);
        return diff * k;
    }

    /**
     * @param {number} rating
     * @param {number} numGames
     */
    getK(rating, numGames) {
        let mult = numGames > 25 ? 1 : Math.sqrt(25 - numGames);
        return mult * 5 * Math.log10(3000 - rating);
    }

    getSorted() {
        return Object.keys(this.ratings).sort((pl1, pl2) => this.ratings[pl2][0] - this.ratings[pl1][0]).map(name => [name, this.ratings[name][0]]);
    }
}

module.exports = new Ratings();