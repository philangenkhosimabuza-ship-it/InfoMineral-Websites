
        // Enhanced JavaScript with Modern Interactions
        document.addEventListener('DOMContentLoaded', () => {
            initMobileMenu();
            initScrollEffects();
            initRevealAnimations();
            initParallaxEffects();
            initFormValidation();
            initSmoothScroll();
            initHeaderScroll();
            initCounterAnimation();
            initHoverEffects();
        });

        // Mobile Menu Toggle with Animation
        function initMobileMenu() {
            const menuBtn = document.querySelector('.mobile-menu-btn');
            const closeBtn = document.querySelector('.close-menu');
            const mobileMenu = document.querySelector('.mobile-menu');
            const overlay = document.createElement('div');
            
            overlay.classList.add('menu-overlay');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1000;
            `;
            document.body.appendChild(overlay);

            function openMenu() {
                mobileMenu.classList.add('active');
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
                document.body.style.overflow = 'hidden';
            }

            function closeMenu() {
                mobileMenu.classList.remove('active');
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
                document.body.style.overflow = '';
            }

            menuBtn?.addEventListener('click', openMenu);
            closeBtn?.addEventListener('click', closeMenu);
            overlay.addEventListener('click', closeMenu);

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                    closeMenu();
                }
            });
        }

        // Scroll Effects
        function initHeaderScroll() {
            const header = document.querySelector('.header');
            let lastScroll = 0;

            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;

                if (currentScroll > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                if (currentScroll > lastScroll && currentScroll > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }

                lastScroll = currentScroll;
            });
        }

        // Reveal Animations on Scroll
        function initRevealAnimations() {
            const revealElements = document.querySelectorAll('.service-card, .feature-card, .stat-item, .footer-section');
            
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach(element => {
                element.classList.add('reveal');
                revealObserver.observe(element);
            });
        }

        // Parallax Effects
        function initParallaxEffects() {
            const hero = document.querySelector('.hero');

            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                
                if (hero) {
                    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
                }
            });
        }

        // Counter Animation
        function initCounterAnimation() {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const target = parseInt(element.innerText);
                        animateCounter(element, 0, target, 2000);
                    }
                });
            }, { threshold: 0.5 });

            statNumbers.forEach(number => counterObserver.observe(number));
        }

        function animateCounter(element, start, end, duration) {
            let startTimestamp = null;
            
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const currentValue = Math.floor(progress * (end - start) + start);
                
                if (element.innerText.includes('+')) {
                    element.innerText = currentValue + '+';
                } else if (element.innerText.includes('%')) {
                    element.innerText = currentValue + '%';
                } else {
                    element.innerText = currentValue;
                }
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            
            window.requestAnimationFrame(step);
        }

        // Form Validation
        function initFormValidation() {
            const form = document.getElementById('contactForm');
            
            if (!form) return;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                let isValid = true;
                const inputs = form.querySelectorAll('input, textarea, select');
                
                inputs.forEach(input => {
                    if (!validateField(input)) {
                        isValid = false;
                    }
                });

                if (isValid) {
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerText;
                    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
                    submitBtn.disabled = true;

                    await new Promise(resolve => setTimeout(resolve, 2000));

                    showNotification('Thank you for your message. We will contact you shortly!', 'success');
                    
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
        }

        function validateField(field) {
            const value = field.value.trim();
            let isValid = true;
            let errorMessage = '';

            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            field.classList.remove('error');

            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'This field is required';
            } else if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
            } else if (field.id === 'phone' && value) {
                const phoneRegex = /^[0-9+\-\s]+$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
            }

            if (!isValid && errorMessage) {
                field.classList.add('error');
                const error = document.createElement('div');
                error.className = 'error-message';
                error.innerText = errorMessage;
                field.parentNode.appendChild(error);
            }

            return isValid;
        }

        // Notification System
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <span>${message}</span>
                    <button class="notification-close">&times;</button>
                </div>
            `;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }, 5000);

            notification.querySelector('.notification-close').addEventListener('click', () => {
                notification.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            });
        }

        // Smooth Scroll
        function initSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    
                    if (href !== '#') {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        
                        if (target) {
                            const headerOffset = 100;
                            const elementPosition = target.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        }

        // Hover Effects
        function initHoverEffects() {
            const buttons = document.querySelectorAll('.btn');
            
            buttons.forEach(button => {
                button.addEventListener('mousemove', (e) => {
                    const rect = button.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const deltaX = (x - centerX) / centerX * 10;
                    const deltaY = (y - centerY) / centerY * 10;
                    
                    button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                });
                
                button.addEventListener('mouseleave', () => {
                    button.style.transform = '';
                });
            });
        }
   