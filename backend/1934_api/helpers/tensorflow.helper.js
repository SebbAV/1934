var tf = require('@tensorflow/tfjs');
var mongodbHelper = require('./mongodb.helper');
let model = {}
var xs = []
var ys = []
var zs = []
var is = []
var bestfit = [] // to be populated by tf.js
var i = 6;
function startModel() {
    return new Promise((resolve, reject) => {
        mongodbHelper.find({}, "match").then(function (scores) {
            scores = scores.slice(Math.max(scores.length - 3, 1))
            scores.map((score)=>{
                score.movements.map((m)=>
                {
                    xs.push(m[0]);
                    ys.push(m[1]);
                    zs.push(m[2]);
                })
            });
            model = tf.sequential();
            if (!model) {
                reject("Model was not initialized")
            }
            else {
                //Create the model
                model.add(tf.layers.dense({ units: 1, inputShape: [1] })); // layer 1
                model.add(tf.layers.dense({ units: 64, inputShape: [1] })); // layer 2
                model.add(tf.layers.dense({ units: 1, inputShape: [64] })); // output layer
                model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' }); // compile with params
                is.push(i)
                model.fit(tf.tensor(xs), tf.tensor(ys), tf.tensor(zs), { epochs: 250, shuffle: true }).then((success) => {
                    // model.fit(e, {epochs:250, shuffle:true}).then(() => {
                    bestfit = model.predict(tf.tensor(is, [is.length, 1])).dataSync();
                    var prediction = 0
                    bestfit.map((x) => {
                        prediction = x;
                    })
                    prediction = parseInt(prediction)
                    if (prediction < 0) {
                        prediction = 0;
                    } else if (prediction > 4) {
                        prediction = 4
                    }
                    resolve(prediction);
                }).catch((err) => {
                    reject(err)
                });
            }
        }).catch(function (error) {
            reject(error)
        });

    });
}
module.exports =
    {
        startModel() {
            return startModel();
        }
    }