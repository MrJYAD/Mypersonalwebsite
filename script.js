// Dark mode toggle
document.addEventListener('DOMContentLoaded', function() {
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
    }

    // Initialize theme first
    initializeTheme();
    
    // Add event listener to theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        console.log('Theme toggle listener added'); // Debug log
    } else {
        console.error('Theme toggle button not found!');
    }

    // Create interactive background particles
    function createBackgroundParticles() {
        const bgAnimation = document.getElementById('bg-animation');
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('bg-particle');
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            
            // Random size
            const size = Math.random() * 200 + 50;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random animation delay
            const delay = Math.random() * 10;
            particle.style.animationDelay = `${delay}s`;
            
            bgAnimation.appendChild(particle);
        }
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

    // Set the date to count down to (2 months from now)
    function startCountdown() {
        let targetDate;
        
        // Check if we already have a stored target date
        const storedTargetDate = localStorage.getItem('countdownTargetDate');
        
        if (storedTargetDate) {
            // Use the stored date if it exists
            targetDate = new Date(parseInt(storedTargetDate));
            
            // If the stored date is in the past (countdown ended), set a new date
            if (targetDate - new Date() <= 0) {
                const currentDate = new Date();
                targetDate = new Date(currentDate);
                targetDate.setMonth(currentDate.getMonth() + 2);
                localStorage.setItem('countdownTargetDate', targetDate.getTime().toString());
            }
        } else {
            // Set a new target date if none exists
            const currentDate = new Date();
            targetDate = new Date(currentDate);
            targetDate.setMonth(currentDate.getMonth() + 2);
            
            // Store the target date in localStorage
            localStorage.setItem('countdownTargetDate', targetDate.getTime().toString());
        }
        
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

    createBackgroundParticles();
    typeWriter();
    startCountdown();
    updateCopyright();
});
