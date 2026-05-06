═══════════════════════════════════════════════════════════════════
  SONAL KANDHWAY — PORTFOLIO
  sonalkandhway.com  |  Ready to host
═══════════════════════════════════════════════════════════════════

FOLDER STRUCTURE
─────────────────
  index.html                  ← Main portfolio homepage
  clearpaisa.html             ← ClearPaisa UX case study
  404.html                    ← Custom "page not found" page
  README.txt                  ← This file

  assets/
  ├── css/
  │   ├── style.css           ← Shared design tokens, nav, footer
  │   ├── home.css            ← Portfolio page styles
  │   └── case-study.css      ← Case study page styles
  ├── js/
  │   ├── main.js             ← Shared: cursor, theme, scroll, reveals
  │   ├── home.js             ← Contact form, story accordion
  │   └── case-study.js       ← Case study interactions
  └── images/
      ├── logo-dark.png       ← SK logo (white version — dark mode)
      └── logo-white.png      ← SK logo (dark version — light mode)


HOSTING — NETLIFY (Recommended, Free)
───────────────────────────────────────
  1. Go to netlify.com → Sign up free
  2. Click "Add new site" → "Deploy manually"
  3. Drag & drop this entire folder
  4. Your site is live instantly at a netlify.app URL
  5. Settings → Domain management → Add your custom domain


HOSTING — ANY WEB HOST (cPanel / Hostinger / GoDaddy)
───────────────────────────────────────────────────────
  1. Log in to your hosting control panel
  2. Open File Manager → go to public_html
  3. Upload ALL files AND the assets/ folder
     (keep the folder structure exactly as-is)
  4. Visit your domain — done!

  ⚠️  IMPORTANT: Upload the assets/ folder, not just the HTML files.
     Without assets/css/ and assets/js/ the site will look broken.


ACTIVATE THE CONTACT FORM (2 minutes)
───────────────────────────────────────
  1. Go to formspree.io → Create free account
     (Free tier: 50 messages/month)

  2. Click "New Form" → Name it "Portfolio Contact"
     Enter email: kandhwaysonal12@gmail.com
     Copy your Form ID  (e.g. xpzgkwqr)

  3. Open  assets/js/home.js  in any text editor
     Find this line:
       const action = form.getAttribute('action');
     
     Open  index.html  and find:
       action="https://formspree.io/f/YOUR_FORM_ID"
     
     Replace  YOUR_FORM_ID  with your actual ID:
       action="https://formspree.io/f/xpzgkwqr"

  4. Save and re-upload index.html to your host
     Every form submission now arrives in your Gmail ✉️


ADDING YOUR PHOTO
──────────────────
  1. Place your photo in  assets/images/  as  photo.jpg
  2. Open index.html → find the <div class="photo-svg-wrap"> section
  3. Replace the <svg>...</svg> block with:
     <img src="assets/images/photo.jpg"
          alt="Sonal Kandhway"
          style="width:100%;height:100%;object-fit:cover;object-position:top;">


ADDING MORE CASE STUDIES
─────────────────────────
  1. Duplicate clearpaisa.html → rename e.g. healthcare.html
  2. Update the content
  3. In index.html → find the work cards → update href="clearpaisa.html"
     to href="healthcare.html" for the new card


CONTACT
────────
  Email    kandhwaysonal12@gmail.com
  Phone    +91 9599 423 492
  LinkedIn linkedin.com/in/sonalkandhway

═══════════════════════════════════════════════════════════════════
  Designed by Sonal Kandhway  |  Built with Claude (Anthropic)
═══════════════════════════════════════════════════════════════════
