

module.exports =
    {
        getHigherScore: function (array) {
            var movements = []
            array.map((item) => {
                movements.push(item.movements.length);
            });
            return Math.max.apply(null, movements);
        }
    }