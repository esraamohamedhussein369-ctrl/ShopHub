# Casa Market (`ecommerce-store`)

A UI-only multi-vendor marketplace built with Next.js, Tailwind CSS, and React Context. All product, cart, and account data lives in the browser — there is no backend.

## Features

- Login and multi-step registration (client-side validation)
- Marketplace home with collapsible category, price, and gender filters
- Client-side search and combined filters
- Product cards, product detail with image gallery, and related items
- Shopping cart with quantities, remove, subtotal, and empty state
- Responsive layout (1 / 2 / 3–4 column grids) and dark mode toggle
- Cart badge bounce when an item is added

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build
npm start
npm run lint
```

## Demo accounts

Any valid email and a password of at least 8 characters will “sign in”. Registration saves a mock user in `localStorage`. Cart contents persist in the browser as well.

## Project structure

```
src/
  app/                 Next.js routes
  components/          Header, Sidebar, ProductCard, filters, search
  context/AppContext.jsx  Cart, filters, search, theme, mock auth
  data/mockData.js     28 sample products and sellers
  views/               Login, Register, Home, Product Detail, Cart
```

Images are loaded from Unsplash. If a photo fails to load, check your network connection.
