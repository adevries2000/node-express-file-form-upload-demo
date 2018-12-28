  // RUN PACKAGES
  const express = require('express');
  const multer = require('multer');
  const bodyParser = require('body-parser');
  var f = ' ';
  var fs = require('fs');
  var metadata = require('node-ec2-metadata');
  var ip = '';
metadata.getMetadataForInstance('public-ipv4')
.then(function(ipv4) {
    console.log("Instance ID: " + ipv4);
    ip = ipv4;
})
.fail(function(error) {
    console.log("Error: " + error);
});
  // SETUP APP
  const app = express();
  const port = process.env.PORT || 3000;
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json());
  app.use('/', express.static(__dirname + '/public'));





  //MULTER CONFIG: to get files to temp server storage
  const multerConfig = {

    //specify diskStorage (another option is memory)
    storage: multer.diskStorage({

      //specify destination: Local Directory where the files will reside
      destination: function(req, file, next){
        next(null, './public/uploads');
      },

      filename: function(req, file, next){
        console.log(file);
        //get the file mimetype ie 'csv' split
        const ext = file.mimetype.split('/')[1];
        //set the file fieldname to be the original name
        next(null, file.originalname);
      }
    }),

    // filter out and prevent non-csv files.
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
          f = file.originalname;
          next(null, true);
        }else{
          console.log("file not supported")
          //TODO:  A better message response to user on failure.
        return next();
        }
    }
  };


  /* ROUTES
  **********/

  // index.html is the page displayes when the user types URL. This corresponds to HTTP GET request
  app.get('/', function(req, res){
    res.render('index.html');
  });
  
  // This responds to HTTP POST request when a file is uploaded
  app.post('/upload', multer(multerConfig).single('excel-sheet'),function(req, res){
      //The business logic that processes the file
      pleaseSolve(req.body, res);
      // res.send('Complete! Navigate to  <a href="/uploads">Here</a>. To Upload more files or Try Again <a href="index.html">Click Here</a>');
  }

);

  // RUN SERVER and listen to the port 3000
  app.listen(port,function(){
    console.log(`Server listening on port ${port}`);
  });


  function pleaseSolve(parms, res) {
    //get the parameters based on input name attribute from the html
    //and parse strings to numbers
    // var m = +parms.param1;
    // var o = +parms.param2;
    // var p = +parms.param3;

    var exec = require('child_process').exec, child, child3, child4, child5, child6;   // Starting the java child process to run the java code to process excel sheet 
    
     child3 = exec('cat ./public/index_response-1.html > ./public/index_response.html');
   var outputLink = '<a href="http://'+ip+'/output-' + f +'">Download</a>'

     child2 = exec('echo "' +outputLink+'" >> ./public/index_response.html');

     // child5 = exec('echo "'+ parms.param + " " + parms.param2+ " "  + parms.param3 + " "  + parms.param4 + " "  + parms.param5 + " "  + parms.param6+ " "  +     parms.param7+ " "  + parms.param8+ " "  + parms.param9+ " "  + parms.param10+'">> ./public/index_response.html');


     child4 = exec ('cat ./public/index_response-2.html >> ./public/index_response.html');


     child6 = exec('echo "Done"');


    child = exec('java -jar HerdManagement.jar ./public/uploads/'+ f +' /var/www/html/output-' + f + " " + parms.param + " " + parms.param2+ " "  + parms.param3 + " "  + parms.param4 + " "  + parms.param5 + " "  + parms.param6+ " "  +     parms.param7+ " "  + parms.param8+ " "  + parms.param9+ " "  + parms.param10,
          function (error, stdout, stderr){
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if(error !== null){
              console.log('exec error: ' + error);
            }
        });
     
   // var outputLink = '<a href="http://18.191.164.204/uploads/output-' + f +'">Download</a>'
    
//    var outputLink = 'sed -i \'229s/.*/ \'<a href="http://18.191.164.204/uploads/output-\''+f+'\'">Download</a>\'/' /home/ubuntu/node-express-file-form-upload-demo/public/index_response.html'


  //  var outputLink = 'sed -i \'229s/.*/this-is-the-test/\' /home/ubuntu/node-express-file-form-upload-demo/public/index_response.html'

     // child2 = exec('echo "' +outputLink+'" > outputfile.txt');

     // child3 = exec('cat ./public/index_response-1.html > ./public/index_response.html');

     // child2 = exec('echo "' +outputLink+'" >> ./public/index_response.html');

     // // child5 = exec('echo "'+ parms.param + " " + parms.param2+ " "  + parms.param3 + " "  + parms.param4 + " "  + parms.param5 + " "  + parms.param6+ " "  +     parms.param7+ " "  + parms.param8+ " "  + parms.param9+ " "  + parms.param10+'">> ./public/index_response.html');


     // child4 = exec ('cat ./public/index_response-2.html >> ./public/index_response.html');


     // child6 = exec('echo "Done"');


    //child2 = exec(outputLink);
    // child3 = exec(' curl http://169.254.169.254/latest/meta-data/public-ipv4 > temp1.txt'') 
    res.writeHead(200, { 'Content-Type': 'text/html' });


    // res.end("The Output File can be downloaded from <a href=http://18.191.166.171/uploads/>here</a>" + "The entered parameters are " + parms.param + " " + parms.param2+ " "  + parms.param3 + " "  + parms.param4 + " "  + parms.param5 + " "  + parms.param6+ " "  + parms.param7+ " "  + parms.param8+ " "  + parms.param9+ " "  + parms.param10 );
    // res.end(outputLink);
    fs.createReadStream('public/index_response.html').pipe(res);
    }
