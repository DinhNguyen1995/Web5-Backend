let fileUntils = require('./FileUtils');


fileUntils.readfile(fileInput,(error,data) => {
    if(error){
      console.log(error);
    }else{
      data.forEach((value){
        console.log(value);
      });
      writeFile(fileOutput,data);
    }
});

writeFile = (file,data) =>{
  fileUntils.writefile(file,data,(error)){
    if(error){
      console.log(error);
    }else{
      console.log("File was write successfully!");
    }
  }
}
