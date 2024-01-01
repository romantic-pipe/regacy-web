window.addEventListener("load", function() {
    Main.init()
})

function dispatchVideoEvent() {
    const videoElementArr = document.querySelectorAll('.landing__item__video')

    if (videoElementArr && videoElementArr.length > 0) {
        videoElementArr.forEach(videoElement => videoElement.addEventListener('loaddeddata',(event) => { handleLoadedData() }))
    }
}

function handleLoadedData() {
    windwow.dispatchEvent(new Event('resize'))
}

const Main = {
    initialValue: {
        blurMinPoint: 0,
        blurMaxPoint: 10,  
    },
    init: function() {
        this.initSwiper()
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 0)
    },
    initSwiper: function() {
        this.initSlide()
        this.initScroll()
        this.toggleSlideVideo()
    },
    initSlide: function() {
        const slideElementArr = document.querySelectorAll('.landing__item')
        const slideLength = slideElementArr.length
    
        if (slideElementArr && slideLength > 0) {
            slideElementArr.forEach((element, index) => {
                element.style.zIndex = slideLength - index + 2
                if (index !== 0) {
                    element.querySelector('video').pause()
                }

                if (index === 1) {
                    element.style.filter = `blur(${this.initialValue.blurMaxPoint}px)`
                }
            })
        }
    },
    initScroll: function() {        
        const slideElementArr = document.querySelectorAll('.landing__item')    
        const blurMaxPoint = 10

        let lastIndex = 0
        let lastScrollTop = 0
        
        window.addEventListener('scroll', throttle(function(event) {
            const direction = window.scrollY - lastScrollTop > 0 ? 'down' : 'up'
            const currentIndex = parseInt((window.scrollY + window.innerHeight * 0.6) / (window.innerHeight), 10)

            const currentSlide = slideElementArr[currentIndex]
            // const nextSlide = direction === 'up' ? slideElementArr[currentIndex > 0 ? currentIndex - 1 : 0] : slideElementArr[currentIndex + 1 < slideElementArr.length ? currentIndex + 1 : slideElementArr.length - 1]
            
            // console.log(currentIndex)
            // console.log(currentSlide)
            // console.log(blurMaxPoint / currentSlide.getBoundingClientRect().y)
            // nextSlide.style.filter = `blur(${blurMaxPoint / currentSlide.getBoundingClientRect().y * -0.1}px)`
            
            console.log(currentIndex)
            console.log(direction)

            // Control Blur Filter Of Slide
            if (direction === 'down') {
                // 다다음 슬라이드의 opacity 미리 조절
                
            } else {
                if (currentIndex === 0) 
                    return

                slideElementArr[currentIndex].style.filter = `blur(${blurMaxPoint}px)`

                if (currentIndex < slideElementArr.length - 1) {
                    slideElementArr[currentIndex + 1].style.opacity = 0
                }
            }
 
            lastIndex = currentIndex
            lastScrollTop = window.scrollY
        }, 100), { passive: true })
    },
    toggleSlideVideo: function() {
        const slideElementArr = document.querySelectorAll('.landing__item') 
        
        let lastIndex = 0
        window.addEventListener('scroll', throttle(function(event) {
            const currentIndex = parseInt((window.scrollY + window.innerHeight * 0.5) / (window.innerHeight), 10)
            const currentSlide = slideElementArr[currentIndex]
            
            if (currentIndex !== lastIndex) {
                slideElementArr[lastIndex]?.querySelector('video').pause()
                currentSlide?.querySelector('video').play()
            }
            
            lastIndex = currentIndex
        }, 100), { passive: true })
    },
}
