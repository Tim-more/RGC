document.addEventListener('DOMContentLoaded', function () {
  // Debug: Confirm script is loaded
  console.log('Script loaded and DOM ready');

  // Swiper Initialization
  console.log('Swiper initializing');
  new Swiper('.swiper', {
    loop: true,
    autoplay: { delay: 5000 },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  // Navigation Scroll Highlight
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = ['home', 'about', 'sermons', 'projects', 'contact', 'prayer'];

  function updateActiveSection() {
    let currentSection = 'home';
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element && window.scrollY >= element.offsetTop - 150) {
        currentSection = section;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // Initial call and scroll listener
  updateActiveSection();
  window.addEventListener('scroll', updateActiveSection);

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (mobileMenuToggle && mobileMenu && menuIconOpen && menuIconClose) {
    console.log('Mobile menu elements found');
    mobileMenuToggle.addEventListener('click', () => {
      console.log('Mobile menu toggle clicked');
      mobileMenu.classList.toggle('hidden');
      menuIconOpen.classList.toggle('hidden');
      menuIconClose.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('#mobile-menu .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        console.log('Mobile menu link clicked');
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      });
    });
  } else {
    console.log('Mobile menu elements missing:', {
      mobileMenuToggle: !!mobileMenuToggle,
      mobileMenu: !!mobileMenu,
      menuIconOpen: !!menuIconOpen,
      menuIconClose: !!menuIconClose
    });
  }

  // Modal Functionality
  const donationModal = document.getElementById('donation-modal');
  const projectModal = document.getElementById('project-modal');
  const projectModalTitle = document.getElementById('project-modal-title');
  const projectModalContent = document.getElementById('project-modal-content');

  // Project Modal Content
  const projectDetails = {
    building: {
      title: 'Church Building Project',
      content: `
        <p class="mb-4">Building a new sanctuary in Shauri Estate, Eldoret.</p>
        <h4 class="font-semibold text-lg mb-2">Details:</h4>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li>Phase 2: Floor- In progress</li>
          <li>Completion: December 2025</li>
          <li>Location: Shauri Estate, Eldoret</li>
          <li>Led by Dr Mungai</li>
        </ul>
      `
    },
    'youth-empowerment': {
      title: 'Youth Empowerment Program',
      content: `
        <p class="mb-4">Mentoring youth through faith and skills.</p>
        <h4 class="font-semibold text-lg mb-2">Programs:</h4>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li>Weekly Meetings study</li>
          <li>sunday meetings at 3:00 PM</li>
          <li>Led by pastor Timothy</li>
        </ul>
      `
    },
    'mens-fellowship': {
      title: "Men's Fellowship Ministry",
      content: `
        <p class="mb-4">Supporting men's spiritual growth.</p>
        <h4 class="font-semibold text-lg mb-2">Activities:</h4>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li>Monthly Meetings </li>
          <li>  2:00 PM</li>
          <li>Prayer and fellowship</li>
          <li>Led by Francis Burudi</li>
        </ul>
      `
    },
    'womens-fellowship': {
      title: "Women's Fellowship Ministry",
      content: `
        <p class="mb-4">Encouraging women through fellowship.</p>
        <h4 class="font-semibold text-lg mb-2">Hours:</h4>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li>Monthly meetings</li>
          <li>last Sunday at 2:00 PM</li>
          <li>Prayer and support</li>
        </ul>
      `
    },
    'missions-support': {
      title: 'Missions Support Program',
      content: `
        <p class="mb-4">Supporting global missionaries.</p>
        <h4 class="font-semibold text-lg mb-2">Focus:</h4>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li>Local church planting</li>
          <li>East Africa missions</li>
          <li>Global outreach</li>
          <li>Led by Bishop Morris Omondi</li>
        </ul>
      `
    },
    'office-block': {
      title: 'Church Office Project',
      content: `
        <p class="mb-4">Building offices for administration.</p>
        <h4 class="font-semibold text-lg mb-2">Features:</h4>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li>Pastoral offices</li>
          <li>Completion: 2027</li>
        </ul>
      `
    }
  };

  // Donation Modal Open
  document.querySelectorAll('.donation-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('Opening Donation Modal');
      if (donationModal) {
        donationModal.classList.remove('hidden');
      } else {
        console.log('Donation modal element not found');
      }
    });
  });

  // Project Modal Open
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.getAttribute('data-modal');
      const project = projectDetails[modalId];
      console.log('Project card clicked:', modalId, project);
      if (project && projectModal && projectModalTitle && projectModalContent) {
        projectModalTitle.textContent = project.title;
        projectModalContent.innerHTML = project.content;
        projectModal.classList.remove('hidden');
      } else {
        console.log('Project not found or modal elements missing:', {
          project: !!project,
          projectModal: !!projectModal,
          projectModalTitle: !!projectModalTitle,
          projectModalContent: !!projectModalContent
        });
      }
    });
  });

  // Modal Close Buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('Closing Modal');
      if (donationModal) donationModal.classList.add('hidden');
      if (projectModal) projectModal.classList.add('hidden');
    });
  });

  // Modal Close on Background Click
  const modals = [donationModal, projectModal];
  modals.forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          console.log('Closing Modal on Background Click');
          modal.classList.add('hidden');
        }
      });
    }
  });
});