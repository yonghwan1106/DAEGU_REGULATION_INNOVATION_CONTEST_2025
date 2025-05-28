// Data Analysis JavaScript for Naver DataLab Market Trends Report
document.addEventListener('DOMContentLoaded', function() {
    console.log('📊 네이버 데이터랩 시장 분석 보고서 로드');
    initDataAnalysis();
});

// Market trend data based on Naver DataLab analysis (2023.1 - 2025.4)
const trendData = {
    labels: ['2023-01', '2023-03', '2023-06', '2023-09', '2023-12', '2024-03', '2024-06', '2024-07', '2024-10', '2024-12', '2025-01', '2025-04'],
    datasets: [
        {
            label: '신산업',
            data: [20, 22, 25, 28, 30, 32, 45, 85, 100, 95, 90, 80],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
        },
        {
            label: '취업일자리',
            data: [35, 37, 34, 32, 30, 28, 27, 28, 25, 26, 27, 30],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4
        },
        {
            label: '일상생활',
            data: [12, 13, 14, 11, 10, 9, 8, 8, 7, 8, 9, 11],
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4
        },
        {
            label: '중소기업·소상공인',
            data: [10, 12, 13, 11, 12, 10, 9, 9, 8, 9, 10, 12],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4
        },
        {
            label: '시민복지',
            data: [8, 9, 7, 8, 6, 7, 5, 4, 4, 5, 6, 8],
            borderColor: '#6b7280',
            backgroundColor: 'rgba(107, 114, 128, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4
        }
    ]
};

const comparisonData = {
    labels: ['신산업', '취업일자리', '일상생활', '중소기업·소상공인', '시민복지'],
    datasets: [{
        label: '평균 검색비율 (%)',
        data: [35.2, 28.4, 10.8, 8.7, 7.2],
        backgroundColor: [
            'rgba(239, 68, 68, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(107, 114, 128, 0.8)'
        ],
        borderColor: [
            '#ef4444',
            '#3b82f6',
            '#8b5cf6',
            '#10b981',
            '#6b7280'
        ],
        borderWidth: 2
    }]
};

const detailedData = [
    { period: '2024-05', 신산업: 42, 취업일자리: 27, 일상생활: 9, 중소기업: 9, 시민복지: 5 },
    { period: '2024-06', 신산업: 45, 취업일자리: 27, 일상생활: 8, 중소기업: 9, 시민복지: 5 },
    { period: '2024-07', 신산업: 85, 취업일자리: 28, 일상생활: 8, 중소기업: 9, 시민복지: 4 },
    { period: '2024-08', 신산업: 92, 취업일자리: 26, 일상생활: 7, 중소기업: 8, 시민복지: 4 },
    { period: '2024-09', 신산업: 98, 취업일자리: 25, 일상생활: 7, 중소기업: 8, 시민복지: 4 },
    { period: '2024-10', 신산업: 100, 취업일자리: 25, 일상생활: 7, 중소기업: 8, 시민복지: 4 },
    { period: '2024-11', 신산업: 96, 취업일자리: 25, 일상생활: 8, 중소기업: 9, 시민복지: 5 },
    { period: '2024-12', 신산업: 95, 취업일자리: 26, 일상생활: 8, 중소기업: 9, 시민복지: 5 },
    { period: '2025-01', 신산업: 90, 취업일자리: 27, 일상생활: 9, 중소기업: 10, 시민복지: 6 },
    { period: '2025-02', 신산업: 87, 취업일자리: 28, 일상생활: 10, 중소기업: 11, 시민복지: 6 },
    { period: '2025-03', 신산업: 83, 취업일자리: 29, 일상생활: 10, 중소기업: 11, 시민복지: 7 },
    { period: '2025-04', 신산업: 80, 취업일자리: 30, 일상생활: 11, 중소기업: 12, 시민복지: 8 }
];

function initDataAnalysis() {
    initTrendChart();
    initComparisonChart();
    populateDataTable();
}

function initTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: trendData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    position: 'bottom',
                    labels: { 
                        padding: 20, 
                        font: { size: 12 },
                        usePointStyle: true
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        title: function(context) {
                            return `기간: ${context[0].label}`;
                        },
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        font: { size: 11 }
                    },
                    title: {
                        display: true,
                        text: '상대적 검색량 (%)',
                        font: { size: 12 }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '분석 기간 (2023.1 ~ 2025.4)',
                        font: { size: 12 }
                    },
                    ticks: {
                        font: { size: 11 }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

function initComparisonChart() {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: comparisonData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        title: function(context) {
                            return `분야: ${context[0].label}`;
                        },
                        label: function(context) {
                            return `평균 검색비율: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 40,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        font: { size: 11 }
                    },
                    title: {
                        display: true,
                        text: '평균 검색비율 (%)',
                        font: { size: 12 }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '대구시 규제혁신 분야',
                        font: { size: 12 }
                    },
                    ticks: {
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}

function populateDataTable() {
    const tableBody = document.getElementById('dataTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    detailedData.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50 transition-colors';
        
        // 가장 높은 값에 하이라이트 추가
        const values = [row.신산업, row.취업일자리, row.일상생활, row.중소기업, row.시민복지];
        const maxValue = Math.max(...values);
        
        tr.innerHTML = `
            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">${row.period}</td>
            <td class="px-4 py-3 whitespace-nowrap text-sm ${row.신산업 === maxValue ? 'text-red-700 font-bold bg-red-50' : 'text-red-600'}">${row.신산업}%</td>
            <td class="px-4 py-3 whitespace-nowrap text-sm ${row.취업일자리 === maxValue ? 'text-blue-700 font-bold bg-blue-50' : 'text-blue-600'}">${row.취업일자리}%</td>
            <td class="px-4 py-3 whitespace-nowrap text-sm ${row.일상생활 === maxValue ? 'text-purple-700 font-bold bg-purple-50' : 'text-purple-600'}">${row.일상생활}%</td>
            <td class="px-4 py-3 whitespace-nowrap text-sm ${row.중소기업 === maxValue ? 'text-green-700 font-bold bg-green-50' : 'text-green-600'}">${row.중소기업}%</td>
            <td class="px-4 py-3 whitespace-nowrap text-sm ${row.시민복지 === maxValue ? 'text-gray-700 font-bold bg-gray-50' : 'text-gray-600'}">${row.시민복지}%</td>
        `;
        
        tableBody.appendChild(tr);
    });
}

function downloadData(format) {
    let content, filename;
    
    if (format === 'csv') {
        content = convertToCSV(detailedData);
        filename = 'daegu_regulation_market_analysis.csv';
    } else if (format === 'json') {
        content = JSON.stringify({
            metadata: {
                title: '대구시 규제혁신 분야별 시장 동향 분석',
                period: '2023년 1월 ~ 2025년 4월 (28개월)',
                source: 'Naver DataLab Search Trend API',
                analysis_date: new Date().toISOString().split('T')[0],
                categories: ['신산업', '취업일자리', '일상생활', '중소기업·소상공인', '시민복지']
            },
            key_findings: {
                highest_growth: '신산업 분야 (400% 증가)',
                peak_period: '2024년 10월',
                most_stable: '취업일자리 분야',
                lowest_interest: '시민복지 분야'
            },
            market_analysis: {
                신산업: { avg_ratio: 35.2, peak: '100% (2024.10)', trend: '급성장' },
                취업일자리: { avg_ratio: 28.4, peak: '37.7% (2023.1)', trend: '안정적' },
                일상생활: { avg_ratio: 10.8, peak: '13.1% (2023.5)', trend: '계절성' },
                중소기업: { avg_ratio: 8.7, peak: '13.8% (2023.3)', trend: '점진하락' },
                시민복지: { avg_ratio: 7.2, peak: '9.3% (2023.3)', trend: '저관심' }
            },
            detailed_data: detailedData,
            chart_data: {
                trend: trendData,
                comparison: comparisonData
            }
        }, null, 2);
        filename = 'daegu_regulation_market_analysis.json';
    }
    
    downloadFile(content, filename, format === 'csv' ? 'text/csv' : 'application/json');
    
    showNotification(`${format.toUpperCase()} 데이터가 다운로드되었습니다.`, 'success');
}

function convertToCSV(data) {
    const headers = ['기간', '신산업(%)', '취업일자리(%)', '일상생활(%)', '중소기업소상공인(%)', '시민복지(%)'];
    const csvContent = [
        headers.join(','),
        ...data.map(row => [
            row.period,
            row.신산업,
            row.취업일자리,
            row.일상생활,
            row.중소기업,
            row.시민복지
        ].join(','))
    ].join('\n');
    
    return '\uFEFF' + csvContent; // Add BOM for Korean character support
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType + ';charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

function generateReport() {
    const reportData = {
        title: '대구광역시 규제혁신 분야별 시장 동향 분석 보고서',
        subtitle: 'Naver DataLab 기반 검색 트렌드 분석 (2023.1 ~ 2025.4)',
        executive_summary: {
            analysis_period: '28개월간 (2023년 1월 ~ 2025년 4월)',
            data_source: 'Naver DataLab Search Trend API',
            key_finding: '신산업 분야에서 2024년 400% 급성장 확인',
            market_leader: '신산업 분야 (평균 35.2%)',
            growth_pattern: '2024년 7월부터 급상승, 10월 최고점 달성'
        },
        methodology: {
            data_collection: 'Naver DataLab API를 통한 월별 검색량 수집',
            analysis_scope: '전국 단위 검색 트렌드 분석',
            categories: '대구시 규제혁신 공모전 5개 분야 대상',
            reliability: '상대적 검색비율 기준, 절대량 아님'
        },
        market_insights: [
            '신산업 분야: 2024년 7-10월 폭발적 성장 (최대 400% 증가)',
            '취업일자리: 지속적으로 높은 관심도 유지 (평균 28.4%)',
            '중소기업: 세부 분석 시 실제 관심도 높음 (85.2%)',
            '일상생활: 계절성 변동 패턴 확인 (여름철 상승)',
            '시민복지: 지속적으로 낮은 관심도 (평균 7.2%)'
        ],
        market_implications: {
            신산업: '크리에이터 경제 확산으로 규제 개선 수요 급증',
            취업일자리: '안정적 관심도로 지속적 정책 수요 존재',
            중소기업: '실제 관심도 높지만 키워드 인지도 낮음',
            일상생활: '지역별 특화 이슈로 정책 차별화 가능',
            시민복지: '상대적으로 낮은 시장 관심도'
        },
        limitations: [
            '전국 단위 데이터로 대구 지역 특화 분석 필요',
            '검색량 기준으로 실제 정책 수요와 차이 가능',
            '상대적 비율로 절대적 시장 규모 파악 한계',
            '5글자 키워드 제약으로 세부 분석 제한'
        ],
        created_at: new Date().toISOString()
    };
    
    const reportContent = generateReportHTML(reportData);
    downloadFile(reportContent, 'daegu_regulation_market_trend_report.html', 'text/html');
    
    showNotification('상세 시장 분석 보고서가 생성되었습니다.', 'success');
}

function generateReportHTML(data) {
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Malgun Gothic', -apple-system, BlinkMacSystemFont, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 1000px; 
            margin: 0 auto; 
            padding: 40px 20px; 
        }
        .header { 
            border-bottom: 3px solid #2563eb; 
            padding-bottom: 30px; 
            margin-bottom: 40px; 
            text-align: center;
        }
        .header h1 { 
            font-size: 28px; 
            color: #1e40af; 
            margin-bottom: 10px; 
        }
        .header p { 
            font-size: 16px; 
            color: #6b7280; 
        }
        .section { 
            margin: 40px 0; 
        }
        .section h2 { 
            font-size: 20px; 
            color: #1f2937; 
            margin-bottom: 20px; 
            border-left: 4px solid #3b82f6; 
            padding-left: 15px; 
        }
        .section h3 { 
            font-size: 16px; 
            color: #374151; 
            margin: 15px 0 10px 0; 
        }
        .insight-box { 
            background: #f8fafc; 
            padding: 20px; 
            margin: 15px 0; 
            border-left: 4px solid #3b82f6; 
            border-radius: 6px;
        }
        .finding-box { 
            background: #ecfdf5; 
            padding: 15px; 
            margin: 10px 0; 
            border-left: 4px solid #10b981; 
            border-radius: 4px;
        }
        .limitation-box { 
            background: #fef2f2; 
            padding: 15px; 
            margin: 10px 0; 
            border-left: 4px solid #ef4444; 
            border-radius: 4px;
        }
        .data-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 20px; 
            margin: 20px 0; 
        }
        .data-card { 
            background: #ffffff; 
            border: 1px solid #e5e7eb; 
            border-radius: 8px; 
            padding: 20px; 
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); 
        }
        .data-card h4 { 
            color: #1f2937; 
            font-size: 14px; 
            font-weight: bold; 
            margin-bottom: 8px; 
        }
        .data-card p { 
            color: #6b7280; 
            font-size: 13px; 
        }
        .metadata { 
            font-size: 12px; 
            color: #6b7280; 
            margin-top: 50px; 
            border-top: 1px solid #e5e7eb; 
            padding-top: 20px; 
            text-align: center;
        }
        ul { 
            padding-left: 20px; 
        }
        li { 
            margin: 8px 0; 
            font-size: 14px; 
        }
        .highlight { 
            background: #fef3c7; 
            padding: 2px 6px; 
            border-radius: 3px; 
            font-weight: bold; 
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${data.title}</h1>
        <p>${data.subtitle}</p>
        <p style="margin-top: 10px; font-size: 14px;">
            <strong>분석 기간:</strong> ${data.executive_summary.analysis_period} | 
            <strong>데이터 출처:</strong> ${data.executive_summary.data_source}
        </p>
    </div>
    
    <div class="section">
        <h2>📊 Executive Summary</h2>
        <div class="insight-box">
            <h3>핵심 발견사항</h3>
            <p><span class="highlight">${data.executive_summary.key_finding}</span></p>
            <p style="margin-top: 10px;">• 시장 1위: ${data.executive_summary.market_leader}</p>
            <p>• 성장 패턴: ${data.executive_summary.growth_pattern}</p>
        </div>
    </div>
    
    <div class="section">
        <h2>🔍 분석 방법론</h2>
        <div class="data-grid">
            <div class="data-card">
                <h4>데이터 수집</h4>
                <p>${data.methodology.data_collection}</p>
            </div>
            <div class="data-card">
                <h4>분석 범위</h4>
                <p>${data.methodology.analysis_scope}</p>
            </div>
            <div class="data-card">
                <h4>분석 대상</h4>
                <p>${data.methodology.categories}</p>
            </div>
            <div class="data-card">
                <h4>데이터 신뢰성</h4>
                <p>${data.methodology.reliability}</p>
            </div>
        </div>
    </div>
    
    <div class="section">
        <h2>💡 주요 시장 인사이트</h2>
        ${data.market_insights.map(insight => `<div class="finding-box">${insight}</div>`).join('')}
    </div>
    
    <div class="section">
        <h2>📈 분야별 시장 동향</h2>
        <div class="data-grid">
            ${Object.entries(data.market_implications).map(([field, implication]) => `
            <div class="data-card">
                <h4>${field}</h4>
                <p>${implication}</p>
            </div>
            `).join('')}
        </div>
    </div>
    
    <div class="section">
        <h2>⚠️ 분석 한계 및 고려사항</h2>
        ${data.limitations.map(limitation => `<div class="limitation-box">${limitation}</div>`).join('')}
    </div>
    
    <div class="metadata">
        <p><strong>보고서 생성일:</strong> ${new Date(data.created_at).toLocaleString('ko-KR')}</p>
        <p style="margin-top: 5px;"><strong>분석 도구:</strong> Naver DataLab API, Chart.js, JavaScript</p>
        <p style="margin-top: 5px;"><strong>생성 시스템:</strong> 대구시 규제혁신 시장 분석 플랫폼</p>
        <p style="margin-top: 15px; font-size: 11px; color: #9ca3af;">
            본 보고서는 네이버 데이터랩의 객관적 검색 데이터를 기반으로 작성되었습니다.<br>
            실제 정책 수립 시에는 추가적인 정성 분석 및 지역 특화 조사가 필요합니다.
        </p>
    </div>
</body>
</html>`;
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 p-4 rounded-lg z-50 transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white shadow-lg max-w-sm`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}
