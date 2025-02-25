
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


images[0].src = images[0].dataset.src; // 첫 이미지 즉시 로드
    setInterval(nextSlide, 3000);
    updateSlide();




