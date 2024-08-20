document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Navbar animation
        const nav = document.querySelector('nav');
        if (nav) {
            gsap.from(nav, {
                y: '-100%',
                duration: 1,
                ease: 'power3.out'
            });
        }

        // Home section animation
        const homeContent = document.querySelector('#home .home-content');
        if (homeContent) {
            gsap.from(homeContent, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            });
        }

        // About section animation
        const aboutContent = document.querySelector('#about .about-content');
        if (aboutContent) {
            gsap.from(aboutContent, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top 80%'
                }
            });
        }

        // Projects animation
        const projects = document.querySelectorAll('.project-card');
        if (projects.length) {
            gsap.from(projects, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '#projects',
                    start: 'top 80%'
                }
            });
        }

        // Contact form animation
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            gsap.from(contactForm, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: '#contact',
                    start: 'top 80%'
                }
            });
        }
    }

    // Lazy loading for project images
    const lazyLoadImages = () => {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        const imgs = document.querySelectorAll('img.lazy');
        imgs.forEach(img => imageObserver.observe(img));
    };

    lazyLoadImages();

    // Dark/light mode toggle
    const toggleTheme = () => {
        const body = document.body;
        body.classList.toggle('light-mode');
        const isDarkMode = !body.classList.contains('light-mode');
        localStorage.setItem('darkMode', isDarkMode);
    };

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'false') {
        document.body.classList.add('light-mode');
    }

    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Project filtering
    const tabButtons = document.querySelectorAll('.tab-button');
    const projectCards = document.querySelectorAll('.project-card');
  
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Function to show custom notifications
    function showNotification(type, message) {
        const notificationContainer = document.createElement('div');
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.top = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.padding = '15px 20px';
        notificationContainer.style.borderRadius = '5px';
        notificationContainer.style.color = '#fff';
        notificationContainer.style.fontWeight = 'bold';
        notificationContainer.style.zIndex = '1000';
        notificationContainer.style.display = 'flex';
        notificationContainer.style.alignItems = 'center';
        notificationContainer.style.maxWidth = '300px';
        notificationContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

        const icon = document.createElement('i');
        icon.style.marginRight = '10px';
        icon.style.fontSize = '1.2em';

        if (type === 'success') {
            notificationContainer.style.backgroundColor = '#1dd05d';
            icon.className = 'fa-solid fa-circle-info';
        } else {
            notificationContainer.style.backgroundColor = '#f91536';
            icon.className = 'fa-solid fa-circle-exclamation';
        }

        notificationContainer.appendChild(icon);
        notificationContainer.appendChild(document.createTextNode(message));

        document.body.appendChild(notificationContainer);

        setTimeout(() => {
            notificationContainer.style.opacity = '0';
            notificationContainer.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => {
                document.body.removeChild(notificationContainer);
            }, 500);
        }, 5000);
    }
});