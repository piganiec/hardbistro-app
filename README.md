# HardBistro - Food Ordering App

A modern food ordering application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🍽️ **Customer Ordering**: Browse menu, select dishes, and place orders
- 👨‍💼 **Admin Panel**: Manage dishes, view orders, and control inventory
- 🔐 **Secure Authentication**: Password-protected admin access
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful interface with Tailwind CSS

## Prerequisites

Before running this application, you need to have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

## Installation

1. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

2. **Install additional dependencies:**
   ```bash
   npm install clsx tailwind-merge
   ```

## Running the Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Usage

### For Customers
1. Navigate to the "Złóż zamówienie" (Place Order) tab
2. Browse the available dishes
3. Use the +/- buttons to select quantities
4. Fill in your contact information
5. Click "Złóż zamówienie" to place your order

### For Administrators
1. Navigate to the "Panel administracyjny" (Admin Panel) tab
2. Enter the password: `hardbistro2024`
3. Manage dishes:
   - Add new dishes
   - Edit existing dishes
   - Delete dishes
   - Monitor inventory levels
4. View all customer orders with details

## Default Menu Items

The app comes with three default dishes:
- **Sałatka Cezar** (Caesar Salad) - 20.00 zł
- **Zupa dnia - Żurek** (Daily Soup - Żurek) - 5.00 zł
- **Kotlet schabowy z ziemniakami** (Pork Cutlet with Potatoes) - 18.50 zł

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── tabs.tsx
│   ├── admin-panel.tsx     # Admin panel component
│   └── customer-order.tsx  # Customer ordering component
├── lib/
│   └── utils.ts            # Utility functions
└── types/
    └── index.ts            # TypeScript type definitions
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library
- **clsx** - Conditional className utility
- **tailwind-merge** - Tailwind CSS class merging

## Development

The application uses:
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Next.js App Router** for routing
- **React Hooks** for state management

## Building for Production

```bash
npm run build
npm start
```

## License

This project is open source and available under the MIT License. 