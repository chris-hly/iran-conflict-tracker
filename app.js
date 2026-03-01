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
    
    const timelineHtml = data.timeline.map(item => `
        <div class="timeline-item">
            <div class="date">${item.date}</div>
            <div class="event">${item.event}</div>
        </div>
    `).join('');
    document.getElementById('timelineContainer').innerHTML = timelineHtml;
    
    document.getElementById('usActions').innerHTML = data.usActions.map(a => `<li>${a}</li>`).join('');
    document.getElementById('iranActions').innerHTML = data.iranActions.map(a => `<li>${a}</li>`).join('');
    
    const impactHtml = data.impacts.map(i => `
        <div class="impact-item">
            <div class="label">${i.label}</div>
            <div class="value ${i.trend}">${i.value}</div>
        </div>
    `).join('');
    document.getElementById('impactGrid').innerHTML = impactHtml;
    
    const statementsHtml = data.statements.map(s => `
        <div class="statement">
            <div class="country">${s.country}</div>
            <div class="content">${s.content}</div>
        </div>
    `).join('');
    document.getElementById('statements').innerHTML = statementsHtml;
}

document.addEventListener('DOMContentLoaded', loadData);
setInterval(loadData, 5 * 60 * 1000);
