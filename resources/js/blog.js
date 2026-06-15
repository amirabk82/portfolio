'use strict';

/**
 * Blog module
 * ---------------------------------------------------------------------------
 * Article data currently lives in the BLOG_POSTS array below. The rendering is
 * intentionally decoupled from the data source: to load from a JSON file or an
 * API later, replace `loadPosts()` with a `fetch()` call that resolves to the
 * same post shape and the rest of the module keeps working unchanged.
 *
 * Post shape:
 * {
 *   id, title, excerpt, category, image, alt,
 *   date (display), datetime (ISO), readingTime (minutes),
 *   featured (bool), url
 * }
 */

const CATEGORY_LABELS = {
  'all': 'همه',
  'web-development': 'توسعه وب',
  'performance': 'عملکرد',
  'seo': 'سئو',
  'modern-web': 'وب مدرن',
};

const BLOG_POSTS = [
  {
    id: 'core-web-vitals',
    title: 'راهنمای بهینه‌سازی Core Web Vitals',
    excerpt: 'چطور با بهبود LCP، CLS و INP سرعت و تجربه کاربری سایت را به سطح حرفه‌ای برسانیم و رتبه بهتری در گوگل بگیریم.',
    category: 'performance',
    image: './resources/images/blog-1.jpg',
    alt: 'نمودار سنجش عملکرد و سرعت وب‌سایت',
    date: '۵ اسفند ۱۴۰۴',
    datetime: '2026-02-24',
    readingTime: 9,
    featured: true,
    url: '#',
  },
  {
    id: 'modern-css-layouts',
    title: 'چیدمان‌های مدرن با CSS Grid و Flexbox',
    excerpt: 'مرور الگوهای کاربردی برای ساخت رابط‌های ریسپانسیو بدون فریم‌ورک، تنها با ابزارهای بومی CSS.',
    category: 'web-development',
    image: './resources/images/blog-2.jpg',
    alt: 'کدهای CSS برای چیدمان صفحه',
    date: '۲۸ بهمن ۱۴۰۴',
    datetime: '2026-02-17',
    readingTime: 7,
    featured: false,
    url: '#',
  },
  {
    id: 'technical-seo',
    title: 'سئوی تکنیکال برای توسعه‌دهندگان',
    excerpt: 'از داده‌های ساخت‌یافته و sitemap تا متا تگ‌ها؛ کارهایی که هر توسعه‌دهنده باید برای دیده‌شدن انجام دهد.',
    category: 'seo',
    image: './resources/images/blog-3.jpg',
    alt: 'تحلیل سئو و رتبه‌بندی در موتورهای جستجو',
    date: '۲۰ بهمن ۱۴۰۴',
    datetime: '2026-02-09',
    readingTime: 8,
    featured: false,
    url: '#',
  },
  {
    id: 'web-components',
    title: 'کامپوننت‌های قابل‌استفاده مجدد در وب',
    excerpt: 'با Web Components بومی، رابط‌هایی بسازید که در هر پروژه‌ای بدون وابستگی به کتابخانه قابل استفاده باشند.',
    category: 'modern-web',
    image: './resources/images/blog-4.jpg',
    alt: 'ساختار کامپوننت‌های رابط کاربری',
    date: '۱۲ بهمن ۱۴۰۴',
    datetime: '2026-02-01',
    readingTime: 6,
    featured: false,
    url: '#',
  },
  {
    id: 'image-optimization',
    title: 'بهینه‌سازی تصاویر و بارگذاری تنبل',
    excerpt: 'فرمت‌های نوین مثل WebP و AVIF، صفت loading="lazy" و تکنیک‌هایی که حجم صفحه را به‌شکل چشمگیری کم می‌کنند.',
    category: 'performance',
    image: './resources/images/blog-5.jpg',
    alt: 'بهینه‌سازی و فشرده‌سازی تصاویر وب',
    date: '۴ بهمن ۱۴۰۴',
    datetime: '2026-01-24',
    readingTime: 5,
    featured: false,
    url: '#',
  },
  {
    id: 'accessible-forms',
    title: 'فرم‌های دسترس‌پذیر و کاربرپسند',
    excerpt: 'اصول ساخت فرم‌هایی که برای همه کاربران، از جمله کاربران صفحه‌خوان، قابل استفاده و قابل اعتماد باشند.',
    category: 'web-development',
    image: './resources/images/blog-6.jpg',
    alt: 'طراحی فرم‌های وب دسترس‌پذیر',
    date: '۲۷ دی ۱۴۰۴',
    datetime: '2026-01-17',
    readingTime: 7,
    featured: false,
    url: '#',
  },
  {
    id: 'progressive-enhancement',
    title: 'بهبود تدریجی؛ سایتی که همیشه کار می‌کند',
    excerpt: 'با رویکرد Progressive Enhancement مطمئن شوید سایت شما حتی بدون جاوااسکریپت هم تجربه‌ای قابل‌قبول دارد.',
    category: 'modern-web',
    image: './resources/images/blog-1.jpg',
    alt: 'لایه‌های بهبود تدریجی در توسعه وب',
    date: '۱۹ دی ۱۴۰۴',
    datetime: '2026-01-09',
    readingTime: 6,
    featured: false,
    url: '#',
  },
  {
    id: 'caching-strategies',
    title: 'استراتژی‌های کش برای سرعت بیشتر',
    excerpt: 'از کش مرورگر تا Service Worker؛ چطور با کش هوشمند، بازدیدهای بعدی کاربران را تقریباً آنی کنیم.',
    category: 'performance',
    image: './resources/images/blog-2.jpg',
    alt: 'استراتژی‌های کش و ذخیره‌سازی داده',
    date: '۱۱ دی ۱۴۰۴',
    datetime: '2026-01-01',
    readingTime: 8,
    featured: false,
    url: '#',
  },
  {
    id: 'semantic-html',
    title: 'HTML معنایی و اهمیت آن در سئو',
    excerpt: 'چرا استفاده درست از تگ‌های معنایی هم برای موتورهای جستجو و هم برای دسترس‌پذیری حیاتی است.',
    category: 'seo',
    image: './resources/images/blog-3.jpg',
    alt: 'ساختار HTML معنایی یک صفحه وب',
    date: '۳ دی ۱۴۰۴',
    datetime: '2025-12-24',
    readingTime: 5,
    featured: false,
    url: '#',
  },
];

const PAGE_SIZE = 4;

/**
 * Data source. Swap this out for a fetch() to JSON/API later, e.g.:
 *   const res = await fetch('/api/posts'); return res.json();
 */
async function loadPosts() {
  return BLOG_POSTS;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function metaMarkup(post) {
  const category = escapeHtml(CATEGORY_LABELS[post.category] || post.category);
  return `
    <div class="post-card-meta">
      <span class="post-chip">${category}</span>
      <span class="meta-dot" aria-hidden="true"></span>
      <time datetime="${escapeHtml(post.datetime)}">${escapeHtml(post.date)}</time>
      <span class="meta-dot" aria-hidden="true"></span>
      <span class="post-read"><ion-icon name="time-outline" aria-hidden="true"></ion-icon>${post.readingTime} دقیقه مطالعه</span>
    </div>`;
}

function featuredCardMarkup(post) {
  return `
    <a href="${escapeHtml(post.url)}" class="featured-card" aria-label="${escapeHtml(post.title)}">
      <figure class="featured-banner">
        <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.alt)}" loading="lazy" decoding="async" width="800" height="500">
        <span class="featured-flag">مقاله ویژه</span>
      </figure>
      <div class="featured-body">
        ${metaMarkup(post)}
        <h3 class="featured-title">${escapeHtml(post.title)}</h3>
        <p class="featured-excerpt">${escapeHtml(post.excerpt)}</p>
        <span class="post-more">ادامه مطلب<ion-icon name="arrow-back-outline" aria-hidden="true"></ion-icon></span>
      </div>
    </a>`;
}

function postCardMarkup(post) {
  return `
    <article class="post-card" data-category="${escapeHtml(post.category)}">
      <a href="${escapeHtml(post.url)}" class="post-card-link" aria-label="${escapeHtml(post.title)}">
        <figure class="post-card-banner">
          <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.alt)}" loading="lazy" decoding="async" width="600" height="360">
        </figure>
        <div class="post-card-body">
          ${metaMarkup(post)}
          <h3 class="post-card-title">${escapeHtml(post.title)}</h3>
          <p class="post-card-excerpt">${escapeHtml(post.excerpt)}</p>
          <span class="post-more">ادامه مطلب<ion-icon name="arrow-back-outline" aria-hidden="true"></ion-icon></span>
        </div>
      </a>
    </article>`;
}

function initBlog(posts) {
  const featuredEl = document.querySelector('[data-blog-featured]');
  const gridEl = document.querySelector('[data-blog-grid]');
  const emptyEl = document.querySelector('[data-blog-empty]');
  const loadMoreBtn = document.querySelector('[data-blog-load-more]');
  const searchInput = document.querySelector('[data-blog-search]');
  const filterBtns = document.querySelectorAll('[data-blog-filter]');

  if (!gridEl) return;

  const featuredPost = posts.find((p) => p.featured) || posts[0];

  const state = {
    query: '',
    category: 'all',
    visible: PAGE_SIZE,
  };

  function getFiltered() {
    const q = state.query.trim().toLowerCase();
    const filtering = q !== '' || state.category !== 'all';

    // When not filtering, the featured post owns the hero slot and is
    // excluded from the grid. While filtering, every match shows in the grid.
    const base = filtering ? posts : posts.filter((p) => p !== featuredPost);

    return base.filter((post) => {
      const matchesCategory = state.category === 'all' || post.category === state.category;
      const matchesQuery =
        q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }

  function render() {
    const filtering = state.query.trim() !== '' || state.category !== 'all';

    // Featured section only shows on the default (unfiltered) view.
    if (featuredEl) {
      if (!filtering && featuredPost) {
        featuredEl.innerHTML = featuredCardMarkup(featuredPost);
        featuredEl.hidden = false;
      } else {
        featuredEl.innerHTML = '';
        featuredEl.hidden = true;
      }
    }

    const filtered = getFiltered();
    const visiblePosts = filtered.slice(0, state.visible);

    gridEl.innerHTML = visiblePosts.map(postCardMarkup).join('');

    if (emptyEl) emptyEl.hidden = filtered.length !== 0;
    if (loadMoreBtn) loadMoreBtn.hidden = filtered.length <= state.visible;
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      state.query = this.value;
      state.visible = PAGE_SIZE;
      render();
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.removeAttribute('aria-current');
      });
      this.classList.add('active');
      this.setAttribute('aria-current', 'true');
      state.category = this.dataset.category || 'all';
      state.visible = PAGE_SIZE;
      render();
    });
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      state.visible += PAGE_SIZE;
      render();
    });
  }

  render();
}

function initNewsletter() {
  const form = document.querySelector('[data-newsletter-form]');
  if (!form) return;

  const input = form.querySelector('[data-newsletter-input]');
  const feedback = document.querySelector('[data-newsletter-feedback]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!feedback) return;

    const valid = input && input.checkValidity();
    feedback.hidden = false;

    if (valid) {
      feedback.textContent = 'عضویت شما با موفقیت ثبت شد. ممنون که همراه هستید!';
      feedback.classList.remove('is-error');
      feedback.classList.add('is-success');
      form.reset();
    } else {
      feedback.textContent = 'لطفاً یک ایمیل معتبر وارد کنید.';
      feedback.classList.remove('is-success');
      feedback.classList.add('is-error');
      if (input) input.focus();
    }
  });
}

(async function bootstrapBlog() {
  try {
    const posts = await loadPosts();
    initBlog(posts);
  } catch (err) {
    console.log('[v0] Failed to load blog posts:', err);
  }
  initNewsletter();
})();
