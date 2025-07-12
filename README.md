# JEJE TRANS - Transport Shipment Tracker

## 🔧 Stack

- Vue 3 + Composition API
- Pinia
- TailwindCSS
- Vue Router
- Static JSON (Mock Data)
- Vitest (Unit Testing)

## 🚀 Features

- List and detail view of shipments
- Assign transporters
- State management via Pinia
- Simulated real-time status updates (every 5s)
- Form validation & feedback messages
- Responsive layout

## 🛠️ Project Structure

```
src/
├── assets/
├── components/
├── pages/
│   ├── ListView.vue
│   └── DetailView.vue
├── router/
├── stores/
├── App.vue
├── main.js
public/
├── data/
│   ├── shipments.json
│   └── transporters.json
```

## 📦 Run Locally

```bash
npm install
npm run dev
```

## 🧪 Run Unit Tests

```bash
npx vitest
```

## 📄 Assumptions

- Shipment status changes to "Delivered" randomly every 5 seconds
- Static data used for simplicity (no backend integration)
