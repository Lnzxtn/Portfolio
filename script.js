// ===== GLOBAL SCROLL LOCK SYSTEM =====
let scrollPosition = 0;
let isScrollLocked = false;

function lockScroll() {
    if (isScrollLocked) return;
    
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Lock HTML and body with position fixed
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = -scrollPosition + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    
    isScrollLocked = true;
}

function unlockScroll() {
    if (!isScrollLocked) return;
    
    // Remove all lock styles
    document.documentElement.style.overflow = '';
    document.documentElement.style.height = '';
    document.body.style.overflow = '';
    document.body.style.height = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    
    // Restore scroll position
    window.scrollTo(0, scrollPosition);
    
    isScrollLocked = false;
}
// ===== END GLOBAL SCROLL LOCK SYSTEM =====

// ===== PROJECT MODAL FUNCTIONALITY =====
(function() {
    const projectModal = document.getElementById('projectModal');
    if (!projectModal) return;

    const projectCards = document.querySelectorAll('.project-card[data-project-image]');
    const projectModalImage = document.getElementById('projectModalImage');
    const projectModalImageAlt = document.getElementById('projectModalImageAlt');
    const projectModalTitle = document.getElementById('projectModalTitle');
    const projectModalDescription = document.getElementById('projectModalDescription');
    const projectModalButtons = document.getElementById('projectModalButtons');
    const projectImageControls = document.getElementById('projectImageControls');
    const projectPrevImageBtn = document.getElementById('projectPrevImage');
    const projectNextImageBtn = document.getElementById('projectNextImage');
    const projectImageDots = document.getElementById('projectImageDots');
    const projectModalClose = document.querySelector('.project-modal-close');

    let projectImages = [];
    let currentProjectImageIndex = 0;

    function clearProjectModalLayoutClasses() {
        projectModal.classList.remove('project-modal-split');
    }

    function openProjectModal(cardElement) {
        const image = cardElement.getAttribute('data-project-image');
        const title = cardElement.getAttribute('data-project-title');
        const description = cardElement.getAttribute('data-project-modal-description');
        const projectLink = cardElement.getAttribute('data-project-link');
        const projectLayout = cardElement.getAttribute('data-project-layout');

        clearProjectModalLayoutClasses();

        // Collect project images
        projectImages = [];
        if (image) projectImages.push(image);
        for (let i = 2; i <= 14; i++) {
            const extra = cardElement.getAttribute('data-project-image' + i);
            if (extra) projectImages.push(extra);
        }
        currentProjectImageIndex = 0;

        if (projectImages.length > 0) {
            projectModalImage.src = projectImages[0];
        }
        projectModalImageAlt.src = '';

        const useSideBySide = projectLayout === 'side-by-side' && projectImages.length >= 2;
        if (useSideBySide) {
            projectModal.classList.add('project-modal-split');
            projectModalImageAlt.src = projectImages[1];
        }

        projectModalTitle.textContent = title || '';
        if (description) {
            const statusMatch = description.match(/^(Project Status:.*?)(\n\n|$)/);
            if (statusMatch) {
                const statusText = statusMatch[1];
                const restOfText = description.replace(statusMatch[0], '').trim();
                projectModalDescription.innerHTML = '<span class="project-status-highlight">' + statusText + '</span>' + (restOfText ? '\n\n' + restOfText : '');
            } else {
                projectModalDescription.textContent = description;
            }
            projectModalDescription.style.whiteSpace = 'pre-line';
        }

        // Add View button if project link exists
        if (projectLink) {
            projectModalButtons.innerHTML = '<a href="' + projectLink + '" class="project-view-btn" target="_blank" rel="noopener noreferrer">View</a>';
        } else {
            projectModalButtons.innerHTML = '';
        }

        // Set up image controls
        if (projectImageControls && projectImageDots) {
            if (useSideBySide) {
                projectImageControls.style.display = 'none';
                projectImageDots.innerHTML = '';
            } else if (projectImages.length > 1) {
                projectImageControls.style.display = 'flex';
                projectImageDots.innerHTML = '';
                projectImages.forEach((_, idx) => {
                    const dot = document.createElement('div');
                    dot.className = 'project-image-dot' + (idx === 0 ? ' active' : '');
                    dot.addEventListener('click', function(e) {
                        e.stopPropagation();
                        currentProjectImageIndex = idx;
                        updateProjectImage();
                    });
                    projectImageDots.appendChild(dot);
                });
            } else {
                projectImageControls.style.display = 'none';
                projectImageDots.innerHTML = '';
            }
        }

        projectModal.classList.add('open');
        lockScroll();
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove('open');
        clearProjectModalLayoutClasses();

        // Check if other modals are open before unlocking
        const awardModal = document.getElementById('awardModal');
        const certificateViewerModal = document.getElementById('certificateViewerModal');
        const isAwardModalOpen = awardModal && awardModal.classList.contains('open');
        const isCertificateViewerOpen = certificateViewerModal && certificateViewerModal.classList.contains('open');
        
        if (!isAwardModalOpen && !isCertificateViewerOpen) {
            unlockScroll();
        }
    }

    function updateProjectImage() {
        if (!projectImages.length) return;
        if (projectModal.classList.contains('project-modal-split')) return;
        if (currentProjectImageIndex < 0) currentProjectImageIndex = 0;
        if (currentProjectImageIndex > projectImages.length - 1) currentProjectImageIndex = projectImages.length - 1;
        projectModalImage.src = projectImages[currentProjectImageIndex];

        if (projectImageDots) {
            const dots = projectImageDots.querySelectorAll('.project-image-dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentProjectImageIndex);
            });
        }
    }

    // Open modal when project card is clicked
    projectCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            e.preventDefault();
            openProjectModal(this);
        });
    });

    // Image navigation
    if (projectPrevImageBtn) {
        projectPrevImageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (projectImages.length <= 1) return;
            currentProjectImageIndex = (currentProjectImageIndex - 1 + projectImages.length) % projectImages.length;
            updateProjectImage();
        });
    }

    if (projectNextImageBtn) {
        projectNextImageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (projectImages.length <= 1) return;
            currentProjectImageIndex = (currentProjectImageIndex + 1) % projectImages.length;
            updateProjectImage();
        });
    }

    // Close modal handlers
    if (projectModalClose) {
        projectModalClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeProjectModal();
        });
    }

    projectModal.addEventListener('click', function(event) {
        if (event.target === projectModal) {
            closeProjectModal();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && projectModal.classList.contains('open')) {
            closeProjectModal();
        }
    });
})();
// ===== END PROJECT MODAL FUNCTIONALITY =====

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        // Only proceed if it's a valid hash link
        if (target && target.startsWith('#') && target.length > 1) {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add scroll event listener for navbar
window.addEventListener('scroll', function() {
    // Site uses `.navbar` (no #desktop-nav). Guard to prevent console errors.
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        nav.style.background = '#000';
    }
});

// Add typing animation for the logo
const logo = document.querySelector('.logo');
const text = logo ? logo.textContent : '';
let index = 0;

function typeWriter() {
    if (!logo) return;
    if (index < text.length) {
        logo.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 200);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    if (!logo) return;
    logo.textContent = '';
    typeWriter();
});

// Typing effect for hero name
window.addEventListener('DOMContentLoaded', () => {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const introText = "Hi, I'm ";
        const names = ['Lance Christian Carillo', 'Lanz Xtian', 'Lance Christian Carillo'];
        let nameIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeSpeed = 90;
        const deleteSpeed = 60;
        const holdOnFullName = 1300;
        const holdOnEmpty = 320;

        function animateHeroName() {
            const activeName = names[nameIndex];
            const textContent = introText + activeName.slice(0, charIndex);
            heroName.innerHTML = textContent + '<span class="typing-cursor"></span>';
            heroName.classList.add('typing');

            if (!isDeleting && charIndex < activeName.length) {
                charIndex++;
                setTimeout(animateHeroName, typeSpeed);
                return;
            }

            if (!isDeleting && charIndex === activeName.length) {
                const isFinalName = nameIndex === names.length - 1;
                if (isFinalName) {
                    heroName.textContent = introText + activeName;
                    heroName.classList.remove('typing');
                    return;
                }
                isDeleting = true;
                setTimeout(animateHeroName, holdOnFullName);
                return;
            }

            if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(animateHeroName, deleteSpeed);
                return;
            }

            isDeleting = false;
            nameIndex++;
            setTimeout(animateHeroName, holdOnEmpty);
        }

        heroName.textContent = introText;
        setTimeout(animateHeroName, 300);
    }
});

// Reveal content with animation as it enters the viewport
window.addEventListener('DOMContentLoaded', () => {

    const revealTargets = Array.from(document.querySelectorAll(
        '.hero-info, .hero-image, #skills h2, .skills-description, .skills-container, #education h2, .education-item, #awards h2, .award-card, .certification-card, #projects h2, .project-card, .contact-subtitle, .contact-title, .contact-card, .site-footer'
    ));

    if (!revealTargets.length) return;

    let educationDirection = 0;
    let projectDirection = 0;
    
    revealTargets.forEach((element, index) => {
        element.classList.add('reveal-on-scroll');
        element.style.animationDelay = `${(index % 5) * 90}ms`;

        if (element.matches('.hero-info')) {
            element.classList.add('from-left');
        } else if (element.matches('.hero-image')) {
            element.classList.add('from-right');
        } else if (element.matches('.education-item')) {
            element.classList.add(educationDirection % 2 === 0 ? 'from-left' : 'from-right');
            educationDirection++;
        } else if (element.matches('.project-card')) {
            element.classList.add(projectDirection % 2 === 0 ? 'from-left' : 'from-right');
            projectDirection++;
        }
        // .award-card and .certification-card get default revealInUp animation
    });

    // Fallback for older browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        revealTargets.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    // Make initial viewport content visible immediately
    const makeInitialContentVisible = () => {
        revealTargets.forEach((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
                element.classList.add('is-visible');
            }
        });
    };

    makeInitialContentVisible();

    // Set up IntersectionObserver for content below the fold
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains('is-visible')) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.14,
        rootMargin: '0px 0px -10% 0px'
    });

    revealTargets.forEach((element) => {
        if (!element.classList.contains('is-visible')) {
            revealObserver.observe(element);
        }
    });
});

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-level');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (barPosition < screenPosition) {
            bar.style.width = bar.style.width;
        } else {
            bar.style.width = '0';
        }
    });
};

// Initial check for skill bars
animateSkillBars();

// Add scroll event listener
window.addEventListener('scroll', animateSkillBars);

// Modal functionality for awards and certifications with carousel
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('awardModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalInstitution = document.getElementById('modalInstitution');
    const modalDescription = document.getElementById('modalDescription');
    const modalImage = document.getElementById('modalImage');
    const modalImage2 = document.getElementById('modalImage2');
    const modalImage3 = document.getElementById('modalImage3');
    const modalFullImageLink = document.getElementById('modalFullImageLink');
    const certificateViewerModal = document.getElementById('certificateViewerModal');
    const certificateViewerImage = document.getElementById('certificateViewerImage');
    const certificateViewerClose = document.getElementById('certificateViewerClose');
    const closeBtn = document.querySelector('.modal-close');
    const awardCards = document.querySelectorAll('.award-card, .certification-card');
    const prevBtn = document.querySelector('.modal-prev-btn');
    const nextBtn = document.querySelector('.modal-next-btn');
    const indicatorsContainer = document.querySelector('.modal-indicators');
    const imageContainer = document.querySelector('.modal-image-container');

    let currentImageIndex = 0;
    let images = [];

    function isCertificateViewerOpen() {
        return Boolean(certificateViewerModal && certificateViewerModal.classList.contains('open'));
    }

    function openCertificateViewer(imageSrc, imageAlt) {
        if (!certificateViewerModal || !certificateViewerImage || !imageSrc) return;
        certificateViewerImage.src = imageSrc;
        certificateViewerImage.alt = imageAlt || 'Certificate preview';
        certificateViewerModal.removeAttribute('inert');
        certificateViewerModal.classList.add('open');
        document.body.classList.add('certificate-viewer-open');
        lockScroll();
    }

    function closeCertificateViewer() {
        if (!certificateViewerModal || !certificateViewerImage) return;
        certificateViewerModal.classList.remove('open');
        certificateViewerModal.setAttribute('inert', '');
        certificateViewerImage.removeAttribute('src');
        document.body.classList.remove('certificate-viewer-open');

        const projectModal = document.getElementById('projectModal');
        const isAwardModalOpen = modal && modal.classList.contains('open');
        const isProjectModalOpen = projectModal && projectModal.classList.contains('open');
        if (!isAwardModalOpen && !isProjectModalOpen) {
            unlockScroll();
        }
    }

    // Function to show specific image
    function showImage(index) {
        // Remove active class from all images
        images.forEach(img => {
            img.classList.remove('active');
            img.style.display = 'none';
        });

        // Show current image
        if (images[index]) {
            images[index].classList.add('active');
            images[index].style.display = 'block';
        }

        // Update indicators
        const indicators = indicatorsContainer.querySelectorAll('.modal-indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        // Update navigation buttons
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === images.length - 1;
    }

    // Function to go to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    }

    // Function to go to previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    }

    // Create indicators
    function createIndicators(count) {
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'modal-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => {
                currentImageIndex = i;
                showImage(currentImageIndex);
            });
            indicatorsContainer.appendChild(indicator);
        }
    }

    // Open modal when card is clicked
    awardCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const institution = this.getAttribute('data-institution');
            const description = this.getAttribute('data-description');
            const image = this.getAttribute('data-image');
            const image2 = this.getAttribute('data-image2');
            const image3 = this.getAttribute('data-image3');
            const fullImageLink = this.getAttribute('data-full-image');

            modalTitle.textContent = title;
            modalInstitution.textContent = institution;
            // Display description as plain text with proper formatting
            modalDescription.textContent = description;
            
            // Set up images
            modalImage.src = image;
            modalImage.alt = title;
            images = [modalImage];
            
            // Handle second image if exists
            if (image2) {
                modalImage2.src = image2;
                modalImage2.alt = title + ' - Additional Image';
                images.push(modalImage2);
                imageContainer.classList.remove('single-image');
            } else {
                modalImage2.style.display = 'none';
            }
            // Handle third image if exists
            if (image3) {
                modalImage3.src = image3;
                modalImage3.alt = title + ' - Additional Image';
                images.push(modalImage3);
                imageContainer.classList.remove('single-image');
            } else {
                modalImage3.style.display = 'none';
            }
            if (images.length === 1) {
                imageContainer.classList.add('single-image');
            }

            // Create indicators
            createIndicators(images.length);

            // Reset to first image
            currentImageIndex = 0;
            showImage(0);

            // Always open a certificate image (full image if provided, otherwise main image).
            const certificateImageLink = fullImageLink || image;

            if (certificateImageLink && modalFullImageLink) {
                modalFullImageLink.setAttribute('href', '#');
                modalFullImageLink.setAttribute('data-image-src', certificateImageLink);
                modalFullImageLink.removeAttribute('target');
                modalFullImageLink.removeAttribute('rel');
                modalFullImageLink.style.display = 'inline-block';
                modalFullImageLink.onclick = null;
            } else if (modalFullImageLink) {
                modalFullImageLink.removeAttribute('data-image-src');
                modalFullImageLink.style.display = 'none';
            }

            modal.classList.add('open');
            lockScroll();
        });
    });

    if (modalFullImageLink) {
        modalFullImageLink.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            const imageSrc = this.getAttribute('data-image-src');
            const imageAlt = modalTitle ? (modalTitle.textContent + ' Certificate') : 'Certificate preview';
            openCertificateViewer(imageSrc, imageAlt);
        });
    }

    if (certificateViewerClose) {
        certificateViewerClose.addEventListener('click', function(event) {
            event.stopPropagation();
            closeCertificateViewer();
        });
    }

    if (certificateViewerModal) {
        certificateViewerModal.addEventListener('click', function(event) {
            if (event.target === certificateViewerModal) {
                closeCertificateViewer();
            }
        });
        // Initialize as inert on page load
        certificateViewerModal.setAttribute('inert', '');
    }

    // Navigation button events
    nextBtn.addEventListener('click', () => {
        nextImage();
    });

    prevBtn.addEventListener('click', () => {
        prevImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isCertificateViewerOpen()) {
            closeCertificateViewer();
            return;
        }

        if (modal.classList.contains('open')) {
            if (event.key === 'Escape') {
                closeModal();
            } else if (event.key === 'ArrowRight' && images.length > 1) {
                nextImage();
            } else if (event.key === 'ArrowLeft' && images.length > 1) {
                prevImage();
            }
        }
    });

    // Close modal function
    function closeModal() {
        closeCertificateViewer();
        modal.classList.remove('open');
        
        // Check if other modals are open before unlocking
        const projectModal = document.getElementById('projectModal');
        const certificateViewerModal = document.getElementById('certificateViewerModal');
        const isProjectModalOpen = projectModal && projectModal.classList.contains('open');
        const isCertificateViewerOpen = certificateViewerModal && certificateViewerModal.classList.contains('open');
        if (!isProjectModalOpen && !isCertificateViewerOpen) {
            unlockScroll();
        }
    }

    // Close modal when close button is clicked
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(event) {
        // Only close if clicking directly on the modal background, not on content or buttons
        if (event.target === modal) {
            closeModal();
        }
    });

}); 

// Desktop certifications carousel (PC only)
document.addEventListener('DOMContentLoaded', function() {
    const awardsGrid = document.querySelector('.awards-grid');
    const awardsPrev = document.querySelector('.awards-prev');
    const awardsNext = document.querySelector('.awards-next');

    if (awardsGrid && awardsPrev && awardsNext) {
        const scrollAmount = () => awardsGrid.clientWidth * 0.8;

        awardsPrev.addEventListener('click', () => {
            awardsGrid.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });

        awardsNext.addEventListener('click', () => {
            awardsGrid.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });
    }
});

// Desktop projects carousel (PC only)
document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.querySelector('.projects-grid');
    const projectsPrev = document.querySelector('.projects-prev');
    const projectsNext = document.querySelector('.projects-next');

    if (projectsGrid && projectsPrev && projectsNext) {
        const scrollAmount = () => projectsGrid.clientWidth * 0.8;

        projectsPrev.addEventListener('click', () => {
            projectsGrid.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });

        projectsNext.addEventListener('click', () => {
            projectsGrid.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });
    }
});

// Carousel Pagination Indicators for Mobile/Tablet
document.addEventListener('DOMContentLoaded', function() {
    // Setup for Certifications section
    const certificationsGrid = document.querySelector('.awards-grid');
    const certificationsIndicators = document.getElementById('certificationsIndicators');
    
    // Setup for Projects section
    const projectsGrid = document.querySelector('.projects-grid');
    const projectsIndicators = document.getElementById('projectsIndicators');

    function setupCarouselIndicators(grid, indicatorsContainer) {
        if (!grid || !indicatorsContainer) return;

        const items = grid.children;
        if (items.length === 0) return;

        // Create indicator dots
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < items.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'indicator-dot';
            if (i === 0) dot.classList.add('active');
            
            // Click handler to scroll to item
            dot.addEventListener('click', () => {
                items[i].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            });
            
            indicatorsContainer.appendChild(dot);
        }

        // Update active indicator on scroll
        function updateActiveIndicator() {
            const scrollLeft = grid.scrollLeft;
            const itemWidth = items[0].offsetWidth;
            const gap = parseInt(getComputedStyle(grid).gap) || 0;
            const totalItemWidth = itemWidth + gap;
            
            // Calculate which item is currently centered/visible
            const activeIndex = Math.round(scrollLeft / totalItemWidth);
            const clampedIndex = Math.max(0, Math.min(activeIndex, items.length - 1));
            
            // Update indicator dots
            const dots = indicatorsContainer.querySelectorAll('.indicator-dot');
            dots.forEach((dot, index) => {
                if (index === clampedIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Listen to scroll events
        let scrollTimeout;
        grid.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateActiveIndicator, 50);
        });

        // Initial update
        updateActiveIndicator();
    }

    // Initialize both carousels
    setupCarouselIndicators(certificationsGrid, certificationsIndicators);
    setupCarouselIndicators(projectsGrid, projectsIndicators);
});

// Scroll-based Navigation Highlighting
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    let isScrolling = false;

    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 150;
        
        let currentSection = '';
        let maxMatch = -1;

        // Find which section is currently most visible
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const sectionBottom = sectionTop + sectionHeight;

            // Check if scroll position is within this section
            if (scrollPosition >= sectionTop - 150 && scrollPosition < sectionBottom) {
                // Calculate how much of this section is visible
                const visibleAmount = Math.min(scrollPosition - sectionTop + 150, sectionHeight);
                if (visibleAmount > maxMatch) {
                    maxMatch = visibleAmount;
                    currentSection = sectionId;
                }
            }
        });

        // If at the very top, always show home
        if (window.scrollY < 100) {
            currentSection = 'home';
        }

        // Update active states - remove ALL first
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Then add to current section only
        if (currentSection) {
            const activeLink = document.querySelector(`.nav-links a[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    // Run on scroll with debouncing
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        
        highlightNavOnScroll();
        
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            highlightNavOnScroll();
        }, 100);
    }, { passive: true });

    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = e.currentTarget;
            
            // Immediately remove focus to prevent stuck state
            target.blur();
            
            // Clear all active classes immediately
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Set active on clicked link temporarily
            target.classList.add('active');
            
            // Then let scroll detection take over after animation
            setTimeout(() => {
                highlightNavOnScroll();
            }, 100);
            setTimeout(() => {
                highlightNavOnScroll();
            }, 300);
            setTimeout(() => {
                highlightNavOnScroll();
            }, 600);
            setTimeout(() => {
                highlightNavOnScroll();
            }, 1000);
        });
    });

    // Initial run
    setTimeout(highlightNavOnScroll, 100);
});