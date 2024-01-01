window.addEventListener("load", function() {
    BaseModule.init()
})

const BaseModule = {
    init: function() {
        this.scrollToTop()
        this.controlHeaderActivation()
    },
    scrollToTop: function() {
        const headerElement = document.querySelector('header')
        setTimeout(() => {
            headerElement.style.transform = 'translateY(0px)'
        }, 0)
        
        window.scrollTo(0, 0)
    },
    controlHeaderActivation: function() {
        const headerElement = document.querySelector('header')
        const headerHeight = headerElement.getBoundingClientRect().height
        const togglePoint = window.innerHeight * 0.2
        
        let lastScrollTop = 0
        let direction = 'down'
        
        window.addEventListener('scroll', 
        throttle(function() {
            let scrollTop = window.scrollY
            direction = scrollTop > lastScrollTop ? 'down' : 'up'
            
            headerElement.style.transform = (scrollTop > togglePoint) && direction === 'down' ? `translateY(-${headerHeight}px)` : "translateY(0px)"
            
            lastScrollTop = scrollTop
        }, 100), { passive: true })
    },
}