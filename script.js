const toggleMenu = () => {
    const nav = document.getElementById('navMenu');
    const contactBtn = document.querySelector('.contact-btn');
    const toggleIcon = document.querySelector('.mobile-toggle');

    nav.classList.toggle('active');
    contactBtn.classList.toggle('active');

    toggleIcon.textContent = nav.classList.contains('active') ? '✖' : '☰';
  };
      document.querySelectorAll('#navMenu a, .contact-btn button').forEach(item => {
      item.addEventListener('click', () => {
        const nav = document.getElementById('navMenu');
        const contactBtn = document.querySelector('.contact-btn');
        const toggleIcon = document.querySelector('.mobile-toggle');

        nav.classList.remove('active');
        contactBtn.classList.remove('active');
        toggleIcon.textContent = '☰';
      });
    });
    document.addEventListener("DOMContentLoaded", () => {
      const slides = Array.from(document.querySelectorAll('.slide-content'));
      const carousel = document.querySelector('.carousel-wrapper');
      const positions = ['center', 'left1', 'left2', 'right2', 'right1'];
      let order = [0, 1, 2, 3, 4];

      let autoplayInterval = null;
      let resumeTimeout = null;
      let isHovered = false;

      const bgColors = [
        'linear-gradient(to right, #fc00ff, #00dbde)',
        'linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%)',
        'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)',
        'linear-gradient(135deg,rgb(1, 119, 155) 0%,rgb(12, 48, 84) 50%,rgb(3, 31, 53) 100%)',
        'linear-gradient(135deg,rgb(5, 2, 13) 0%,rgb(23, 8, 66) 50%,rgb(36, 5, 108) 100%)'
];
      const homeSection = document.querySelector('.home');

      function changeBackground() {
  const centerIndex = order[0];
  // document.body.style.backgroundImage = bgColors[centerIndex % bgColors.length];
  // document.body.style.backgroundSize = '200% 200%';
  // document.body.style.animation = 'gradientShift 15s ease infinite';
  homeSection.style.backgroundImage = bgColors[centerIndex % bgColors.length];
  homeSection.style.backgroundSize = '200% 200%';
  homeSection.style.animation = 'gradientShift 15s ease infinite';
  // Remove existing grid if present
  const existingGrid = document.getElementById('gridOverlay');
  if (existingGrid) existingGrid.remove();
  
  // Create grid overlay
  const gridOverlay = document.createElement('div');
  gridOverlay.id = 'gridOverlay';
  gridOverlay.style.position = 'absolute'; // Changed from absolute to fixed
  gridOverlay.style.top = '0';
  gridOverlay.style.left = '0';
  gridOverlay.style.width = '100%';
  gridOverlay.style.height = '100%';
  gridOverlay.style.backgroundImage = 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)';
  gridOverlay.style.backgroundSize = '100px 100px';
  gridOverlay.style.pointerEvents = 'none';
  gridOverlay.style.zIndex = '-1'; // Ensure it stays behind content
  
  // document.body.appendChild(gridOverlay);
   homeSection.appendChild(gridOverlay);
}
    function applyOrder() {
        const orderedSlides = order.map(i => slides[i]);
        orderedSlides.forEach((slide, i) => {
          slide.className = 'slide-content';
          slide.classList.add(positions[i]);
        });
        changeBackground();
      }

      function rotateLeft() {
        order.push(order.shift());
        applyOrder();
      }

      function rotateRight() {
        order.unshift(order.pop());
        applyOrder();
      }

      function handleSlideClick(index) {
        pauseAutoplay();
        const centerIndex = order.indexOf(index);
        if (centerIndex === 0) {
          const imageSrc = slides[index].querySelector('img').src;
          window.open(imageSrc, '_blank');
          return;
        }
        while (order.indexOf(index) !== 0) {
          rotateLeft();
        }
      }

      slides.forEach((slide, i) => {
        slide.addEventListener('click', () => handleSlideClick(i));
      });

      carousel.addEventListener('mouseenter', () => {
        isHovered = true;
        clearInterval(autoplayInterval);
        clearTimeout(resumeTimeout);
      });

      carousel.addEventListener('mouseleave', () => {
        isHovered = false;
        resumeTimeout = setTimeout(() => {
          if (!isHovered) startAutoplay();
        }, 0);
      });
      function startAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(() => {
          rotateLeft();
        }, 3000);
      }

      function pauseAutoplay() {
        clearInterval(autoplayInterval);
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
          if (!isHovered) startAutoplay();
        }, 3000);
      }

      function nextSlide() {
        pauseAutoplay();
        rotateLeft();
      }

      function prevSlide() {
        pauseAutoplay();
        rotateRight();
      }


      applyOrder();
      startAutoplay();

      window.nextSlide = nextSlide;
      window.prevSlide = prevSlide;
      window.closeModal = closeModal;
    });
    
    document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.querySelector('.about-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSection.classList.add('active');
                
                // Reset animation when section goes out of view
                observer.unobserve(aboutSection);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(aboutSection);
    
    // Optional: Re-trigger animation when navigating back to section
    document.querySelectorAll('a[href*="#about"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (aboutSection.classList.contains('active')) {
                aboutSection.classList.remove('active');
                setTimeout(() => {
                    aboutSection.classList.add('active');
                }, 50);
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });
    
  })

  document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  });
    const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: `"Abdulmejid's design transformed our platform. The new interface increased our conversion rate by 40% in just two months while improving usability."`
  },
  {
    name: 'Michael Chen',
    role: 'Founder, EduTech Solutions',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    text: `"Working with Abdulmejid was exceptional. His attention to detail and problem-solving skills delivered a mobile app that exceeded all our expectations."`
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Director, HealthPlus',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    text: `"Our patient dashboard is now more intuitive than ever. Abdulmejid's UX expertise made complex medical data accessible to our entire staff."`
  },
  {
    name: 'David Wilson',
    role: 'Marketing Director',
    image: 'https://randomuser.me/api/portraits/men/30.jpg',
    text: `"The e-commerce redesign resulted in a 35% boost in conversions. Abdulmejid's strategic UX approach combined with stunning visuals is unmatched."`
  },
  {
    name: 'Lisa Thompson',
    role: 'Product Manager',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    text: `"Abdulmejid brought our complex data visualization project to life with clean, efficient code delivered consistently ahead of schedule."`
  }
];

  const track = document.getElementById('track');
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');

  let currentIndex = 0;
  let isTransitioning = false;

  // Duplicate items at beginning and end for infinite loop illusion
  const allCards = [...testimonials.slice(-3), ...testimonials, ...testimonials.slice(0, 3)];

  allCards.forEach(testimonial => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="testimonial-border"></div>
      <div class="testimonial-content">
        <div class="client-info">
          <div class="client-avatar">
            <img src="${testimonial.image}" alt="${testimonial.name}" />
          </div>
          <div class="client-details">
            <h3>${testimonial.name}</h3>
            <p class="client-role">${testimonial.role}</p>
          </div>
        </div>
        <div class="stars">★★★★★</div>
        <blockquote>${testimonial.text}</blockquote>
      </div>
    `;
    track.appendChild(card);
  });

  const cardWidth = track.querySelector('.testimonial-card').offsetWidth + 30;
  const total = allCards.length;

  track.scrollLeft = cardWidth * 3;
  currentIndex = 3;

  function scrollToIndex(index) {
    track.style.scrollBehavior = 'smooth';
    track.scrollLeft = index * cardWidth;
  }

  function resetScrollInstantly(index) {
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = index * cardWidth;
    track.style.scrollBehavior = 'smooth';
  }
  
  nextBtn.addEventListener('click', () => {
  if (isTransitioning) return;
  isTransitioning = true;

  currentIndex++;
  scrollToIndex(currentIndex);

  if (currentIndex >= total - 3) {
    setTimeout(() => {
      currentIndex = 3;
      resetScrollInstantly(currentIndex);
      isTransitioning = false;
    }, 310);
  } else {
    setTimeout(() => {
      isTransitioning = false;
    }, 310);
  }
});
prevBtn.addEventListener('click', () => {
  if (isTransitioning) return;
  isTransitioning = true;

  currentIndex--;
  scrollToIndex(currentIndex);

  if (currentIndex < 3) {
    setTimeout(() => {
      currentIndex = total - 6 + currentIndex;
      resetScrollInstantly(currentIndex);
      isTransitioning = false;
    }, 310); // Matches CSS transition time
  } else {
    setTimeout(() => {
      isTransitioning = false;
    }, 310);
  }
});

