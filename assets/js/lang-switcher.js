// Language switcher functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize language to English by default
  let currentLang = localStorage.getItem('preferred-lang') || 'en';
  
  // Add language switcher to the page
  addLanguageSwitcher();
  
  // Update content based on current language
  updateContentByLanguage(currentLang);
});

function addLanguageSwitcher() {
  // Create language switcher HTML
  const switcherHTML = `
    <div id="language-switcher">
      <button id="lang-switch-btn" class="lang-switch-btn" onclick="toggleLanguageMenu()">
        <span id="current-lang">${localStorage.getItem('preferred-lang') === 'ru' ? 'RU' : 'EN'}</span>
        <span class="arrow">▼</span>
      </button>
      <div id="lang-menu" class="lang-menu hidden">
        <a href="#" class="lang-option ${localStorage.getItem('preferred-lang') !== 'ru' ? 'active' : ''}" data-lang="en" onclick="switchLanguage('en')">English</a>
        <a href="#" class="lang-option ${localStorage.getItem('preferred-lang') === 'ru' ? 'active' : ''}" data-lang="ru" onclick="switchLanguage('ru')">Русский</a>
      </div>
    </div>
  `;
  
  // Insert the language switcher at the beginning of the body
  document.body.insertAdjacentHTML('afterbegin', switcherHTML);
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const switchBtn = document.getElementById('lang-switch-btn');
    const menu = document.getElementById('lang-menu');
    
    if (switchBtn && !switchBtn.contains(event.target)) {
      menu.classList.add('hidden');
    }
  });
}

function toggleLanguageMenu() {
  const menu = document.getElementById('lang-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

function switchLanguage(lang) {
  // Store the selected language
  localStorage.setItem('preferred-lang', lang);
  
  // Update the button text
  const currentLangSpan = document.getElementById('current-lang');
  if (currentLangSpan) {
    currentLangSpan.textContent = lang === 'en' ? 'EN' : 'RU';
  }
  
  // Update active class on menu items
  document.querySelectorAll('.lang-option').forEach(option => {
    option.classList.remove('active');
    if (option.dataset.lang === lang) {
      option.classList.add('active');
    }
  });
  
  // Close the menu after selection
  const menu = document.getElementById('lang-menu');
  if (menu) {
    menu.classList.add('hidden');
  }
  
  // Update content based on selected language
  updateContentByLanguage(lang);
}

function updateContentByLanguage(lang) {
  // Update personal info
  updatePersonalInfo(lang);
  
  // Update about section
  updateAboutSection(lang);
  
  // Update main content sections
  updateMainContent(lang);
}

function updatePersonalInfo(lang) {
  // Get the name and title from data attributes that we'll add to the page
  const enName = document.body.getAttribute('data-en-name');
  const ruName = document.body.getAttribute('data-ru-name');
  const enTitle = document.body.getAttribute('data-en-title');
  const ruTitle = document.body.getAttribute('data-ru-title');
  
  if (enName && ruName) {
    const nameElement = document.querySelector('.profile h1');
    if (nameElement) {
      nameElement.textContent = lang === 'en' ? enName : ruName;
    }
  }
  
  if (enTitle && ruTitle) {
    const titleElement = document.querySelector('.profile h2');
    if (titleElement) {
      titleElement.textContent = lang === 'en' ? enTitle : ruTitle;
    }
  }
}

function updateAboutSection(lang) {
  const enAboutTitle = 'About Me';
  const ruAboutTitle = 'Обо мне';
  const aboutTitle = document.querySelector('.about .section-title');
  if (aboutTitle) {
    aboutTitle.textContent = lang === 'en' ? enAboutTitle : ruAboutTitle;
  }
  
  const enAboutContent = document.body.getAttribute('data-en-about-content');
  const ruAboutContent = document.body.getAttribute('data-ru-about-content');
  
  if (enAboutContent && ruAboutContent) {
    const aboutContent = document.querySelector('.about .content-block');
    if (aboutContent) {
      aboutContent.innerHTML = lang === 'en' ? enAboutContent : ruAboutContent;
    }
  }
}

function updateMainContent(lang) {
  // Get content from data attributes
  const enSectionsStr = document.body.getAttribute('data-en-sections');
  const ruSectionsStr = document.body.getAttribute('data-ru-sections');
  
  if (enSectionsStr && ruSectionsStr) {
    try {
      const enSections = JSON.parse(enSectionsStr);
      const ruSections = JSON.parse(ruSectionsStr);
      
      const sections = lang === 'en' ? enSections : ruSections;
      
      // Update all content sections
      const sectionElements = document.querySelectorAll('.content-section');
      sectionElements.forEach((sectionEl, index) => {
        if (sections[index]) {
          // Update section title
          const titleEl = sectionEl.querySelector('.section-title');
          if (titleEl) {
            titleEl.textContent = sections[index].title;
          }
          
          // Update content items
          const contentItems = sectionEl.querySelectorAll('.content-item');
          if (sections[index].content && contentItems.length > 0) {
            sections[index].content.forEach((item, itemIndex) => {
              if (contentItems[itemIndex]) {
                updateContentItem(contentItems[itemIndex], item);
              }
            });
          }
        }
      });
    } catch (e) {
      console.error('Error parsing sections:', e);
    }
  }
}

function updateContentItem(itemElement, itemData) {
  // Update title
  const titleEl = itemElement.querySelector('h3');
  if (titleEl && itemData.title) {
    titleEl.textContent = itemData.title;
  }
  
  // Update subtitle
  const subtitleEl = itemElement.querySelector('.sub-title');
  if (subtitleEl && itemData.sub_title) {
    subtitleEl.innerHTML = itemData.sub_title.replace(/\n/g, '<br>');
  }
  
  // Update caption
  const captionEl = itemElement.querySelector('.caption');
  if (captionEl && itemData.caption) {
    captionEl.textContent = itemData.caption;
  }
  
  // Update description
  const descEl = itemElement.querySelector('.description');
  if (descEl && itemData.description) {
    descEl.innerHTML = itemData.description;
  }
}

// Add data attributes to body with the content from Liquid
document.addEventListener('DOMContentLoaded', function() {
  // This would normally be populated by Liquid templating, but since we're using a remote theme,
  // we'll need to add these values differently
  
  // Since we can't directly access Liquid variables from external JS files with remote themes,
  // we'll add the data attributes to the body element dynamically using inline script in the layout
});