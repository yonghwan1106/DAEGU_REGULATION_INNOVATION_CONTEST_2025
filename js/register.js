// Registration Simulation JavaScript
let currentStep = 1;
const totalSteps = 4;
let formData = {};

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 사업자등록 시뮬레이션 시작!');
    initRegistration();
});

function initRegistration() {
    // Initialize step navigation
    document.getElementById('nextBtn').addEventListener('click', nextStep);
    document.getElementById('prevBtn').addEventListener('click', prevStep);
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize platform selection
    initPlatformSelection();
    
    // Initialize real-time preview
    initPreview();
    
    // Show first step
    showStep(1);
}

function showStep(step) {
    // Hide all step contents
    for (let i = 1; i <= totalSteps; i++) {
        const stepContent = document.getElementById(`stepContent${i}`);
        if (stepContent) {
            stepContent.classList.add('hidden');
        }
    }
    
    // Show current step content
    const currentStepContent = document.getElementById(`stepContent${step}`);
    if (currentStepContent) {
        currentStepContent.classList.remove('hidden');
    }
    
    // Update progress indicators
    updateProgressIndicators(step);
    
    // Update navigation buttons
    updateNavigationButtons(step);
    
    // Update current step display
    document.getElementById('currentStep').textContent = step;
    
    currentStep = step;
}

function updateProgressIndicators(step) {
    for (let i = 1; i <= totalSteps; i++) {
        const stepIndicator = document.getElementById(`step${i}`);
        const progressBar = document.getElementById(`progress${i}`);
        
        if (stepIndicator) {
            stepIndicator.classList.remove('step-active', 'step-completed', 'step-pending');
            
            if (i < step) {
                stepIndicator.classList.add('step-completed');
                stepIndicator.innerHTML = '✓';
            } else if (i === step) {
                stepIndicator.classList.add('step-active');
                stepIndicator.innerHTML = i;
            } else {
                stepIndicator.classList.add('step-pending');
                stepIndicator.innerHTML = i;
            }
        }
        
        if (progressBar) {
            const progress = i <= step ? (i / totalSteps) * 100 : 0;
            progressBar.style.width = `${progress}%`;
        }
    }
}

function updateNavigationButtons(step) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Previous button
    if (step === 1) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }
    
    // Next button
    if (step === totalSteps) {
        nextBtn.textContent = '완료하기 🎉';
        nextBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        nextBtn.classList.add('bg-green-600', 'hover:bg-green-700');
    } else {
        nextBtn.textContent = '다음단계 →';
        nextBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
        nextBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
    }
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            showStep(currentStep + 1);
            
            // Special handling for specific steps
            if (currentStep === 2) {
                updatePlatformInfo();
            } else if (currentStep === 3) {
                updateBusinessRecommendation();
            }
        } else {
            completeRegistration();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            return validateBasicInfo();
        case 2:
            return validatePlatformSelection();
        case 3:
            return validateBusinessType();
        default:
            return true;
    }
}

function validateBasicInfo() {
    const name = document.getElementById('userName').value.trim();
    const birth = document.getElementById('userBirth').value;
    const address = document.getElementById('userAddress').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    
    if (!name || !birth || !address || !email || !phone) {
        showNotification('모든 필수 정보를 입력해주세요.', 'error');
        return false;
    }
    
    // Store form data
    formData.basicInfo = { name, birth, address, email, phone };
    return true;
}

function validatePlatformSelection() {
    const selectedPlatforms = document.querySelectorAll('.platform-card input[type="checkbox"]:checked');
    
    if (selectedPlatforms.length === 0) {
        showNotification('최소 1개 이상의 플랫폼을 선택해주세요.', 'error');
        return false;
    }
    
    // Store selected platforms
    formData.platforms = Array.from(selectedPlatforms).map(checkbox => checkbox.id.replace('platform-', ''));
    return true;
}

function validateBusinessType() {
    const selectedType = document.querySelector('input[name="businessType"]:checked');
    
    if (!selectedType) {
        // Auto-select recommended type
        formData.businessType = 'recommended';
    } else {
        formData.businessType = selectedType.value;
    }
    
    return true;
}

function initFormValidation() {
    // Real-time validation for basic info
    const inputs = ['userName', 'userBirth', 'userAddress', 'userEmail', 'userPhone'];
    
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', updatePreview);
            input.addEventListener('blur', validateInput);
        }
    });
}

function validateInput(event) {
    const input = event.target;
    const value = input.value.trim();
    
    // Remove existing validation classes
    input.classList.remove('border-red-500', 'border-green-500');
    
    if (value) {
        // Basic validation
        let isValid = true;
        
        if (input.type === 'email') {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        } else if (input.type === 'tel') {
            isValid = /^010-\d{4}-\d{4}$/.test(value);
        }
        
        input.classList.add(isValid ? 'border-green-500' : 'border-red-500');
    }
}

function initPlatformSelection() {
    const platformCards = document.querySelectorAll('.platform-card');
    
    platformCards.forEach(card => {
        card.addEventListener('click', function() {
            const checkbox = card.querySelector('input[type="checkbox"]');
            const checkmark = card.querySelector('.checkmark');
            
            checkbox.checked = !checkbox.checked;
            
            if (checkbox.checked) {
                card.classList.add('ring-2', 'ring-blue-500', 'bg-blue-50');
                checkmark.classList.remove('hidden');
            } else {
                card.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-50');
                checkmark.classList.add('hidden');
            }
        });
    });
}

function updatePlatformInfo() {
    const selectedPlatforms = document.querySelectorAll('.platform-card input[type="checkbox"]:checked');
    const platformInfo = document.getElementById('platformInfo');
    const selectedPlatformsDiv = document.getElementById('selectedPlatforms');
    
    if (selectedPlatforms.length > 0) {
        platformInfo.classList.remove('hidden');
        
        const platformData = {
            youtube: { name: 'YouTube', revenue: '200만원', subscribers: '1만명' },
            instagram: { name: 'Instagram', revenue: '150만원', followers: '5천명' },
            naver: { name: 'Naver Blog', revenue: '100만원', visitors: '2만명' },
            kakao: { name: 'Kakao Story', revenue: '80만원', views: '1만회' }
        };
        
        selectedPlatformsDiv.innerHTML = '';
        
        selectedPlatforms.forEach(checkbox => {
            const platform = checkbox.id.replace('platform-', '');
            const data = platformData[platform];
            
            if (data) {
                const div = document.createElement('div');
                div.className = 'flex justify-between items-center text-sm';
                div.innerHTML = `
                    <span class="font-medium">${data.name}</span>
                    <span class="text-blue-700">예상 월수익: ${data.revenue}</span>
                `;
                selectedPlatformsDiv.appendChild(div);
            }
        });
    } else {
        platformInfo.classList.add('hidden');
    }
}

function updateBusinessRecommendation() {
    const platforms = formData.platforms || [];
    let recommendedBusiness = '정보서비스업 > 인터넷 동영상 및 방송 프로그램 제작업';
    
    if (platforms.includes('youtube')) {
        recommendedBusiness = '정보서비스업 > 인터넷 동영상 및 방송 프로그램 제작업';
    } else if (platforms.includes('instagram')) {
        recommendedBusiness = '정보서비스업 > 디지털 콘텐츠 제작 및 배급업';
    } else if (platforms.includes('naver')) {
        recommendedBusiness = '출판업 > 온라인 출판 및 정보 제공업';
    }
    
    document.getElementById('recommendedBusiness').innerHTML = `
        <h5 class="font-semibold text-gray-900">${recommendedBusiness}</h5>
        <p class="text-sm text-gray-600 mt-1">선택한 플랫폼 활동에 최적화된 업종입니다</p>
        <div class="mt-3 text-sm">
            <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">세율 우대</span>
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">간편세무</span>
        </div>
    `;
}

function initPreview() {
    // Initialize preview with empty data
    updatePreview();
}

function updatePreview() {
    const name = document.getElementById('userName')?.value || '-';
    const address = document.getElementById('userAddress')?.value || '-';
    
    document.getElementById('previewName').textContent = name;
    document.getElementById('previewAddress').textContent = address.length > 20 ? address.substring(0, 20) + '...' : address;
    
    // Update business type in preview
    if (currentStep >= 3) {
        document.getElementById('previewBusiness').textContent = '인터넷 동영상 제작업';
    }
}

function completeRegistration() {
    // Store completion time
    formData.completionTime = new Date().toISOString();
    
    // Save to localStorage for demo purposes
    localStorage.setItem('registrationData', JSON.stringify(formData));
    
    // Show completion step
    showStep(4);
    
    // Celebrate!
    setTimeout(() => {
        showNotification('축하합니다! 사업자등록이 완료되었습니다! 🎉', 'success');
    }, 500);
    
    // Track completion (demo analytics)
    console.log('등록 완료:', formData);
}

function restartSimulation() {
    // Reset form data
    formData = {};
    
    // Clear form inputs
    document.querySelectorAll('input').forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
    
    // Reset platform cards
    document.querySelectorAll('.platform-card').forEach(card => {
        card.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-50');
        const checkmark = card.querySelector('.checkmark');
        if (checkmark) checkmark.classList.add('hidden');
    });
    
    // Hide platform info
    document.getElementById('platformInfo').classList.add('hidden');
    
    // Reset preview
    document.getElementById('previewName').textContent = '-';
    document.getElementById('previewAddress').textContent = '-';
    document.getElementById('previewBusiness').textContent = '미선택';
    
    // Go back to step 1
    showStep(1);
    
    showNotification('새로운 시뮬레이션을 시작합니다!', 'info');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg z-50 transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white shadow-lg`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('translate-y-0'), 10);
    
    // Animate out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}