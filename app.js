async function loadData() {
    try {
        const cacheBust = '?t=' + Date.now();
        const [dataRes, sourcesRes] = await Promise.all([
            fetch('data.json' + cacheBust),
            fetch('sources.json' + cacheBust)
        ]);
        const data = await dataRes.json();
        const sources = await sourcesRes.json();
        renderData(data);
        renderSources(sources);
    } catch (error) {
        console.error('加载数据失败:', error);
        document.getElementById('timelineContainer').innerHTML = 
            '<p style="color: #ff6b6b;">数据加载失败: ' + error.message + '</p>';
    }
}

function renderSources(sources) {
    const sourcesHtml = sources.newsSources.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener" class="source-link">
            ${s.icon} ${s.name}
        </a>
    `).join('');
    document.getElementById('sourcesList').innerHTML = sourcesHtml;
    
    if (sources.referenceLinks && sources.referenceLinks.length > 0) {
        const linksHtml = sources.referenceLinks.map(l => `
            <div class="ref-link">
                <a href="${l.url}" target="_blank" rel="noopener">${l.title}</a>
                <span class="source-tag">${l.source}</span>
            </div>
        `).join('');
        document.getElementById('relatedLinks').innerHTML = linksHtml;
    }
}

function renderData(data) {
    document.getElementById('updateTime').textContent = data.updateTime;
    
    // Render summary
    if (data.summary) {
        const summarySection = document.getElementById('summarySection');
        const summaryContent = document.getElementById('summaryContent');
        summaryContent.innerHTML = `
            <div class="summary-title">${data.summary.title}</div>
            <div class="summary-desc">${data.summary.description}</div>
            <a href="events/day11-update.html" class="summary-link">查看详细战报 →</a>
        `;
        summarySection.style.display = 'block';
    }
    
    if (data.status) {
        document.getElementById('alertLevel').textContent = data.status.alertLevel || '严重';
        document.getElementById('straitStatus').textContent = data.status.straitStatus || '已封锁';
        document.getElementById('oilPrice').textContent = data.status.oilPrice || '↑ 飙升中';
    }
    
    if (data.iranLeadershipStatus) {
        const leadershipHtml = data.iranLeadershipStatus.map(l => `
            <div class="leader-item ${l.status === '死亡' ? 'dead' : 'alive'}">
                <span class="leader-name">${l.name}</span>
                <span class="leader-status">${l.status === '死亡' ? '💀 死亡' : '✓ 存活'}</span>
            </div>
        `).join('');
        document.getElementById('leadershipStatus').innerHTML = leadershipHtml;
    }
    
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
    
    const usHtml = data.usActions.map(a => {
        if (typeof a === 'string') return `<li>${a}</li>`;
        return a.link 
            ? `<li><a href="${a.link}" target="_blank" rel="noopener">${a.text}</a></li>`
            : `<li>${a.text}</li>`;
    }).join('');
    document.getElementById('usActions').innerHTML = usHtml;
    
    const iranHtml = data.iranActions.map(a => {
        if (typeof a === 'string') return `<li>${a}</li>`;
        return a.link 
            ? `<li><a href="${a.link}" target="_blank" rel="noopener">${a.text}</a></li>`
            : `<li>${a.text}</li>`;
    }).join('');
    document.getElementById('iranActions').innerHTML = iranHtml;
    
    const impactHtml = data.impacts.map(i => `
        <div class="impact-item">
            <div class="label">${i.label}</div>
            <div class="value ${i.trend}">${i.value}</div>
        </div>
    `).join('');
    document.getElementById('impactGrid').innerHTML = impactHtml;
    
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
