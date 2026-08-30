document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* ==========================================================================
       Dark/Light Mode Toggle
       ========================================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }

    /* ==========================================================================
       Scroll Active State & Sticky Nav
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        let current = '';
        
        // Add shadow to navbar on scroll
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Show/Hide scroll-to-top button
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }

        // Highlight active nav link
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       Project Filtering
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'flex';
                    // Slight delay for animation effect
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // Matches transition speed
                }
            });
        });
    });

    /* ==========================================================================
       Scroll Animations (Intersection Observer)
       ========================================================================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Optional: stop observing once animation is done
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    /* ==========================================================================
       Loader
       ========================================================================== */
    window.onload = () => {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }, 500); // Small delay to let the animation play
        }
    };

    /* ==========================================================================
       Project Case Study Modal
       ========================================================================== */
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');
    const viewProjectBtns = document.querySelectorAll('.view-project');
    
    // Project Data Structure
    const projectData = {
        ems: {
            title: "Employee Management System",
            category: "UI/UX + Web Development",
            image: "project1-placeholder.jpg.jpg",
            tech: ["HTML", "CSS", "PHP", "MySQL"],
            desc: "A comprehensive web-based employee management system featuring employee records, attendance tracking, automatic time logging, and payroll functionality.",
            problem: "The client needed a digital solution to replace their manual, paper-based timekeeping and payroll calculation which was prone to errors and took hours to process.",
            solution: "I designed and developed a centralized dashboard that automates time logging and calculates payroll automatically based on attendance records, reducing administrative time by 80%.",
            link: "https://tazaportal.tazabrew.com/"
        },
        qrcode: {
            title: "QR Code Digital Menu",
            category: "Web Development + UI/UX",
            image: "project2-placeholder.jpg.jpg",
            tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
            desc: "A digital café menu accessible through a QR code, featuring categorized menu items, pricing, and high-quality images.",
            problem: "A local cafe wanted to modernize their ordering process and reduce printing costs for physical menus that frequently changed.",
            solution: "Created a mobile-first digital menu that customers can access instantly via QR code. Designed an intuitive admin panel for the cafe owners to easily update items, prices, and availability.",
            link: "https://menu.tazabrew.com/"
        }
    };

    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = e.target.getAttribute('data-project');
            const data = projectData[projectId];
            
            if (data) {
                // Populate Modal
                document.getElementById('modal-img').src = data.image;
                document.getElementById('modal-title').textContent = data.title;
                document.getElementById('modal-category').textContent = data.category;
                document.getElementById('modal-desc').textContent = data.desc;
                document.getElementById('modal-problem').textContent = data.problem;
                document.getElementById('modal-solution').textContent = data.solution;
                
                // Handle Live Link
                const modalLink = document.getElementById('modal-link');
                if (data.link) {
                    modalLink.href = data.link;
                    modalLink.style.display = 'inline-flex';
                } else {
                    modalLink.style.display = 'none';
                    modalLink.href = '#';
                }
                
                // Populate Tech Stack
                const techContainer = document.getElementById('modal-tech');
                techContainer.innerHTML = '';
                data.tech.forEach(tech => {
                    const span = document.createElement('span');
                    span.textContent = tech;
                    // Styling similar to the cards
                    span.style.fontSize = '0.75rem';
                    span.style.padding = '0.25rem 0.75rem';
                    span.style.backgroundColor = 'var(--bg-tertiary)';
                    span.style.color = 'var(--text-tertiary)';
                    span.style.borderRadius = '4px';
                    techContainer.appendChild(span);
                });
                
                // Show Modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    /* ==========================================================================
       Contact Form Validation
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Reset errors
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
            document.getElementById('formSuccess').style.display = 'none';

            // Validate Name
            if (nameInput.value.trim() === '') {
                nameInput.parentElement.classList.add('error');
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('error');
                isValid = false;
            }

            // Validate Message
            if (messageInput.value.trim() === '') {
                messageInput.parentElement.classList.add('error');
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                document.getElementById('formSuccess').style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    document.getElementById('formSuccess').style.display = 'none';
                }, 5000);
            }
        });
    }

    /* ==========================================================================
       Pubmat Gallery Lightbox
       ========================================================================== */
    const pubmatItems = document.querySelectorAll('.pubmat-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lbClose = document.querySelector('.lightbox-close');
    const lbPrev = document.getElementById('lb-prev');
    const lbNext = document.getElementById('lb-next');
    
    let currentIndex = 0;
    
    // Build image list from pubmat items
    const pubmatImages = Array.from(pubmatItems).map(item => ({
        src: item.querySelector('img').src,
        alt: item.querySelector('img').alt
    }));

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = pubmatImages[currentIndex].src;
        lightboxImg.alt = pubmatImages[currentIndex].alt;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % pubmatImages.length;
        lightboxImg.src = pubmatImages[currentIndex].src;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + pubmatImages.length) % pubmatImages.length;
        lightboxImg.src = pubmatImages[currentIndex].src;
    }

    pubmatItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    // Also open gallery from project card button
    const openGalleryBtn = document.getElementById('open-gallery-btn');
    if (openGalleryBtn) {
        openGalleryBtn.addEventListener('click', () => {
            document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbNext)  lbNext.addEventListener('click', showNext);
    if (lbPrev)  lbPrev.addEventListener('click', showPrev);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft')  showPrev();
        if (e.key === 'Escape')     closeLightbox();
    });

});
