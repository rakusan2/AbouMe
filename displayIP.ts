import * as os from 'os'
let ss = new RegExp('Virtual');
export default function getIP(){
    let interF = os.networkInterfaces(),
        ip = [] as string[];
    Object.keys(interF).forEach((fKey)=>{
        if(fKey.search(ss) < 0)
        interF[fKey].forEach((iFace)=>{
            if(iFace.family === 'IPv4' && !iFace.internal) ip.push(iFace.address)
        })
    })
    return ip
}