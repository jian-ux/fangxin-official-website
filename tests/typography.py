"""Check real font rendering, responsive navigation, home video and local requests."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'evidence';BASE='http://localhost:4173'
results=[]
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True)
    for lang in ['zh','en','ru']:
        context=browser.new_context(viewport={'width':1440,'height':900})
        page=context.new_page();requests=[];errors=[]
        page.on('request',lambda r:requests.append(r.url))
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto(BASE+'/'+lang+'/',wait_until='networkidle')
        page.evaluate('()=>document.fonts.ready')
        faces=page.evaluate('[...document.fonts].map(f=>({family:f.family,status:f.status,weight:f.weight,display:f.display}))')
        required={'Hainan Sans'} if lang=='zh' else {'Hainan Sans','Hainan International'}
        assert required <= {f['family'] for f in faces if f['status']=='loaded' and f['display']=='swap'}
        cdp=context.new_cdp_session(page);cdp.send('DOM.enable');cdp.send('CSS.enable')
        root=cdp.send('DOM.getDocument')['root']['nodeId'];rendered=[]
        for selector in ['h1','.focus-hero .focus-lede']:
            node=cdp.send('DOM.querySelector',{'nodeId':root,'selector':selector})['nodeId']
            fonts=cdp.send('CSS.getPlatformFontsForNode',{'nodeId':node})['fonts']
            assert fonts and all(f['isCustomFont'] for f in fonts),(lang,selector,fonts)
            rendered.append({'selector':selector,'fonts':fonts})
        assert not any('.mp4' in u for u in requests)
        assert all(u.startswith(BASE) for u in requests),requests
        initial_transfers=page.evaluate("performance.getEntriesByType('resource').reduce((n,x)=>n+x.transferSize,0)")
        for width in [375,768,1024,1440]:
            page.set_viewport_size({'width':width,'height':900});page.evaluate('scrollTo(0,0)')
            assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1')
            if width<=1100:
                page.locator('.menu-toggle').click()
                assert page.locator('#navigation').is_visible()
                for link in page.locator('#navigation a').all():
                    box=link.bounding_box();assert box['x']>=0 and box['x']+box['width']<=width+1
                page.keyboard.press('Escape')
                assert page.locator('.menu-toggle').evaluate('e=>e===document.activeElement')
            page.locator('.focus-hero a[href="#discover"]').click()
            heading=page.locator('#discover h2').bounding_box();header=page.locator('.site-header').bounding_box()
            assert heading['y']>=max(0,header['y']+header['height'])-1
        page.locator('[data-open=film]').click()
        page.wait_for_function('document.querySelector("video").readyState>=2')
        page.locator('video').evaluate('v=>v.play()')
        page.wait_for_function('document.querySelector("video").currentTime>0.25')
        page.keyboard.press('Escape')
        page.wait_for_function('!document.querySelector("#film").open&&document.querySelector("video").paused')
        assert page.locator('[data-open=film]').evaluate('e=>e===document.activeElement')
        assert not errors,errors
        results.append({'language':lang,'faces':faces,'rendered':rendered,'local_requests_only':True,'viewport_widths':[375,768,1024,1440],'resource_bytes_at_initial_load':initial_transfers,'home_video':'play, close, pause and focus passed'})
        context.close()
    context=browser.new_context(viewport={'width':375,'height':900});page=context.new_page()
    page.route('**/*.woff2',lambda r:r.abort())
    page.goto(BASE+'/ru/',wait_until='networkidle')
    assert page.locator('h1').is_visible()
    assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+1')
    page.screenshot(path=str(OUT/'font-fallback-ru-375.png'))
    context.close();browser.close()
(OUT/'typography-results.json').write_text(json.dumps({'checks':results,'font_failure_fallback':'Russian phone headline remains visible with no horizontal overflow'},ensure_ascii=False,indent=2),encoding='utf8')
print('PASS: local font files actually render Chinese, Latin and Cyrillic; 12 navigation widths; homepage video; font failure fallback')
