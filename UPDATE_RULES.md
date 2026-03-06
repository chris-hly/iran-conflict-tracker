# 伊朗冲突追踪项目更新规范

## 项目地址
- GitHub: https://github.com/chris-hly/iran-conflict-tracker
- 网站: https://chris-hly.github.io/iran-conflict-tracker/

## 数据文件结构
主要数据存储在 `data.json`，包含以下字段：

```json
{
  "updateTime": "更新时间",
  "status": {
    "alertLevel": "局势等级",
    "straitStatus": "海峡状态",
    "oilPrice": "原油价格"
  },
  "timeline": [
    { "date": "日期", "event": "事件描述", "link": "新闻链接" }
  ],
  "usActions": [
    { "text": "美国动态", "link": "链接" }
  ],
  "iranActions": [
    { "text": "伊朗动态", "link": "链接" }
  ],
  "regionalActors": [
    { "name": "国家/组织", "status": "状态", "actions": "行动", "link": "链接" }
  ],
  "statements": [
    { "country": "国家", "content": "表态内容" }
  ]
}
```

## 更新步骤

### 1. 收集新闻
使用 Google News 搜索关键词：
- "Iran war 2026"
- "US Iran conflict"
- "Iran conflict latest"

### 2. 查找新闻链接
从搜索结果中提取原始新闻链接，优先选择：
- news.tvb.com
- BBC中文
- 新华社
- 央视新闻
- VOA中文
- RFI

### 3. 更新 data.json
按照时间倒序添加新事件，确保：
- 日期格式："2026年3月6日" 或 "2026年3月6日 约12:00"
- 事件描述简洁明了
- 链接指向可靠新闻源

### 4. 提交并部署
```bash
cd ~/clawd/iran-conflict-tracker
git add -A
git commit -m "更新: YYYY年M月D日最新进展"
git push
```

## 更新频率
- 每天至少更新1次
- 重大事件发生时即时更新

## 注意事项
1. 所有新增事件必须包含新闻链接
2. 链接优先使用可靠的中文/英文新闻源
3. 更新后验证 JSON 格式：`node -e "JSON.parse(require('fs').readFileSync('data.json'))"`
4. 确保 updateTime 为最新时间
