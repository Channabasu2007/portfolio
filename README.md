# Channabasavaswami Mathad | Minimal Portfolio

A high-performance, minimalist personal portfolio website built with modern web technologies. This project showcases my skills, experience, and projects as a Full-Stack Web Developer.

## 🚀 Built With

*   **[Next.js 15+](https://nextjs.org/)** - The React Framework for the Web (using App Router).
*   **[React 19](https://react.dev/)** - The library for web and native user interfaces.
*   **[Tailwind CSS v4](https://tailwindcss.com/)** - A utility-first CSS framework for rapid UI development.
*   **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library for React.
*   **[React Icons](https://react-icons.github.io/react-icons/)** - Popular icons in your React projects.
*   **[Node Mailjet](https://www.npmjs.com/package/node-mailjet)** - Email delivery service for the contact form.

## ✨ Features

*   **Responsive Design:** Fully responsive layout ensuring a seamless experience across all devices (Mobile, Tablet, Desktop).
*   **Dark/Light Mode:** (Ready for implementation via Tailwind/Next-Themes).
*   **SEO Optimized:** Built-in SEO best practices including `sitemap.xml`, `robots.txt`, and structured data (JSON-LD).
*   **Performance:** Optimized for speed and Core Web Vitals using Next.js features like Image Optimization and Server Components.
*   **Dynamic Animations:** Smooth page transitions and element reveals using Framer Motion.
*   **Contact Form:** Functional contact form integrated with Mailjet API.

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router directory
│   ├── api/              # API routes (e.g., contact form handler)
│   ├── layout.js         # Root layout with font and metadata settings
│   ├── page.js           # Main landing page assembling all sections
│   ├── globals.css       # Global styles and Tailwind directives
├── components/           # Reusable UI components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── sections/         # Page sections (Hero, About, Skills, Work, etc.)
│   └── ui/               # Generic UI elements (Buttons, Cards, Inputs)
├── public/               # Static assets (images, fonts)
```

## 🛠️ Getting Started

Follow these steps to set up the project locally:

### Prerequisites

*   Node.js 18.17 or later
*   npm (Node Package Manager)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/channabasu2007/Portfolio.git
    cd Portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add your Mailjet credentials (for the contact form):
    ```env
    MJ_APIKEY_PUBLIC=your_public_key
    MJ_APIKEY_PRIVATE=your_private_key
    MJ_SENDER_EMAIL=your_verified_sender_email
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Channabasavaswami Mathad**

*   Website: [channabasu.dev](https://channabasu.dev)
*   GitHub: [@Channabasu2007](https://github.com/Channabasu2007)
*   LinkedIn: [Channabasavaswami Mathad](https://linkedin.com/in/channabasumathad)

# portfolio
This is my portfolio, you can find comprehensive information about me in this website.
