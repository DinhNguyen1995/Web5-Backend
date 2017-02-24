let let fs = require('fs');

readfile = (file, callback) => {
    fs.readFile(file, (err, data) => {
        if (err) {
            callback(err);
        } else {
            let str = data.toString();
            let arr = str.split("\n");
            callback(err, arr);
        }
    })
};

writefile = (file, data, callback) => {

    solveData(data, (dataCallback) => {

        fs.appendFile(file, dataCallback, (err) => {

            callback(err);
        })
    });
}

solveData = (data, callback) => {
    let result = {};
    data.forEach(value) {
        let arr = value.split(" ");
        if (result[arr[0]]) {
            result[arr[0]] += parseInt(arr[1]);
        } else {
            result[arr[0]] = parseInt(arr[1]);
        }
    };

    let str = "";

    data.forEach(value) {
        let arr = value.split(" ");
        if (result[arr[0]]) {
            str = str.concat(arr[0], " ", result[arr[0]], "\n");
            result[arr[0]] = undefined;
        }
    };

    callback(str);
}
