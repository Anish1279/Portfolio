# 3D Immersive Portfolio 🌐

![Project Banner](public/og-image.png)
A high-performance, interactive 3D portfolio website built with **Next.js 16 (App Router)** and **React Three Fiber**. This project showcases modern web capabilities, blending creative coding with robust software engineering practices.

## 🚀 Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **3D Engine:** [Three.js](https://threejs.org/) via [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** Framer Motion & Native Three.js Animations
* **Deployment:** Vercel

## ✨ Key Features

* **Interactive 3D Scene:** A fully immersive landing page featuring custom particle systems and dynamic camera movements.
* **Optimized Loading:** Custom `SceneLoader` with Suspense integration to ensure smooth UX during asset hydration.
* **Dynamic Environments:** algorithmic sky generation using Canvas API textures and Hemisphere lighting.
* **Performance First:** uses `ssr: false` for heavy 3D components to optimize Server-Side Rendering costs while maintaining fast Client-Side interaction.
* **Responsive Design:** seamlessly adapts 3D viewports and UI overlays for mobile and desktop devices.

## 🛠️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open the local environment**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```bash
├── app/
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main entry (Client Component with Dynamic Import)
├── components/
│   ├── scene/          # 3D logic
│   │   ├── scene.tsx   # Canvas entry point
│   │   ├── scene-environment.tsx # Lights, Fog, Sky generation
│   │   └── particles.tsx # Custom bufferGeometry particle system
│   └── ui/             # 2D UI overlays (Tailwind)
└── public/             # Static assets
