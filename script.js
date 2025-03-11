// Dark mode toggle
document.addEventListener('DOMContentLoaded', function() {
    // Theme functions
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Initialize theme based on localStorage or system preference
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(savedTheme);
    }

    // Set theme and update icon
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    }

    // Update icon based on current theme
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        } else {
            themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        }
    }

    // Toggle theme function
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        console.log('Theme toggled to:', newTheme); // Debug log
        updateParticles(); // Update particles when theme changes
    }

    // Create interactive background particles
    function createBackgroundParticles() {
        const bgAnimation = document.getElementById('bg-animation');
        console.log('Background container:', bgAnimation);
        
        if (!bgAnimation) {
            console.error('Background animation container not found!');
            return;
        }
        
        bgAnimation.innerHTML = ''; // Clear any existing elements
        console.log('Creating background elements...');
        
        // Create brick wall elements
        const brickCount = 15;
        for (let i = 0; i < brickCount; i++) {
            const brick = document.createElement('div');
            brick.classList.add('brick');
            
            // Random positioning
            brick.style.top = `${Math.random() * 100}vh`;
            brick.style.left = `${Math.random() * 100}vw`;
            
            // Random size
            const size = 30 + Math.random() * 50;
            brick.style.width = `${size}px`;
            brick.style.height = `${size / 2}px`;
            
            // Random rotation
            brick.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Animation delay
            brick.style.animationDelay = `${Math.random() * 5}s`;
            
            bgAnimation.appendChild(brick);
        }
        
        // Create web development elements
        const webElements = [
            { type: 'code-html', count: 5 },
            { type: 'code-css', count: 5 },
            { type: 'code-js', count: 5 },
            { type: 'ruler', count: 3 },
            { type: 'pen', count: 3 }
        ];
        
        webElements.forEach(element => {
            for (let i = 0; i < element.count; i++) {
                const webEl = document.createElement('div');
                webEl.classList.add('web-element', element.type);
                
                // Random positioning
                webEl.style.top = `${Math.random() * 100}vh`;
                webEl.style.left = `${Math.random() * 100}vw`;
                
                // Random size
                const size = 20 + Math.random() * 30;
                webEl.style.width = `${size}px`;
                webEl.style.height = `${size}px`;
                
                // Random rotation
                webEl.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                // Animation delay
                webEl.style.animationDelay = `${Math.random() * 5}s`;
                
                bgAnimation.appendChild(webEl);
            }
        });
        
        // Create garage mechanical tools
        const mechanicalTools = [
            { type: 'wrench', count: 4 },
            { type: 'screwdriver', count: 4 },
            { type: 'hammer', count: 3 },
            { type: 'gear', count: 6 },
            { type: 'pliers', count: 3 },
            { type: 'socket', count: 4 }
        ];
        
        mechanicalTools.forEach(tool => {
            for (let i = 0; i < tool.count; i++) {
                const mechTool = document.createElement('div');
                mechTool.classList.add('mechanical-tool', tool.type);
                
                // Random positioning
                mechTool.style.top = `${Math.random() * 100}vh`;
                mechTool.style.left = `${Math.random() * 100}vw`;
                
                // Random size
                const size = 25 + Math.random() * 35;
                mechTool.style.width = `${size}px`;
                mechTool.style.height = `${size}px`;
                
                // Random rotation
                mechTool.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                // Animation delay and duration
                mechTool.style.animationDelay = `${Math.random() * 5}s`;
                mechTool.style.animationDuration = `${20 + Math.random() * 15}s`;
                
                // Add interactive hover effect
                mechTool.addEventListener('mouseover', function() {
                    this.classList.add('hovered');
                    this.style.transform = `rotate(${Math.random() * 360}deg) scale(1.2)`;
                });
                
                mechTool.addEventListener('mouseout', function() {
                    this.classList.remove('hovered');
                    this.style.transform = `rotate(${Math.random() * 360}deg) scale(1)`;
                });
                
                // Add click interaction
                mechTool.addEventListener('click', function() {
                    this.classList.add('clicked');
                    // Random new position
                    this.style.top = `${Math.random() * 100}vh`;
                    this.style.left = `${Math.random() * 100}vw`;
                    
                    setTimeout(() => {
                        this.classList.remove('clicked');
                    }, 500);
                });
                
                bgAnimation.appendChild(mechTool);
            }
        });

        // Add cursor follow effect
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Apply subtle attraction to nearby elements
            const allElements = document.querySelectorAll('.brick, .web-element, .mechanical-tool');
            allElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Calculate distance from mouse to element
                const distance = Math.sqrt(
                    Math.pow(mouseX - centerX, 2) + 
                    Math.pow(mouseY - centerY, 2)
                );
                
                // Apply attraction if mouse is close enough
                if (distance < 150) {
                    const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
                    const attraction = 50 / (distance + 10); // More attraction when closer
                    
                    // Apply subtle movement toward cursor
                    const currentTransform = element.style.transform;
                    const translateX = Math.cos(angle) * attraction;
                    const translateY = Math.sin(angle) * attraction;
                    
                    element.style.transform = `${currentTransform.replace(/translate\([^)]*\)/, '')} translate(${translateX}px, ${translateY}px)`;
                }
            });
        });
    }

    // Update particles on resize and theme changes
    function updateParticles() {
        createBackgroundParticles();
    }

    // Typing animation
    const typingText = document.getElementById('typing-text');
    const phrases = [
        "LLM Practitioner",
        "Cybersecurity Researcher", 
        "AI Engineer"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Deleting
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Handle end of typing or deleting
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing, pause before deleting
            isDeleting = true;
            typingSpeed = 1000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }
        
        setTimeout(typeWriter, typingSpeed);
    }

    // Helper functions for cookie management
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        // Remove path restriction for better cross-domain support on GitHub Pages
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Set the date to count down to (2 months from deployment)
    function startCountdown() {
        // DEPLOYMENT DATE: Set this to your exact deployment date and time
        // Format: Year, Month (0-11), Day, Hour, Minute, Second
        const deploymentDate = new Date(2025, 2, 11, 6, 30, 0); // March 11, 2025, 06:30:00 AM
        
        // Calculate the end date (exactly 2 months after deployment)
        const targetDate = new Date(deploymentDate);
        targetDate.setMonth(deploymentDate.getMonth() + 2);
        
        console.log('Deployment date:', deploymentDate);
        console.log('Target end date:', targetDate);
        
        // Update the countdown every second
        const countdown = setInterval(function() {
            // Get current date and time
            const now = new Date().getTime();
            
            // Find the distance between now and the target date
            const distance = targetDate - now;
            
            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the results
            document.getElementById("days").textContent = days.toString().padStart(2, '0');
            document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
            document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
            
            // If the countdown is finished, clear the interval
            if (distance < 0) {
                clearInterval(countdown);
                document.querySelector(".development-notice").innerHTML = "<p>The new website is now available!</p>";
            }
        }, 1000);
    }

    // Update current year
    function updateCopyright() {
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }

    // Initialize all functionality
    initializeTheme();
    createBackgroundParticles();
    typeWriter();
    startCountdown();
    updateCopyright();
    
    // Add event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Update on resize with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createBackgroundParticles, 200);
    });
});
