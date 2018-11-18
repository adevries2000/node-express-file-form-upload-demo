/***************************************************************
  node.js express app file form server upload w/ Multer demo
  App created by:  Jesse Lewis
  Multer Config used based on tutorial by Ashish Mehra via Youtube
  @ https://www.youtube.com/watch?v=sMnqnvW81to&lc=z23htp54jwmhwni0nacdp43axbwhgu3y3fg0jwzwhatw03c010c
******************************************************************************************************/

  // RUN PACKAGES
  const express = require('express');
  const multer = require('multer');
  const bodyParser = require('body-parser');

  // SETUP APP
  const app = express();
  const port = process.env.PORT || 3000;
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json());
  app.use('/', express.static(__dirname + '/public'));



  //MULTER CONFIG: to get file photos to temp server storage
  const multerConfig = {

    //specify diskStorage (another option is memory)
    storage: multer.diskStorage({

      //specify destination
      destination: function(req, file, next){
        next(null, './public/uploads');
      },

      //specify the filename to be unique
      filename: function(req, file, next){
        console.log(file);
        //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
        const ext = file.mimetype.split('/')[1];
        //set the file fieldname to a unique name containing the original name, current datetime and the extension.
        next(null, file.originalname);
      }
    }),

    // filter out and prevent non-image files.
    fileFilter: function(req, file, next){
          if(!file){
            next();
          }

        // only permit csv mimetypes
        const xlfile = file.mimetype.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

	const csv1 = file.mimetype.startsWith('text/plain');
	const csv2 = file.mimetype.startsWith('text/x-csv');
	const csv3 = file.mimetype.startsWith('application/vnd.ms-excel');
	const csv4 = file.mimetype.startsWith('application/csv');
	const csv5 = file.mimetype.startsWith('application/x-csv');
	const csv6 = file.mimetype.startsWith('text/csv');
	const csv7 = file.mimetype.startsWith('text/comma-separated-values');
	const csv8 = file.mimetype.startsWith('text/x-comma-separated-values');
	const csv9 = file.mimetype.startsWith('text/tab-separated-values');

        if(xlfile||csv1||csv2||csv3||csv4||csv5||csv6||csv7||csv8||csv9){
          console.log('Excel Sheet uploaded');
          next(null,file.originalname);
        }else{
          console.log("file not supported")
          //TODO:  A better message response to user on failure.
        return next();
        }
    },

     javacode: function(req, file, next){
        var exec = require('child_process').exec, child;
        child = exec('/home/ubuntu/node-express-file-form-upload-demo/jdk1.8.0_191/bin/java Hello ./input.txt ./output.txt 1 2 3 4 5 6',
        function (error, stdout, stderr){
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if(error !== null){
          console.log('exec error: ' + error);
        }
    });
    next(null,true);
}

  };


  /* ROUTES
  **********/
  app.get('/', function(req, res){
    res.render('index.html');
  });
  

  app.post('/upload', multer(multerConfig).single('excel-sheet'),function(req, res){
      //Here is where I could add functions to then get the url of the new photo
      //And relocate that to a cloud storage solution with a callback containing its new url
      //then ideally loading that into your database solution.   Use case - user uploading an avatar...
      res.send('Complete! Navigate to  <a href="/uploads">Here</a>. To Upload more files or Try Again <a href="index.html">Click Here</a>');
  }

);

  // RUN SERVER
  app.listen(port,function(){
    console.log(`Server listening on port ${port}`);
  });
