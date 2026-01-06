# **Senetry Link – Evidence Vault UI (Phase A)**

## **Project Overview**

This is a **React + Vite + Tailwind CSS (with DaisyUI)** project that demonstrates the **SentryLink Comply Phase A** UI for a factory user. The interface simulates managing evidence documents and fulfilling buyer requests without a backend — all data is mocked locally.

---
## 🌟 Live Website
**[Visit SenetryLink Live →](https://sentery-link.netlify.app/)**

## 🚀 **Features**

- Home / Evidence Vault screen with a table, filters, and search  
- Evidence Detail screen showing versions and upload modal  
- Buyer Requests screen with fulfill action    
- Routing with React Router  
- Styled with Tailwind CSS + DaisyUI  
- Mocked local data (no backend/server required)

---
```

## 📁 **Project Structure**
SENTRY-LINK/
├─ public/
│  ├─ docData.json         
│  ├─ senetrylogo.png       
│  └─ _redirects            
├─ src/
│  ├─ assets/               
│  │   ├─ react.svg
│  │   └─ senetrylogo.png
│  ├─ Component/Shared     
│  │   ├─ Header.jsx
│  │   └─ Footer.jsx
│  ├─ Layout/
│  │   └─ RootLayOut.jsx
│  ├─ Pages/
│  │   ├─ Home/
│  │   │   └─ Home.jsx
│  │   ├─ Evidence/
│  │   │   └─ EvidenceDetail.jsx
│  │   └─ BuyerRequest/
│  │       └─ BuyerRequests.jsx
│  ├─ Routes/
│  │   └─ Router.jsx
│  ├─ App.css
│  ├─ index.css
│  └─ main.jsx
├─ package.json
├─ vite.config.js
├─ README.md
└─ .gitignore
```
### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sh-shahedul/sentryLink-factory-demo.git
cd sentry-Link
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the project locally**
   ```bash
npm run dev
```


