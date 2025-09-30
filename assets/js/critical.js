  // Characters used in the scramble
  const chars = "アァイィウエカキクケコサシスセソタチツテトナニヌネノハヒフヘホM0123456789!@#$%^&*()_+=-{}[]|:;<>,.?ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function scrambleText(el, text, duration = 1200, fps = 60, callback = null) {
    let frame = 0;
    const totalFrames = Math.round(duration / (1000 / fps));
    const letters = text.split("");
    const output = new Array(letters.length).fill("");
    const revealOrder = [...Array(letters.length).keys()].sort(() => Math.random() - 0.5);

    const interval = setInterval(() => {
      frame++;
      for (let i = 0; i < letters.length; i++) {
        if (frame >= totalFrames * (revealOrder.indexOf(i) / letters.length)) {
          output[i] = letters[i];
        } else {
          output[i] = chars[Math.floor(Math.random() * chars.length)];
        }
      }

      el.textContent = output.join("");

      if (frame >= totalFrames + letters.length) {
        clearInterval(interval);
        el.textContent = text;
        if (callback) callback();
      }
    }, 1000 / fps);
  }

  //  Loop for scramble-card-title
  function loopCardTitleScramble() {
    const el = document.getElementById("scramble-card-title");
    if (!el) return;

    scrambleText(el, "--Myself", 800, 60, () => {
      setTimeout(() => {
        scrambleText(el, "--Unknown", 1000, 60, () => {
          setTimeout(loopCardTitleScramble, 2000); // restart after 2s
        });
      }, 500); // pause between the two
    });
  }

  // Loop for scramble-logo (skip first scramble of "SANGEETH M K")
  function loopLogoScramble(skipInitial = true) {
    const sclogo = document.getElementById("scramble-logo");
    if (!sclogo) return;

    // if skipInitial = true → start directly with "SERVER ADMINISTRATOR"
    scrambleText(sclogo, "SERVER ADMINISTRATOR", 1200, 60, () => {
      setTimeout(() => {
        scrambleText(sclogo, "SANGEETH M K", 1000, 60, () => {
          setTimeout(() => loopLogoScramble(false), 10000); // continue loop
        });
      }, 1000);
    });
  }

  // Run only after page load so first paint is clean
  window.addEventListener("load", () => {
    setTimeout(loopCardTitleScramble, 500);
    setTimeout(() => loopLogoScramble(true), 500); // wait before first cycle
  });


// smooth scroll
$(document).ready(function(){
    // Enhanced smooth scroll for navbar, hamburger menu, and action buttons
    $(".navbar .nav-link, .custom-navbar .link, .btn[href^='#'], a[href^='#']").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            // Close hamburger menu when clicking a link
            if ($(this).closest('.custom-navbar').length) {
                $('#nav-toggle').removeClass('is-active');
                $('ul.nav').removeClass('show');
            }

            // Smooth scroll with easing
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 60  // Offset for fixed navbar
            }, 1200, 'easeInOutQuint', function(){
                window.location.hash = hash;
            });
        } 
    });

    // Custom easing function for smoother animation
    $.easing.easeInOutQuint = function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    };

    // Service Card Random Text Reveal Effect
    function initServiceCardEffect() {
        console.log('Initializing service card effect...');
        
        // Use a more direct approach
        const serviceCards = document.querySelectorAll('.service-card');
        const serviceSection = document.getElementById('service');
        let animationInterval;
        let isMouseOverCard = false;

        console.log('Service cards found:', serviceCards.length);
        console.log('Service section found:', serviceSection ? 'Yes' : 'No');

        if (serviceCards.length === 0) {
            console.log('No service cards found!');
            return;
        }

        // Hide all card texts initially using direct DOM manipulation
        serviceCards.forEach(card => {
            const subtitle = card.querySelector('.subtitle');
            if (subtitle) {
                // Override all CSS with important flags and force positioning
                subtitle.style.cssText = `
                    opacity: 0 !important;
                    transform: translateY(20px) !important;
                    transition: all 0.5s ease-in-out !important;
                    position: static !important;
                    bottom: auto !important;
                    visibility: visible !important;
                    display: flex !important;
                `;
            }
        });

        // Function to randomly show card text
        function randomlyShowCardText() {
            if (isMouseOverCard) return;
            
            console.log('Running random text reveal...');
            
            // Hide all texts first
            serviceCards.forEach(card => {
                const subtitle = card.querySelector('.subtitle');
                if (subtitle) {
                    subtitle.style.cssText = `
                        opacity: 0 !important;
                        transform: translateY(20px) !important;
                        transition: all 0.5s ease-in-out !important;
                        position: static !important;
                        bottom: auto !important;
                        visibility: visible !important;
                        display: flex !important;
                    `;
                }
            });

            // Show random card text
            const randomIndex = Math.floor(Math.random() * serviceCards.length);
            const selectedCard = serviceCards[randomIndex];
            const selectedSubtitle = selectedCard.querySelector('.subtitle');
            
            if (selectedSubtitle) {
                console.log('Showing card:', randomIndex);
                selectedSubtitle.style.cssText = `
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                    transition: all 0.5s ease-in-out !important;
                    position: static !important;
                    bottom: auto !important;
                    visibility: visible !important;
                    display: flex !important;
                `;
            }
        }

        // Mouse enter/leave handlers
        serviceCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                console.log('Mouse entered card', index);
                isMouseOverCard = true;
                clearInterval(animationInterval);
                
                // Hide all other card texts
                serviceCards.forEach(otherCard => {
                    const subtitle = otherCard.querySelector('.subtitle');
                    if (subtitle) {
                        subtitle.style.cssText = `
                            opacity: 0 !important;
                            transform: translateY(20px) !important;
                            transition: all 0.5s ease-in-out !important;
                            position: static !important;
                            bottom: auto !important;
                            visibility: visible !important;
                            display: flex !important;
                        `;
                    }
                });
                
                // Show current card text
                const subtitle = this.querySelector('.subtitle');
                if (subtitle) {
                    subtitle.style.cssText = `
                        opacity: 1 !important;
                        transform: translateY(0) !important;
                        transition: all 0.5s ease-in-out !important;
                        position: static !important;
                        bottom: auto !important;
                        visibility: visible !important;
                        display: flex !important;
                    `;
                }
            });

            card.addEventListener('mouseleave', function() {
                console.log('Mouse left card', index);
                isMouseOverCard = false;
                
                setTimeout(() => {
                    if (!isMouseOverCard) {
                        startRandomAnimation();
                    }
                }, 500);
            });
        });

        // Function to start random text animation
        function startRandomAnimation() {
            console.log('Starting random animation');
            clearInterval(animationInterval);
            randomlyShowCardText(); // Show one immediately
            animationInterval = setInterval(randomlyShowCardText, 2500); // Then every 2.5 seconds
        }

        // Start the animation when page loads (desktop only, mobile uses individual card observers)
        if (!isMobile()) {
            setTimeout(() => {
                console.log('Starting service card subtitle animation for desktop');
                startRandomAnimation();
            }, 1000);
        } else {
            console.log('Mobile detected: using individual card observers instead of initial animation');
        }

        // Function to show subtitle for a specific card
        function showCardSubtitle(cardIndex) {
            if (cardIndex !== null && serviceCards[cardIndex]) {
                const subtitle = serviceCards[cardIndex].querySelector('.subtitle');
                if (subtitle) {
                    console.log(`Showing subtitle for card ${cardIndex}`);
                    subtitle.style.cssText = `
                        opacity: 1 !important;
                        transform: translateY(0) !important;
                        transition: all 0.5s ease-in-out !important;
                        position: static !important;
                        bottom: auto !important;
                        visibility: visible !important;
                        display: flex !important;
                        align-items: center !important;
                        text-align: center !important;
                        color: #666 !important;
                        font-size: 0.95rem !important;
                        line-height: 1.5 !important;
                    `;
                }
            }
        }

        // Function to hide subtitle for a specific card
        function hideCardSubtitle(cardIndex) {
            if (cardIndex !== null && serviceCards[cardIndex]) {
                const subtitle = serviceCards[cardIndex].querySelector('.subtitle');
                if (subtitle) {
                    console.log(`Hiding subtitle for card ${cardIndex}`);
                    subtitle.style.cssText = `
                        opacity: 0 !important;
                        transform: translateY(20px) !important;
                        transition: all 0.5s ease-in-out !important;
                        position: static !important;
                        bottom: auto !important;
                        visibility: visible !important;
                        display: flex !important;
                        align-items: center !important;
                        text-align: center !important;
                        color: #666 !important;
                        font-size: 0.95rem !important;
                        line-height: 1.5 !important;
                    `;
                }
            }
        }

        // Setup individual card observers for mobile
        if (isMobile() && window.IntersectionObserver) {
            console.log('Setting up individual card observers for mobile');
            
            serviceCards.forEach((card, index) => {
                const cardObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            console.log(`Service card ${index} is visible on mobile`);
                            showCardSubtitle(index);
                        } else {
                            console.log(`Service card ${index} is not visible on mobile`);
                            hideCardSubtitle(index);
                        }
                    });
                }, {
                    threshold: 0.6, // Card needs to be 60% visible to trigger
                    rootMargin: '0px 0px -50px 0px' // Add some bottom margin for better triggering
                });

                cardObserver.observe(card);
            });
        }

        // Setup section observer for larger screens (desktop)
        if (!isMobile() && serviceSection && window.IntersectionObserver) {
            console.log('Setting up section observer for desktop (larger screens)');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    console.log('Service section intersection:', entry.isIntersecting);
                    if (entry.isIntersecting) {
                        console.log('Service section is visible on desktop, starting random animation');
                        if (!isMouseOverCard) {
                            startRandomAnimation();
                        }
                    } else {
                        console.log('Service section is not visible on desktop, stopping animation');
                        clearInterval(animationInterval);
                        serviceCards.forEach(card => {
                            const subtitle = card.querySelector('.subtitle');
                            if (subtitle) {
                                subtitle.style.cssText = `
                                    opacity: 0 !important;
                                    transform: translateY(20px) !important;
                                    transition: all 0.5s ease-in-out !important;
                                    position: static !important;
                                    bottom: auto !important;
                                    visibility: visible !important;
                                    display: flex !important;
                                    align-items: center !important;
                                    text-align: center !important;
                                    color: #666 !important;
                                    font-size: 0.95rem !important;
                                    line-height: 1.5 !important;
                                `;
                            }
                        });
                    }
                });
            }, {
                threshold: 0.3
            });

            observer.observe(serviceSection);
            console.log('Observer attached to service section for desktop');
        }
    }

    // Initialize service card effect
    initServiceCardEffect();

    // Portfolio Card Mobile Two-Click Behavior
    function initPortfolioMobileBehavior() {
        console.log('Checking mobile status for portfolio cards...');
        console.log('Window width:', window.innerWidth);
        console.log('isMobile() result:', isMobile());
        
        if (!isMobile()) {
            console.log('Desktop detected: Portfolio cards use normal hover behavior');
            return;
        }
        
        console.log('Mobile detected: Setting up two-click behavior for portfolio cards');
        
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        console.log('Found portfolio cards:', portfolioCards.length);
        
        const cardStates = new Map(); // Track which cards have been clicked once
        
        portfolioCards.forEach((card, index) => {
            const overlay = card.querySelector('.portfolio-card-overlay');
            const originalHref = card.getAttribute('href');
            
            console.log(`Portfolio card ${index}: href="${originalHref}", overlay found:`, !!overlay);
            
            if (!overlay) return;
            
            // Initialize card state
            cardStates.set(index, { 
                clicked: false, 
                href: originalHref,
                overlayVisible: false 
            });
            
            // Disable default link behavior on mobile - be more selective about preventDefault
            const handleCardClick = function(e) {
                console.log(`Portfolio card ${index}: Click event triggered`);
                
                // Only prevent default for actual clicks, not scroll events
                if (e.type === 'click' || e.type === 'touchend') {
                    e.preventDefault();
                    e.stopPropagation();
                }
                
                const state = cardStates.get(index);
                
                if (!state.clicked) {
                    // First click: Show caption
                    console.log(`Portfolio card ${index}: First click - showing caption`);
                    
                    // Show overlay with animation
                    overlay.style.cssText = `
                        opacity: 1 !important;
                        visibility: visible !important;
                        width: 100% !important;
                        height: 100% !important;
                        border-radius: 0 !important;
                        transition: all 0.3s ease-in-out !important;
                    `;
                    
                    // Update state
                    state.clicked = true;
                    state.overlayVisible = true;
                    cardStates.set(index, state);
                    
                    // Hide overlay after 5 seconds of inactivity
                    setTimeout(() => {
                        const currentState = cardStates.get(index);
                        if (currentState.overlayVisible) {
                            overlay.style.cssText = `
                                opacity: 0 !important;
                                visibility: hidden !important;
                                width: 0 !important;
                                height: 0 !important;
                                border-radius: 50% !important;
                                transition: all 0.3s ease-in-out !important;
                            `;
                            currentState.clicked = false;
                            currentState.overlayVisible = false;
                            cardStates.set(index, currentState);
                            console.log(`Portfolio card ${index}: Auto-hiding caption after 5 seconds`);
                        }
                    }, 5000);
                    
                } else {
                    // Second click: Navigate to link
                    console.log(`Portfolio card ${index}: Second click - navigating to ${state.href}`);
                    
                    if (state.href && state.href !== '#') {
                        window.open(state.href, '_blank');
                    } else {
                        console.log(`Portfolio card ${index}: No valid link to navigate to`);
                    }
                    
                    // Reset state
                    state.clicked = false;
                    state.overlayVisible = false;
                    cardStates.set(index, state);
                    
                    // Hide overlay
                    overlay.style.cssText = `
                        opacity: 0 !important;
                        visibility: hidden !important;
                        width: 0 !important;
                        height: 0 !important;
                        border-radius: 50% !important;
                        transition: all 0.3s ease-in-out !important;
                    `;
                }
            };
            
            // Add event listeners - use passive for touchstart to allow scrolling
            card.addEventListener('click', handleCardClick, false);
            
            // For touch devices, we need to be more careful about scrolling
            let touchStartY = 0;
            let touchStartTime = 0;
            
            card.addEventListener('touchstart', function(e) {
                touchStartY = e.touches[0].clientY;
                touchStartTime = Date.now();
            }, { passive: true });
            
            card.addEventListener('touchend', function(e) {
                const touchEndY = e.changedTouches[0].clientY;
                const touchEndTime = Date.now();
                const deltaY = Math.abs(touchEndY - touchStartY);
                const deltaTime = touchEndTime - touchStartTime;
                
                // Only treat as click if it's a short touch without much movement
                if (deltaY < 10 && deltaTime < 300) {
                    e.preventDefault(); // Only prevent default for actual taps
                    handleCardClick(e);
                }
                // If it's a scroll gesture, let it pass through naturally
            }, { passive: false });
            
            // Reset state when clicking outside the card
            document.addEventListener('click', function(e) {
                if (!card.contains(e.target)) {
                    const state = cardStates.get(index);
                    if (state && state.overlayVisible) {
                        overlay.style.cssText = `
                            opacity: 0 !important;
                            visibility: hidden !important;
                            width: 0 !important;
                            height: 0 !important;
                            border-radius: 50% !important;
                            transition: all 0.3s ease-in-out !important;
                        `;
                        state.clicked = false;
                        state.overlayVisible = false;
                        cardStates.set(index, state);
                        console.log(`Portfolio card ${index}: Hiding caption due to outside click`);
                    }
                }
            });
        });
    }

    // Initialize portfolio mobile behavior
    initPortfolioMobileBehavior();
});
// navbar toggle
$('#nav-toggle').click(function(){
    $(this).toggleClass('is-active')
    $('ul.nav').toggleClass('show');
});
// fullscreen
const fullscreenbtn = document.getElementById("scramble-logo");
const guide = document.getElementById("fullscreenGuide");

// Position guide above the logo
function showGuide() {
  const rect = fullscreenbtn.getBoundingClientRect();
  guide.style.left = rect.left + rect.width/2 + "px";
  guide.style.top = rect.bottom + 8 + "px"; // 8px below logo
  guide.style.opacity = 1;

  // Hide after 2 seconds
  setTimeout(() => {
    guide.style.opacity = 0;
  }, 4000);
}

// Show guide on page load
window.addEventListener("load", showGuide);

// Fullscreen toggle
fullscreenbtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.() ||
    document.documentElement.webkitRequestFullscreen?.() ||
    document.documentElement.msRequestFullscreen?.();
  } else {
    document.exitFullscreen?.() ||
    document.webkitExitFullscreen?.() ||
    document.msExitFullscreen?.();
  }
});

// Scroll on click
document.getElementById("scroll-down").addEventListener("click", function () {
  document.getElementById("about").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// Fade out on scroll
window.addEventListener("scroll", function () {
  const scrollDown = document.getElementById("scroll-down");
  if (window.scrollY > 50) {
    scrollDown.classList.add("hidden");
  } else {
    scrollDown.classList.remove("hidden");
  }
});