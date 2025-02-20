
const tooglebtn = document.querySelector('.navBar__tooglebtn');
const menu = document.querySelector('.navBar__menu');

// 토글 버튼 클릭 시 메뉴의 활성화 상태를 변경
tooglebtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const level1Menu = document.querySelector('.filter-menu.level-1');
    const level2Menu = document.querySelector('.filter-menu.level-2');
    const photos = document.querySelectorAll('.photos img');
    const hoverTexts = document.querySelectorAll('.hover-text, .hover-text2'); // hover-text 요소들

    // Level 1 필터링
    level1Menu.addEventListener('click', (e) => {
        if (!e.target.matches('span')) return;

        const category = e.target.dataset.category;

        // Level 2 메뉴 표시 조건
        if (category === 'cosplay') {
            level2Menu.style.display = 'flex'; // 하위 메뉴 보이기
        } else {
            level2Menu.style.display = 'none'; // 하위 메뉴 숨기기
        }

        // Level 1 필터링 로직
        photos.forEach((photo) => {
            const photoCategory = photo.dataset.category || ""; // null 방지
            const photoHoverText = photo.nextElementSibling; // hover-text 요소 찾기
            const isCategoryMatch = category === 'all' || photoCategory.split(" ").includes(category);

            if (isCategoryMatch) {
                photo.style.display = 'block'; // 보이기
                if (photoHoverText) {
                    photoHoverText.style.display = 'block'; // 해당 사진에 hover-text 보이기
                }
            } else {
                photo.style.display = 'none'; // 숨기기
                if (photoHoverText) {
                    photoHoverText.style.display = 'none'; // 해당 사진의 hover-text 숨기기
                }
            }
        });

        // margin-bottom 업데이트
        updateMarginBottom(category);
    });

    // Level 2 필터링
    level2Menu.addEventListener('click', (e) => {
        if (!e.target.matches('span')) return;

        const subcategory = e.target.dataset.subcategory;

        photos.forEach((photo) => {
            const photoCategory = photo.dataset.category || "";
            const photoHoverText = photo.nextElementSibling; // hover-text 요소 찾기
            const isSubcategoryMatch = photoCategory.split(" ").includes(subcategory);

            if (isSubcategoryMatch) {
                photo.style.display = 'block'; // 보이기
                if (photoHoverText) {
                    photoHoverText.style.display = 'block'; // 해당 사진에 hover-text 보이기
                }
            } else {
                photo.style.display = 'none'; // 숨기기
                if (photoHoverText) {
                    photoHoverText.style.display = 'none'; // 해당 사진의 hover-text 숨기기
                }
            }
        });

        // margin-bottom 업데이트
        updateMarginBottom(subcategory);
    });
});



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



// 백엔드 주기적 호출
setInterval(() => {
    fetch('https://back-i4i2.onrender.com')
        .then(response => console.log('Pinged Render server:', response.status))
        .catch(error => console.error('Ping error:', error));
}, 600000); // 10분마다 실행

// 프론트엔드

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('confirmModal');
    const confirmButton = document.getElementById('confirmSubmit');
    const cancelButton = document.getElementById('cancelSubmit');
    const form = document.getElementById('form');

    console.log("✅ Modal:", modal);
    console.log("✅ ConfirmButton:", confirmButton);
    console.log("✅ CancelButton:", cancelButton);
    console.log("✅ Form:", form);

    if (!form) {
        console.error("❌ Form not found");
        return;
    }
    if (!modal) {
        console.error("❌ Modal not found");
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("📩 Form submitted");
        modal.classList.remove('hidden2');
    });

    if (confirmButton) {
        confirmButton.addEventListener('click', async (event) => {
            event.preventDefault();
            modal.classList.add('hidden2');
            const formData = new FormData(form);

            try {
                const response = await fetch('https://back-i4i2.onrender.com/api/submit', {
                    method: 'POST',
                    body: formData,
                });
                const responseText = await response.text();
                if (response.ok) {
                    alert('문의가 전송되었습니다!');
                    form.reset();
                } else {
                    alert(`문의 전송 실패: ${response.status}`);
                }
            } catch (error) {
                alert(`서버 연결 오류: ${error.message}`);
            }
        });
    }

    if (cancelButton) {
        cancelButton.addEventListener('click', (event) => {
            event.preventDefault();
            modal.classList.add('hidden2');
        });
    }
});