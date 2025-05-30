import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./lib/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            maxWidth: {
                "28": "7rem",
                "32": "8rem",
                "36": "9rem",
            },
            fontSize: {
                "filters": "12.5px"
            }
        },
    }
};

export default config;
