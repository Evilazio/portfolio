
const parallaxElements = document.querySelectorAll('.parallax');

document.addEventListener('scroll', (scrollEvent)=> {
    parallaxElements.forEach(element => {
        const parentRect = element.parentElement.getBoundingClientRect();
        element.style.transform = `translateY(${(parentRect.top * -1) / 2}px)`;
    })
})