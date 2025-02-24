
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




document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages;    
  
    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazy");
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.src = image.dataset.src;
            image.classList.remove("lazy");
            imageObserver.unobserve(image);
          }
        });
      });
  
      lazyloadImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {  
      var lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll(".lazy");
      
      function lazyload () {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    
  
        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }
  
      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }
  })
  