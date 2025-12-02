# FiberScope 🚀

**The Ultimate React Debugging & AI Architect Tool**

FiberScope is a next-generation developer tool designed to revolutionize how you debug, inspect, and modify React applications. Unlike traditional devtools, FiberScope allows you to traverse the React Fiber tree, modify props and state in real-time, and leverage AI to rewrite component styles and logic on the fly directly from your browser.

![FiberScope Banner](public/vite.svg)

## ✨ Features

- **🔍 Deep Fiber Inspection**: Visualize the actual component tree, including HOCs, Context Providers, and internal Fiber nodes.
- **🤖 AI-Powered Modifications**: Describe UI changes in natural language (e.g., *"Make this button gradient purple and larger"*) and let the AI architect update your props and styles instantly.
- **⚡ Live State & Prop Editing**: Tweak component properties, toggle boolean flags, and modify state hooks in real-time without triggering full page reloads.
- **📊 Performance Metrics**: Track render durations, commit times, and identify wasted renders to optimize application performance.
- **📋 Code Export**: One-click export of your live modifications into production-ready JSX/CSS code.
- **🎨 Neon Dark Theme**: A beautiful, developer-focused UI designed for long coding sessions.

## 🛠️ Installation

FiberScope is designed to be dropped into any React project with zero configuration.

```bash
# Clone the repository
git clone https://github.com/CodeByPinar/Fiberscope.git

# Navigate to project directory
cd fiberscope

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📖 Usage

1.  **Wrap your App**: Import `FiberScope` and wrap your root component (already configured in this demo).
2.  **Trigger Inspector**: Click the FiberScope logo or use the keyboard shortcut (default: `Ctrl+Shift+F`) to open the overlay.
3.  **Select a Component**: Hover over any element in your UI to see its Fiber boundaries. Click to inspect.
4.  **Edit & AI**: Use the panel to change props manually or use the "AI Rewrite" button to prompt changes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/CodeByPinar">CodeByPinar</a>
</p>
