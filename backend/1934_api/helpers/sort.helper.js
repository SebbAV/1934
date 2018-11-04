

module.exports =
    {
        getHigherScore: function (array) {
            var movements = []
            array.map((item) => {
                movements.push(item.movements.length);
            });
            return Math.max.apply(null, movements);
        },
        sortScores: function (array) {
            array.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));
        }
    }