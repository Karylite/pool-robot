# KARYLITE Pool Robotics — 网站交付文档

> 版本：2026-11 ｜ 纯静态站点 ｜ 9 种语言 ｜ 117 个本地化页面 ｜ 自带内容后台

---

## 1. 交付内容

| 项目 | 说明 |
|---|---|
| 站点程序 | 117 个 HTML 页面 + CSS/JS/图片/视频，无需数据库、无需服务器端运行时 |
| 语种 | 英语、西班牙语、法语、德语、意大利语、葡萄牙语、俄语、阿拉伯语、日语（不含中文） |
| 产品 | 10 个型号，分 4 个系列：无线（5）、有线（2）、虹吸（2）、水面（1） |
| 图片 | 画册实拍压缩图 40 张、AI 细节渲染图 6 张、品牌图 15 张（logo / favicon / PWA / 分享图） |
| 视频 | 3 段 5 秒 720p 无声循环：首屏、爬墙、水线 |
| 后台 | `/admin/` 浏览器端内容控制台，可改文案、参数、图片，并直接提交到 GitHub |
| 体积 | 整包约 12 MB，压缩包约 10 MB |

**当前联系方式（已生效）**

- 邮箱：`info@karylite.com`
- 电话 / WhatsApp：`+86 182 7493 8671`（wa.me 使用 `8618274938671`）

---

## 2. 五分钟上线（GitHub Pages，免费且全球可访问）

1. 在 GitHub 新建仓库，例如 `pool-robotics`，可见性选 **Public**。
2. 把本项目**根目录下的全部文件**上传到仓库根目录（不要多套一层文件夹）。
   - 网页端：`Add file` → `Upload files` → 拖入全部文件 → `Commit changes`
   - 命令行：
     ```bash
     git init
     git add .
     git commit -m "KARYLITE pool robotics site"
     git branch -M main
     git remote add origin https://github.com/<你的账号>/pool-robotics.git
     git push -u origin main
     ```
3. 仓库 → `Settings` → `Pages` → Source 选 **Deploy from a branch** → Branch `main`、目录 `/ (root)` → `Save`。
4. 等待 30–90 秒，访问 `https://<你的账号>.github.io/pool-robotics/`。

首页会按浏览器语言自动跳转，也可以手动选语种。全站使用相对路径，放在仓库子目录（project site）或自定义域名根目录都能正常运行。

> 若仓库名不叫 `pool-robotics`，请同步修改 `data/site.json` 里的 `brand.domain`（见第 4 节），否则 canonical、hreflang、sitemap 里的地址会与实际不符。

---

## 3. 自定义域名（可选）

1. `Settings` → `Pages` → `Custom domain` 填入域名，保存；建议勾选 `Enforce HTTPS`。
2. 在域名服务商处添加 CNAME 记录指向 `<你的账号>.github.io`。
3. 修改 `data/site.json`：

   ```json
   "domain": "https://www.你的域名.com"
   ```

4. 重新构建并提交：

   ```bash
   python tools/build.py
   ```

   canonical、hreflang、og:url、sitemap 会一起更新。
5. 同步修改 `robots.txt` 最后一行的 Sitemap 地址。

---

## 4. 需要你确认或替换的信息

| 位置 | 字段 | 当前值 | 状态 |
|---|---|---|---|
| `data/site.json` → `brand` | `email` | `info@karylite.com` | 已填 |
| 同上 | `phone` | `+86 182 7493 8671` | 已填 |
| 同上 | `whatsapp` | `8618274938671` | 已填 |
| 同上 | `addressLine` | 古镇灯饰产业园示例地址 | **待替换为真实地址** |
| 同上 | `socials` 四项 | `instagram.com/karylite` 等 | **待替换为真实账号** |
| 同上 | `domain` | `https://karylite.github.io/pool-robotics` | **按实际仓库/域名修改** |
| `admin/admin.js` | `PASS_HASH` | 默认密码 `karylite2026` | **建议更换** |

社媒链接留空会自动隐藏对应图标，不会出现死链。

---

## 5. 管理后台

访问 `https://你的域名/admin/`，默认密码：`karylite2026`。

### 可以修改的内容

- **品牌与联系方式**：公司名、邮箱、电话、WhatsApp、地址、社媒链接
- **首页文案**：9 种语言分别编辑（Hero 标题、各区块标题与正文、CTA 按钮文案）
- **产品**：10 个型号的名称、图片、全部技术参数、描述、标签
- **技术模块**：6 个能力模块的标题与说明
- **服务与 OEM**：售后条目、OEM/ODM 文案
- **媒体库**：浏览站点全部图片与视频路径，便于复制引用
- **发布**：配置 GitHub Token 后一键提交

左上角切换语言后，编辑的是该语种文案；产品参数为各语言共用。

### 发布机制

站点是纯静态的，内容存放在两个数据源：

| 文件 | 内容 |
|---|---|
| `data/site.json` | 品牌、产品、参数、图片路径、技术模块 |
| `data/i18n/<lang>.json` | 每个语种的全部文案 |

后台「Publish」会把这两个文件提交到 GitHub，**文案和参数立即生效**，不需要重新构建。

只有**结构性改动**才需要重新生成页面：

```bash
python tools/build.py
```

然后把新生成的 `<lang>/products/...`、`<lang>/legal/` 一起提交。

### 配置 GitHub Token

1. GitHub → `Settings` → `Developer settings` → `Personal access tokens` → `Fine-grained tokens`
2. 仅勾选目标仓库，权限给 **Contents: Read and write**
3. 在后台「Publish」页填入 owner / repo / branch / token，保存在浏览器本地

### 修改后台密码

```bash
python -c "import hashlib;print(hashlib.sha256(b'你的新密码').hexdigest())"
```

把输出替换 `admin/admin.js` 顶部的 `PASS_HASH` 值。

> 后台是浏览器端静态控制台，密码用于阻止误入，不是真正的身份认证；写权限来自你本机的 Token。若需多人协作，建议把 `/admin/` 放到 Cloudflare Access 或 Netlify Identity 之后。

---

## 6. 本地预览

```bash
cd karylite-pool-site
python -m http.server 8080
```

打开 `http://localhost:8080`。必须通过 HTTP 服务访问，直接双击 HTML 会因浏览器安全策略导致 `fetch` 读取 JSON 失败。

预览未发布的改动：在地址后加 `?preview=1`，页面会优先读取后台草稿（localStorage）。

---

## 7. 目录结构

```
.
├── index.html              语言网关（按浏览器语言自动跳转）
├── 404.html
├── en/ es/ fr/ de/ it/ pt/ ru/ ar/ ja/
│   ├── index.html          首页
│   ├── legal/index.html    隐私政策 + 使用条款（含 #privacy / #terms 锚点）
│   └── products/
│       ├── index.html      产品总览
│       └── <model>/        型号详情页（10 个）
├── admin/                  内容控制台（noindex，不进 sitemap）
│   ├── index.html
│   ├── admin.css
│   └── admin.js
├── data/
│   ├── site.json           站点与产品数据
│   ├── media.json          媒体清单（构建时生成）
│   └── i18n/*.json         9 个语种文案
├── assets/
│   ├── css/site.css        设计系统、响应式、RTL
│   ├── js/site.js          导航、灯箱、视频、表单
│   ├── js/cms.js           从 JSON 回填内容（支持预览）
│   ├── img/products/       画册实拍图
│   ├── img/renders/        AI 细节渲染图
│   ├── img/brand/          logo、favicon、PWA 图标、分享图
│   └── video/              3 段视频（hero / wall-climb / waterline）
├── tools/build.py          静态站点生成器
├── sitemap.xml             117 条，含全部语种 alternate
├── robots.txt
└── manifest.webmanifest
```

---

## 8. 内容维护

### 改文案

后台直接改，或编辑 `data/i18n/<lang>.json` 后重新构建。英文 `en.json` 是母版，其余语种键名一一对应。

### 新增产品型号

1. 在 `data/site.json` 的 `products` 数组里追加一条（复制现有型号改 `id`、`name`、`specs`、`image`）。
2. 把 `id` 加进 `categories` 里对应系列的 `products` 列表。
3. 在 9 个 `data/i18n/*.json` 的 `products.<id>` 下补 `tagline` 与 `desc`。
4. 运行 `python tools/build.py`，提交新生成的 `<lang>/products/<id>/` 目录。

### 更换图片 / 视频

直接覆盖 `assets/img/...` 或 `assets/video/...` 下的同名文件即可，无需改代码。建议：

- 产品图 4:3，宽 1600px 以内，JPEG 质量 80
- 渲染图 1600×1200
- 视频 H.264 MP4，1280×720，无声，循环友好，单条 3 MB 以内

### 修改法务条款

编辑 `data/i18n/<lang>.json` 的 `legal` 段，然后运行构建。公司主体、注册地址、适用法律建议由你的法务确认后再上线。

---

## 9. 技术说明

**SEO**

- 每页独立 `<title>`、`description`、`canonical`
- 页内 `hreflang` 覆盖 9 语种 + `x-default`
- `sitemap.xml` 117 条，每条带全部语种 alternate；`robots.txt` 指向 sitemap 并屏蔽 `/admin/`
- 首页注入 Organization 结构化数据，产品页注入 Product
- 后台页面 `noindex,nofollow`

**性能**

- 图片全部 `loading="lazy"` + 固定宽高比，避免布局抖动
- 视频 `preload="none"`/`metadata`，进入视口才播放，并尊重 `prefers-reduced-motion`
- 无框架、无打包步骤，首屏只有一份 CSS 与两份 defer 脚本

**多语言与 RTL**

- 阿拉伯语页面 `dir="rtl"`，CSS 使用逻辑属性（`margin-inline`、`inset-inline`）
- 数字与规格参数强制 `dir="ltr"`，避免出现 `m²,200` 这类反向显示

**兼容性**

- 现代浏览器（Chrome / Edge / Safari / Firefox 最近两个大版本）
- 移动端抽屉导航、横向滚动表格、`<details>` 语言菜单均可用

---

## 10. 常见问题

**发布后页面没变化？**
GitHub Pages 有 30–90 秒构建延迟，且有 CDN 缓存。强制刷新（Ctrl/Cmd + Shift + R）或用无痕窗口验证。

**后台 Publish 报 401 / 403？**
Token 过期或权限不足。重新生成 fine-grained token，确认勾选了目标仓库与 `Contents: Read and write`。

**后台改了文案，线上没变？**
检查 Publish 是否成功提交到正确的 repo 和 branch；再确认浏览器加载的是新 `data/i18n/*.json`（可加 `?v=2` 强刷）。

**产品页 404？**
新增型号后忘记运行 `tools/build.py`，或生成目录没有一起提交。

**图片不显示？**
路径大小写敏感（GitHub Pages 区分大小写）。确认引用路径与实际文件名完全一致。

**能直接用中文吗？**
本版按要求不含中文。若要增加语种：在 `site.json` 的 `languages` 里加一项，补一份 `data/i18n/<code>.json`，运行构建即可。

---

## 11. 素材与版权

- 产品实拍图来自 `泳池机器人画册.pdf`，已按网页尺寸压缩。
- Logo 由画册高清页抠底重制，输出透明 PNG + favicon 全套。
- 6 张细节渲染图与 3 段视频为 AI 生成，产品外形参照画册型号，用于补充画册缺失的场景镜头；有实拍素材后建议直接替换同名文件。
- 站点代码可用于 KARYLITE 商业项目；产品图片与品牌标识版权归品牌方所有。

---

## 12. 上线检查清单

- [ ] 仓库已创建，文件在根目录（`index.html` 与 `en/` 同级）
- [ ] `Settings → Pages` 已开启，访问首页能自动跳转
- [ ] `brand.domain` 与实际地址一致，已重新构建
- [ ] 邮箱、电话、WhatsApp、地址已核对
- [ ] 四个社媒链接已换成真实账号
- [ ] 后台密码已更换
- [ ] 9 个语种各抽查一个页面（含阿语 RTL）
- [ ] 随便点一个产品页，规格表与图片正常
- [ ] 提交 `sitemap.xml` 到 Google Search Console / Bing Webmaster
