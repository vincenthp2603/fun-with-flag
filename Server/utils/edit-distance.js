const ed = require('edit-distance');

let insert, remove, update;

insert = remove = function(node) { return 1; };
update = function(stringA, stringB) { return stringA !== stringB ? 1 : 0; };

module.exports = function editDistance(input, origin) {
    let lev = ed.levenshtein(input, origin, insert, remove, update);
    return lev.distance;    
}