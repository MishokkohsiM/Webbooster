const express = require('express')
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const sendMail = require('./nodemailer');

const app = express();
app.use(bodyParser.json());

const host = 'http://localhost:3000'

const RESPONSE_CODES = {
  OK: 200,
  FORBIDDEN: 403,
  NOT_AUTHORIZED: 401,
  CONFLICT: 409,
  NOT_FOUND: 404,
};
const download = 'https://drive.google.com/u/0/uc?id=1n6I1-lnmKSuS9bn-lgM0U4Y8wUSVdhrJ&export=download';

app.options('/api/*', (req, res, next) => {
  res.status(RESPONSE_CODES.OK);
  res.set('Access-Control-Allow-Origin', host);
  res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.end();
});

app.post('/api/sent-mail/', (req, res) => {
  res.set('Access-Control-Allow-Origin', host);
  res.set('Access-Control-Allow-Credentials', 'true');
  console.log(req.body);
  if(!req.body || !req.body.email || !req.body.name || !req.body.mobile || !req.body.product) {
    res.status(RESPONSE_CODES.FORBIDDEN);
    res.json({
      message: 'Wrong request body format'
    });
  } else {
    sendMail(req.body.email, req.body.name, req.body.mobile, req.body.product).catch(console.error);
    res.status(RESPONSE_CODES.OK);
    res.json( {
      message: 'OK',
    });
  }
});

app.get('/api/', (req, res) => {
  res.set('Access-Control-Allow-Origin', host);
  res.set('Access-Control-Allow-Credentials', 'true');
  async function downloadFile () {
    const result = await fetch(download, {
      method: 'GET',
      credential: 'omit',
      mode: 'cors',
    });
    const file = await result.json();
    res.status(RESPONSE_CODES.OK);
    res.json({
      file,
    })
  }
  downloadFile();
})

app.listen(8000, () => console.log('Server running on localhost:8000'));
