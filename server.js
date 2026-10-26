// Mini backend for MissionJeet (no dependencies). Run: node server.js
const http=require('http'),fs=require('fs'),path=require('path');
const PUB=path.join(__dirname,'public'),DATA=path.join(__dirname,'data');
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.svg':'image/svg+xml'};
const send=(res,code,body,type='application/json')=>{res.writeHead(code,{'Content-Type':type,'Cache-Control':'no-store'});res.end(typeof body==='string'||Buffer.isBuffer(body)?body:JSON.stringify(body));};
const read=f=>fs.existsSync(f)?fs.readFileSync(f):null;
http.createServer((req,res)=>{
  const p=decodeURIComponent(new URL(req.url,'http://x').pathname);
  if(p.startsWith('/api/')){
    if(p==='/api/auth/serverInfo')return send(res,200,read(path.join(DATA,'serverInfo.json'))||'{}');
    if(p==='/api/track-anon'||p==='/api/log')return send(res,200,{ok:true});
    // any other API: /api/foo/bar -> data/api/foo/bar.json
    const f=path.join(DATA,'api',p.slice(5).replace(/\.\./g,'')+'.json'),d=read(f);
    return d?send(res,200,d):send(res,404,{error:'missing data file',expected:path.relative(__dirname,f)});
  }
  const file=path.join(PUB,p.replace(/\.\./g,''));
  if(p!=='/'&&fs.existsSync(file)&&fs.statSync(file).isFile())return send(res,200,fs.readFileSync(file),T[path.extname(file)]||'application/octet-stream');
  send(res,200,read(path.join(PUB,'index.html')),T['.html']); // / and /study/missionjeet
}).listen(process.env.PORT||3000,()=>console.log('open http://localhost:'+(process.env.PORT||3000)+'/study/missionjeet'));
