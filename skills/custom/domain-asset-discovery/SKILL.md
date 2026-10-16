---
name: domain-asset-discovery
description: Discovers and verifies authentic, domain-accurate media assets (sports jerseys, club badges, movie posters, book covers, commercial products, brand logos) across canonical open APIs without placeholder or hallucinated URLs.
---

# Domain Asset Discovery — The Universal Media Acquisition Standard

## 🛑 The Golden Rule of Media in AI Development
**NEVER hallucinate, guess, or hardcode unverified image URLs from memory.**
Do NOT use random Unsplash photo IDs unless they are verified via API to match the exact subject.
Do NOT use generic dummy placeholder services (e.g. `via.placeholder.com`).
ALWAYS query the authoritative, domain-specific open registry to fetch real, high-resolution, CDN-backed assets.

---

## 🗺️ Domain Registry Quick Reference

| Domain | Canonical Registry | What It Provides | Auth Required? | Endpoint / Method |
| :--- | :--- | :--- | :--- | :--- |
| **Sports & Kits** | **TheSportsDB** | Transparent Club Badges, Official Kits, Stadiums | **No** (Key `"3"` is free) | `searchteams.php?t=<team>`, `lookupequipment.php?id=<id>` |
| **Movies & TV** | **TMDB (The Movie Database)** | Exact official posters, backdrops, cast photos | **Yes** (Free Developer Key) | `https://api.themoviedb.org/3/search/movie` |
| **Logos & Flags** | **Wikimedia Commons API** | Official SVGs and high-res transparent PNGs | **No** (100% Free / Open) | `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages` |
| **E-Commerce Products** | **DummyJSON / FakeStoreAPI** | Real phones, laptops, apparel, sneakers, watches | **No** (100% Free / Open) | `https://dummyjson.com/products/category/<category>` |
| **Books & Novels** | **Open Library Covers** | Exact book cover artwork by ISBN or OLID | **No** (100% Free / Open) | `https://covers.openlibrary.org/b/isbn/<isbn>-L.jpg` |
| **Food & Packaged Goods**| **Open Food Facts** | Real food products, nutrition labels, packaging | **No** (100% Free / Open) | `https://world.openfoodfacts.org/api/v2/product/<barcode>` |

---

## 🛠️ Implementation Workflows by Domain

### 1. Sports & Football Kits (TheSportsDB)
- **Base URL:** `https://www.thesportsdb.com/api/v1/json/3` (Key `"3"` is the public test key).
- **Find Team & Badges:**
  ```javascript
  const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(teamName)}`);
  const data = await res.json();
  const team = data.teams[0];
  const badgeUrl = team.strBadge; // Transparent official club crest
  const logoUrl = team.strLogo;   // Official banner logo
  ```
- **Find Official Kit Renders:**
  ```javascript
  const eqRes = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupequipment.php?id=${team.idTeam}`);
  const eqData = await eqRes.json();
  // Returns array of kits: { strSeason: "2024-2025", strType: "1st", strEquipment: "https://r2.thesportsdb.com/..." }
  ```

---

### 2. Movies & TV Shows (TMDB)
- **Base URL:** `https://api.themoviedb.org/3`
- **Image CDN Base:** `https://image.tmdb.org/t/p/w500` (or `original` for ultra-high res).
- **Credentials Reference:** See [`references/tmdb_credentials.md`](references/tmdb_credentials.md) for ready-to-use API key and Bearer Access Token.
- **Authentication:** Use `process.env.TMDB_API_KEY` if configured in the project, or fallback directly to the key in [`references/tmdb_credentials.md`](references/tmdb_credentials.md).
- **Query Example:**
  ```javascript
  const apiKey = process.env.TMDB_API_KEY || '0640e43265aa5fc930814dfb1f3cab7a';
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieTitle)}`);
  const data = await res.json();
  const movie = data.results[0];
  
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  ```
- **Free No-Key Fallback (Wikimedia Commons for Iconic Films):**
  If no TMDB API key is available in environment, query Wikipedia PageImages:
  ```javascript
  const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(movieTitle + ' (film)')}&prop=pageimages&format=json&pithumbsize=600&origin=*`);
  ```

---

### 3. General E-Commerce Products (Electronics, Apparel, Beauty)
- **DummyJSON Products API:** Zero authentication, production-grade categorized photos.
- **Endpoint:** `https://dummyjson.com/products/category/<category>`
  - Categories: `smartphones`, `laptops`, `mens-shirts`, `womens-shoes`, `watches`, `fragrances`, `groceries`.
- **Query Example:**
  ```javascript
  const res = await fetch('https://dummyjson.com/products/category/smartphones');
  const data = await res.json();
  // Each product has:
  // - thumbnail: High-res square product photo
  // - images: Array of multiple angles
  ```

---

### 4. Official Brand Logos & Crests (Wikimedia Commons API)
- Use for verified SVG or high-res transparent PNGs of organizations, football clubs, or brands:
```javascript
async function getWikimediaImage(entityTitle) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(entityTitle)}&prop=pageimages&format=json&pithumbsize=500&origin=*`;
  const res = await fetch(url);
  const data = await res.json();
  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];
  return pages[pageId]?.thumbnail?.source ?? null;
}
```

---

## 🔒 Production Asset Hygiene: Avoiding Hotlink Breakages

When an AI agent writes seed scripts or runtime ingestion code:
1. **Never commit hotlinks that block `Referer` headers** (e.g. Football Kit Archive blocks external referers with 403 Forbidden).
2. **Open CDNs are safe to link directly:**
   - `r2.thesportsdb.com` (TheSportsDB) — Safe for client direct-linking.
   - `image.tmdb.org` (TMDB) — Safe for client direct-linking.
   - `upload.wikimedia.org` (Wikimedia) — Safe for client direct-linking.
   - `cdn.dummyjson.com` (DummyJSON) — Safe for client direct-linking.
3. **For long-term production persistence:** When an admin or user creates a product, the backend media pipeline should upload the fetched remote URL into a permanent cloud bucket (Cloudinary / AWS S3 / Supabase Storage).
