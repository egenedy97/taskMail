const express = require('express');
const chalk = require('chalk');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const compression = require('compression');
const multer = require('multer');
const mailing = require('./routes/mail')
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  });
  let upload = multer({ dest: 'uploads/' })




app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 4000);
app.use(compression());
// app.use(logger('dev'));
app.use(cors());

app.use(express.json()) ; 
app.use('/' , mailing)
app.post('/upload', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.originalname);
      res.send(file.originalname);
  })

if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorHandler());
  } else {
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).send('Server Error');
    });
  }
  
 
  
  app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });
  
  module.exports = app;
  

  