import * as express from 'express';
let app = express();
const siteDir = __dirname + '/docs';
app.get('/', (req, res)=>{res.sendFile(siteDir + '/index.html')});
app.use('/js',express.static(siteDir + '/js'));
app.use('/css',express.static(siteDir + '/css'));
app.listen(8000, ()=>{console.log('listening on port 8000')} );