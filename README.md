# 美伊冲突实时追踪

一个简洁美观的信息展示页面，用于追踪美国与伊朗冲突的最新局势。

## 部署到 GitHub Pages

### 步骤 1：创建仓库
1. 在 GitHub 创建新仓库（如 `iran-conflict-tracker`）
2. 上传所有文件

### 步骤 2：启用 GitHub Pages
1. 进入仓库 Settings → Pages
2. Source 选择 `main` 分支
3. 保存后等待部署完成

### 步骤 3：访问网站
- 地址：`https://你的用户名.github.io/iran-conflict-tracker/`

## 更新数据

只需编辑 `data.json` 文件：

```json
{
  "updateTime": "2026年3月1日 12:00 (GMT+8)",
  "timeline": [
    { "date": "2026年3月1日", "event": "新事件..." }
  ],
  ...
}
```

提交后，网页会自动显示最新内容。

## 文件说明

| 文件 | 说明 |
|------|------|
| `index.html` | 主页面 |
| `style.css` | 样式 |
| `app.js` | 逻辑（加载数据） |
| `data.json` | 数据文件（更新这个！） |
| `README.md` | 说明文档 |

## 本地预览

```bash
cd ~/clawd/iran-conflict-tracker
python3 -m http.server 8080
# 然后访问 http://localhost:8080
```

## 自动更新

网页每 5 分钟自动刷新数据。
