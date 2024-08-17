

const sliders = document.querySelectorAll(".slider");

    const interval = 2800;

    const animDuration = 600;

    for (let i = 0; i < sliders.length; ++i) {
        const slider = sliders[i];
        const dots = slider.querySelector(".dots");
        const sliderImgs = slider.querySelectorAll(".img");

        let currImg = 0;
        let prevImg = sliderImgs.length - 1;
        let intrvl;
        let timeout;

        for (let i = 0; i < sliderImgs.length; ++i) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dots.appendChild(dot);
            dot.addEventListener("click", dotClick.bind(null, i), false);
        }

        const allDots = dots.querySelectorAll(".dot");
        allDots[0].classList.add("active-dot");

        sliderImgs[0].style.left = "0";
        timeout = setTimeout(() => {
            animateSlider();
            sliderImgs[0].style.left = "";
            intrvl = setInterval(animateSlider, interval);
        }, interval - animDuration);


        function animateSlider(nextImg, right) {
            if (!nextImg)
                nextImg = currImg + 1 < sliderImgs.length ? currImg + 2 : 1;

            --nextImg;
            sliderImgs[prevImg].style.animationName = "";

            if (!right) {
                sliderImgs[nextImg].style.animationName = "leftNext";
                sliderImgs[currImg].style.animationName = "leftCurr";
            }
            else {
                sliderImgs[nextImg].style.animationName = "rightNext";
                sliderImgs[currImg].style.animationName = "rightCurr";
            }

            prevImg = currImg;
            currImg = nextImg;

            currDot = allDots[currImg];
            currDot.classList.add("active-dot");
            prevDot = allDots[prevImg];
            prevDot.classList.remove("active-dot");
        }

        function dotClick(num) {
            if (num == currImg)
                return false;

            clearTimeout(timeout);
            clearInterval(intrvl);

            if (num > currImg)
                animateSlider(num + 1);
            else
                animateSlider(num + 1, true);

            intrvl = setInterval(animateSlider, interval);
        }
    }

window.addEventListener('scroll', function() {
    const header = document.getElementById('head');
    const title = document.getElementById('title');
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;


    const maxScroll = windowHeight * 2;

    // Calculate the percentage of scroll
    const scrollPercent = Math.min(scrollY / maxScroll, 1);

    // Adjust header height and title font size based on scroll percentage
    const headerHeight = 10 + (scrollPercent * (100 - 10)); // from 10vh to 100vh
    const titleFontSize = 1 + (scrollPercent * (3 - 1)); // from 1em to 3em

    // Apply styles based on scroll percentage
    header.style.height = headerHeight + 'vh';
    title.style.fontSize = titleFontSize + 'em';

    if (scrollY > maxScroll) {
        header.style.height = '10vh';
        title.style.fontSize = '2em';
    }

    if (header.style.height >= '40%') {
        header.style.opacity = '0.2';
        title.style.color = 'black';
    } else if (header.style.height <= '40%') {
        header.style.opacity = '1';
        header.padding = '1em';
        title.style.color = 'black';
        title.fontSize = '1em';
    }
});

const info = {
    heading1 : 'Who are we?',
    description1: ' "We are the on-demand clothing store of your dreams, turning dark fantasies into your daily wearables." ',
    heading2: 'Values',
    description2: ' "Sustainability, quality, inclusivity. "',
    heading3: 'Release Date',
    description3: ' "Sooner than you might think." ',
}

const heading = document.getElementById('heading');
const description = document.getElementById('description');

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
 const buttons = document.querySelectorAll('button');


function handleButtonClick(event) {
    buttons.forEach(button => {
        button.classList.remove('selected');
    });

    event.target.classList.add('selected');

    const buttonId = event.target.id;

    if (buttonId === 'btn1') {
        heading.textContent = info.heading1;
        description.textContent = info.description1;
    } else if (buttonId === 'btn2') {
        heading.textContent = info.heading2;
        description.textContent = info.description2;
    } else if (buttonId === 'btn3') {
        heading.textContent = info.heading3;
        description.textContent = info.description3;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

document.getElementById('title').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function updateVideoSource() {
    const video = document.getElementById('vid');
    const videoSource = document.getElementById('vidSource');

    if (window.innerWidth <= 900) {
        videoSource.src = 'assets/vid.mp4';
    } else {
        videoSource.src = 'assets/vid3.mp4';
    }

    video.load();
}


updateVideoSource();

window.addEventListener('resize', updateVideoSource);

const btnform = document.getElementById('formular');
btnform.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'https://forms.gle/zUqTXVAX1hahzeHr9';
})
