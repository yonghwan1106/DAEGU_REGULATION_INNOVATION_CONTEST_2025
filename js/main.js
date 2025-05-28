// Main JavaScript for Creator Platform Website
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 크리에이터 플랫폼 로드 완료!');
    
    // Initialize all features
    initMobileMenu();
    initDarkMode();
    initScrollToTop();
    initHeroChart();
    initSmoothScroll();
    initAnimations();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        if (darkModeToggle) darkModeToggle.innerHTML = '<span class="text-xl">☀️</span>';
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('darkMode', isDark);
            darkModeToggle.innerHTML = isDark ? '<span class="text-xl">☀️</span>' : '<span class="text-xl">🌙</span>';
        });
    }
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('hidden');
            } else {
                scrollToTopBtn.classList.add('hidden');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Hero Chart (네이버 데이터랩 트렌드) - 수정된 버전
let heroChartInstance = null; // 차트 인스턴스 저장 변수

function initHeroChart() {
    const ctx = document.getElementById('heroChart');
    if (!ctx) return;
    
    // 기존 차트가 있다면 제거
    if (heroChartInstance) {
        heroChartInstance.destroy();
        heroChartInstance = null;
    }
    
    // 네이버 데이터랩 실제 데이터 기반
    const trendData = {
        labels: ['2023-01', '2023-07', '2024-01', '2024-07', '2024-10', '2025-01', '2025-04'],
        datasets: [{
            label: '신산업 분야',
            data: [20, 25, 30, 85, 100, 90, 80],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
        }, {
            label: '취업일자리',
            data: [35, 32, 30, 28, 25, 27, 30],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4
        }]
    };
    
    // 새 차트 인스턴스 생성 및 저장
    heroChartInstance = new Chart(ctx, {
        type: 'line',
        data: trendData,
        options: {
            responsive: true,
            maintainAspectRatio: false, // 중요: 종횡비 유지하지 않음
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'white',
                        font: { size: 11 },
                        padding: 15
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { 
                        color: 'rgba(255,255,255,0.1)',
                        lineWidth: 1
                    },
                    ticks: { 
                        color: 'white',
                        font: { size: 10 },
                        stepSize: 25
                    }
                },
                x: {
                    grid: { 
                        color: 'rgba(255,255,255,0.1)',
                        lineWidth: 1
                    },
                    ticks: { 
                        color: 'white',
                        font: { size: 9 },
                        maxRotation: 45
                    }
                }
            },
            elements: {
                point: {
                    radius: 3,
                    hoverRadius: 5
                },
                line: {
                    borderWidth: 2
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Intersection Observer for Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe all card elements
    document.querySelectorAll('.card-hover').forEach(card => {
        observer.observe(card);
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg z-50 transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fadeInUp {
        animation: fadeInUp 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);

// 페이지 언로드 시 차트 정리
window.addEventListener('beforeunload', function() {
    if (heroChartInstance) {
        heroChartInstance.destroy();
        heroChartInstance = null;
    }
});