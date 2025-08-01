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

    // Mobile detection function (global scope)
    function isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

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

//Background stars animation

    var Delaunay;!function(){"use strict";var r=1/1048576;function n(n,e,t,u){var i,l,o,a,f,h,s,I,c,N,p=n[e][0],g=n[e][1],v=n[t][0],E=n[t][1],T=n[u][0],b=n[u][1],k=Math.abs(g-E),m=Math.abs(E-b);if(k<r&&m<r)throw new Error("Eek! Coincident points!");return k<r?l=(a=-(T-v)/(b-E))*((i=(v+p)/2)-(h=(v+T)/2))+(I=(E+b)/2):m<r?l=(o=-(v-p)/(E-g))*((i=(T+v)/2)-(f=(p+v)/2))+(s=(g+E)/2):(i=((o=-(v-p)/(E-g))*(f=(p+v)/2)-(a=-(T-v)/(b-E))*(h=(v+T)/2)+(I=(E+b)/2)-(s=(g+E)/2))/(o-a),l=k>m?o*(i-f)+s:a*(i-h)+I),{i:e,j:t,k:u,x:i,y:l,r:(c=v-i)*c+(N=E-l)*N}}function e(r){var n,e,t,u,i,l;for(e=r.length;e;)for(u=r[--e],t=r[--e],n=e;n;)if(l=r[--n],t===(i=r[--n])&&u===l||t===l&&u===i){r.splice(e,2),r.splice(n,2);break}}Delaunay={triangulate:function(t,u){var i,l,o,a,f,h,s,I,c,N,p,g,v=t.length;if(v<3)return[];if(t=t.slice(0),u)for(i=v;i--;)t[i]=t[i][u];for(o=new Array(v),i=v;i--;)o[i]=i;for(o.sort((function(r,n){return t[n][0]-t[r][0]})),a=function(r){var n,e,t,u,i,l,o=Number.POSITIVE_INFINITY,a=Number.POSITIVE_INFINITY,f=Number.NEGATIVE_INFINITY,h=Number.NEGATIVE_INFINITY;for(n=r.length;n--;)r[n][0]<o&&(o=r[n][0]),r[n][0]>f&&(f=r[n][0]),r[n][1]<a&&(a=r[n][1]),r[n][1]>h&&(h=r[n][1]);return t=h-a,[[(i=o+.5*(e=f-o))-20*(u=Math.max(e,t)),(l=a+.5*t)-u],[i,l+20*u],[i+20*u,l-u]]}(t),t.push(a[0],a[1],a[2]),f=[n(t,v+0,v+1,v+2)],h=[],s=[],i=o.length;i--;s.length=0){for(g=o[i],l=f.length;l--;)(I=t[g][0]-f[l].x)>0&&I*I>f[l].r?(h.push(f[l]),f.splice(l,1)):I*I+(c=t[g][1]-f[l].y)*c-f[l].r>r||(s.push(f[l].i,f[l].j,f[l].j,f[l].k,f[l].k,f[l].i),f.splice(l,1));for(e(s),l=s.length;l;)p=s[--l],N=s[--l],f.push(n(t,N,p,g))}for(i=f.length;i--;)h.push(f[i]);for(f.length=0,i=h.length;i--;)h[i].i<v&&h[i].j<v&&h[i].k<v&&f.push(h[i].i,h[i].j,h[i].k);return f},contains:function(r,n){if(n[0]<r[0][0]&&n[0]<r[1][0]&&n[0]<r[2][0]||n[0]>r[0][0]&&n[0]>r[1][0]&&n[0]>r[2][0]||n[1]<r[0][1]&&n[1]<r[1][1]&&n[1]<r[2][1]||n[1]>r[0][1]&&n[1]>r[1][1]&&n[1]>r[2][1])return null;var e=r[1][0]-r[0][0],t=r[2][0]-r[0][0],u=r[1][1]-r[0][1],i=r[2][1]-r[0][1],l=e*i-t*u;if(0===l)return null;var o=(i*(n[0]-r[0][0])-t*(n[1]-r[0][1]))/l,a=(e*(n[1]-r[0][1])-u*(n[0]-r[0][0]))/l;return o<0||a<0||o+a>1?null:[o,a]}},"undefined"!=typeof module&&(module.exports=Delaunay)}();
    var particleCount = 40,
  flareCount = 10,
  motion = 0.05,
  tilt = 0.05,
  color = '#FFEED4',
  particleSizeBase = 1,
  particleSizeMultiplier = 0.5,
  flareSizeBase = 100,
  flareSizeMultiplier = 100,
  lineWidth = 1,
  linkChance = 75, // chance per frame of link, higher = smaller chance
  linkLengthMin = 5, // min linked vertices
  linkLengthMax = 7, // max linked vertices
  linkOpacity = 0.25; // number between 0 & 1
  linkFade = 90, // link fade-out frames
  linkSpeed = 1, // distance a link travels in 1 frame
  glareAngle = -60,
  glareOpacityMultiplier = 0.05,
  renderParticles = true,
  renderParticleGlare = true,
  renderFlares = true,
  renderLinks = true,
  renderMesh = false,
  flicker = true,
  flickerSmoothing = 15, // higher = smoother flicker
  blurSize = 0,
  orbitTilt = true,
  randomMotion = true,
  noiseLength = 1000,
  noiseStrength = 1;

var canvas = document.getElementById('stars'),
  //orbits = document.getElementById('orbits'),
  context = canvas.getContext('2d'),
  mouse = { x: 0, y: 0 },
  m = {},
  r = 0,
  c = 1000, // multiplier for delaunay points, since floats too small can mess up the algorithm
  n = 0,
  nAngle = (Math.PI * 2) / noiseLength,
  nRad = 100,
  nScale = 0.5,
  nPos = {x: 0, y: 0},
  points = [],
  vertices = [],
  triangles = [],
  links = [],
  particles = [],
  flares = [];

function init() {
  var i, j, k;

  // requestAnimFrame polyfill
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function( callback ){
          window.setTimeout(callback, 1000 / 60);
        };
  })();

  // Fade in background
  /*
  var background = document.getElementById('background'),
    bgImg = new Image(),
    bgURL = '/img/background.jpg';
  bgImg.onload = function() {
    //console.log('background loaded');
    background.style.backgroundImage = 'url("'+bgURL+'")';
    background.className += ' loaded';
  }
  bgImg.src = bgURL;
  */

  // Size canvas
  resize();

  mouse.x = canvas.clientWidth / 2;
  mouse.y = canvas.clientHeight / 2;

  // Create particle positions
  for (i = 0; i < particleCount; i++) {
    var p = new Particle();
    particles.push(p);
    points.push([p.x*c, p.y*c]);
  }

  //console.log(JSON.stringify(points));

  // Delaunay triangulation
  //var Delaunay = require('delaunay-fast');
  vertices = Delaunay.triangulate(points);
  //console.log(JSON.stringify(vertices));
  // Create an array of "triangles" (groups of 3 indices)
  var tri = [];
  for (i = 0; i < vertices.length; i++) {
    if (tri.length == 3) {
      triangles.push(tri);
      tri = [];
    }
    tri.push(vertices[i]);
  }
  //console.log(JSON.stringify(triangles));

  // Tell all the particles who their neighbors are
  for (i = 0; i < particles.length; i++) {
    // Loop through all tirangles
    for (j = 0; j < triangles.length; j++) {
      // Check if this particle's index is in this triangle
      k = triangles[j].indexOf(i);
      // If it is, add its neighbors to the particles contacts list
      if (k !== -1) {
        triangles[j].forEach(function(value, index, array) {
          if (value !== i && particles[i].neighbors.indexOf(value) == -1) {
            particles[i].neighbors.push(value);
          }
        });
      }
    }
  }
  //console.log(JSON.stringify(particles));

  if (renderFlares) {
    // Create flare positions
    for (i = 0; i < flareCount; i++) {
      flares.push(new Flare());
    }
  }

  // Motion mode
  //if (Modernizr && Modernizr.deviceorientation) {
  if ('ontouchstart' in document.documentElement && window.DeviceOrientationEvent) {
    console.log('Using device orientation');
    window.addEventListener('deviceorientation', function(e) {
      mouse.x = (canvas.clientWidth / 2) - ((e.gamma / 90) * (canvas.clientWidth / 2) * 2);
      mouse.y = (canvas.clientHeight / 2) - ((e.beta / 90) * (canvas.clientHeight / 2) * 2);
      //console.log('Center: x:'+(canvas.clientWidth/2)+' y:'+(canvas.clientHeight/2));
      //console.log('Orientation: x:'+mouse.x+' ('+e.gamma+') y:'+mouse.y+' ('+e.beta+')');
    }, true);
  }
  else {
    // Mouse move listener
    console.log('Using mouse movement');
    document.body.addEventListener('mousemove', function(e) {
      //console.log('moved');
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
  }

  // Random motion
  if (randomMotion) {
    //var SimplexNoise = require('simplex-noise');
    //var simplex = new SimplexNoise();
  }

  // Animation loop
  (function animloop(){
    requestAnimFrame(animloop);
    resize();
    render();
  })();
}

function render() {
  if (randomMotion) {
    n++;
    if (n >= noiseLength) {
      n = 0;
    }

    nPos = noisePoint(n);
    //console.log('NOISE x:'+nPos.x+' y:'+nPos.y);
  }

  // Clear
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (blurSize > 0) {
    context.shadowBlur = blurSize;
    context.shadowColor = color;
  }

  if (renderParticles) {
    // Render particles
    for (var i = 0; i < particleCount; i++) {
      particles[i].render();
    }
  }

  if (renderMesh) {
    // Render all lines
    context.beginPath();
    for (var v = 0; v < vertices.length-1; v++) {
      // Splits the array into triplets
      if ((v + 1) % 3 === 0) { continue; }

      var p1 = particles[vertices[v]],
        p2 = particles[vertices[v+1]];

      //console.log('Line: '+p1.x+','+p1.y+'->'+p2.x+','+p2.y);

      var pos1 = position(p1.x, p1.y, p1.z),
        pos2 = position(p2.x, p2.y, p2.z);

      context.moveTo(pos1.x, pos1.y);
      context.lineTo(pos2.x, pos2.y);
    }
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
    context.closePath();
  }

  if (renderLinks) {
    // Possibly start a new link
    if (random(0, linkChance) == linkChance) {
      var length = random(linkLengthMin, linkLengthMax);
      var start = random(0, particles.length-1);
      startLink(start, length);
    }

    // Render existing links
    // Iterate in reverse so that removing items doesn't affect the loop
    for (var l = links.length-1; l >= 0; l--) {
      if (links[l] && !links[l].finished) {
        links[l].render();
      }
      else {
        delete links[l];
      }
    }
  }

  if (renderFlares) {
    // Render flares
    for (var j = 0; j < flareCount; j++) {
      flares[j].render();
    }
  }

  /*
  if (orbitTilt) {
    var tiltX = -(((canvas.clientWidth / 2) - mouse.x + ((nPos.x - 0.5) * noiseStrength)) * tilt),
      tiltY = (((canvas.clientHeight / 2) - mouse.y + ((nPos.y - 0.5) * noiseStrength)) * tilt);

    orbits.style.transform = 'rotateY('+tiltX+'deg) rotateX('+tiltY+'deg)';
  }
  */
}

function resize() {
  canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
  canvas.height = canvas.width * (canvas.clientHeight / canvas.clientWidth);
}

function startLink(vertex, length) {
  //console.log('LINK from '+vertex+' (length '+length+')');
  links.push(new Link(vertex, length));
}

// Particle class
var Particle = function() {
  this.x = random(-0.1, 1.1, true);
  this.y = random(-0.1, 1.1, true);
  this.z = random(0,4);
  this.color = color;
  this.opacity = random(0.1,1,true);
  this.flicker = 0;
  this.neighbors = []; // placeholder for neighbors
};
Particle.prototype.render = function() {
  var pos = position(this.x, this.y, this.z),
    r = ((this.z * particleSizeMultiplier) + particleSizeBase) * (sizeRatio() / 1000),
    o = this.opacity;

  if (flicker) {
    var newVal = random(-0.5, 0.5, true);
    this.flicker += (newVal - this.flicker) / flickerSmoothing;
    if (this.flicker > 0.5) this.flicker = 0.5;
    if (this.flicker < -0.5) this.flicker = -0.5;
    o += this.flicker;
    if (o > 1) o = 1;
    if (o < 0) o = 0;
  }

  context.fillStyle = this.color;
  context.globalAlpha = o;
  context.beginPath();
  context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
  context.fill();
  context.closePath();

  if (renderParticleGlare) {
    context.globalAlpha = o * glareOpacityMultiplier;
    /*
    context.ellipse(pos.x, pos.y, r * 30, r, 90 * (Math.PI / 180), 0, 2 * Math.PI, false);
    context.fill();
    context.closePath();
    */
    context.ellipse(pos.x, pos.y, r * 100, r, (glareAngle - ((nPos.x - 0.5) * noiseStrength * motion)) * (Math.PI / 180), 0, 2 * Math.PI, false);
    context.fill();
    context.closePath();
  }

  context.globalAlpha = 1;
};

// Flare class
var Flare = function() {
  this.x = random(-0.25, 1.25, true);
  this.y = random(-0.25, 1.25, true);
  this.z = random(0,2);
  this.color = color;
  this.opacity = random(0.001, 0.01, true);
};
Flare.prototype.render = function() {
  var pos = position(this.x, this.y, this.z),
    r = ((this.z * flareSizeMultiplier) + flareSizeBase) * (sizeRatio() / 1000);

  // Feathered circles
  /*
  var grad = context.createRadialGradient(x+r,y+r,0,x+r,y+r,r);
  grad.addColorStop(0, 'rgba(255,255,255,'+f.o+')');
  grad.addColorStop(0.8, 'rgba(255,255,255,'+f.o+')');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = grad;
  context.beginPath();
  context.fillRect(x, y, r*2, r*2);
  context.closePath();
  */

  context.beginPath();
  context.globalAlpha = this.opacity;
  context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
  context.fillStyle = this.color;
  context.fill();
  context.closePath();
  context.globalAlpha = 1;
};

// Link class
var Link = function(startVertex, numPoints) {
  this.length = numPoints;
  this.verts = [startVertex];
  this.stage = 0;
  this.linked = [startVertex];
  this.distances = [];
  this.traveled = 0;
  this.fade = 0;
  this.finished = false;
};
Link.prototype.render = function() {
  // Stages:
  // 0. Vertex collection
  // 1. Render line reaching from vertex to vertex
  // 2. Fade out
  // 3. Finished (delete me)

  var i, p, pos, points;

  switch (this.stage) {
    // VERTEX COLLECTION STAGE
    case 0:

      // Grab the last member of the link
      var last = particles[this.verts[this.verts.length-1]];
      //console.log(JSON.stringify(last));
      if (last && last.neighbors && last.neighbors.length > 0) {
        // Grab a random neighbor
        var neighbor = last.neighbors[random(0, last.neighbors.length-1)];
        // If we haven't seen that particle before, add it to the link
        if (this.verts.indexOf(neighbor) == -1) {
          this.verts.push(neighbor);
        }
        // If we have seen that particle before, we'll just wait for the next frame
      }
      else {
        //console.log(this.verts[0]+' prematurely moving to stage 3 (0)');
        this.stage = 3;
        this.finished = true;
      }

      if (this.verts.length >= this.length) {
        // Calculate all distances at once
        for (i = 0; i < this.verts.length-1; i++) {
          var p1 = particles[this.verts[i]],
            p2 = particles[this.verts[i+1]],
            dx = p1.x - p2.x,
            dy = p1.y - p2.y,
            dist = Math.sqrt(dx*dx + dy*dy);

            this.distances.push(dist);
        }
        //console.log('Distances: '+JSON.stringify(this.distances));
        //console.log('verts: '+this.verts.length+' distances: '+this.distances.length);

        //console.log(this.verts[0]+' moving to stage 1');
        this.stage = 1;
      }
    break;

    // RENDER LINE ANIMATION STAGE
    case 1:
      if (this.distances.length > 0) {

        points = [];
        //var a = 1;

        // Gather all points already linked
        for (i = 0; i < this.linked.length; i++) {
          p = particles[this.linked[i]];
          pos = position(p.x, p.y, p.z);
          points.push([pos.x, pos.y]);
        }

        var linkSpeedRel = linkSpeed * 0.00001 * canvas.width;
        this.traveled += linkSpeedRel;
        var d = this.distances[this.linked.length-1];
        // Calculate last point based on linkSpeed and distance travelled to next point
        if (this.traveled >= d) {
          this.traveled = 0;
          // We've reached the next point, add coordinates to array
          //console.log(this.verts[0]+' reached vertex '+(this.linked.length+1)+' of '+this.verts.length);

          this.linked.push(this.verts[this.linked.length]);
          p = particles[this.linked[this.linked.length-1]];
          pos = position(p.x, p.y, p.z);
          points.push([pos.x, pos.y]);

          if (this.linked.length >= this.verts.length) {
            //console.log(this.verts[0]+' moving to stage 2 (1)');
            this.stage = 2;
          }
        }
        else {
          // We're still travelling to the next point, get coordinates at travel distance
          // http://math.stackexchange.com/a/85582
          var a = particles[this.linked[this.linked.length-1]],
            b = particles[this.verts[this.linked.length]],
            t = d - this.traveled,
            x = ((this.traveled * b.x) + (t * a.x)) / d,
            y = ((this.traveled * b.y) + (t * a.y)) / d,
            z = ((this.traveled * b.z) + (t * a.z)) / d;

          pos = position(x, y, z);

          //console.log(this.verts[0]+' traveling to vertex '+(this.linked.length+1)+' of '+this.verts.length+' ('+this.traveled+' of '+this.distances[this.linked.length]+')');

          points.push([pos.x, pos.y]);
        }

        this.drawLine(points);
      }
      else {
        //console.log(this.verts[0]+' prematurely moving to stage 3 (1)');
        this.stage = 3;
        this.finished = true;
      }
    break;

    // FADE OUT STAGE
    case 2:
      if (this.verts.length > 1) {
        if (this.fade < linkFade) {
          this.fade++;

          // Render full link between all vertices and fade over time
          points = [];
          var alpha = (1 - (this.fade / linkFade)) * linkOpacity;
          for (i = 0; i < this.verts.length; i++) {
            p = particles[this.verts[i]];
            pos = position(p.x, p.y, p.z);
            points.push([pos.x, pos.y]);
          }
          this.drawLine(points, alpha);
        }
        else {
          //console.log(this.verts[0]+' moving to stage 3 (2a)');
          this.stage = 3;
          this.finished = true;
        }
      }
      else {
        //console.log(this.verts[0]+' prematurely moving to stage 3 (2b)');
        this.stage = 3;
        this.finished = true;
      }
    break;

    // FINISHED STAGE
    case 3:
    default:
      this.finished = true;
    break;
  }
};
Link.prototype.drawLine = function(points, alpha) {
  if (typeof alpha !== 'number') alpha = linkOpacity;

  if (points.length > 1 && alpha > 0) {
    //console.log(this.verts[0]+': Drawing line '+alpha);
    context.globalAlpha = alpha;
    context.beginPath();
    for (var i = 0; i < points.length-1; i++) {
      context.moveTo(points[i][0], points[i][1]);
      context.lineTo(points[i+1][0], points[i+1][1]);
    }
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
    context.closePath();
    context.globalAlpha = 1;
  }
};


// Utils

function noisePoint(i) {
  var a = nAngle * i,
    cosA = Math.cos(a),
    sinA = Math.sin(a),
    //value = simplex.noise2D(nScale * cosA + nScale, nScale * sinA + nScale),
    //rad = nRad + value;
    rad = nRad;
  return {
    x: rad * cosA,
    y: rad * sinA
  };
}

function position(x, y, z) {
  return {
    x: (x * canvas.width) + ((((canvas.width / 2) - mouse.x + ((nPos.x - 0.5) * noiseStrength)) * z) * motion),
    y: (y * canvas.height) + ((((canvas.height / 2) - mouse.y + ((nPos.y - 0.5) * noiseStrength)) * z) * motion)
  };
}

function sizeRatio() {
  return canvas.width >= canvas.height ? canvas.width : canvas.height;
}

function random(min, max, float) {
  return float ?
    Math.random() * (max - min) + min :
    Math.floor(Math.random() * (max - min + 1)) + min;
}


// init
if (canvas) init();

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

  // 🔁 Loop for scramble-card-title
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

  // 🔁 Loop for scramble-logo
  function loopLogoScramble() {
    const sclogo = document.getElementById("scramble-logo");
    if (!sclogo) return;

    scrambleText(sclogo, "SERVER ADMINISTRATOR", 1200, 60, () => {
      setTimeout(() => {
        scrambleText(sclogo, "SANGEETH M K", 1000, 60, () => {
          setTimeout(loopLogoScramble, 10000); // restart after 10s
        });
      }, 1000); // wait 5s between the two texts
    });
  }

  // ✅ Start both independently
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(loopCardTitleScramble, 500);
    setTimeout(loopLogoScramble, 500);
  });


  // Certifications Filter Logic + Marquee Rebuild (mobile fix)
  document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.cert-filter-btn');
    const certRows = document.querySelectorAll('.cert-tiles-wrapper .cert-row');
    // Store all original tiles for each row, then remove them from DOM
    const originalTiles = Array.from(certRows).map(row => {
      const tiles = Array.from(row.querySelectorAll('.cert-tile'));
      tiles.forEach(tile => tile.remove()); // Remove static tiles
      return tiles;
    });

    function isMobile() {
      return window.innerWidth < 992;
    }

    function createShowMoreBtn(row, inner, tiles, idx) {
      let showMoreBtn = row.querySelector('.cert-show-more-btn');
      if (!showMoreBtn) {
        showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'cert-show-more-btn';
        showMoreBtn.textContent = 'Show More';
        showMoreBtn.style.display = 'block';
        showMoreBtn.style.margin = '16px auto 5px auto';
        showMoreBtn.style.padding = '8px 24px';
        showMoreBtn.style.borderRadius = '20px';
        showMoreBtn.style.background = '#222';
        showMoreBtn.style.color = '#fff';
        showMoreBtn.style.border = 'none';
        showMoreBtn.style.fontSize = '1rem';
        showMoreBtn.style.cursor = 'pointer';
        row.appendChild(showMoreBtn);
      }
      let expanded = false;
      showMoreBtn.onclick = function() {
        expanded = !expanded;
        inner.innerHTML = '';
        if (expanded) {
          tiles.forEach(tile => inner.appendChild(tile.cloneNode(true)));
          showMoreBtn.textContent = 'Show Less';
        } else {
          tiles.slice(0, 4).forEach(tile => inner.appendChild(tile.cloneNode(true)));
          showMoreBtn.textContent = 'Show More';
        }
      };
    }

    function addMarqueeAnimation(inner, row) { 
      inner.classList.remove('cert-marquee-anim');
      inner.style.animation = 'none';
      // Use left-to-right animation
      const rowWidth = row.offsetWidth;
      const contentWidth = inner.scrollWidth;
      if (contentWidth > rowWidth) {
        const duration = Math.max(10, Math.round(contentWidth / 100)) + 's';
        inner.style.animation = `cert-marquee-scroll ${duration} linear infinite`;
        inner.classList.add('cert-marquee-anim');
      }
    }

    function rebuildMarqueeRows(filter) {
      certRows.forEach(function(row, idx) {
        // Remove old inner
        const oldInner = row.querySelector('.cert-row-inner');
        if (oldInner) oldInner.remove();
        // Remove old show more button
        const oldBtn = row.querySelector('.cert-show-more-btn');
        if (oldBtn) oldBtn.remove();
        // Filter tiles
        let tiles = originalTiles[idx].filter(tile => {
          if (filter === 'all') return true;
          const cats = tile.getAttribute('data-category').split(',').map(c => c.trim());
          return cats.includes(filter);
        });
        // If no tiles, hide row
        if (tiles.length === 0) {
          row.style.display = 'none';
          return;
        } else {
          row.style.display = '';
        }
        // Build new inner
        var inner = document.createElement('div');
        inner.className = 'cert-row-inner';
        if (isMobile()) {
          // On mobile, show only 4 tiles, with Show More button if more than 4
          tiles.slice(0, 4).forEach(function(tile) { inner.appendChild(tile.cloneNode(true)); });
          row.appendChild(inner);
          if (tiles.length > 4) {
            createShowMoreBtn(row, inner, tiles, idx);
          }
          inner.style.animation = 'none';
          inner.style.justifyContent = '';
        } else {
          if (filter === 'all') {
            // Desktop: animated infinite marquee, all tiles scroll, no button
            tiles.forEach(function(tile) { inner.appendChild(tile.cloneNode(true)); });
            tiles.forEach(function(tile) { inner.appendChild(tile.cloneNode(true)); });
            row.appendChild(inner);
            requestAnimationFrame(function() {
              addMarqueeAnimation(inner, row);
            });
            inner.style.justifyContent = '';
          } else {
            // Desktop: filtered, just list the tiles, no scroll, no animation, center align
            tiles.forEach(function(tile) { inner.appendChild(tile.cloneNode(true)); });
            row.appendChild(inner);
            inner.style.animation = 'none';
            inner.style.display = 'flex';
            inner.style.justifyContent = 'center';
            inner.style.alignItems = 'center';
            inner.style.width = '100%';
          }
        }
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        rebuildMarqueeRows(filter);
      });
    });

    // Initial build
    rebuildMarqueeRows('all');

    // Pause animation on hover (desktop only)
    certRows.forEach(function(row) {
      row.addEventListener('mouseenter', function() {
        if (isMobile()) return;
        var inner = row.querySelector('.cert-row-inner');
        if (inner) inner.style.animationPlayState = 'paused';
      });
      row.addEventListener('mouseleave', function() {
        if (isMobile()) return;
        var inner = row.querySelector('.cert-row-inner');
        if (inner) inner.style.animationPlayState = '';
      });
    });

    // Rebuild on resize to switch between mobile/desktop
    window.addEventListener('resize', function() {
      const activeBtn = document.querySelector('.cert-filter-btn.active');
      const filter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
      rebuildMarqueeRows(filter);
    });
  });

  function revealOnScroll() {
    const elements = document.querySelectorAll('.fly-in-left , .fly-in-right, .fly-in-flip-up, .fly-in-pop');
    const triggerBottom = window.innerHeight * 0.9;

    elements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible'); // Optional: remove if you want one-time animation
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll); // Run on page load


  // Sphere Animation

const sphere = document.getElementById("sphere");
const scontainer = document.getElementById("scontainer");

const sphereitems = [
  { title: "Excel", image: "assets/imgs/logos/excel.png" },
  { title: "Windows Server:2022", image: "assets/icons/sphere-icons/ws-2022.webp" },
  { title: "Azure", image: "assets/icons/sphere-icons/azure.webp" },
  { title: "VMware Workstation", image: "assets/icons/sphere-icons/vmwarews.png" },
  { title: "FortiGate 100F", image: "assets/icons/sphere-icons/fortinet.jpg" },
  { title: "AWS", image: "assets/imgs/logos/amazon_web_services_logo.jpg" },
  { title: "VxRail", image: "assets/icons/sphere-icons/vxrail.webp" },
  { title: "Visual StudioCode", image: "assets/icons/sphere-icons/vs.png" },
  { title: "Windows 7", image: "assets/icons/sphere-icons/win7.webp" },
  { title: "Sophos XG210", image: "assets/icons/sphere-icons/sophos.png" },
  { title: "Cyberoam", image: "assets/icons/sphere-icons/cyberoam.png" },
  { title: "Word", image: "assets/icons/sphere-icons/word.webp" },
  { title: "HTML", image: "assets/icons/sphere-icons/html.png" },
  { title: "CSS", image: "assets/icons/sphere-icons/css.png" },
  { title: "RHEL 8", image: "assets/imgs/logos/red_hat_logo.jpg" },
  { title: "MSSQL", image: "assets/icons/sphere-icons/mssql.png" },
  { title: "Veeam Backup & Replication", image: "assets/icons/sphere-icons/veeam.png" },
  { title: "Windows XP", image: "assets/icons/sphere-icons/winxp.webp" },
  { title: "Windows 10", image: "assets/icons/sphere-icons/win10.jpg" },
  { title: "VMware vSphere", image: "assets/icons/sphere-icons/vsphere.webp" },
  { title: "Azure Functions", image: "assets/icons/sphere-icons/azuref.png" },
  { title: "Python", image: "assets/icons/sphere-icons/python.png" },
  { title: "ManageEngine EndpointCentral", image: "assets/icons/sphere-icons/me.webp" },
  { title: "ManageEngine ServiceDeskPlus", image: "assets/icons/sphere-icons/me-sdp.webp" },
  { title: "Github", image: "assets/icons/sphere-icons/github.webp" },
  { title: "Hyper-V", image: "assets/icons/sphere-icons/hyper-v.webp" },
  { title: "Zabbix Monitoring", image: "assets/icons/sphere-icons/zabbix.png" },
  { title: "WSUS", image: "assets/icons/sphere-icons/wsus.webp" },
  { title: "Windows Server:2012", image: "assets/icons/sphere-icons/ws2012.svg" },
  { title: "Windows Server:2019", image: "assets/icons/sphere-icons/ws2019.svg" },
  { title: "Wireshark", image: "assets/icons/sphere-icons/wireshark.svg" },
  { title: "Active Directory", image: "assets/icons/sphere-icons/adfs.svg" },
  { title: "PowerShell", image: "assets/icons/sphere-icons/ps.svg" },
  { title: "CCTV", image: "assets/icons/sphere-icons/cctv.svg" },
  { title: "RAID Storage", image: "assets/icons/sphere-icons/raid.jpg" },
  { title: "FortiGate 200E", image: "assets/icons/sphere-icons/fortinet.jpg" },
  { title: "Network Switch", image: "assets/icons/sphere-icons/ns.png" },
  { title: "Remote Desktop", image: "assets/icons/sphere-icons/rds.svg" },
  { title: "JWT Token", image: "assets/icons/sphere-icons/jwt-3.svg" },
  { title: "AWS EC2", image: "assets/icons/sphere-icons/aws-ec2.svg" },
  { title: "Windows AdminCenter", image: "assets/icons/sphere-icons/admincenter.svg" },
  { title: "Node.JS", image: "assets/icons/sphere-icons/node.js.webp" },
  { title: "SUSE", image: "assets/icons/sphere-icons/suse.webp" },
  { title: "ChatGPT", image: "assets/icons/sphere-icons/chatgpt.svg" },
  { title: "FortiGate 80E", image: "assets/icons/sphere-icons/fortinet.jpg" },
  { title: "Deepseek", image: "assets/icons/sphere-icons/deepseek.svg" },
  { title: "Perplexity", image: "assets/icons/sphere-icons/perplexity.svg" },
  { title: "Gemini", image: "assets/icons/sphere-icons/gemini.webp" },
  { title: "NAT", image: "assets/icons/sphere-icons/nat.svg" }
];

let rotX = 0, rotY = 0;
let isDragging = false;
let lastX = 0, lastY = 0;

function deg(rad) {
  return rad * 180 / Math.PI;
}

function getRadius() {
  return scontainer.offsetWidth / 2 - 40;
}

function createItemsOnSphere() {
  sphere.innerHTML = '';
  const radius = getRadius();
  const sphereitemCount = sphereitems.length;
  for (let i = 0; i < sphereitemCount; i++) {
    const offset = 2 / sphereitemCount;
    const increment = Math.PI * (3 - Math.sqrt(5));
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;

    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;

    const theta = Math.atan2(z, x);
    const phiAngle = Math.acos(y);

    const sphereitem = document.createElement('div');
    sphereitem.className = 'sphereitem';
    sphereitem.style.transform = `
      translate(-50%, -50%)
      rotateY(${deg(theta)}deg)
      rotateX(${deg(phiAngle) - 90}deg)
      translateZ(${radius}px)
    `;

    const content = document.createElement('div');
    content.className = 'sphereitem-content';
    content.innerHTML = `
      <div class="img-glow"><img src="${sphereitems[i].image}" /></div>
      <div class="text-glow">${sphereitems[i].title}</div>
    `;

    sphereitem.appendChild(content);
    sphere.appendChild(sphereitem);
  }
}

function setRotation(x, y) {
  sphere.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
}

function scaleItems(enlarge) {
  document.querySelectorAll('.sphereitem-content').forEach(el => {
    el.classList.toggle('scaled', enlarge);
  });
  scontainer.classList.toggle('enlarged', enlarge);
}

const start = (x, y) => {
  isDragging = true;
  lastX = x;
  lastY = y;
  scaleItems(true);
  scontainer.pointerEvents = 'none';
};

const move = (x, y) => {
  if (!isDragging) return;
  const dx = x - lastX;
  const dy = y - lastY;
  rotY += dx * 0.3;
  rotX -= dy * 0.3;
  setRotation(rotX, rotY);
  lastX = x;
  lastY = y;
};

const end = () => {
  isDragging = false;
  scaleItems(false);
  scontainer.pointerEvents = '';
};

// Mouse events
document.addEventListener('mousedown', e => start(e.clientX, e.clientY));
document.addEventListener('mousemove', e => move(e.clientX, e.clientY));
document.addEventListener('mouseup', end);

// Touch events with scroll detection
let touchStartX = 0;
let touchStartY = 0;
let touchMoved = false;

document.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchMoved = false;
}, { passive: true });

document.addEventListener('touchmove', e => {
  const deltaX = e.touches[0].clientX - touchStartX;
  const deltaY = e.touches[0].clientY - touchStartY;

  if (!touchMoved) {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal drag: rotate sphere
      touchMoved = true;
      start(touchStartX, touchStartY);
    } else {
      return; // Allow vertical scroll
    }
  }

  // Only when dragging the sphere
  if (isDragging) {
    move(e.touches[0].clientX, e.touches[0].clientY);
    e.preventDefault(); // Prevent scroll during sphere drag
  }
}, { passive: false });

document.addEventListener('touchend', end);


// Auto-rotate
setInterval(() => {
  if (!isDragging) {
    rotY += 0.2;
    setRotation(rotX, rotY);
  }
}, 30);

// Re-render on resize
window.addEventListener('resize', createItemsOnSphere);
createItemsOnSphere();
