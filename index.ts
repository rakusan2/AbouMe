import * as express from 'express';
import getIp from './displayIP'
import * as pushIP from './pushIP'
import * as gulp from './gulpfile'
let app = express();
let ip = getIp();
const siteDir = __dirname + '/docs';
app.get('/', (req, res)=>{res.sendFile(siteDir + '/index.html')});
app.use('/js',express.static(siteDir + '/js'));
app.use('/css',express.static(siteDir + '/css'));
app.listen(8000, ()=>{
    for(let i = 0; i<ip.length;i++){
        console.log(`listening on ${ip[i]}:8000`);
        pushIP.pushServerIP(ip[i])
    }
});