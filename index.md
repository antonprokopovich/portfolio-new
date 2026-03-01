---
#
# By default, content added below the "---" mark will appear in the home page
# between the top bar and the list of recent posts.
# To change the home page layout, edit the _layouts/home.html file.
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
#
layout: default
---

<!-- Language switcher that will be positioned via CSS -->
<div id="language-switcher" style="position: fixed; top: 20px; right: 20px; z-index: 1000;">
  <button id="lang-switch-btn" class="lang-switch-btn" onclick="toggleLanguageMenu()" style="background-color: rgba(255, 255, 255, 0.2); border: 1px solid rgba(255, 255, 255, 0.3); color: white; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 5px;">
    <span id="current-lang">EN</span>
    <span class="arrow" style="font-size: 10px;">▼</span>
  </button>
  <div id="lang-menu" class="lang-menu" style="position: absolute; top: 100%; right: 0; background-color: white; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); min-width: 120px; margin-top: 5px; z-index: 1001; display: none;">
    <a href="#" class="lang-option active" data-lang="en" onclick="switchLanguage('en')" style="display: block; padding: 10px 15px; text-decoration: none; color: #333; cursor: pointer; border-bottom: 1px solid #eee;">English</a>
    <a href="#" class="lang-option" data-lang="ru" onclick="switchLanguage('ru')" style="display: block; padding: 10px 15px; text-decoration: none; color: #333; cursor: pointer;">Русский</a>
  </div>
</div>

<!-- Data attributes for content -->
<div id="lang-data" style="display: none;"
     data-en-name="{{ site.name | escape_javascript }}"
     data-ru-name="{{ site.name_ru | escape_javascript }}"
     data-en-title="{{ site.title | escape_javascript }}"
     data-ru-title="{{ site.title_ru | escape_javascript }}"
     data-en-about-content="{% if site.about_content %}{{ site.about_content | strip_newlines | escape_once | replace: '"', '"' }}{% endif %}"
     data-ru-about-content="{% if site.about_content_ru %}{{ site.about_content_ru | strip_newlines | escape_once | replace: '"', '"' }}{% endif %}">
</div>

<script>
  // Initialize language to English by default
  let currentLang = localStorage.getItem('preferred-lang') || 'en';
  
  document.addEventListener('DOMContentLoaded', function() {
    updateLanguageDisplay();
  });
  
  function toggleLanguageMenu() {
    const menu = document.getElementById('lang-menu');
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  }
  
  function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferred-lang', lang);
    updateLanguageDisplay();
    
    // Close the menu after selection
    document.getElementById('lang-menu').style.display = 'none';
  }
  
  function updateLanguageDisplay() {
    // Update the button text
    document.getElementById('current-lang').textContent = currentLang === 'en' ? 'EN' : 'RU';
    
    // Update active class on menu items
    document.querySelectorAll('.lang-option').forEach(option => {
      option.classList.remove('active');
      option.style.background = '';
      option.style.color = '#333';
      if (option.dataset.lang === currentLang) {
        option.classList.add('active');
        option.style.background = '#007acc';
        option.style.color = 'white';
      }
    });
    
    // Trigger content update
    updateContentByLanguage();
  }

  function updateContentByLanguage() {
    // This function will update content based on selected language
    // We'll use data attributes to identify translatable content
    
    // Update personal info
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
      updatePersonalInfo();
      updateAboutSection();
    }
  }
  
  function updatePersonalInfo() {
    const nameElement = document.querySelector('.profile h1');
    const titleElement = document.querySelector('.profile h2');
    
    if (nameElement) {
      const langData = document.getElementById('lang-data');
      const enName = langData.getAttribute('data-en-name');
      const ruName = langData.getAttribute('data-ru-name');
      nameElement.textContent = currentLang === 'en' ? enName : ruName;
    }
    
    if (titleElement) {
      const langData = document.getElementById('lang-data');
      const enTitle = langData.getAttribute('data-en-title');
      const ruTitle = langData.getAttribute('data-ru-title');
      titleElement.textContent = currentLang === 'en' ? enTitle : ruTitle;
    }
  }
  
  function updateAboutSection() {
    const aboutTitle = document.querySelector('.about .section-title');
    const aboutContent = document.querySelector('.about .content-block');
    
    if (aboutTitle) {
      aboutTitle.textContent = currentLang === 'en' ? 'About Me' : 'Обо мне';
    }
    
    if (aboutContent) {
      const langData = document.getElementById('lang-data');
      const enAboutContent = langData.getAttribute('data-en-about-content');
      const ruAboutContent = langData.getAttribute('data-ru-about-content');
      aboutContent.innerHTML = currentLang === 'en' ? enAboutContent : ruAboutContent;
    }
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const switchBtn = document.getElementById('lang-switch-btn');
    const menu = document.getElementById('lang-menu');
    
    if (switchBtn && !switchBtn.contains(event.target) && menu && !menu.contains(event.target)) {
      menu.style.display = 'none';
    }
  });
</script>
