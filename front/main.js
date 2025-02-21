
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