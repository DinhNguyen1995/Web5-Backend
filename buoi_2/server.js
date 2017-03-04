var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var router = express.Router();
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(router);

router.get('/', function(req, res){
  res.end("home");
})


router.get('/getUser', function(req, res){
  fs.readFile('users.json','utf8', (err, data) => {
    if (err) console.log(err) ;
    var result = JSON.parse(data);
    res.json(result);
  });
})

router.post('/addUser',bodyParser.json(), function(req,res){
    var newUser = req.body;
    console.log(req.body);
    fs.readFile("users.json", (err, data) => {
      if (err) throw err;
      var result = JSON.parse(data);
      result.push(newUser);
      fs.writeFile('users.json', JSON.stringify(result), function(err, data){
        if(err) console.log(err);
        else res.json(result);
      })
    });
})

function checkItemInArray(result, newUser, callback){  //kiem tra xem username o trong file chua ?
  var check = true;
  result.forEach(function(item,index){
    if(newUser.username == item.username){
      check = false;
    }
  })
  callback(check);
}




// neu user da ton tai thi thong bao , chua ton tai thi add vao
router.post('/checkExist',bodyParser.json(), function(req,res){
    var newUser = req.body;
    console.log(req.body);
    fs.readFile("users.json", (err, data) => {
      if (err) throw err;
      var result = JSON.parse(data);

      checkItemInArray(result, newUser, function(check){
        if(check){
          result.push(newUser);
          fs.writeFile('users.json', JSON.stringify(result), function(err, data){
            if(err) console.log(err);
            else res.json(result);
          })
        } else {
          res.end("username is exist")
        }
      })
    });
})

// tra ve user co username dc nhap
function checkItem(result, username, callback){
  var user = null;
  result.forEach(function(item,index){
    if(username == item.username){
      user = item;
    }
  })
  callback(item);
}

// edit thong tin user qua username
router.post('/editUser/:username',function(req,res){
  var username = req.params.username;
  console.log(req.body);
  fs.readFile("users.json", (err, data) => {
    if (err) throw err;
    var result = JSON.parse(data);

    checkItem(result, username, function(item){
      if(item != null){
        var newData = req.body;
        if(newData.age) item.age = newData.age;
        if(newData.name) item.name = newData.name;
        if(newData.password) item.password = newData.password;
        if(newData.class) item.class = newData.class;
        fs.writeFile('users.json', JSON.stringify(result), function(err, data){
          if(err) console.log(err);
          else res.json(result);
        })
      }
      else {
        res.end("username is exist");
      }
    })
  })
})


app.listen(3000, function(err){
  console.log("Server run at 3000");
})
