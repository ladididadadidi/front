
const tooglebtn = document.querySelector('.navBar__tooglebtn');
const menu = document.querySelector('.navBar__menu');

// 토글 버튼 클릭 시 메뉴의 활성화 상태를 변경
tooglebtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});





//메인페이지

const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

// 🔥 첫 번째와 마지막 슬라이드 복제
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);

slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

// 🔥 모든 슬라이드를 다시 불러옴
const allSlides = document.querySelectorAll(".slide");
let currentIndex = 1; // 첫 번째 복제된 슬라이드에서 시작
let interval;
let isTransitioning = false;

// 🌟 슬라이드 위치 업데이트 함수
function updateSlidePosition(instant = false) {
    let slideWidth = getSlideWidth();
    slider.style.transition = instant ? "none" : "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// 🌟 화면 크기별 이동 거리 계산
function getSlideWidth() {
    return window.innerWidth >= 768 ? window.innerWidth / 4 : window.innerWidth;
}

// 🌟 슬라이드 이동 함수
function moveSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    let slideWidth = getSlideWidth();
    currentIndex += 1;

    updateSlidePosition();

    setTimeout(() => {
        if (currentIndex === totalSlides + 1) {
            slider.style.transition = "none"; // 🔥 트랜지션 제거하여 깜빡임 방지
            currentIndex = 1; // 🔥 원래 A1 위치로 순간 이동
            updateSlidePosition(true);
            
            setTimeout(() => {
                slider.style.transition = "transform 0.5s ease-in-out"; // 🔥 트랜지션 복구
            }, 50);
        }
        isTransitioning = false;
    }, 500);
}

// 🌟 자동 슬라이드 시작
function startSlider() {
    interval = setInterval(moveSlide, 3000);
}

// 🌟 슬라이드 정지
function stopSlider() {
    clearInterval(interval);
}

// 🌟 초기 실행
updateSlidePosition(true);
startSlider();

// 🌟 클릭하면 슬라이드 멈춤
allSlides.forEach(slide => {
    slide.addEventListener("click", stopSlider);
});

// 🌟 창 크기 변경 시 슬라이드 위치 조정
window.addEventListener("resize", () => updateSlidePosition(true));


//타이틀
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.getElementById("title-screen").style.opacity = "0"; // 투명하게 만들기

        setTimeout(function () {
            document.getElementById("title-screen").style.display = "none"; // 완전히 숨김
            // 본문 표시
        }, 3000); // 2초 후에 display: none; 설정
    }, 2000); // 0.3초 동안 먼저 보여주기
});





// script.js
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.slider-container img');
    
    // Intersection Observer로 Lazy Loading
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    }, { rootMargin: '0px 0px 100px 0px' });

    images.forEach(img => {
        img.dataset.src = img.src; // 원본 src를 data-src로 이동
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; // placeholder
        img.classList.add('loading');
        observer.observe(img);
    });

    // 로딩 상태 관리
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
        });
    });
});