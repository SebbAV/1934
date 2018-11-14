var tensorFlow = require('@tensorflow/tfjs');

function startModel() {
    return new Promise((resolve, reject) => {
        var seh = 1;
        if (seh == 1)
            resolve("Model Start");
        else
            reject("Nachos");
    });
}
module.exports =
    {
        startModel() {
            return startModel();
        }
    }