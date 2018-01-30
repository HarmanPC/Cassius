const words = require('./wordslmao.js').scrabwords;
const pokemon = require('./data/pokedex.js').BattlePokedex;

for (let i in pokemon) {
    const realword = i.toUpperCase();
    if (words.indexOf(realword) !== -1) console.log(i);
}