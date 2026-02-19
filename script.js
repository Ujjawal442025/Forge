// === GSAP SETUP ===
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

// === LOADER ANIMATION ===
window.addEventListener('load', () => {
    const loaderWrapper = document.getElementById('loaderWrapper');
    const revolvingGear = document.querySelector('.revolving-gear');
    const loaderTitle = document.getElementById('loaderTitle');
    const loaderTagline = document.getElementById('loaderTagline');

    const loaderTL = gsap.timeline({
        defaults: { ease: 'power3.out' }
    });

    loaderTL
        .from(revolvingGear, { scale: 0, opacity: 0, duration: 0.6 })
        .from(loaderTitle, { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
        .from(loaderTagline, { y: 10, opacity: 0, duration: 0.5 }, '-=0.3')
        .to(loaderWrapper, { 
            opacity: 0, 
            duration: 0.5,
            delay: 1.5,
            onComplete: () => {
                loaderWrapper.classList.add('hidden');
                initAnimations();
            }
        });
});

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// === MOBILE MENU ===
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// === PARTICLES ===
function createParticles() {
    const particlesBg = document.getElementById('particlesBg');
    if (!particlesBg) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const opacity = Math.random() * 0.4 + 0.1;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(37, 99, 235, ${opacity});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
        `;
        particlesBg.appendChild(particle);

        gsap.to(particle, {
            y: Math.random() * 200 - 100,
            x: Math.random() * 200 - 100,
            opacity: 0,
            duration: Math.random() * 4 + 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

createParticles();

var path = `M 50 100 Q 700 20 1350 100`

var final = `M 50 100 Q 700 20 1350 100`


var string = document.querySelector("#string")

string.addEventListener("mousemove", function(dets){
    path= `M 50 100 Q ${dets.x} ${dets.y} 1350 100`
    gsap.to("svg path",{
        attr:{d:path},
        duration:0.2,
        ease: "power3.out"
    })
})

string.addEventListener("mouseleave", function(){
    gsap.to("svg path",{
        attr:{d:final},
        duration:1.5,
        ease: "elastic.out(1,0.2)"
    })
})


// === MAIN ANIMATIONS ===
function initAnimations() {
    // Hero animations
    const titleLines = document.querySelectorAll('.title-line');
    if (titleLines.length > 0) {
        gsap.from(titleLines, {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        gsap.from(heroSubtitle, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.8,
            ease: 'power3.out'
        });
    }

    const heroButtons = document.querySelectorAll('.hero-buttons .btn-primary');
    if (heroButtons.length > 0) {
        gsap.from(heroButtons, {
            y: 50,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            delay: 1.2,
            ease: 'back.out(1.7)'
        });
    }

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        gsap.from(scrollIndicator, {
            opacity: 0,
            y: -20,
            duration: 1,
            delay: 1.8,
            ease: 'power2.out'
        });
    }

    // Section Headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Philosophy Cards
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    philosophyCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // === SCROLL DOODLE INDICATOR (MOVES UP/DOWN WITH SCROLL) ===
    initScrollDoodle();

    // Loop Cards
    const loopCards = document.querySelectorAll('.loop-card');
    loopCards.forEach((card, index) => {
        const content = card.querySelector('.loop-content');
        const visual = card.querySelector('.loop-visual');

        if (content) {
            gsap.from(content, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                x: index % 2 === 0 ? 100 : -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }

        if (visual) {
            gsap.from(visual, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0.8,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: 'back.out(1.7)'
            });
        }
    });

    // Impact Cards
    const impactCards = document.querySelectorAll('.impact-card');
    impactCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'back.out(1.7)'
        });
    });

    // CTA
    const ctaContent = document.querySelector('.cta-content');
    if (ctaContent) {
        gsap.from(ctaContent, {
            scrollTrigger: {
                trigger: ctaContent,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.9,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.5)'
        });
    }

    // Footer
    const footerContent = document.querySelector('.footer-content');
    if (footerContent) {
        gsap.from(footerContent, {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
}

// === SCROLL DOODLE INDICATOR - MOVES UP/DOWN ALONG FIXED PATH ===
function initScrollDoodle() {
    const scrollDoodle = document.getElementById('scrollDoodle');
    const scrollPath = document.getElementById('scrollPath');
    const loopSection = document.querySelector('.loop');
    
    if (!scrollDoodle || !scrollPath || !loopSection || window.innerWidth < 1200) return;

    // Use GSAP MotionPath to move indicator along the SVG path
    gsap.to(scrollDoodle, {
        motionPath: {
            path: scrollPath,
            align: scrollPath,
            alignOrigin: [0.5, 0.5],
            autoRotate: false
        },
        scrollTrigger: {
            trigger: loopSection,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5, // Smooth following
            onUpdate: (self) => {
                // Optional: Add glow effect based on progress
                const progress = self.progress;
                const scale = 1 + (Math.sin(progress * Math.PI * 8) * 0.2);
                gsap.to(scrollDoodle, {
                    scale: scale,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        }
    });
}

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            gsap.to(window, {
                scrollTo: { y: target, offsetY: 80 },
                duration: 1.2,
                ease: 'power3.inOut'
            });
        }
    });
});

// === BUTTON INTERACTIONS ===
document.querySelectorAll('.btn-primary, .cta-button, .nav-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.05, duration: 0.3 });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3 });
    });
});

// === CUSTOM CURSOR ===
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.5), transparent);
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: multiply;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.3
        });
    });

    document.querySelectorAll('a, button, .philosophy-card, .impact-card').forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 2.5, duration: 0.3 }));
        el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, duration: 0.3 }));
    });
}

//Infinity Scroll

window.addEventListener("wheel",function(dets){
    if(dets.deltaY>0){
        gsap.to(".marque",{
            transform: 'translateX(-200%)',
            duration:4,
            repeat:-1,
            ease:"none"
            
        })
        gsap.to(".marque img",{
            rotate:180
        })
    }else{
        gsap.to(".marque",{
            transform: 'translateX(0%)',
            duration:4,
            repeat:-1,
            ease:"none"
            
        })
        gsap.to(".marque img",{
            rotate:0
        })
    }
})

// === SCROLL TO TOP ===
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #2563eb;
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    z-index: 999;
    box-shadow: 0 5px 20px rgba(37, 99, 235, 0.4);
    font-weight: 900;
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        gsap.to(scrollTopBtn, { opacity: 1, pointerEvents: 'auto', duration: 0.3 });
    } else {
        gsap.to(scrollTopBtn, { opacity: 0, pointerEvents: 'none', duration: 0.3 });
    }
});

scrollTopBtn.addEventListener('click', () => {
    gsap.to(window, { scrollTo: { y: 0 }, duration: 1.5, ease: 'power3.inOut' });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    gsap.to(scrollTopBtn, { scale: 1.15, duration: 0.3 });
});

scrollTopBtn.addEventListener('mouseleave', () => {
    gsap.to(scrollTopBtn, { scale: 1, duration: 0.3 });
});

//custom cursor
var main = document.querySelector("#main")
var cursor = document.querySelector("#cursor")
main.addEventListener("mousemove",function(dets){
  gsap.to(cursor,{
    x:dets.x,
    y:dets.y,
    duration:1,
    ease:"back.out"
  })
})

console.log('🔥 FORGE - Scroll Doodle Indicator Moving Along Fixed Path!');
