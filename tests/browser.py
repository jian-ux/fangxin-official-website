"""Run against the preview: python tests/browser.py. Uses installed Playwright."""
from playwright.sync_api import sync_playwright
from pathlib import Path
import json, sys

ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / 'evidence'
EVIDENCE.mkdir(exist_ok=True)
BASE = 'http://localhost:4173'
errors, checks = [], []

def ready(page):
    # Decode before screenshots; load offscreen images for full-page evidence.
    page.locator('img').evaluate_all("imgs=>imgs.forEach(i=>i.loading='eager')")
    page.evaluate("async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))}")

with sync_playwright() as pw:
    browser = pw.chromium.launch(headless=True)
    page = browser.new_page()
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('console', lambda msg: errors.append(msg.text) if msg.type == 'error' else None)
    for language in ([] if '--interactions' in sys.argv else ['zh','en','ru']):
        for width in [375,768,1440]:
            page.set_viewport_size({'width':width,'height':900})
            for route in ['', 'explore/', 'explore/diet/', 'xiaoli/', 'hainan/', 'news/', 'news/li-herbal-documentary/', 'about/', 'partners/']:
                target = f'/{language}/{route}'
                response = page.goto(BASE+target,wait_until='networkidle')
                assert response.status == 200, target
                ready(page)
                overflow = page.evaluate('document.documentElement.scrollWidth > innerWidth + 1')
                assert not overflow, f'Horizontal overflow: {width} {target}'
                assert page.locator('h1').count() == 1
                broken = page.locator('img').evaluate_all('imgs=>imgs.filter(i=>!i.naturalWidth).map(i=>i.src)')
                assert not broken, (target, broken)
                assert page.locator('html').get_attribute('lang') == {'zh':'zh-CN','en':'en','ru':'ru'}[language]
                checks.append(f'{width} {target}')
                if route == '' and width in [375,1440]:
                    page.screenshot(path=str(EVIDENCE/f'{language}-home-{width}.png'),full_page=True)
                    page.screenshot(path=str(EVIDENCE/f'{language}-hero-{width}.png'))
                    page.evaluate('scrollTo(0,900)')
                    header_y = page.locator('.site-header').bounding_box()['y']
                    assert abs(header_y) < 1 if width > 900 else header_y < 0
                    page.screenshot(path=str(EVIDENCE/f'{language}-navigation-after-{width}.png'))
            print(f'Layout PASS: {language} {width}',flush=True)
        page.goto(BASE+f'/{language}/explore/diet/',wait_until='networkidle')
        other={'zh':'en','en':'ru','ru':'zh'}[language]
        page.locator('[data-language]').select_option(f'/{other}/explore/diet/')
        page.wait_for_url(f'**/{other}/explore/diet/')
        page.reload(wait_until='networkidle')
        assert page.locator('html').get_attribute('lang') == {'zh':'zh-CN','en':'en','ru':'ru'}[other]
    page.set_viewport_size({'width':375,'height':812})
    page.goto(BASE+'/ru/',wait_until='networkidle')
    page.locator('.menu-toggle').click()
    assert page.locator('#navigation').is_visible()
    page.keyboard.press('Escape')
    assert page.locator('.menu-toggle').evaluate('e=>e===document.activeElement')
    assert not page.locator('#navigation').is_visible()
    page.locator('.focus-hero [data-open="mini"]').click()
    assert page.locator('#mini').is_visible()
    for _ in range(12):
        page.keyboard.press('Tab')
        assert page.evaluate('document.activeElement.closest("#mini")!==null')
    page.screenshot(path=str(EVIDENCE/'ru-mini-dialog-375.png'))
    page.keyboard.press('Escape')
    assert not page.locator('#mini').is_visible()
    assert page.locator('.focus-hero [data-open="mini"]').evaluate('e=>e===document.activeElement')
    page.goto(BASE+'/zh/xiaoli/',wait_until='networkidle')
    requests=[]
    page.on('request',lambda request: requests.append(request.url))
    assert not page.locator('video').get_attribute('src')
    page.locator('[data-open="film"]').click()
    page.wait_for_function('document.querySelector("video").readyState>=2')
    page.locator('video').evaluate('v=>v.play()')
    page.wait_for_function('document.querySelector("video").currentTime>0.25')
    page.locator('video').evaluate('v=>v.pause()')
    assert page.locator('video').evaluate('v=>v.paused')
    page.locator('video').evaluate('v=>v.play()')
    page.keyboard.press('Escape')
    page.wait_for_function('!document.querySelector("#film").open && document.querySelector("video").paused')
    assert page.locator('video').evaluate('v=>v.paused')
    page.locator('[data-open="film"]').click()
    page.locator('video').evaluate('v=>v.dispatchEvent(new Event("error"))')
    assert page.locator('.video-error').is_visible()
    page.locator('[data-retry]').click()
    page.wait_for_function('document.querySelector("video").readyState>=2')
    page.keyboard.press('Escape')
    page.goto(BASE+'/ru/explore/diet/',wait_until='networkidle');ready(page)
    page.screenshot(path=str(EVIDENCE/'ru-business-375.png'),full_page=True)
    page.emulate_media(reduced_motion='reduce')
    assert page.evaluate('matchMedia("(prefers-reduced-motion: reduce)").matches')
    assert page.locator('.detail-hero img').evaluate('e=>getComputedStyle(e).transitionDuration') == '0s'
    page.set_viewport_size({'width':1440,'height':1000})
    page.goto(BASE+'/zh/explore/wellness/',wait_until='networkidle');ready(page)
    page.screenshot(path=str(EVIDENCE/'zh-business-1440.png'),full_page=True)
    page.locator('.focus-well-next [data-open="mini"]').click()
    page.screenshot(path=str(EVIDENCE/'zh-mini-dialog-1440.png'))
    qr_checks=[]
    site=json.loads((ROOT/'content/site.json').read_text(encoding='utf8'))
    if site['miniCode']:
        for language in ['zh','en','ru']:
            for width in [375,1440]:
                page.set_viewport_size({'width':width,'height':900})
                page.goto(BASE+f'/{language}/',wait_until='networkidle');ready(page)
                page.locator('.focus-hero [data-open="mini"]').click()
                if page.locator('#mini [data-mini-expired]').is_visible():
                    assert not page.locator('#mini .mini-code').is_visible()
                    page.keyboard.press('Escape')
                    qr_checks.append(f'{language} {width}: expired code hidden; update contact shown')
                    continue
                code=page.locator('#mini .mini-code')
                assert code.get_attribute('src') == site['miniCode']
                metrics=code.evaluate('e=>({w:e.width,h:e.height,nw:e.naturalWidth,nh:e.naturalHeight})')
                assert metrics['nw'] and abs(metrics['w']/metrics['h']-metrics['nw']/metrics['nh'])<.01
                assert not page.locator('#mini .mini-pending').count()
                assert page.locator('#mini').get_attribute('data-expires-at') == site['miniCodeValidBefore']
                box=code.bounding_box()
                assert box['x']>=0 and box['x']+box['width']<=width and box['y']>=0 and box['y']+box['height']<=900
                with page.expect_popup() as popup:
                    page.locator('#mini a[target="_blank"]').click()
                full=popup.value;full.wait_for_load_state()
                assert full.url == BASE+site['miniCode']
                full.close();page.bring_to_front()
                page.screenshot(path=str(EVIDENCE/f'{language}-mini-code-{width}.png'))
                page.keyboard.press('Escape')
                page.wait_for_function('!document.querySelector("#mini").open')
                assert page.locator('.focus-hero [data-open="mini"]').evaluate('e=>e===document.activeElement')
                qr_checks.append(f'{language} {width}: image ratio, visibility, expiry text, original image link, close and focus passed')
    assert not errors, errors
    report={'layout_checks':checks,'console_errors':errors,'interactions':['language preserves page','direct visit and reload','mobile menu Escape and focus','dialog Tab trap, Escape and focus restoration','video lazy load, play, pause, close and error recovery','reduced motion'],'qr':{'display_checks':qr_checks,'wechat_scan':'Not tested with a real WeChat account'},'browser':'Chromium headless'}
    report_name='interaction-results.json' if '--interactions' in sys.argv else 'browser-results.json'
    (EVIDENCE/report_name).write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    browser.close()
    print(f'PASS: {len(checks)} layout views; interactions; no console errors. QR remains unverified.',flush=True)
