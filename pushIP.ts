import * as https from 'https'
import * as fs from 'fs'
let auth :{key:string}, options : https.RequestOptions
const pushOfline = {
            type:'note',
            title:'Server DOWN',
            body:'Server went ofline'
} as pushPost;
fs.readFile(__dirname + '/auth.json','utf8',(err,data)=>{
    if(err){
        console.error(err);
    }
    else{
        auth = JSON.parse(data);
        options = {
            method:'POST',
            hostname:'api.pushbullet.com',
            path:'/v2/pushes',
            headers:{'Access-Token':auth.key,'Content-Type':'application/json'}
        };
        ready();
    }
})
interface pushPost{
    type:'note'|'link',
    title:string,
    body:string,
    url?:string,
}
let isReady = false,toPost = [] as pushPost[];
function ready(){
    while(toPost.length > 0){
        postToServer(toPost.pop());
    }
    isReady = true;
}
function postToServer(data:pushPost){
    let pushreq = https.request(options,(msg)=>{
            msg.on('data',(data)=>console.log({ServerMsg:JSON.parse(data)}));
        })
    .on('error',(err)=>{console.error(err)});
    pushreq.end(JSON.stringify(data),'utf8');
}
function post(data:pushPost){
    if(isReady)postToServer(data);
    else toPost.push(data);
}
function postIP(ip:string){
        return {
            type:'link',
            title:'Server UP',
            body:'Link to the local server',
            url:`http://${ip}:8000`

        }as pushPost
}
export function pushServerIP(ip){
    post(postIP(ip));
}