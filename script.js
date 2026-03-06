// Project Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectModal = document.getElementById('projectModal');
    const projectCards = document.querySelectorAll('.project-card[data-project-image]');
    const projectModalImage = document.getElementById('projectModalImage');
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

    // Prevent modal from opening when clicking external project links
    const projectLinks = document.querySelectorAll('.project-view-btn');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });

    // Open modal when project card is clicked
    projectCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const image = this.getAttribute('data-project-image');
            const title = this.getAttribute('data-project-title');
            const description = this.getAttribute('data-project-modal-description');
            const projectLink = this.getAttribute('data-project-link');

            // Collect project images (data-project-image, data-project-image2, ... up to data-project-image14)
            projectImages = [];
            if (image) projectImages.push(image);
            for (let i = 2; i <= 14; i++) {
                const extra = this.getAttribute('data-project-image' + i);
                if (extra) projectImages.push(extra);
            }
            currentProjectImageIndex = 0;

            if (projectImages.length > 0) {
                projectModalImage.src = projectImages[0];
            }
            if (title) projectModalTitle.textContent = title;
            if (description) {
                // Preserve line breaks and format the description
                // Highlight Project Status section (now at the beginning)
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
            if (projectLink && projectModalButtons) {
                projectModalButtons.innerHTML = '<a href="' + projectLink + '" class="project-view-btn" target="_blank" rel="noopener noreferrer">View</a>';
            } else if (projectModalButtons) {
                projectModalButtons.innerHTML = '';
            }

            // Set up image controls (manual carousel, no auto-play)
            if (projectImageControls && projectImageDots) {
                if (projectImages.length > 1) {
                    projectImageControls.style.display = 'flex';
                    projectImageDots.innerHTML = '';
                    projectImages.forEach((_, idx) => {
                        const dot = document.createElement('div');
                        dot.className = 'project-image-dot' + (idx === 0 ? ' active' : '');
                        dot.addEventListener('click', () => {
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

            projectModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    function updateProjectImage() {
        if (!projectImages.length) return;
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

    if (projectPrevImageBtn) {
        projectPrevImageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (projectImages.length <= 1) return;
            currentProjectImageIndex = (currentProjectImageIndex - 1 + projectImages.length) % projectImages.length;
            updateProjectImage();
        });
    }

    if (projectNextImageBtn) {
        projectNextImageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (projectImages.length <= 1) return;
            currentProjectImageIndex = (currentProjectImageIndex + 1) % projectImages.length;
            updateProjectImage();
        });
    }

    // Close modal
    if (projectModalClose) {
        projectModalClose.addEventListener('click', function() {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && projectModal.style.display === 'flex') {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

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
    const modalPdfLink = document.getElementById('modalPdfLink');
    const modalFullImageLink = document.getElementById('modalFullImageLink');
    const closeBtn = document.querySelector('.modal-close');
    const awardCards = document.querySelectorAll('.award-card, .certification-card');
    const prevBtn = document.querySelector('.modal-prev-btn');
    const nextBtn = document.querySelector('.modal-next-btn');
    const indicatorsContainer = document.querySelector('.modal-indicators');
    const imageContainer = document.querySelector('.modal-image-container');

    let currentImageIndex = 0;
    let images = [];

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
            const pdfLink = this.getAttribute('data-pdf');
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

            // Show only one button: PDF button if PDF exists, otherwise full image button
            if (pdfLink && modalPdfLink) {
                // If PDF exists, show PDF button and hide image button
                modalPdfLink.setAttribute('href', pdfLink);
                modalPdfLink.href = pdfLink;
                modalPdfLink.target = '_blank';
                modalPdfLink.rel = 'noopener noreferrer';
                modalPdfLink.style.display = 'inline-block';
                // Clear any onclick handlers
                modalPdfLink.onclick = null;
                // Hide the full image button
                if (modalFullImageLink) {
                    modalFullImageLink.style.display = 'none';
                }
            } else if (fullImageLink && modalFullImageLink) {
                // If no PDF but full image exists, show image button
                // Set href using both methods to ensure it works
                modalFullImageLink.setAttribute('href', fullImageLink);
                modalFullImageLink.href = fullImageLink;
                modalFullImageLink.target = '_blank';
                modalFullImageLink.rel = 'noopener noreferrer';
                modalFullImageLink.style.display = 'inline-block';
                // Clear any onclick handlers
                modalFullImageLink.onclick = null;
                // Hide the PDF button
                if (modalPdfLink) {
                    modalPdfLink.style.display = 'none';
                }
            } else {
                // Hide both if neither exists
                if (modalFullImageLink) {
                    modalFullImageLink.style.display = 'none';
                }
                if (modalPdfLink) {
                    modalPdfLink.style.display = 'none';
                }
            }

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Navigation button events
    nextBtn.addEventListener('click', () => {
        nextImage();
    });

    prevBtn.addEventListener('click', () => {
        prevImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'flex') {
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
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
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