# Professional Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Showcases projects in Data Science, Machine Learning, and DevOps Engineering.

## 🚀 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Smooth scrolling navigation and hover effects
- **Contact Form**: Integrated EmailJS for contact form functionality
- **Project Showcase**: Detailed project cards with technologies and impact metrics
- **Skills Section**: Organized technical skills by category
- **Performance Optimized**: Fast loading with optimized images and code

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Contact Form**: EmailJS
- **Build Tool**: Vite
- **Deployment**: Ready for Netlify, Vercel, or GitHub Pages

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## ⚙️ Configuration

### EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new service and template
3. Update the following in `src/App.tsx`:
   - Replace `"YOUR_PUBLIC_KEY"` with your EmailJS public key
   - Replace `"YOUR_SERVICE_ID"` with your service ID
   - Replace `"YOUR_TEMPLATE_ID"` with your template ID

### Customization

1. **Personal Information**: Update contact details, social links, and bio in `src/App.tsx`
2. **Projects**: Modify the `projects` array with your own projects
3. **Skills**: Update the `skillCategories` array with your technical skills
4. **Images**: Replace project images and profile photo with your own
5. **Colors**: Customize the color scheme in `tailwind.config.js`

## 📁 Project Structure

```
src/
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
├── index.css        # Global styles and animations
└── vite-env.d.ts    # TypeScript declarations

public/
├── index.html       # HTML template
└── vite.svg         # Favicon

```

## 🎨 Customization Guide

### Adding New Projects

Add new projects to the `projects` array in `src/App.tsx`:

```typescript
{
  title: "Your Project Title",
  description: "Project description...",
  category: "Category",
  status: "Status",
  impact: "Impact description",
  technologies: ["Tech1", "Tech2", "Tech3"],
  image: "https://images.pexels.com/photos/your-image.jpeg",
  github: "https://github.com/yourusername/project",
  demo: "https://your-demo-link.com"
}
```

### Updating Skills

Modify the `skillCategories` array to reflect your skills:

```typescript
{
  title: "Category Name",
  icon: <YourIcon className="w-6 h-6" />,
  skills: ["Skill1", "Skill2", "Skill3"]
}
```

### Changing Colors

Update the color scheme by modifying the gradient classes in the components or extending the Tailwind config.

## 🚀 Deployment

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set up continuous deployment with your Git repository

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

The project includes:
- TypeScript for type safety
- ESLint for code linting
- Prettier configuration (recommended)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to:
- Open an issue on GitHub
- Contact me through the portfolio contact form
- Connect with me on LinkedIn

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**