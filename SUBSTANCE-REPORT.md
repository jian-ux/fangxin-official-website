# 八项业务内容实质修订 · 2026-10-17

用户指出“每个版块都要有内容，而不是一堆空话”。本轮把原资料中的配料、器具、工序、地点安排和课程内容放进八个详情页。摘要直接说具体特点，进一步信息用原生 details 展开；没有增加商城、预约后台或空详情路由。

当前预览：[中文首页](http://localhost:4173/zh/) · [English](http://localhost:4173/en/) · [Русский](http://localhost:4173/ru/)

## 中医药康养

[直接查看](http://localhost:4173/zh/explore/wellness/#rainforest-route) · [English](http://localhost:4173/en/explore/wellness/) · [Русский](http://localhost:4173/ru/explore/wellness/)

页面实际新增文字：

> 五指山热带雨林国家公园徒步、林间停留、雨林瑜伽与晚间草药足浴，路线围绕雨林环境展开。

原资料对照：五指山热带雨林国家公园徒步；雨林深处瑜伽冥想；五指山草药养生泡脚。

来源：[src/db/health/routes.table.ts:280](<D:/放心中医药/.analysis/website-details-20261017/reference/src/db/health/routes.table.ts:280>)，行 ID **healthRoutesTable:rainforest1**。保留五指山、三亚湾／亚龙湾、兴隆三个明确地点；每条路线能在本卡片展开上午、中午、下午、晚上的安排。删除原来导向无关黎苗或沉香总页的“查看更多”。路线是资料中的示意安排，不包装成可预订产品。

[桌面实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-wellness-desktop.jpg>) · [手机实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-wellness-mobile.jpg>)

## 中医美容

[直接查看](http://localhost:4173/zh/explore/beauty/#herbal-mask) · [English](http://localhost:4173/en/explore/beauty/) · [Русский](http://localhost:4173/ru/explore/beauty/)

页面实际新增文字：

> 七子白药膜采用七种粉料：白术、白芍、白茯苓、白芨、白蔹、白芷与珍珠粉。项目包含清洁、药膜调敷、面部按摩与保湿。

原资料对照：核心成分：白术、白芍、白茯苓、白芨、白蔹、白芷、珍珠粉。。

来源：[src/db/beauty/projectDetails.table.ts:1696](<D:/放心中医药/.analysis/website-details-20261017/reference/src/db/beauty/projectDetails.table.ts:1696>)，行 ID **beautyProjectDetailsTable:bp5_1**。六项分别说明粉料、用品、器具或护理组合。七子白与珍珠西洋参药膜有不同成分；黎药面膜、砭石美容、中式 SPA、面部刮痧有不同组成。点击可看用品与资料时长。没有继续用只有图片名称、缺少项目内容的“桃花灸”填位。

[桌面实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-beauty-desktop.jpg>) · [手机实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-beauty-mobile.jpg>)

## 中医护理

[直接查看](http://localhost:4173/zh/explore/nursing/#ear-care) · [English](http://localhost:4173/en/explore/nursing/) · [Русский](http://localhost:4173/ru/explore/nursing/)

页面实际新增文字：

> 把王不留行籽贴压在耳穴上，所用材料是籽粒与贴敷材料，作用部位集中在耳部。

原资料对照：耳穴压豆是将王不留行籽贴压于耳穴上。

来源：[src/pagesNursing/db/projects.table.ts:43](<D:/放心中医药/.analysis/website-details-20261017/reference/src/pagesNursing/db/projects.table.ts:43>)，行 ID **nursingProjectsTable:np9_1**。耳穴压豆、中药贴敷、悬空灸、雷火灸、拔罐和刮痧分别写出材料与形式。刮痧采用 feat_185 的刮板和油／乳信息；拔罐说明负压来源。新增相关影像入口；艾条与砭石灸、一般拔罐与黎药竹罐明确作为不同形式介绍。

[桌面实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-nursing-desktop.jpg>) · [手机实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-nursing-mobile.jpg>)

## 药膳药饮

[直接查看](http://localhost:4173/zh/explore/diet/#yizhi-drink) · [English](http://localhost:4173/en/explore/diet/) · [Русский](http://localhost:4173/ru/explore/diet/)

页面实际新增文字：

> 益智仁与桂圆、百合、葛根、罗汉果搭配，目录记录为瓶装草本植物饮料。

原资料对照：桂元、百合、葛根、益智仁（状元果）、罗汉果；245ml（瓶）。

来源：[src/db/medicineDiet/products.table.ts:556](<D:/放心中医药/.analysis/website-details-20261017/reference/src/db/medicineDiet/products.table.ts:556>)，行 ID **medicineProductsTable:f21**。保留十二款具名内容，按汤羹与甜品、袋装茶饮配料、传统饮品与瓶装植物饮料组织。所有条目可展开完整已列配料及目录规格。两款小黎承接内容仍保留原锚点；山兰米桂圆茶以当前 t5／f35 的“益智仁”更正旧文案的“玉米须”，中英俄示例、详情与推荐一致。

[桌面实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-diet-desktop.jpg>) · [手机实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-diet-mobile.jpg>)

## 沉香生活

[直接查看](http://localhost:4173/zh/explore/incense/#incense-sticks) · [English](http://localhost:4173/en/explore/incense/) · [Русский](http://localhost:4173/ru/explore/incense/)

页面实际新增文字：

> 沉香粉与楠木粉制成线香，配黑檀管和卧香炉，适合从书房、茶室这样的使用场景认识一整套香具。

原资料对照：礼盒包含黑檀管线香×1、黑檀卧香炉×1，选用沉香粉与楠木粉传统工艺制作。

来源：[src/db/incense/products.table.ts:18](<D:/放心中医药/.analysis/website-details-20261017/reference/src/db/incense/products.table.ts:18>)，行 ID **incenseProductsTable:p1**。线香写出原料、8 g 规格与礼盒组成；电熏套装写出香器、12 片香粉片和 6 片祥云片；手串、单珠红绳、天然沉香书签与唐马合香分别说明结构和材料。合香不冒充单一沉香原木。

[桌面实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-incense-desktop.jpg>) · [手机实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-incense-mobile.jpg>)

## 黎苗特色

[直接查看](http://localhost:4173/zh/explore/limiao/#five-element-cups) · [English](http://localhost:4173/en/explore/limiao/) · [Русский](http://localhost:4173/ru/explore/limiao/)

页面实际新增文字：

> 青、赤、黄、白、黑五色陶罐对应木、火、土、金、水的文化表达。资料记载以海南高黏性泥土掺沙砾或贝壳粉，手工塑形后高温堆烧。

原资料对照：黎陶以海南高黏性泥土掺入沙砾或贝壳粉，经手工塑形与高温堆烧而成。。

来源：[src/pagesNursing/liMiao/liMiaoProjects.generated.ts:370](<D:/放心中医药/.analysis/website-details-20261017/reference/src/pagesNursing/liMiao/liMiaoProjects.generated.ts:370>)，行 ID **liMiaoProjectSeeds:lm_80**。砭石罐写出十二瓣罐口、凸底和固定灸柱钢针；葫芦罐写出福禄寓意与波浪罐口；头疗器具写出十二根梳齿；黎陶与砭石铺灸区分材料。lm_75 砭石条目不再用“蒸”命名，也不把 M12 黎陶视频冒作同一项目。内部所有 lm_68 等 ID 修正为真实下划线形式。

[桌面实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-limiao-desktop.jpg>) · [手机实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-limiao-mobile.jpg>)

## 技能培训

[直接查看](http://localhost:4173/zh/explore/training/#gua-sha-training) · [English](http://localhost:4173/en/explore/training/) · [Русский](http://localhost:4173/ru/explore/training/)

页面实际新增文字：

> 从经络腧穴与基础手法，到“辨证—经络—刮痧—痧象”的知识框架，再到案例研讨和个案报告，三个级别的学习重点逐步变化。

原资料对照：搭建“辨证-经络-刮痧-痧象论”的知识框架；线下集中授课+中医门诊带教；3天。

来源：[src/pagesSkillTraining/db/training.table.ts:327](<D:/放心中医药/.analysis/website-details-20261017/reference/src/pagesSkillTraining/db/training.table.ts:327>)，行 ID **trainingCoursesTable:course_szy_06**。四个岐黄方向分别交代医护、大众、国际友人和文旅团体的课程内容、对象、形式与学时。刮痧、拔罐、耳穴课程展开后能比较初中高级；香珠兴趣班写出选材到串珠的实际工序及半天约三学时。没有编造开课日期、名额、教师或证书承诺。

[桌面实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-training-desktop.jpg>) · [手机实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-training-mobile.jpg>)

## 精品推荐

[直接查看](http://localhost:4173/zh/explore/selection/#business-content) · [English](http://localhost:4173/en/explore/selection/) · [Русский](http://localhost:4173/ru/explore/selection/)

页面实际新增文字：

> 对沉香好奇，又偏爱阅读器物，天然沉香书签把材料与阅读用途直接连接起来。

原资料对照：沉香书签。

来源：[src/db/incense/products.table.ts:575](<D:/放心中医药/.analysis/website-details-20261017/reference/src/db/incense/products.table.ts:575>)，行 ID **incenseProductsTable:p14**。八个选读分别有食材、用途、器物结构、路线活动或学习工序上的理由。书签落到天然沉香书签，单珠红绳落到对应结构，雨林推荐落到五指山行程，手作推荐落到香珠课程；没有销量、疗效或服务质量排名。

[桌面实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-selection-desktop.jpg>) · [手机实图](<D:/放心中医药/official-website/evidence/substance-20261017/zh-selection-mobile.jpg>)

## 内容和交互核验

- 源仓库保持只读：test 提交 `f0612056fbafcb534036ff599a1d53e6ab0cb7b1`。本轮采用的 53 个源行逐个解析为真实表名和 ID，涉及 8 份原文件，SHA-256 与已核对抽取一致。逐条字段与原文保存在 `content/material-sources.json` 的 `substance_revision`。此前错误的无下划线 ID 仅作为已被取代的历史记录保留。
- 中文、英文、俄文采用相同的条目、配料、规格、课程级别与路线时段。翻译做了逐项内容对应，尚无母语审校签署。
- 54 个页面、2694 个本地引用与锚点通过；回归检查会在共享渲染器丢失详情字段、路线仍跳到无关页面、旧茶饮成分回流时失败。
- 浏览器核验 1440、900、375 三种宽度下八项详情共 72 个视图，以及首页和小黎 18 个视图。所有详情用实际点击展开；无横向溢出、已加载破图或重复主标题。配料更正后重跑药膳、首页和小黎 27 个受影响视图。截图是代表性视口，DOM 检查不等于每一张懒加载图片都已滚入屏幕。
- 首页八入口实点、三语 24 次推荐跳转及键盘展开、6 个相关影像入口、3 次小黎跨语言饮食承接、6 组二维码弹窗与焦点返回、3 组手机菜单均已实际操作。
- 14 条视频初始为暂停、零缓冲；保留原生按需播放。头疗与沉香技艺两条代表影片完成播放、快进、暂停短测，未声称整片审阅。全部视频文件、交互脚本和服务脚本与上一恢复点字节一致，14 条 Range 响应通过。
- 原二维码实际下载后核对字节一致，截止时间仍为 2026-10-22 上海时间零点之前。微信真实扫码、体验权限与实体设备仍未验收。
- 字体覆盖 1090 个字符，两套字体合计 315316 bytes。实际源码、制品、HTTP 与证据哈希统一见 `evidence/final-baseline.json`。

## 恢复和范围

上一完整恢复点为 Git `e4d55f5`，以及 `.analysis/website-details-20261017/details-delivery.zip`。本轮独立恢复包位于 `.analysis/website-substance-20261017/substance-delivery.zip`。项目 Canon 按保留旧来源锁、输出 pending、核验相关条目、更新记录、最后原子替换来源锁的顺序更新。八处已有 demo-app 来源差异保留，不作为本轮验收通过。

本轮为本机预览；未部署，未修改参考仓库或 demo-app。医疗功效、现货、销量、合作身份、课程履约和证书承诺未从原始营销文案搬入页面。此前的视频公共转载许可、用户视觉验收与外文终审仍待各自确认。
