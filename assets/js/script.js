$(document).ready(function () {

    // Toggle menu icon and navbar list
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Handle scroll and load events
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        // Scroll to top button active class
        if ($(window).scrollTop() > 120) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        // Active link highlighting on scroll
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let id = $(this).attr('id');
            let top = $(window).scrollTop();

            if (top >= offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Smooth scrolling for scroll-to-top and Quick Links
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    // Initialize Typed.js typing animation
    if ($('.typing-text').length) {
        new Typed('.typing-text', {
            strings: [
                'Full Stack Development ',
                'DevOps/Cloud ',
                'GenAI Integration ',
                'Machine Learning '
            ],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 1500,
            loop: true
        });
    }

    // Initialize Vanilla Tilt effect
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    // Initialize ScrollReveal animations
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'top',
            distance: '60px',
            duration: 1000,
            delay: 100,
            reset: false // Keep it clean by only animating in once
        });

        // Hero/Home section reveals
        sr.reveal('.home .content h2', { delay: 100 });
        sr.reveal('.home .content p', { delay: 150 });
        sr.reveal('.home .btn', { delay: 200, origin: 'bottom' });
        sr.reveal('.home .socials', { delay: 250, origin: 'bottom' });
        sr.reveal('.home .hero-terminal', { delay: 150, origin: 'right' });

        // About section reveals
        sr.reveal('.about .heading', { delay: 100 });
        sr.reveal('.about .about-pillars', { delay: 150, origin: 'left' });
        sr.reveal('.about .row .content', { delay: 150, origin: 'right' });

        // Skills section reveals
        sr.reveal('.skills .heading', { delay: 100 });
        sr.reveal('.skills .container', { delay: 150, scale: 0.9 });
        sr.reveal('.skills .container .bar', { delay: 200, interval: 50 });

        // Experience section reveals
        sr.reveal('.experience .heading', { delay: 100 });
        sr.reveal('.experience .box-container .box', { delay: 150, interval: 100, origin: 'bottom' });

        // Work/Projects section reveals
        sr.reveal('.work .heading', { delay: 100 });
        sr.reveal('.work .box-container .box', { delay: 150, interval: 100, scale: 0.95 });

        // Education section reveals
        sr.reveal('.education .heading', { delay: 100 });
        sr.reveal('.education .qoute', { delay: 120 });
        sr.reveal('.education .box-container .box', { delay: 150, interval: 100, origin: 'bottom' });
    }

    // Dynamic Hero Terminal Functionality
    const stdin = $('#terminal-stdin');
    const typedText = $('#terminal-typed-text');
    const terminalHistory = $('.terminal-history');
    const terminalContainer = $('#terminal-terminal');

    if (stdin.length && terminalContainer.length) {
        // Focus the hidden input when clicking anywhere on the terminal
        terminalContainer.on('click', function () {
            stdin.focus();
        });

        // Sync text typing to the visible display span
        stdin.on('input', function () {
            typedText.text($(this).val());
        });

        // Handle Enter key for command execution
        stdin.on('keydown', function (e) {
            if (e.key === 'Enter') {
                const command = $(this).val().trim();
                const cleanCommand = command.toLowerCase();

                // Append the typed command to history log
                terminalHistory.append(`<div class="code-line"><span class="cmd">$</span> ${command}</div>`);

                // Clear input display
                $(this).val('');
                typedText.text('');

                // Evaluate command
                if (cleanCommand === 'help') {
                    terminalHistory.append(`
                        <div class="code-line output">
                          &gt; Available commands: <span class="status-badge">skills</span>, <span class="status-badge">projects</span>, <span class="status-badge">contact</span>, <span class="status-badge">clear</span>
                        </div>
                    `);
                } else if (cleanCommand === 'skills') {
                    terminalHistory.append(`
                        <div class="code-line output">
                          <pre>{
  "frontend": ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
  "backend": ["Node.js", "Express", "MySQL", "PHP", "Java", "Python"],
  "cloud_devops": ["AWS", "GCP", "CI/CD", "Docker", "Git", "GitHub"],
  "ai_genai": ["Gemini API", "OpenAI API", "Claude API", "AWS Bedrock"]
}</pre>
                        </div>
                    `);
                } else if (cleanCommand === 'projects') {
                    terminalHistory.append(`
                        <div class="code-line output">
                          &gt; Selected projects:<br>
                          - <strong>Positions (CareerX)</strong>: Candidate workflow & resume parser.<br>
                          - <strong>CareerXcelerator</strong>: Interactive student guidance via multi-LLM.<br>
                          - <strong>Samastha</strong>: Backend REST APIs & prompt handling optimization.<br>
                          - <strong>Neural Network Robustness</strong>: Mathematical defenses in PyTorch.
                        </div>
                    `);
                } else if (cleanCommand === 'contact') {
                    terminalHistory.append(`
                        <div class="code-line output">
                          &gt; Direct links:<br>
                          - Email: <a href="mailto:mounikarangisetty8@gmail.com" style="color: #58a6ff;">mounikarangisetty8@gmail.com</a><br>
                          - LinkedIn: <a href="https://www.linkedin.com/in/mounika-rangisetty-244719261" target="_blank" style="color: #58a6ff;">mounika-rangisetty</a><br>
                          - GitHub: <a href="https://github.com/MounikaRangisetty/" target="_blank" style="color: #58a6ff;">MounikaRangisetty</a>
                        </div>
                    `);
                } else if (cleanCommand === 'clear') {
                    terminalHistory.empty();
                } else if (cleanCommand !== '') {
                    terminalHistory.append(`
                        <div class="code-line output" style="color: #ff5f56;">
                          &gt; Command not found: '${command}'. Type 'help' for options.
                        </div>
                    `);
                }

                // Scroll to the bottom of the terminal
                terminalContainer.scrollTop(terminalContainer[0].scrollHeight);
            }
        });
    }
});
