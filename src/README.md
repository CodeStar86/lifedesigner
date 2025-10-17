# Life Designer - Design Your Future

A beautiful, cinematic vision board app where you can visualize and track your life goals. Create draggable goal cards, view affirmations in slideshow mode, and export your vision board — all 100% private and client-side.

## ✨ Features

- **Drag & Drop Vision Board**: Create and arrange goal cards freely on an infinite canvas
- **Rich Goal Cards**: Add images, emojis, descriptions, target ages/years, and categories
- **Affirmation Mode**: View your goals as an inspiring slideshow with auto-play
- **6 Beautiful Themes**: Calm, Luxury, Cinematic, Pastel Dream, Emerald, and Dark Mode
- **Progress Tracking**: Mark goals as achieved and track your journey
- **Export & Share**: Download your vision board as PNG or export/import as JSON
- **100% Private**: All data stored locally in your browser - no servers, no tracking
- **Completely Free**: No signup, no payment, no limitations

## 🎨 Categories

- 💪 Health
- ❤️ Relationships
- 💼 Career
- 💰 Finances
- 🌱 Personal Growth
- ✈️ Adventure

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deploy to GitHub Pages

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Install GitHub Pages package** (if not already installed):
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add to package.json**:
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Configure GitHub**:
   - Go to your repository settings
   - Navigate to Pages
   - Set source to `gh-pages` branch
   - Your app will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## 🛠️ Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling with beautiful gradients
- **Motion (Framer Motion)** - Smooth animations
- **html2canvas** - Export vision boards as images
- **shadcn/ui** - Beautiful UI components
- **localStorage** - Client-side data persistence

## 📱 Usage

1. **Add a Goal**: Click the "+" button to create a new goal card
2. **Customize**: Add title, description, target age/year, image, emoji, and category
3. **Arrange**: Drag cards anywhere on the canvas to create your perfect vision board
4. **View Affirmations**: Switch to slideshow mode for an inspiring presentation
5. **Track Progress**: Check off goals as you achieve them
6. **Export**: Download your vision board as PNG or backup as JSON

## 🎯 Example Goals

- Get Married and Have Kids Before 40 ❤️
- Run a 7-Figure Business 💼
- Own a Range Rover Sport 🏎️
- Stay Fit and Strong 💪
- Travel to Bali and Italy ✈️
- Learn to Speak 3 Languages 🌱

## 🔒 Privacy

Life Designer is built with privacy in mind:
- All data is stored in your browser's localStorage
- No data is sent to any server
- No tracking or analytics
- No account required
- Export your data anytime

## 📄 License

MIT License - feel free to use this for personal or commercial projects!

## 💖 Support

If you love Life Designer, consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs or suggesting features
- 🎨 Contributing to the project
- ☕ Buying me a coffee (add your link)

---

**Built with ✨ by [Your Name]**

Start designing your future today!
