import assert from 'node:assert/strict';

const port=process.env.PORT||4173;
for(const host of ['localhost','127.0.0.1','[::1]']){
  for(const route of ['/zh/','/zh/explore/beauty/']){
    const url=`http://${host}:${port}${route}`;
    const response=await fetch(url,{signal:AbortSignal.timeout(3000)});
    assert.equal(response.status,200,url);
    assert((await response.text()).includes('<main id="main">'),url);
    console.log(`PASS ${url}`);
  }
}
