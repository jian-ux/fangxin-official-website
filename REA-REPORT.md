# REA 小范围试用记录

2026-10-13，在独立分析目录安装并实际运行 `rea-agents@6.4.0`。结论：适合把浏览器观察整理成可追溯的结构、脚本和请求证据；本次没有发现普通浏览器无法观察的界面能力，也没有必要把 REA 加进官网运行依赖。

## 实际执行

- 阅读 [REA browser guide](https://rea.tools/guides/browser/)、[官方仓库](https://github.com/morluto/rea)和[安装说明](https://github.com/morluto/rea/blob/main/docs/installation.md)。用 npm 查询实际发布版本后固定为 6.4.0；指南旧示例中的参数与当前 CLI 不完全相同，以本机 `--help` 为准。
- 安装目录：`D:\放心中医药\.analysis\rea-website-20261013`。本地 npm 安装使用 `--ignore-scripts`；没有运行全局 setup、修改 Codex 配置或安装本机二进制分析工具。官网仍无 npm 运行依赖。
- 为本次试用启动独立、无登录的 Chromium，CDP 仅监听 `127.0.0.1:9224`。仅分析公开的同仁堂健康首页，未连接用户日常浏览器。完成后关闭该浏览器。
- 实际调用 `list-browser-targets`，再调用 `inspect-web-page`，观察窗口为 10 秒，启用无障碍文字和同源公开脚本来源。完整命令保存于分析目录的 `command.json`，可复现脚本为 `trial.py`。
- 首次在抓取时刷新页面，遇到 `Debugger.getScriptSource: No script for id: 4`。第二次保持文档稳定、只滚动页面后成功，未把首次失败隐藏为成功。

```powershell
node .\node_modules\rea-agents\scripts\rea.mjs list-browser-targets http://127.0.0.1:9224 --format json
node .\node_modules\rea-agents\scripts\rea.mjs inspect-web-page http://127.0.0.1:9224 <实际 targetId> --observation-ms 10000 --include-accessibility-text --include-script-sources --format json
```

## 增加了什么证据

| 普通页面观察 | REA 这次补充 |
|---|---|
| 页面滚动 900px 后，导航仍在顶部。 | DOM 共 1770 个节点；取得 11 份脚本记录和结构化无障碍信息。 |
| 导航在滚动后有外观变化。 | 捕获的 `common.js` 含滚动后切换 `index-header2` 的逻辑，并提供脚本 SHA-256。它证明样式状态切换，不能单凭这段代码推断定位方式。 |
| 滚动时出现图标。 | 在附加后的观察窗口中记录 2 个 PNG 请求，来源可追溯到同源 `common.css`。这不是整页加载的完整网络记录。 |

成功输出是 `stable-inspection.json`，证据 ID 为 `ev_151d2ff8541c2877c2ab15c6da55502269a1e09f819396055484d7e491a46ccf`。精简结果在 `evidence/rea-summary.json`。完整第三方脚本、临时浏览器目录和 REA 安装保留在本地分析目录，不放进网站或网站交付包。

结果标记 `policy_filtered / attach_limited`：默认同源限制过滤了跨域资源；网络事件只覆盖附加后的窗口。未读取 Cookie、存储值或响应正文。不能由这次观察推断参考站的全部接口、后台系统或技术架构。已有 DevTools/CDP 也能取得同类信息，REA 的实际价值是统一输出与证据留存。

## 官网采用的改动与检查

只借鉴长页面保持导航可用的做法：宽度超过 900px 时采用原生 CSS `position: sticky`，并为锚点滚动预留导航高度。手机布局保持原来的阅读顺序，没有复制参考站 jQuery、轮播、Logo 或图片。

- 修改前可恢复源码：`work/pre-rea-source.zip`；修改前哈希：`evidence/pre-rea-baseline.json`。
- 对比截图：`evidence/navigation-before-1440.png` 与 `evidence/zh-navigation-after-1440.png`，两张均为首页滚动至 900px。
- 修改后完整重跑三语 × 3 个视口 × 9 个主要页面，共 81 个布局检查；语言切换、弹窗、视频、键盘交互通过，无控制台错误。
- 额外检查 1024px 三语导航换行、锚点留白与语言切换，通过。结果在 `evidence/navigation-results.json`；手机导航仍不固定。

预览：[中文首页](http://localhost:4173/zh/)。后续没有复杂前端行为排查需求时，直接浏览与原有测试已经足够，不默认启用 REA。
