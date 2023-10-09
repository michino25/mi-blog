import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0", // Set the host to '0.0.0.0' to allow external access
        port: 3000, // Set the desired port number
    },
});
