
const tooglebtn = document.querySelector('.navBar__tooglebtn');
const menu = document.querySelector('.navBar__menu');

// 토글 버튼 클릭 시 메뉴의 활성화 상태를 변경
tooglebtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});



// 백엔드 주기적 호출
setInterval(() => {
    fetch('https://back-i4i2.onrender.com')
        .then(response => console.log('Pinged Render server:', response.status))
        .catch(error => console.error('Ping error:', error));
}, 600000); // 10분마다 실행




    document.addEventListener('DOMContentLoaded', () => {
        // 모든 이미지 요소를 클래스 상관없이 선택
        const images = document.querySelectorAll('.photo-win img, .photo-madoka img, .photos img, .photo-jing img, .photo-hanna img, .photo0nozaki img, .photo-asuka img, .photo-gallery img, .photo-mi img, .photo-noa img, .photo-tama img, .photo-a img');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src; // data-src가 있는 경우 로드
            }
            img.onerror = () => console.error(`Failed: ${img.src || img.dataset.src}`);
            img.onload = () => console.log(`Loaded: ${img.src || img.dataset.src}`);
        });
    
      
    });