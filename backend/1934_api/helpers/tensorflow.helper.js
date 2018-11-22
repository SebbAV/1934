var tf = require('@tensorflow/tfjs');
var mongodbHelper = require('./mongodb.helper');
let model = {};
let model2 = {};
let model3 = {};
var bestfit = []; // to be populated by tf.js
var bestfit2 = [];
var bestfit3 = [];
var i0 = [];
var i1 = [];
var i2 = [];
var x0 = [];
var x1 = [];
var x2 = [];
var y0 = [];
var y1 = [];
var y2 = [];
var z0 = [];
var z1 = [];
var z2 = [];
var l0 = 6;
var l1 = 6;
var l2 = 6;
var predictions = [];
function adjustArrays(arr1, arr2, arr3) {
    if (arr1.length != 5 && arr1.length < 5) {
        while (arr1.length != 5) {
            arr1.push(Math.floor((Math.random() * 4) + 0));
        }
    }
    if (arr2.length != 5 && arr2.length < 5) {
        while (arr2.length != 5) {
            arr2.push(Math.floor((Math.random() * 4) + 0));
        }
    }
    if (arr3.length != 5 && arr3.length < 5) {
        while (arr3.length != 5) {
            arr3.push(Math.floor((Math.random() * 4) + 0));
        }
    }
    if (arr1.length >= 6)
        arr1 = arr1.slice(0, 5);
    if (arr2.length >= 6)
        arr2 = arr2.slice(0, 5);
    if (arr3.length >= 6)
        arr3 = arr3.slice(0, 5);
    return arr1, arr2, arr3;
}
function startModel() {
    return new Promise((resolve, reject) => {
        mongodbHelper.find({}, "match").then(function (scores) {
            scores = scores.slice(Math.max(scores.length - 3, 1))
            for (s in scores) {
                var score = scores[s];
                for (m in score.movements) {
                    var movement = score.movements[m];
                    if (s === "0") {
                        x0.push(movement[0]);
                        x1.push(movement[1]);
                        x2.push(movement[2]);
                    } else if (s === "1") {
                        y0.push(movement[0]);
                        y1.push(movement[1]);
                        y2.push(movement[2]);
                    } else if (s === "2") {
                        z0.push(movement[0]);
                        z1.push(movement[1]);
                        z2.push(movement[2]);
                    }
                }
            }
            model = tf.sequential();
            model2 = tf.sequential();
            model3 = tf.sequential();
            if (!model || !model2 || !model3) {
                reject("Model was not initialized")
            }
            else {
                //Create the model
                //#region Model 1
                model.add(tf.layers.dense({ units: 1, inputShape: [1] })); // layer 1
                model.add(tf.layers.dense({ units: 64, inputShape: [1] })); // layer 2
                model.add(tf.layers.dense({ units: 1, inputShape: [64] })); // output layer
                model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' }); // compile with params
                i0.push(l0);
                x0, y0, z0 = adjustArrays(x0, y0, z0);
                model.fit(tf.tensor(x0), tf.tensor(y0), tf.tensor(z0), { epochs: 250, shuffle: true }).then((success) => {
                    // model.fit(e, {epochs:250, shuffle:true}).then(() => {
                    console.log(success);
                    bestfit = model.predict(tf.tensor(i0, [i0.length, 1])).dataSync();
                    var prediction1 = 0
                    bestfit.map((x) => {
                        prediction1 = x;
                    })
                    prediction1 = parseInt(prediction1)
                    if (prediction1 < 0) {
                        prediction1 = 0;
                    } else if (prediction1 > 4) {
                        prediction1 = 4
                    }
                    predictions.push(prediction1);
                    //#region Model 2
                    model2.add(tf.layers.dense({ units: 1, inputShape: [1] })); // layer 1
                    model2.add(tf.layers.dense({ units: 64, inputShape: [1] })); // layer 2
                    model2.add(tf.layers.dense({ units: 1, inputShape: [64] })); // output layer
                    model2.compile({ loss: 'meanSquaredError', optimizer: 'sgd' }); // compile with params
                    i1.push(l1);
                    x1, y1, z1 = adjustArrays(x1, y1, z1);
                    model2.fit(tf.tensor(x1), tf.tensor(y1), tf.tensor(z1), { epochs: 250, shuffle: true }).then((success) => {
                        // model.fit(e, {epochs:250, shuffle:true}).then(() => {
                        console.log(success);
                        bestfit2 = model.predict(tf.tensor(i1, [i1.length, 1])).dataSync();
                        var prediction2 = 0
                        bestfit2.map((x) => {
                            prediction2 = x;
                        })
                        prediction2 = parseInt(prediction2)
                        if (prediction2 < 0) {
                            prediction2 = 0;
                        } else if (prediction2 > 4) {
                            prediction2 = 4
                        }
                        predictions.push(prediction2);
                        //#region Model 3
                        model3.add(tf.layers.dense({ units: 1, inputShape: [1] })); // layer 1
                        model3.add(tf.layers.dense({ units: 64, inputShape: [1] })); // layer 2
                        model3.add(tf.layers.dense({ units: 1, inputShape: [64] })); // output layer
                        model3.compile({ loss: 'meanSquaredError', optimizer: 'sgd' }); // compile with params
                        i2.push(l2);
                        x2, y2, z2 = adjustArrays(x2, y2, z2);
                        model2.fit(tf.tensor(x2), tf.tensor(y2), tf.tensor(z2), { epochs: 250, shuffle: true }).then((success) => {
                            // model.fit(e, {epochs:250, shuffle:true}).then(() => {
                            console.log(success);
                            bestfit3 = model.predict(tf.tensor(i2, [i2.length, 1])).dataSync();
                            var prediction3 = 0
                            bestfit3.map((x) => {
                                prediction3 = x;
                            })
                            prediction3 = parseInt(prediction3)
                            if (prediction3 < 0) {
                                prediction3 = 0;
                            } else if (prediction3 > 4) {
                                prediction3 = 4
                            }
                            predictions.push(prediction3);
                            resolve(predictions);
                        }).catch((err) => {
                            console.log(err);
                            reject(err)
                        });
                        //#endregion
                    }).catch((err) => {
                        console.log(err);
                        reject(err)
                    });
                    //#endregion

                }).catch((err) => {
                    console.log(err);
                    reject(err)
                });
                //#endregion
            }
        }).catch(function (error) {
            reject(error)
        });

    });
}
function stopModel() {
    return new Promise((resolve, reject) => {
        model = {}
        model2 = {};
        model3 = {};
        bestfit = []; // to be populated by tf.js
        bestfit2 = [];
        bestfit3 = [];
        i0 = [];
        i1 = [];
        i2 = [];
        x0 = [];
        x1 = [];
        x2 = [];
        y0 = [];
        y1 = [];
        y2 = [];
        z0 = [];
        z1 = [];
        z2 = [];
        l0 = 1;
        l1 = 2;
        l2 = 3;
        predictions = [];
        if (model == {} || model2 == {} || model3 == {}) {
            reject("Model didn't stopped correctly");
        } else {
            resolve("Model stopped correctly");
        }
    });
}
function move(move) {
    return new Promise((resolve, reject) => {
        var movement = move.movements;
        predictions = [];
        l0 = movement[0];
        l1 = movement[1];
        l2 = movement[2];
        i0.push(l0);
        model.fit(tf.tensor(x0), tf.tensor(y0), tf.tensor(z0), { epochs: 250, shuffle: true }).then((success) => {
            // model.fit(e, {epochs:250, shuffle:true}).then(() => {
            console.log(success);
            bestfit = model.predict(tf.tensor(i0, [i0.length, 1])).dataSync();
            var prediction1 = 0
            bestfit.map((x) => {
                prediction1 = x;
            })
            prediction1 = parseInt(prediction1)
            if (prediction1 < 0) {
                prediction1 = 0;
            } else if (prediction1 > 4) {
                prediction1 = 4
            }
            predictions.push(prediction1);
            //#region Model 2
            model2.add(tf.layers.dense({ units: 1, inputShape: [1] })); // layer 1
            model2.add(tf.layers.dense({ units: 64, inputShape: [1] })); // layer 2
            model2.add(tf.layers.dense({ units: 1, inputShape: [64] })); // output layer
            model2.compile({ loss: 'meanSquaredError', optimizer: 'sgd' }); // compile with params
            i1.push(l1);
            x1, y1, z1 = adjustArrays(x1, y1, z1);
            model2.fit(tf.tensor(x1), tf.tensor(y1), tf.tensor(z1), { epochs: 250, shuffle: true }).then((success) => {
                // model.fit(e, {epochs:250, shuffle:true}).then(() => {
                console.log(success);
                bestfit2 = model.predict(tf.tensor(i1, [i1.length, 1])).dataSync();
                var prediction2 = 0
                bestfit2.map((x) => {
                    prediction2 = x;
                })
                prediction2 = parseInt(prediction2)
                if (prediction2 < 0) {
                    prediction2 = 0;
                } else if (prediction2 > 4) {
                    prediction2 = 4
                }
                predictions.push(prediction2);
                //#region Model 3
                model3.add(tf.layers.dense({ units: 1, inputShape: [1] })); // layer 1
                model3.add(tf.layers.dense({ units: 64, inputShape: [1] })); // layer 2
                model3.add(tf.layers.dense({ units: 1, inputShape: [64] })); // output layer
                model3.compile({ loss: 'meanSquaredError', optimizer: 'sgd' }); // compile with params
                i2.push(l2);
                x2, y2, z2 = adjustArrays(x2, y2, z2);
                model2.fit(tf.tensor(x2), tf.tensor(y2), tf.tensor(z2), { epochs: 250, shuffle: true }).then((success) => {
                    // model.fit(e, {epochs:250, shuffle:true}).then(() => {
                    console.log(success);
                    bestfit3 = model.predict(tf.tensor(i2, [i2.length, 1])).dataSync();
                    var prediction3 = 0
                    bestfit3.map((x) => {
                        prediction3 = x;
                    })
                    prediction3 = parseInt(prediction3)
                    if (prediction3 < 0) {
                        prediction3 = 0;
                    } else if (prediction3 > 4) {
                        prediction3 = 4
                    }
                    predictions.push(prediction3);
                    resolve(predictions);
                }).catch((err) => {
                    console.log(err);
                    reject(err)
                });
                //#endregion
            }).catch((err) => {
                console.log(err);
                reject(err)
            });
            //#endregion

        }).catch((err) => {
            console.log(err);
            reject(err)
        });
        //#endregion
    });
}
module.exports =
    {
        startModel() {
            return startModel();
        },
        stopModel() {
            return stopModel();
        },
        move(movement) {
            return move(movement);
        }
    }