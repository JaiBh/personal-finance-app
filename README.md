# 💸 Personal Finance App

A sleek, modern personal finance app that empowers users to track income, expenses, savings, and budgeting goals — all in one place. Built as part of my front-end developer portfolio to showcase responsive design, authentication, and full-stack integration.

> 🔗 **Live Demo**: [jaibh-finance.xyz](https://www.jaibh-finance.xyz)  
> 🧠 **GitHub Repo**: [github.com/JaiBh/personal-finance-app](https://github.com/JaiBh/personal-finance-app)

---

## ⚙️ Features

- 🔐 User Authentication (via Clerk)
- 🏦 Dashboard for tracking balances, income, and expenses
- 📆 Recurring & one-off transaction support
- 💡 Categorization by type (e.g. rent, groceries, income)
- 📊 Create and manage budgets & savings goals
- 🧾 Bill management with due date logic
- 🔎 Dynamic filtering & search

---

## 🧰 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Auth**: Clerk
- **Database**: PostgreSQL via Prisma & NeonDB
- **Deployment**: Vercel
- **TypeScript**: Full TypeScript support throughout
- **Design System**: ShadCN UI

---

## 🚀 Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/JaiBh/personal-finance-app.git
cd personal-finance-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**
   Create a `.env` file using `.env.example` and fill in the required values (Clerk keys, database URL, etc).

4. **Run the dev server:**

```bash
npm run dev
```

---

## 📁 Project Structure

```
src/
├── app/                # App Router pages
├── components/         # Reusable UI components
├── lib/                # Utility functions and Prisma client
├── prisma/             # Prisma schema and DB seed logic
├── public/             # Static assets
└── styles/             # Tailwind config and globals
```

---

## 🔒 Environment Variables

Create a `.env` file in the root directory and include:

```
DATABASE_URL=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

---

## 🤔 Why I Built This

I created this project to explore full-stack development with modern tools like Clerk, Prisma, and ShadCN UI. It helped me deepen my understanding of state management, authentication flows, and building responsive, user-friendly interfaces.

---

## 🧑‍💻 Author

Built by [**Jai Bhullar**](https://jaibh-portfolio.vercel.app) – aspiring front-end/full-stack developer based near London.

📫 Email: jaibhullar.developer@outlook.com

---

## 📝 License

MIT License. Feel free to use, modify, or contribute!
