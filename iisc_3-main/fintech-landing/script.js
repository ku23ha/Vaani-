document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.scroll-fade');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Add slight parallax effect to floating widgets based on mouse movement
    const heroSection = document.querySelector('.hero');
    const widgets = document.querySelectorAll('.floating-widget');

    if (heroSection && widgets.length > 0) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            
            widgets.forEach(widget => {
                const isWidget1 = widget.classList.contains('w-1');
                const xMovement = isWidget1 ? xAxis : -xAxis * 0.8;
                const yMovement = isWidget1 ? yAxis : -yAxis * 0.8;
                
                widget.style.transform = `translate(${xMovement}px, ${yMovement}px)`;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            widgets.forEach(widget => {
                widget.style.transform = `translate(0px, 0px)`;
            });
        });
    }

    // Interactive chart animation
    const chartBars = document.querySelectorAll('.bar');
    if (chartBars.length > 0) {
        setTimeout(() => {
            chartBars.forEach(bar => {
                const currentHeight = bar.style.height;
                const heightVal = parseInt(currentHeight);
                const newHeight = heightVal + (Math.random() * 10 - 5);
                bar.style.height = `${Math.max(10, Math.min(100, newHeight))}%`;
            });
        }, 1000);
    }
});
