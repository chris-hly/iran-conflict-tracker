async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        renderData(data);
    } catch (error) {
        console.error('加载数据失败:', error);
        document.getElementById('timelineContainer').innerHTML = 
            '<p style="color: #ff6b6b;">数据加载失败，请检查 data.json 文件</p>';
    }
}

function renderData(data) {
    document.getElementById('updateTime').textContent = data.updateTime;
    
    if (data.status) {
        document.getElementById('alertLevel').textContent = data.status.alertLevel || '严重';
        document.getElementById('straitStatus').textContent = data.status.straitStatus || '已封锁';
        document.getElementById('oilPrice').textContent = data.status.oilPrice || '↑ 飙升中';
    }
    
    // 时间线（支持链接）
    const timelineHtml = data.timeline.map(item => {
        const eventText = item.link 
            ? `<a href="${item.link}" target="_blank" rel="noopener">${item.event} 🔗</a>` 
            : item.event;
        return `
            <div class="timeline-item">
                <div class="date">${item.date}</div>
                <div class="event">${eventText}</div>
            </div>
        `;
    }).join('');
    document.getElementById('timelineContainer').innerHTML = timelineHtml;
    
    // 美国动态（支持链接）
    const usHtml = data.usActions.map(a => {
        if (typeof a === 'string') return `<li>${a}</li>`;
        return a.link 
            ? `<li><a href="${a.link}" target="_blank" rel="noopener">${a.text}</a></li>`
            : `<li>${a.text}</li>`;
    }).join('');
    document.getElementById('usActions').innerHTML = usHtml;
    
    // 伊朗动态（支持链接）
    const iranHtml = data.iranActions.map(a => {
        if (typeof a === 'string') return `<li>${a}</li>`;
        return a.link 
            ? `<li><a href="${a.link}" target="_blank" rel="noopener">${a.text}</a></li>`
            : `<li>${a.text}</li>`;
    }).join('');
    document.getElementById('iranActions').innerHTML = iranHtml;
    
    // 全球影响
    const impactHtml = data.impacts.map(i => `
        <div class="impact-item">
            <div class="label">${i.label}</div>
            <div class="value ${i.trend}">${i.value}</div>
        </div>
    `).join('');
    document.getElementById('impactGrid').innerHTML = impactHtml;
    
    // 各方表态（支持链接）
    const statementsHtml = data.statements.map(s => {
        const content = s.link 
            ? `<a href="${s.link}" target="_blank" rel="noopener">${s.content}</a>`
            : s.content;
        return `
            <div class="statement">
                <div class="country">${s.country}</div>
                <div class="content">${content}</div>
            </div>
        `;
    }).join('');
    document.getElementById('statements').innerHTML = statementsHtml;
}

document.addEventListener('DOMContentLoaded', loadData);
setInterval(loadData, 5 * 60 * 1000);
