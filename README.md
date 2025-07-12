# JEJE TRANS - Transport Shipment Tracker

## 🔧 Stack

- Vue 3 + Composition API
- Pinia
- TailwindCSS
- PrimeVue
- Vue Router
- Static JSON (Mock Data)
- Vitest (Unit Testing)

## 🚀 Features

- List and detail view of shipments
- Assign transporters
- State management via Pinia
- Form validation & feedback messages
- Responsive layout

## 🛠️ Project Structure

```
src/
├── assets/
├── components/
│   ├── ListShipment.vue
│   └── Navbar.vue
├── data/
│   ├── shipment.json
│   └── transporter.json
├── pages/
│   ├── Home.vue
│   └── DetailShipment.vue
├── router/
│   └── index.js
├── stores/
│   └── shipment.js
├── tests/
│   └── shipmentStore.test.js
├── App.vue
├── main.js
```

## 📦 Run Locally

```bash
npm install
npm run dev
```

## 🧪 Run Unit Tests

```bash
npx vitest
or
npm run test
```
