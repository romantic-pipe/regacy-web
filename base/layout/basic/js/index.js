window.addEventListener("load", function() {
    BaseModule.init()
})

const BaseModule = {
    init: function() {
        this.controlHeaderActivation()
    },
    controlHeaderActivation: function() {
        const headerElement = document.querySelector('header')
        const headerHeight = headerElement.getBoundingClientRect().height
        const togglePoint = window.innerHeight * 0.5
        
        let lastScrollTop = 0
        let direction = 'down'
        
        window.addEventListener('scroll', function() {
            let scrollTop = window.scrollY
            direction = scrollTop > lastScrollTop ? 'down' : 'up'
            
            headerElement.style.transform = (scrollTop > togglePoint) && direction === 'down' ? `translateY(-${headerHeight}px)` : "translateY(0px)"
            
            lastScrollTop = scrollTop
        })
    },
}