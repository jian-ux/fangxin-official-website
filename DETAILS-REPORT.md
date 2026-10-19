# 八项详情、已有内容与页内视频

2026-10-17。本轮覆盖八个详情页、中英俄三语，以及首页和海南影像的视频展示。用户要求减少详情单调感、尽量采用已有小程序内容、取消前台AI场景标签并在官网内观看已提供视频。继续保留海岛草本色彩、Noto字体、原始二维码与期限、小黎示例和公司公开联系。

| 页面 | 来源（相对小程序 src/，图片包除外） | 采用内容 | 页面结构 |
|---|---|---|---|
| [中医药康养](http://localhost:4173/zh/explore/wellness/) | health/routes.table.ts、既有五类主题 | 3条具体路线示意、五类主题、雨林药香影片 | 路线图文 → 主题 → 影片 → 家庭行程 |
| [中医美容](http://localhost:4173/zh/explore/beauty/) | beauty/projectDetails.table.ts、美容图片对应清单 | 6项护理内容、2条宣教影片 | 面部护理首图 → 图文项目 → 视频 → 参与流程 |
| [中医护理](http://localhost:4173/zh/explore/nursing/) | pagesNursing/db/projects.table.ts、护理图片包 | 6项护理内容、3条宣教影片 | 咨询场景 → 横向项目列表 → 流程 → 视频 |
| [药膳药饮](http://localhost:4173/zh/explore/diet/) | medicineDiet/products.table.ts、产品图片对应清单 | 保留2款准确汤饮，新增10款、2条风味影片 | 双主图 → 配料目录 → 糟粕醋影像 |
| [沉香生活](http://localhost:4173/zh/explore/incense/) | incense/products.table.ts、bff/incense.ts | 6件具体香器与香物、2条沉香影片 | 暖沙色首图 → 商品资料 → 造香与产地影像 |
| [黎苗特色](http://localhost:4173/zh/explore/limiao/) | liMiaoProjects.generated.ts、南药/医院视频包 | 6项具名技艺、3条文化影片、2条宣教影片 | 首屏纪录片 → 南药故事 → 器物 → 宣教 |
| [技能培训](http://localhost:4173/zh/explore/training/) | pagesSkillTraining/db/training.table.ts | 4个岐黄学堂方向、4类课程、2条学习参考影片 | 四个学习方向 → 课程 → 参考影像 |
| [精品推荐](http://localhost:4173/zh/explore/selection/) | 上列食材、香物、路线和培训条目 | 8项内容选读，全部跳到具名内容锚点 | 图文选读列表 → 准确下一步 |

English / Русский：将链接中的 /zh/ 换为 /en/ 或 /ru/，也可用页头语言菜单保留当前详情与锚点。

## 材料采用与边界

- 当前远端 test 分支为 f0612056fbafcb534036ff599a1d53e6ab0cb7b1，隔离只读检出于 .analysis/website-details-20261017/reference；此前 a796fd7 快照和 demo-app 均未修改。沿BFF、数据表和详情页核对13张表、734行，采用42项具名内容和3条路线；保留原有2款汤饮。
- 35张新增图片复用用户产品/美容/护理图片包及小程序沉香图片路径。图片只等比编码为WebP；没有重画人物、产品或二维码。来源图中既有AI示意图继续在内部记录真实属性；前台不再显示AI图片角标或对应替代文字，不宣称是真实机构、患者或服务照片。
- 不复制价格、销量、评价、医师合作关系、疗效保证或预约状态。推荐页“四神排骨汤”的配料与产品表不一致，本次采用产品表的淮山、莲子、茯苓、芡实、排骨。沉香p23的图片无法清楚辨认对应物品，改选p13单珠红绳手串。
- 逐条文件哈希、来源表行、采用的页面锚点、图片与视频转码参数保存在 content/material-sources.json 的 details_revision。原来源记录未覆盖。

## 视频

14条视频采用原生 controls / playsinline / preload=none，实际画面提取封面，无自动播放。7条文化/报道、7条医院宣教；原发布页链接为次级入口，未提供公开链接的医院素材按用户文件包归属标明来源。视频保持完整时长、原水印和中文原声，保留片中原有字幕，不宣称已翻译字幕。原270p影片只重封装，其他网页副本最大960×540、H.264/AAC；原始文件未变。

首屏14个视频全部readyState=0、buffered=0、paused=true，未预先加载媒体内容；点击后逐条播放、按原生进度键前进并暂停，最终14个readyState=4，时间大于零，原始页面未离站。证据 media-initial.json / media-playback.json。浏览器原生快进按影片时长调整，最初测试的固定9秒阈值不适用，已改为检查实际时间前进与解码完成；不将这次测试误判为产品播放故障。此次为播放/进度短测及代表画面检查，不等于完整审片。

用户明确授权本地预览使用。视频包原有“转载授权尚未取得”仍保存在内部来源记录；本轮没有公开部署，没有确认第三方公开传播许可。

## 改前改后

| 页面 | 桌面1440×900视口 | 手机375×900视口 |
|---|---|---|
| 中医药康养 | [改前](evidence/details-20261017/before-wellness-1440.jpg) / [改后](evidence/details-20261017/after-wellness-1440.jpg) | [改前](evidence/details-20261017/before-wellness-375.jpg) / [改后](evidence/details-20261017/after-wellness-375.jpg) |
| 中医美容 | [改前](evidence/details-20261017/before-beauty-1440.jpg) / [改后](evidence/details-20261017/after-beauty-1440.jpg) | [改前](evidence/details-20261017/before-beauty-375.jpg) / [改后](evidence/details-20261017/after-beauty-375.jpg) |
| 中医护理 | [改前](evidence/details-20261017/before-nursing-1440.jpg) / [改后](evidence/details-20261017/after-nursing-1440.jpg) | [改前](evidence/details-20261017/before-nursing-375.jpg) / [改后](evidence/details-20261017/after-nursing-375.jpg) |
| 药膳药饮 | [改前](evidence/details-20261017/before-diet-1440.jpg) / [改后](evidence/details-20261017/after-diet-1440.jpg) | [改前](evidence/details-20261017/before-diet-375.jpg) / [改后](evidence/details-20261017/after-diet-375.jpg) |
| 沉香生活 | [改前](evidence/details-20261017/before-incense-1440.jpg) / [改后](evidence/details-20261017/after-incense-1440.jpg) | [改前](evidence/details-20261017/before-incense-375.jpg) / [改后](evidence/details-20261017/after-incense-375.jpg) |
| 黎苗特色 | [改前](evidence/details-20261017/before-limiao-1440.jpg) / [改后](evidence/details-20261017/after-limiao-1440.jpg) | [改前](evidence/details-20261017/before-limiao-375.jpg) / [改后](evidence/details-20261017/after-limiao-375.jpg) |
| 技能培训 | [改前](evidence/details-20261017/before-training-1440.jpg) / [改后](evidence/details-20261017/after-training-1440.jpg) | [改前](evidence/details-20261017/before-training-375.jpg) / [改后](evidence/details-20261017/after-training-375.jpg) |
| 精品推荐 | [改前](evidence/details-20261017/before-selection-1440.jpg) / [改后](evidence/details-20261017/after-selection-1440.jpg) | [改前](evidence/details-20261017/before-selection-375.jpg) / [改后](evidence/details-20261017/after-selection-375.jpg) |

药膳、护理、黎苗另有900px前后整页：evidence/details-20261017/before-{diet,nursing,limiao}-900.jpg 与 after-*.jpg。整页高度随内容增加而变化；视口与截图像素尺寸分别记录在 screenshot-sizes.json。same-viewport-*.jpg 为等宽等高首屏对照，完整原图同时保留。八页结构合览为 eight-details-overview.jpg；手机具体内容见 diet-mobile-content.jpg / nursing-mobile-content.jpg / limiao-mobile-content.jpg。

## 验证与恢复

54个三语路由、2685个本地引用与锚点通过；视频Range与方法边界、字体字形、三语具名内容、无重复ID和前台AI图片标签通过。浏览器135个视图（八详情+七共享页面×三语×1440/900/375），无页面或正文横向溢出、缺失H1、已加载失败图片；修复了俄文手机培训卡片的长词溢出。DOM矩阵不等于所有懒加载图片逐个滚动审阅，代表性整页/手机内容截图已查看。

首页八项入口实际点击成功；六组三语桌面/手机二维码开关和焦点返回、三语手机菜单、小黎饮食示例跨语言保留与准确food-drink落点通过。原码实际下载字节匹配；有效期仍为2026-10-22上海零点前。localhost/IPv4/IPv6六项连接通过；此前IPv6连接缺陷已修复，本轮没有修改服务器或重新宣称根因修复。当前旧错误标签不代表新预览响应。

server.mjs、client.js、mini-code.js、原始二维码保持不变。源码/制品/HTTP/证据哈希见 evidence/final-baseline.json。上一轮恢复点：Git 189e4d4；.analysis/website-island-20261017/island-delivery.zip。本轮恢复包：.analysis/website-details-20261017/details-delivery.zip。

未验收：真实微信扫码与权限、实体手机/Safari、外文母语终审、用户审美认可、公共素材许可与生产发布。此次没有新增真实供给、付款、预约或实时AI能力。
