# template ZWOlfNutrionStore — ZWOLF Nutrition | متجر المكملات الغذائية الكامل (FR/AR)

**v1.5.0 — Stable** — Stack: Next.js 16 + TypeScript + Tailwind 4 + Prisma 6 + Neon PostgreSQL.

متجر إلكتروني **ثنائي اللغة** بهوية **ZWOLF Nutrition** (ZWOLF Nutrition Store):
- **اللغات**: الفرنسية افتراضياً (LTR) + العربية (RTL) — زر التبديل `FR ⇄ ع` في الهيدر (سطح المكتب + الموبايل + الأدمن)، محفوظ في `localStorage (gog-lang)`، ويشمل **كل الموقع**: الرئيسية بأقسامها العشرة، الكتالوج، التفاصيل، السلة، إتمام الطلب (58 ولاية بالفرنسية/العربية)، التتبع، المفضلة، الباقات، الأهداف، الحاسبة، المدونة، ولوحة الأدمن كاملة. العملة تتبع اللغة (DA / دج).
- **الواجهة**: نفس واجهة مشروع GoBodyShop (الألوان `#053842` / `#E85D04`، الأقسام: Carousel هيرو متحرك، شريط المزايا الأربع، Nouveautés، الأكثر مبيعاً/الرائج، تخفيضات الملابس، الحزم، TrustProof، نصائح الخبراء، AppPromo، فوتر بدون شارات دفع).
- **المتجر الكامل**: كتالوج + سلة + دفع عند الاستلام + تتبع `TRK-` + مفضلة + مدونة + حاسبة BMI + أهداف + باقات — من مشروع supplement-store.
- **الباك-اند**: Next.js API (منتجات/فئات/طلبات/بروموهات/مصادقة) + Prisma + PostgreSQL (Neon).
- **لوحة الأدمن**: `/admin` (نظرة عامة/منتجات/طلبات/بروموهات) بهوية GoBodyShop وباللغتين.

## نظام الترجمة- `src/i18n/dict.ts`: قاموسا `fr` (الأصل) و`ar` — كل نصوص الواجهة + الفئات + الأهداف + الحالات + 58 ولاية + المقالات + الباقات + الطلبات التجريبية.
- `src/i18n/LanguageProvider.tsx`: `LanguageProvider` + خطاف `useI18n()` يعطي `{ lang, dir, setLang, toggle, t, d, fp, catName, goalLabel, statusLabel }`. `fp(price)` تنسق السعر حسب اللغة.
- ملاحظة: محتوى المنتجات نفسها (أسماء/وصف/تقييمات من قاعدة البيانات) يبقى كما أدخله الأدمن — الترجمة تشمل واجهة الموقع كاملة.

## الهيرو المتحرك وشريط المزايا
- `src/components/goshop/HeroCarousel.tsx`: سلايدر 8 صور من `public/images/hero-slides/` (من مجلد «صور متحركة») — تنقّل تلقائي كل 5 ثوانٍ + أسهم + نقاط + سحب باللمس + إيقاف عند التحويم، ونص كل شريحة من القاموس (`slides`) باللغتين.
- `src/components/goshop/PerksBar.tsx`: شريط المزايا الأربع (توصيل سريع / أصلي 100% / شحن مجاني / دفع آمن) بنفس حجم وتموضع المرجع — أيقونات petrol `#053842` على خلفية `#F4F4F6`، مباشرة تحت الهيرو.
- **الواجهة**: نفس واجهة مشروع GoBodyShop تماماً (نفس الألوان `#053842` / `#E85D04`، نفس الأقسام: Hero باي داي، WHAT'S NEW، الأكثر مبيعاً/الرائج، تخفيضات الملابس، الحزم، TrustProof، نصائح الخبراء، AppPromo، فوتر) — معربة RTL بعملة دج
- **المتجر الكامل**: كتالوج + سلة + دفع عند الاستلام + تتبع `TRK-` + مفضلة + مدونة + حاسبة BMI + أهداف + باقات — من مشروع supplement-store
- **الباك-اند**: Next.js API (منتجات/فئات/طلبات/بروموهات/مصادقة) + Prisma + PostgreSQL (Neon)
- **لوحة الأدمن**: `/admin` (نظرة عامة/منتجات/طلبات/بروموهات) بهوية GoBodyShop

## الهوية
| العنصر | القيمة |
|---|---|
| الألوان | primary `#121212` / `#1A1A1A` + accent `#E50914` / `#B00610` + bg `#F4F4F6`/`#FFFFFF` + success `#10B981` |
| الخطوط | Inter (لاتيني) + Cairo/Tajawal/Almarai (عربي) |
| الاسم | ZWOLF Nutrition — ZWOLF Nutrition Store |
| الشعار | `public/zwolf-logo.jpg` |
| العملة | دج (الدينار الجزائري)، توصيل 69 ولاية (قانون 26-06)، دفع عند الاستلام |

## التشغيل محلياً
```bash
cd GOGOGOGO
npm install
cp .env.example .env   # ثم عبّئ DATABASE_URL و AUTH_SECRET
npx prisma db push
npm run db:seed
npm run dev
# http://localhost:3000
```

## متغيرات البيئة
انظر `.env.example`:
```
DATABASE_URL="postgresql://...neon.tech/neondb?sslmode=require"
ADMIN_USER / ADMIN_PASS_HASH
AUTH_SECRET (32+ حرف عشوائي)
```

## البنية
```
src/
 ├─ app/(page.tsx الرئيسية, products/[slug], cart, checkout, orders, wishlist,
 │       bundles, goals, bmi, blog, terms, admin, api/* (+ health, alerts))
 ├─ components/(Header, Footer, ProductCard,
 │       goshop/(AnnouncementBar, HeroCarousel, PerksBar, PromoGrid, ShopTabs, ClothingGrid,
 │              Bundles, PromoStrip, TrustProof, ExpertAdvice, AppPromo),
 │       Icons, AdminShell, AdminAlerts, CookieBanner)
 ├─ data/(products.ts fallback 14 منتجاً)
 ├─ i18n/(dict.ts fr/ar, LanguageProvider.tsx)
 ├─ hooks/useProducts.ts
 ├─ store/(cart.ts, wishlist.ts)
 ├─ lib/(auth.ts, jwt-edge.ts, prisma.ts, rate-limit.ts (Neon مشترك), alerts.ts, utils.ts, validators.ts)
prisma/(schema.prisma, seed.mjs)
```

## المراقبة قبل أي حملة إعلانية
- `GET /api/health` → `{ ok, db, dbMs, products, pendingOrders, unreadAlerts }`. اربطه بمراقب خارجي مجاني (UptimeRobot / Better Uptime) يفحص كل 5 دقائق وينبهك عند `ok != true`.
- كل فشل طلب/تعديل أدمن يُسجَّل في جدول `Alert` ويظهر في ودجت **التنبيهات/سجل الإدارة** في `/admin` (زر فحص Neon اليدوي موجود أيضاً).
- النسخ الاحتياطي: Neon Point-In-Time Recovery مفعّل افتراضياً — تحقق منه في لوحة Neon قبل الحملة.
- الاستجابة للحوادث: عند تنبيه سقوط — 1) تحقق `/api/health` 2) لوحة Neon 3) سجل Vercel. لا تغييرات متسرعة وقت الذروة.

## ملاحظات النقل
- مفاتيح التخزين المحلية (`supplement-cart`, `z1-*`) وبادئة الطلبات الجديدة `GB-` وكوكي الأدمن `z1_admin_token` أسماء تقنية داخلية — لا تظهر للمستخدم.
- كود الخصم الافتراضي: `FIT10`.
