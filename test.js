// تهيئة الموقع
document.addEventListener("DOMContentLoaded", function () {
  initMusicPlayer();
  initPreloader();
  initNavigation();
  initScrollEffects();
  initInteractiveElements();
  initAnimations();
  updatePlayerStats();
});

// مشغل الموسيقى
function initMusicPlayer() {
  const audio = document.getElementById("bgMusic");
  const playBtn = document.querySelector(".play-btn");
  const playIcon = playBtn.querySelector("i");
  const progressBar = document.querySelector(".progress-bar");
  const volumeSlider = document.querySelector(".volume-slider");
  const progressContainer = document.querySelector(".progress-container");
  const volumeIcon = document.querySelector(".volume-control i");

  // تعيين الحجم الافتراضي
  audio.volume = 0.5;
  volumeSlider.value = 50;

  // تشغيل/إيقاف الموسيقى
  playBtn.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      playIcon.className = "fas fa-pause";
      playBtn.style.background = "linear-gradient(135deg, #00A8CC, #FF6B35)";
    } else {
      audio.pause();
      playIcon.className = "fas fa-play";
      playBtn.style.background = "linear-gradient(135deg, #FF6B35, #00A8CC)";
    }
  });

  // التحكم في الصوت
  volumeSlider.addEventListener("input", function () {
    audio.volume = this.value / 100;

    // تغيير لون الأيقونة حسب مستوى الصوت
    if (this.value == 0) {
      volumeIcon.className = "fas fa-volume-mute";
    } else if (this.value < 50) {
      volumeIcon.className = "fas fa-volume-down";
    } else {
      volumeIcon.className = "fas fa-volume-up";
    }
  });

  // تحديث شريط التقدم
  audio.addEventListener("timeupdate", function () {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
  });

  // النقر على شريط التقدم لتغيير الوقت
  progressContainer.addEventListener("click", function (e) {
    const clickX = e.offsetX;
    const width = this.offsetWidth;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  });

  // إعادة التشغيل عند الانتهاء
  audio.addEventListener("ended", function () {
    audio.currentTime = 0;
    audio.play();
  });

  // تشغيل تلقائي بعد تحميل الصفحة
  window.addEventListener("load", function () {
    setTimeout(() => {
      audio.play().catch((e) => {
        console.log("التشغيل التلقائي متوقف: ", e);
      });
    }, 2000);
  });

  // إظهار زر التشغيل إذا كان الصوت متوقفاً
  audio.addEventListener("pause", function () {
    playIcon.className = "fas fa-play";
    playBtn.style.background = "linear-gradient(135deg, #FF6B35, #00A8CC)";
  });

  audio.addEventListener("play", function () {
    playIcon.className = "fas fa-pause";
    playBtn.style.background = "linear-gradient(135deg, #00A8CC, #FF6B35)";
  });
}

// شاشة التحميل
function initPreloader() {
  const preloader = document.querySelector(".preloader");

  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      document.body.classList.add("loaded");
    }, 500);
  }, 3000);
}

// شريط التنقل
function initNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navItems = document.querySelectorAll(".nav-item");

  navToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // تأثير التمرير
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.backdropFilter = "blur(15px)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.backdropFilter = "blur(10px)";
    }
  });
}

// تأثيرات التمرير
function initScrollEffects() {
  // التمرير السلس
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // تحديث العناصر النشطة
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-item");

  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });
}

// العناصر التفاعلية
function initInteractiveElements() {
  // أزرار النسخ
  const copyButtons = document.querySelectorAll(".copy-btn, .copy-ip");

  copyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const ip = this.getAttribute("data-ip") || "51.75.79.54:7005";

      navigator.clipboard
        .writeText(ip)
        .then(() => {
          const originalHTML = this.innerHTML;
          this.innerHTML = '<i class="fas fa-check"></i>';
          this.style.background = "var(--success)";

          setTimeout(() => {
            this.innerHTML = originalHTML;
            this.style.background = "";
          }, 2000);
        })
        .catch((err) => {
          console.error("فشل في نسخ النص: ", err);
          alert("تعذر نسخ العنوان. يرجى النسخ يدوياً: " + ip);
        });
    });
  });

  // تأثيرات hover
  const interactiveElements = document.querySelectorAll(
    ".feature, .stat-card, .step, .highlight-item"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    element.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// الرسوم المتحركة
function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          if (entry.target.classList.contains("feature")) {
            const delay =
              Array.from(entry.target.parentNode.children).indexOf(
                entry.target
              ) * 0.1;
            entry.target.style.transitionDelay = delay + "s";
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  const animatedElements = document.querySelectorAll(
    ".feature, .stat-card, .step, .highlight-item"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// تحديث الإحصائيات
function updatePlayerStats() {
  const playerElements = document.querySelectorAll(
    ".player-count span, .server-status span"
  );

  let playerCount = 40;

  setInterval(() => {
    // تغيير عشوائي بسيط
    const change = Math.floor(Math.random() * 6) - 2;
    playerCount = Math.max(35, Math.min(45, playerCount + change));

    playerElements.forEach((element) => {
      if (element.parentElement.classList.contains("player-count")) {
        element.textContent = `${playerCount}/100`;
      } else {
        element.textContent = `${playerCount} لاعب متصل`;
      }
    });
  }, 8000);
}

// تأثيرات إضافية بعد تحميل الصفحة
window.addEventListener("load", function () {
  // إضافة نمط للرسوم المتحركة
  const style = document.createElement("style");
  style.textContent = `
      .loaded .hero-title {
          animation: fadeIn 1s ease;
      }
      
      .loaded .hero-desc {
          animation: fadeIn 1s ease 0.3s both;
      }
      
      .loaded .hero-actions {
          animation: fadeIn 1s ease 0.6s both;
      }
  `;
  document.head.appendChild(style);
});
