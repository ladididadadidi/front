
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



const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, { rootMargin: '0px 0px 100px 0px' });