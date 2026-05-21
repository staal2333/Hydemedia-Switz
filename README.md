# 🌟 Hyde Media Website

Premium Out-of-Home advertising platform connecting brands with strategic locations across Denmark.

![Hyde Media](https://img.shields.io/badge/Status-Production_Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your SMTP credentials

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📦 What's Included

### ✨ **Features**
- 🌐 **Multi-language** (Danish & English)
- 📱 **Fully Responsive** (Mobile-first design)
- 🎨 **3D Hero Scene** (Three.js building model)
- 📝 **Blog System** (Markdown-based)
- 📧 **Contact Forms** (Nodemailer integration)
- 🎯 **Analytics Ready** (Vercel Analytics + Speed Insights)
- 🔍 **SEO Optimized** (Complete metadata, sitemap, structured data)
- 🌙 **PWA Ready** (Installable web app)
- ♿ **Accessible** (WCAG compliant)
- ⚡ **Performance** (95+ Lighthouse scores)

### 📄 **Pages**
- Home (3D hero + sections)
- About
- Services (Scaffolding, Facade)
- Case Studies
- Blog (Listing + Detail)
- Contact
- Pricing
- Partners
- Property Owners
- Brands
- FAQ
- Privacy Policy
- Terms of Service
- 404 Page

---

## 🛠️ Tech Stack

### **Core**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11

### **Features**
- **3D Graphics**: Three.js + React Three Fiber
- **Forms**: React Hook Form + Zod validation
- **Email**: Nodemailer
- **i18n**: next-intl
- **Analytics**: Vercel Analytics + Speed Insights
- **Icons**: Lucide React
- **Markdown**: react-markdown

---

## 📁 Project Structure

```
hydemedia-website/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Localized routes
│   │   ├── about/               # About page
│   │   ├── blog/                # Blog listing + posts
│   │   ├── contact/             # Contact page
│   │   └── ...                  # Other pages
│   ├── api/                     # API routes
│   │   └── contact/             # Contact form handler
│   ├── icon.tsx                 # Dynamic app icon
│   ├── apple-icon.tsx           # Apple touch icon
│   ├── opengraph-image.tsx      # Social preview image
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── sitemap.ts               # Dynamic sitemap
│
├── components/                   # React components
│   ├── home/                    # Homepage sections
│   ├── contact/                 # Contact components
│   ├── Header.tsx               # Site header
│   ├── Footer.tsx               # Site footer
│   └── ...                      # Other components
│
├── lib/                         # Utilities
│   ├── metadata.ts              # SEO helpers
│   ├── seo.ts                   # SEO configuration
│   └── ...                      # Other utilities
│
├── messages/                    # Translations
│   ├── en.json                  # English
│   └── da.json                  # Danish
│
├── public/                      # Static files
│   ├── images/                  # Images
│   ├── data/                    # JSON data
│   ├── manifest.json            # PWA manifest
│   └── robots.txt               # Robots file
│
└── Documentation/
    ├── SETUP_COMPLETE.md        # Setup guide
    ├── WEBSITE_OPTIMIZATION_COMPLETE.md
    └── WHAT_WE_NEED_MORE.md     # Feature roadmap
```

---

## ⚙️ Configuration

### **Environment Variables**

Create `.env.local` file:

```env
# Site URL
NEXT_PUBLIC_SITE_URL=https://hydemedia.dk

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=hello@hydemedia.dk
SMTP_PASS=your-app-password
SMTP_FROM="Hyde Media <hello@hydemedia.dk>"
CONTACT_EMAIL=hello@hydemedia.dk
```

See `.env.example` for all available options.

---

## 📧 Email Setup

### **Option 1: Gmail** (Easy for testing)

1. Enable 2-Step Verification in Google Account
2. Generate App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use that password in `SMTP_PASS`

### **Option 2: SendGrid** (Recommended for production)

1. Sign up at [sendgrid.com](https://sendgrid.com) (free tier: 100 emails/day)
2. Create API key
3. Configure:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

---

## 🚀 Deployment

### **Vercel** (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production
vercel --prod
```

### **Environment Variables on Vercel**

Add these in Project Settings > Environment Variables:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `CONTACT_EMAIL`
- `NEXT_PUBLIC_SITE_URL`

### **Domain Setup**

1. Add domain in Vercel Dashboard
2. Configure DNS (Vercel provides instructions)
3. HTTPS auto-enabled

---

## 📊 Analytics

Analytics are automatically enabled when deployed to Vercel:

- **Vercel Analytics**: Real-time visitor tracking (privacy-friendly)
- **Speed Insights**: Core Web Vitals monitoring

View at: [vercel.com/dashboard](https://vercel.com/dashboard)

---

## 🎨 Customization

### **Colors** (tailwind.config.ts)
```ts
colors: {
  navy: '#000D10',
  teal: '#00D9D9',
  coral: '#FF6B6B',
}
```

### **Typography** (app/globals.css)
- Base: 16px / 1.7 line-height
- Headings: Inter font, bold (700)
- Body: Inter font, regular (400)

### **Translations** (messages/)
- Add new languages by creating `messages/xx.json`
- Update `i18n.ts` with new locale

---

## 🧪 Testing

```bash
# Lint
npm run lint

# Type check
npx tsc --noEmit

# Build
npm run build

# Run production build
npm start
```

### **Manual Testing**
- [ ] Contact form (test email delivery)
- [ ] All page links
- [ ] Mobile responsive
- [ ] Browser compatibility
- [ ] Social previews: [metatags.io](https://metatags.io)

---

## 📱 PWA Features

Your site can be installed as an app:

- **Desktop**: Chrome > Install App button
- **iOS**: Safari > Share > Add to Home Screen
- **Android**: Chrome > Menu > Install App

Includes:
- App shortcuts (Contact, Services, Blog)
- Custom theme color
- Splash screen
- Offline structure

---

## 🔍 SEO Checklist

- ✅ Dynamic metadata per page
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Structured data (Schema.org)
- ✅ Sitemap (`/sitemap.xml`)
- ✅ Robots.txt (`/robots.txt`)
- ✅ Mobile-friendly
- ✅ Fast loading (95+ Lighthouse)
- ✅ Semantic HTML
- ✅ Alt text on images

### **Submit Sitemap**
1. [Google Search Console](https://search.google.com/search-console)
2. [Bing Webmaster Tools](https://www.bing.com/webmasters)

---

## 🤝 Contributing

This is a private project for Hyde Media.

For questions or support, contact: **hello@hydemedia.dk**

---

## 📄 License

© 2026 Hyde Media (2W ApS). All rights reserved.

**CVR**: 45377393  
**Address**: Blokken 88, 3460 Birkerød, Denmark  
**Website**: [hydemedia.dk](https://hydemedia.dk)  
**Instagram**: [@hyde.med](https://www.instagram.com/hyde.med)

---

## 🆘 Support

### **Documentation**
- `SETUP_COMPLETE.md` - Full setup instructions
- `WEBSITE_OPTIMIZATION_COMPLETE.md` - Design details
- `WHAT_WE_NEED_MORE.md` - Feature roadmap

### **Issues**
- Email: hello@hydemedia.dk
- Phone: +45 52 76 11 85

### **Resources**
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Vercel Docs](https://vercel.com/docs)

---

## 🎉 Credits

**Built with:**
- Next.js - React Framework
- Tailwind CSS - Styling
- Framer Motion - Animations
- Three.js - 3D Graphics
- Vercel - Hosting & Analytics

**Developed**: January 2026

---

**Made with ❤️ for Hyde Media**
#   G A 4   c o n f i g u r e d  
 