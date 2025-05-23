import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import svgr from "vite-plugin-svgr"
import { fileURLToPath, URL } from "node:url"

export default defineConfig({
  plugins: [
    react({ babel: { plugins: [["babel-plugin-react-compiler"]] } }),
    tailwindcss(),
    svgr({
      svgrOptions: {
        typescript: false,
        jsxRuntime: "classic",
        replaceAttrValues: { "#000": "{props.color}" },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/ui/components", import.meta.url)),
    },
  },
  server: { port: 3001 },
})
