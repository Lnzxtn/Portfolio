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

const DICT_EXPERIENCE_PHOTOS = [
    'Experience/DICT/intern.jpg',
    'Experience/DICT/618713347_4390997134468858_4807792664004980564_n.jpg',
    'Experience/DICT/619215058_1607555320440871_3829334001618285594_n.jpg',
    'Experience/DICT/620564670_1300436398804896_3010719711821546619_n.jpg',
    'Experience/DICT/624074644_927595789940252_2640203704218984250_n.jpg',
    'Experience/DICT/625919053_916044737542704_8386134638496021252_n.jpg',
    'Experience/DICT/626553512_25359744347057757_6036241437941726833_n.jpg',
    'Experience/DICT/627854745_966513112371069_4013262926747304352_n.jpg',
    'Experience/DICT/628100061_1412757487260648_7339848529137789792_n.jpg',
    'Experience/DICT/629306170_3098931827163272_4751620058613035193_n.jpg',
    'Experience/DICT/630042266_903460022172670_1135996259067695136_n.jpg',
    'Experience/DICT/633337264_1343913194162702_8499114635445728424_n.jpg',
    'Experience/DICT/634964689_1577173056876038_7812565862094317183_n.jpg',
    'Experience/DICT/636752159_937048142332324_167799614209496595_n.jpg',
    'Experience/DICT/643185088_1707988500567039_6672606230095407340_n.jpg',
    'Experience/DICT/643616009_1292019642777280_7035785874433001624_n.jpg',
    'Experience/DICT/644241143_959949556456130_7502557981449545847_n.jpg',
    'Experience/DICT/644248163_2248611108881148_9125655677689245418_n.jpg',
    'Experience/DICT/644914289_1240028897732068_4331307368958903457_n.jpg',
    'Experience/DICT/645010427_1648624932838985_2063671902023246633_n.jpg',
    'Experience/DICT/645499053_895267469809230_7356135886695984713_n.jpg',
    'Experience/DICT/645637638_2908754895978552_6974878328606035628_n.jpg',
    'Experience/DICT/645791131_960308826519686_7543209431806733951_n.jpg',
    'Experience/DICT/645815108_938081615342625_4562210037509953234_n.jpg',
    'Experience/DICT/645821552_1252191253535984_7199786152372718889_n.jpg',
    'Experience/DICT/646056409_3161193370720166_1436990541464003248_n.jpg',
    'Experience/DICT/646093754_2102651727242414_7057034209521508967_n.jpg',
    'Experience/DICT/646147895_731206483291182_882469505216492823_n.jpg',
    'Experience/DICT/646196121_2179057126255322_7385708017234817183_n.jpg',
    'Experience/DICT/646351954_1251833763058514_4072984735672603138_n.jpg',
    'Experience/DICT/646684895_1815393903198889_8605675522223256974_n.jpg',
    'Experience/DICT/646834154_1833224194043980_2366838038992582426_n.jpg',
    'Experience/DICT/646863431_849220394806781_1418383346802133345_n.jpg',
    'Experience/DICT/646881777_1317134450250961_7061602763062569242_n.jpg',
    'Experience/DICT/647066578_1349177770398936_3489727959628087160_n.jpg',
    'Experience/DICT/647337143_1488668762851093_196819405615403062_n.jpg',
    'Experience/DICT/648302044_1715125646136215_6053006256793947538_n.jpg',
    'Experience/DICT/648327761_1264259389130046_1211041765169351004_n.jpg',
    'Experience/DICT/648506452_1284800910225293_4384216625294861605_n.jpg',
    'Experience/DICT/648580868_858906340507402_4031026871099612539_n.jpg',
    'Experience/DICT/648790661_1632995224513798_2148630223239502642_n.jpg',
    'Experience/DICT/649492160_1598773918001632_8796760792209149579_n.jpg',
    'Experience/DICT/649518856_4220654021480432_584001412532540770_n.jpg',
    'Experience/DICT/649688398_1446899213690088_8236918021667251239_n.jpg',
    'Experience/DICT/650009279_1533890212077702_3986697613200913735_n.jpg',
    'Experience/DICT/650275780_1711918466641473_517733775539191283_n.jpg',
    'Experience/DICT/650925674_1451483330322946_8405002643453319418_n.jpg',
    'Experience/DICT/652741297_4434516180115562_4024600786716651854_n.jpg',
    'Experience/DICT/653754225_1295663835754364_7821410577780296102_n.jpg',
    'Experience/DICT/655075292_1319825159974280_3293575440739452285_n.jpg',
    'Experience/DICT/655109264_902879702538475_2746737641989997233_n.jpg',
    'Experience/DICT/655169600_1366355882196243_3952268845489389360_n.jpg',
    'Experience/DICT/655449330_1524194375944253_7015708707717030966_n.jpg',
    'Experience/DICT/655469395_2150058632419056_3608740700219420954_n.jpg',
    'Experience/DICT/655565489_900337149674744_994517392851019454_n.jpg',
    'Experience/DICT/656013022_792668197254546_8507839233074208368_n.jpg',
    'Experience/DICT/656655570_1500691974959889_7114763825630511891_n.jpg',
    'Experience/DICT/657109846_1644227403571260_194536296477874953_n.jpg',
    'Experience/DICT/657330886_1245589437623060_7521920719763909289_n.jpg',
    'Experience/DICT/657366373_2429327160839702_4847380990418948639_n.jpg',
    'Experience/DICT/661008367_2113831399409983_6152079947137050311_n.jpg',
    'Experience/DICT/662483181_2948688935321099_5917244869498508984_n.jpg',
    'Experience/DICT/664921094_1945588759378579_997295521283288549_n.jpg',
    'Experience/DICT/665100066_1765091321136696_8264409950385598381_n.jpg',
    'Experience/DICT/668707425_1951088725492319_4767451570189104006_n.jpg',
    'Experience/DICT/670015955_739477235917480_719113322169067973_n.jpg',
    'Experience/DICT/675262141_1244196824571962_8555932607574394797_n.jpg',
    'Experience/DICT/676440990_1123946396587887_5237500859800185861_n.jpg',
    'Experience/DICT/676901605_1650677895976008_2744552864604249585_n.jpg',
    'Experience/DICT/677825253_996409776164694_5479859614364925040_n.jpg',
    'Experience/DICT/679962056_1346486950643138_5571698520669865890_n.jpg',
    'Experience/DICT/680243904_1313741994012620_2518534659736704144_n.jpg',
    'Experience/DICT/680430489_1331434262176154_8654587294640713430_n.jpg',
    'Experience/DICT/684461757_1711330860217178_4377956049909973416_n.jpg',
    'Experience/DICT/684647109_1835505837117396_4794721316960084583_n.jpg',
    'Experience/DICT/685775534_943184375363739_5907697589447000658_n.jpg',
    'Experience/DICT/IMG_20260313_064739.jpg'
];

const EXPERIENCE_PHOTO_SETS = {
    dict: DICT_EXPERIENCE_PHOTOS
};

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
        const infoModal = document.getElementById('infoModal');
        const isAwardModalOpen = awardModal && awardModal.classList.contains('open');
        const isCertificateViewerOpen = certificateViewerModal && certificateViewerModal.classList.contains('open');
        const isInfoModalOpen = infoModal && infoModal.classList.contains('open');
        
        if (!isAwardModalOpen && !isCertificateViewerOpen && !isInfoModalOpen) {
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

// Force-download handler for resume link (fetch + blob fallback)
document.addEventListener('DOMContentLoaded', function () {
    const dl = document.getElementById('downloadResume');
    if (!dl) return;

    dl.addEventListener('click', async function (e) {
        e.preventDefault();
        const url = this.href;
        const filename = this.getAttribute('download') || (url.split('/').pop() || 'resume.pdf');
        try {
            const resp = await fetch(url, { cache: 'no-cache' });
            if (!resp.ok) throw new Error('Network response was not ok');
            const blob = await resp.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch (err) {
            // Fallback: open in new tab (browser may still show PDF viewer)
            const win = window.open(url, '_blank');
            if (!win) window.location.href = url;
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
    const heroImage = document.querySelector('.hero-image');
    let heroImageTapTimeoutId;
    if (heroName) {
        const introText = "Hi, I'm ";
        const names = ['Lance Christian Carillo'];
        let nameIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeSpeed = 90;
        const deleteSpeed = 60;
        const holdOnFullName = 1300;
        const holdOnEmpty = 320;

        function isTapRevealDevice() {
            return window.matchMedia('(max-width: 1024px)').matches || window.matchMedia('(hover: none)').matches;
        }

        function syncHeroAvatar(activeName) {
            if (!heroImage) return;
            // Removed lnzz avatar switch: ensure special class is not present
            heroImage.classList.remove('show-lnzz');
        }

        function triggerTemporaryHeroAvatarReveal() {
            // no-op: lnzz avatar removed, keep typing animation only
        }

        function animateHeroName() {
            const activeName = names[nameIndex];
            syncHeroAvatar(activeName);
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
        syncHeroAvatar(names[nameIndex]);

        // Avatar reveal listeners removed (lnzz image removed)

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
    const modalDate = document.getElementById('modalDate');
    const modalImage = document.getElementById('modalImage');
    const modalImage2 = document.getElementById('modalImage2');
    const modalImage3 = document.getElementById('modalImage3');
    const modalVideo = document.getElementById('modalVideo');
    const modalFullImageLink = document.getElementById('modalFullImageLink');
    const certificateViewerModal = document.getElementById('certificateViewerModal');
    const certificateViewerImage = document.getElementById('certificateViewerImage');
    const certificateViewerClose = document.getElementById('certificateViewerClose');
    const closeBtn = modal ? modal.querySelector('.modal-close') : null;
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
        const infoModal = document.getElementById('infoModal');
        const isAwardModalOpen = modal && modal.classList.contains('open');
        const isProjectModalOpen = projectModal && projectModal.classList.contains('open');
        const isInfoModalOpen = infoModal && infoModal.classList.contains('open');
        if (!isAwardModalOpen && !isProjectModalOpen && !isInfoModalOpen) {
            unlockScroll();
        }
    }

    // Function to show specific image
    function showImage(index) {
        // Remove active class from all images
        images.forEach(img => {
            img.classList.remove('active');
            img.style.display = 'none';
            // pause videos when hidden
            if (img.tagName === 'VIDEO') {
                try { img.pause(); } catch (e) {}
            }
        });

        // Show current image
        if (images[index]) {
            images[index].classList.add('active');
            images[index].style.display = 'block';
            // if it's a video, reset to start
            if (images[index].tagName === 'VIDEO') {
                try { images[index].currentTime = 0; } catch (e) {}
            }
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
            const video = this.getAttribute('data-video');
            const fullImageLink = this.getAttribute('data-full-image');

            modalTitle.textContent = title;
            modalInstitution.textContent = institution;
            // Display description as plain text with proper formatting
            modalDescription.textContent = description;

            // Determine and display date: prefer explicit data-date, otherwise parse from description text
            const explicitDate = this.getAttribute('data-date');
            let dateText = '';
            if (explicitDate) {
                dateText = explicitDate;
            } else if (description) {
                const issuedMatch = description.match(/Issued on:\s*(.+?)(\.|$)/i);
                const dateMatch = description.match(/Date:\s*(.+?)(\.|$)/i);
                if (issuedMatch) dateText = issuedMatch[1].trim();
                else if (dateMatch) dateText = dateMatch[1].trim();
            }

            if (dateText) {
                modalDate.textContent = dateText;
                modalDate.style.display = 'block';
            } else {
                modalDate.textContent = '';
                modalDate.style.display = 'none';
            }
            
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
            // Handle video if exists — prefer MP4 source then fallback to provided file (MOV etc.)
            if (video && modalVideo) {
                // build possible mp4 path by replacing extension
                let mp4Path = video.replace(/\.(mov|quicktime|qt)$/i, '.mp4');
                // Create source elements — browser will pick a playable one
                modalVideo.innerHTML = '';
                const sourceMp4 = document.createElement('source');
                sourceMp4.src = mp4Path;
                sourceMp4.type = 'video/mp4';
                const sourceFallback = document.createElement('source');
                sourceFallback.src = video;
                // set type based on extension
                if (/\.mov$/i.test(video)) sourceFallback.type = 'video/quicktime';
                else sourceFallback.type = 'video/mp4';
                modalVideo.appendChild(sourceMp4);
                modalVideo.appendChild(sourceFallback);
                modalVideo.removeAttribute('poster');
                // Use second image as poster if available to show a thumbnail
                try {
                    modalVideo.poster = image2 || image || '';
                } catch (e) {}
                modalVideo.pause();
                modalVideo.style.display = 'none';
                try { modalVideo.load(); } catch (e) {}
                images.push(modalVideo);
                imageContainer.classList.remove('single-image');
            } else if (modalVideo) {
                modalVideo.style.display = 'none';
                try { modalVideo.pause(); modalVideo.innerHTML = ''; } catch (e) {}
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
                modalFullImageLink.setAttribute('data-image-src', certificateImageLink);
                modalFullImageLink.style.display = 'inline-block';
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
        const infoModal = document.getElementById('infoModal');
        const isProjectModalOpen = projectModal && projectModal.classList.contains('open');
        const isCertificateViewerOpen = certificateViewerModal && certificateViewerModal.classList.contains('open');
        const isInfoModalOpen = infoModal && infoModal.classList.contains('open');
        if (!isProjectModalOpen && !isCertificateViewerOpen && !isInfoModalOpen) {
            unlockScroll();
        }
    }

    // Close modal when close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            closeModal();
        });
    }

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(event) {
        // Only close if clicking directly on the modal background, not on content or buttons
        if (event.target === modal) {
            closeModal();
        }
    });

    // Experience info modal handlers
    const infoModal = document.getElementById('infoModal');
    const infoModalClose = document.getElementById('infoModalClose');
    const infoModalTitle = document.getElementById('infoModalTitle');
    const infoModalDate = document.getElementById('infoModalDate');
    const infoModalDescription = document.getElementById('infoModalDescription');
    const infoModalCarousel = document.getElementById('infoModalCarousel');
    const infoModalImage = document.getElementById('infoModalImage');
    const infoCarouselPrev = document.getElementById('infoCarouselPrev');
    const infoCarouselNext = document.getElementById('infoCarouselNext');
    const infoCarouselCounter = document.getElementById('infoCarouselCounter');

    let infoCarouselPhotos = [];
    let infoCarouselIndex = 0;

    function updateInfoCarouselImage() {
        if (!infoModalImage || !infoCarouselPhotos.length) return;
        if (infoCarouselIndex < 0) infoCarouselIndex = 0;
        if (infoCarouselIndex > infoCarouselPhotos.length - 1) {
            infoCarouselIndex = infoCarouselPhotos.length - 1;
        }

        const currentPhoto = infoCarouselPhotos[infoCarouselIndex];
        infoModalImage.src = currentPhoto;
        infoModalImage.alt = 'DICT internship photo ' + (infoCarouselIndex + 1);

        if (infoCarouselCounter) {
            infoCarouselCounter.textContent = (infoCarouselIndex + 1) + ' / ' + infoCarouselPhotos.length;
        }

        if (infoCarouselPrev) infoCarouselPrev.disabled = infoCarouselIndex === 0;
        if (infoCarouselNext) infoCarouselNext.disabled = infoCarouselIndex === infoCarouselPhotos.length - 1;
    }

    function setupInfoCarousel(photoSetKey) {
        const photoSet = EXPERIENCE_PHOTO_SETS[photoSetKey] || [];
        infoCarouselPhotos = photoSet.filter(function(path, index, list) {
            return list.indexOf(path) === index;
        });
        infoCarouselIndex = 0;

        if (!infoModalCarousel) return;

        if (infoCarouselPhotos.length) {
            infoModalCarousel.hidden = false;
            updateInfoCarouselImage();
        } else {
            infoModalCarousel.hidden = true;
            if (infoModalImage) infoModalImage.removeAttribute('src');
        }
    }

    function closeInfoModal() {
        if (!infoModal) return;
        infoModal.classList.remove('open');
        infoModal.setAttribute('inert', '');
        infoCarouselPhotos = [];
        infoCarouselIndex = 0;
        if (infoModalCarousel) infoModalCarousel.hidden = true;
        if (infoModalImage) infoModalImage.removeAttribute('src');

        const awardModalEl = document.getElementById('awardModal');
        const projectModalEl = document.getElementById('projectModal');
        const isAwardModalOpen = awardModalEl && awardModalEl.classList.contains('open');
        const isProjectModalOpen = projectModalEl && projectModalEl.classList.contains('open');
        const isCertificateViewerOpenNow = isCertificateViewerOpen();
        if (!isAwardModalOpen && !isProjectModalOpen && !isCertificateViewerOpenNow) {
            unlockScroll();
        }
    }

    document.querySelectorAll('.experience-view-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const parent = this.closest('.education-item');
            if (!parent) return;
            const titleEl = parent.querySelector('.education-content h3');
            const titleText = titleEl ? titleEl.textContent : 'Experience';
            const roleEl = parent.querySelector('.education-content .education-role');
            const roleText = roleEl ? roleEl.textContent : '';
            const desc = parent.getAttribute('data-description') || '';
            const date = parent.getAttribute('data-date') || parent.querySelector('.education-date')?.textContent || '';
            const photoSetKey = parent.getAttribute('data-photos') || '';

            infoModalTitle.textContent = titleText;
            const infoModalRole = document.getElementById('infoModalRole');
            if (infoModalRole) infoModalRole.textContent = roleText;
            infoModalDate.textContent = date;
            infoModalDescription.textContent = desc;

            setupInfoCarousel(photoSetKey);

            infoModal.classList.add('open');
            infoModal.removeAttribute('inert');
            lockScroll();
        });
    });

    if (infoCarouselPrev) {
        infoCarouselPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            if (infoCarouselPhotos.length <= 1) return;
            infoCarouselIndex = Math.max(0, infoCarouselIndex - 1);
            updateInfoCarouselImage();
        });
    }

    if (infoCarouselNext) {
        infoCarouselNext.addEventListener('click', function(e) {
            e.stopPropagation();
            if (infoCarouselPhotos.length <= 1) return;
            infoCarouselIndex = Math.min(infoCarouselPhotos.length - 1, infoCarouselIndex + 1);
            updateInfoCarouselImage();
        });
    }

    if (infoModalImage) {
        infoModalImage.addEventListener('click', function(e) {
            e.stopPropagation();
            const currentPhoto = infoCarouselPhotos[infoCarouselIndex];
            if (!currentPhoto) return;
            openCertificateViewer(currentPhoto, 'DICT internship photo');
        });
    }

    if (infoModalClose) {
        infoModalClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeInfoModal();
        });
    }

    if (infoModal) {
        infoModal.addEventListener('click', function(event) {
            if (event.target === infoModal) {
                closeInfoModal();
            }
        });
        infoModal.setAttribute('inert', '');
    }

    document.addEventListener('keydown', function(event) {
        if (!infoModal || !infoModal.classList.contains('open') || isCertificateViewerOpen()) return;

        if (event.key === 'Escape') {
            closeInfoModal();
        } else if (event.key === 'ArrowRight' && infoCarouselPhotos.length > 1) {
            infoCarouselIndex = Math.min(infoCarouselPhotos.length - 1, infoCarouselIndex + 1);
            updateInfoCarouselImage();
        } else if (event.key === 'ArrowLeft' && infoCarouselPhotos.length > 1) {
            infoCarouselIndex = Math.max(0, infoCarouselIndex - 1);
            updateInfoCarouselImage();
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

        // Check if we're at or near the bottom of the page
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const isAtBottom = (window.scrollY + windowHeight >= documentHeight - 50);

        // If at or near bottom, highlight the last section (contact)
        if (isAtBottom) {
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                currentSection = lastSection.getAttribute('id');
            }
        } else {
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