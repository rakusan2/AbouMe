import * as https from 'https'
import * as fs from 'fs'
let auth :{key:string}, options : https.RequestOptions
const pushOfline = {
            type:'note',
            title:'Server DOWN',
            body:'Server went ofline'
} as pushPost,pushException = {
    type:'note',
    title:'Server Crashed',
    body:'Server Crashed'
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
let isReady = false,toPost = [] as {data:pushPost,callback?:Function}[];
function ready(){
    while(toPost.length > 0){
        let post = toPost.pop()
        postToServer(post.data,post.callback);
    }
    isReady = true;
}
function postToServer(data:pushPost, callback?:Function){
    let pushreq = https.request(options,(msg)=>{
            msg.on('data',(data)=>console.log({ServerMsg:JSON.parse(data)}));
            if(callback)callback();
        })
    .on('error',(err)=>{
        console.error(err);
        if(callback)callback();
    });
    pushreq.end(JSON.stringify(data),'utf8');
}
function post(data:pushPost, callback?:Function){
    if(isReady)postToServer(data,callback);
    else toPost.push({data,callback});
}
function postIP(ip:string):pushPost{
        return {
            type:'link',
            title:'Server UP',
            body:'Link to the local server',
            url:`http://${ip}:8000`

        }
}
function postDown(signal:string):pushPost{
    return {
        type:'note',
        title:'Server Down',
        body:`Server Down due to ${signal}`
    }
}
export function pushServerIP(ip){
    post(postIP(ip));
}
export function pushServerDown(signal:string,callback?:Function){
    console.log('posting down');
    post(postDown(signal),callback);
}
export function pushServerException(){
    post(pushException);
}