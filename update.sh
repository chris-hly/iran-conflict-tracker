#!/bin/bash

# 美伊冲突自动更新脚本
# 每小时运行一次

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

LOG_FILE="$SCRIPT_DIR/update.log"
DATA_FILE="$SCRIPT_DIR/data.json"
SEARCH_SCRIPT="/Users/fang/.openclaw/skills/zhipu-search/search.sh"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# 搜索最新消息
log "开始搜索最新消息..."
LATEST=$($SEARCH_SCRIPT "美伊冲突 2026年3月 最新进展 $(date '+%Y-%m-%d')" 2>/dev/null || echo "")

if [ -z "$LATEST" ]; then
    log "搜索失败，跳过更新"
    exit 0
fi

# 保存搜索结果
echo "$LATEST" > "$SCRIPT_DIR/.latest_search.txt"

# 获取当前时间
NOW=$(date '+%Y年%m月%d日 %H:%M (GMT+8)')

# 更新 data.json 的 updateTime
if command -v jq &> /dev/null; then
    jq --arg time "$NOW" '.updateTime = $time' "$DATA_FILE" > "$DATA_FILE.tmp" && mv "$DATA_FILE.tmp" "$DATA_FILE"
    log "已更新时间戳: $NOW"
fi

# 配置 git 使用 SSH
git config user.email "qiang.fang@huilianyi.com" 2>/dev/null || true
git config user.name "qiang.fang" 2>/dev/null || true
git remote set-url origin git@github.com:chris-hly/iran-conflict-tracker.git 2>/dev/null || true

# 提交并推送
git add .
if git diff --cached --quiet 2>/dev/null; then
    log "无更新内容"
else
    git commit -m "自动更新: $NOW" 2>/dev/null || true
    git push 2>&1 >> "$LOG_FILE" && log "已推送到 GitHub" || log "推送失败"
fi

# 清理日志
if [ -f "$LOG_FILE" ]; then
    tail -1000 "$LOG_FILE" > "$LOG_FILE.tmp" && mv "$LOG_FILE.tmp" "$LOG_FILE" 2>/dev/null || true
fi
