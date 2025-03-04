# Employee Portal

A comprehensive solution for managing employee records. This project is built using Next.js, TypeScript, Tailwind CSS, and various other modern web technologies.

## Features

- Add, update, and delete employee records
- View a list of all employees
- Responsive design
- Light, dark, and nature themes
- Smooth scrolling navigation

## Technologies Used

- **Next.js**: A React framework for production
- **TypeScript**: A strongly typed programming language that builds on JavaScript
- **Tailwind CSS**: A utility-first CSS framework
- **Framer Motion**: A library for animations
- **React Hook Form**: A library for managing form state
- **Zod**: A TypeScript-first schema declaration and validation library
- **Lucide Icons**: A set of open-source icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Yaimaran/Employee-Portal.git
   cd Employee-Portal
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

   ```bash
    npm run dev
    # or
    yarn dev
   ```

- Open http://localhost:3000 with your browser to see the result.

### Building for Production

   ```bash
    npm run build
    # or
    yarn build
   ```

### Running in Production Mode

   ```bash
    npm start
    # or
    yarn start
   ```

## Project Structure

   ```bash
    .
    ├── app
    │ ├── layout.tsx
    │ ├── page.tsx
    │ ├── globals.css
    ├── components
    │ ├── about.tsx
    │ ├── creative-nav.tsx
    │ ├── employee-form.tsx
    │ ├── employee-list.tsx
    │ ├── hero.tsx
    │ ├── theme-provider.tsx
    │ ├── ui
    │ ├── button.tsx
    │ ├── card.tsx
    │ ├── input.tsx
    │ ├── label.tsx
    │ ├── select.tsx
    │ ├── toaster.tsx
    │ ├── use-toast.tsx
    ├── context
    │ ├── employee-context.tsx
    ├── public
    │ ├── favicon.ico
    ├── styles
    │ ├── globals.css
    ├── .gitignore
    ├── package.json
    ├── tailwind.config.js
    ├── tsconfig.json
    └── README.md
   ```

## Contributing

- Contributions are welcome! Please open an issue or submit a pull request for any changes.
