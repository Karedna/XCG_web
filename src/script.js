
// Element
const modules = document.querySelectorAll('.module-page');
const subPage = document.querySelector('.sub-page');
const whiteLine = document.querySelector('.white-line');
const scrollIndicator = document.querySelector('.scroll-indicator');
const navItems = document.querySelectorAll('.nav-item a');
const blackCircles = document.querySelectorAll('.black-circle');
const redCircles = document.querySelectorAll('.red-circle');
const indicatorVariable = document.querySelectorAll('#indicator-variable');

// const widthSub = window.getComputedStyle(subPage).width;
// console.log(widthSub);
// const widthInPx = parseFloat(widthSub);
// const viewportWidthInPx = window.innerWidth;
// const widthInVw = (widthInPx / viewportWidthInPx) * 100;
let currentOffset = 82; 
const maxOffset = 82;
const minOffset = -270;
const scrollSpeed = 15
const moduleIndex = [0, 82, 160, 200, 260, 310]

document.addEventListener('DOMContentLoaded', adjustViewForDevice);

// window.addEventListener('resize', adjustViewForDevice);

function adjustViewForDevice() {
    if (window.matchMedia("(max-width: 768px)").matches) {
        mobileView()
    }else{
        desktopView()
    }

}

function mobileView() {
    var toggleButton = document.querySelector('.mobile-nav-toggle');
    var mobileNav = document.querySelector('.mobile-navbar');
    var closeNavButton = document.createElement('div');
    // subPage.style.left = `0vw`;;
    // 创建关闭按钮并添加到移动导航栏
    closeNavButton.classList.add('mobile-nav-close');
    closeNavButton.innerHTML = '&times;'; // 使用HTML实体代表一个“关闭”字符
    mobileNav.appendChild(closeNavButton);

    // 切换移动导航栏的显示状态
    toggleButton.addEventListener('click', function() {
        mobileNav.classList.add('active');
    });

    // 点击关闭按钮隐藏移动导航栏
    closeNavButton.addEventListener('click', function() {
        mobileNav.classList.remove('active');
    });
}

function desktopView() {
    document.querySelector('.main-page').style.minWidth = '1535px';
    subPage.style.minWidth = '6943.910px';
    modules[0].style.minWidth = '72px';
    modules[1].style.minWidth = '468px'; 
    modules[2].style.minWidth = '936px'; 
    modules[3].style.minWidth = '560px';
    modules[4].style.minWidth = '1400px'; 
    document.querySelector('.footer-container').style.minWidth = '750px'
    window.addEventListener('wheel', (event) => {
        event.preventDefault();

        if (event.deltaY > 0 && currentOffset > minOffset) {
            // 向下滚动，逐步拉出副页面
            currentOffset = Math.max(currentOffset - scrollSpeed, minOffset);
        } else if (event.deltaY < 0 && currentOffset < maxOffset) {
            // 向上滚动，逐步收回副页面
            currentOffset = Math.min(currentOffset + scrollSpeed, maxOffset );
        }
        requestAnimationFrame(() => {
            subPage.style.left = `${currentOffset}vw`;
            whiteLine.style.left = `${currentOffset}vw`;
            updateActiveNavItem();
            updateIndicator()
        });
    },{ passive: false });

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            setActive(index);
            moveToPage(index);
        });
    });

    blackCircles.forEach((circle, index) => {
        circle.addEventListener('click', () => {
            setActive(index);
            moveToPage(index);
        });
    });
    scrollIndicator.addEventListener('click', () => {
        setActive(1);
        moveToPage(1);
    });
}

function updateIndicator() {
    if (currentOffset < maxOffset - 10) {
        indicatorVariable.forEach(item => item.style.opacity = '0');
        scrollIndicator.style.width = '10vw';
        whiteLine.style.width = '10vw';
    } else {
        indicatorVariable.forEach(item => item.style.opacity = '1');
        scrollIndicator.style.width = '18vw';
        whiteLine.style.width = '18vw';
    }
}


// 定义激活导航项、黑圈和红圈的函数
function setActive(index) {
    // 移除之前所有的active类
    navItems.forEach(item => item.classList.remove('active'));
    blackCircles.forEach(circle => circle.classList.remove('active'));
    redCircles.forEach(circle => circle.classList.remove('active'));
    // 为点击的元素添加active类
    if(navItems[index]){navItems[index].classList.add('active');};
    if(redCircles[index]){redCircles[index].classList.add('active');};
    if(blackCircles[index]){blackCircles[index].classList.add('active');};
}
function updateActiveNavItem() {
    if(currentOffset >= maxOffset-moduleIndex[0]){setActive(0)}
    else if(currentOffset >= maxOffset-moduleIndex[1]){setActive(1)}
    else if(currentOffset >= maxOffset-moduleIndex[2]){setActive(2)}
    else if(currentOffset >= maxOffset-moduleIndex[3]){setActive(3)}
    else if(currentOffset >= maxOffset-moduleIndex[4]){setActive(4)}
    else if(currentOffset >= maxOffset-moduleIndex[6]){setActive(5)}
    else{setActive(6)}
}

    // 定义函数以根据导航项移动副页面
function moveToPage(index) {
    currentOffset = maxOffset - (moduleIndex[index]);
    requestAnimationFrame(() => {
        subPage.style.left = `${currentOffset}vw`;
        whiteLine.style.left = `${currentOffset}vw`;
        updateIndicator()
    });
}

// Get all clickable boxes in join us
const boxes = document.querySelectorAll(".option");
// Loop through each box and add click event
boxes.forEach(function(box) {
  box.onclick = function() {
    var modalId = box.getAttribute("data-modal-target");
    var modal = document.querySelector(modalId);
    modal.style.display = "block";
  };
});
// Close modal when clicking on close button or outside of the modal
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = "none";}
  if (event.target.classList.contains('close-button')) {
    event.target.closest('.modal').style.display = "none";
  }
};

