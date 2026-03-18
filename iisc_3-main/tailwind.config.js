/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./common/components/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
            '3xl': '1920px',
        },
        extend: {
            fontFamily: {
                sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
                display: ['Playfair Display', 'Georgia', 'serif'],
                mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
                body: ['DM Sans', 'system-ui', 'sans-serif'],
                greater: ['Roboto Slab', 'serif'],
                lesser: ['Inter', 'sans-serif'],
            },
            colors: {
                navy: {
                    DEFAULT: '#0A0E1A',
                    50: '#1a1f33',
                    100: '#151a2e',
                    200: '#111528',
                    300: '#0d1122',
                    400: '#0A0E1A',
                    500: '#070a14',
                    600: '#05070e',
                    700: '#030409',
                    800: '#010204',
                    900: '#000000',
                },
                blue: {
                    DEFAULT: '#42A5F5',
                    50: '#E3F3FF',
                    100: '#C7E8FF',
                    200: '#9AD8FF',
                    300: '#6CC8FF',
                    400: '#42A5F5',
                    500: '#1E88E5',
                    600: '#1565C0',
                    700: '#0D47A1',
                    800: '#083379',
                    900: '#041F4F',
                },
                accent: {
                    primary: '#42A5F5',
                    light: '#80D2FF',
                    dark: '#1E88E5',
                    glow: 'rgba(66, 165, 245, 0.25)',
                    border: 'rgba(66, 165, 245, 0.4)',
                    hover: 'rgba(66, 165, 245, 0.3)',
                    subtle: 'rgba(66, 165, 245, 0.15)',
                    medium: 'rgba(66, 165, 245, 0.45)',
                },
                text: {
                    primary: '#F0ECE3',
                    secondary: 'rgba(240, 236, 227, 0.6)',
                    tertiary: 'rgba(240, 236, 227, 0.35)',
                    accent: '#42A5F5',
                },
                border: {
                    default: 'rgba(240, 236, 227, 0.08)',
                    hover: 'rgba(66, 165, 245, 0.3)',
                    card: 'rgba(240, 236, 227, 0.06)',
                    divider: 'rgba(240, 236, 227, 0.1)',
                },
                background: {
                    primary: '#0A0E1A',
                    secondary: '#111827',
                    tertiary: '#1E2A3A',
                    glass: 'rgba(17, 24, 39, 0.85)',
                    hero: '#0A0E1A',
                    about: '#0D1220',
                    data: '#0A0E1A',
                    impact: '#111827',
                    team: '#0D1220',
                    footer: '#070A12',
                },
                brand: {
                    primary: '#42A5F5',
                    dark: '#0A0E1A',
                    accent: '#F0ECE3',
                    bg: '#0A0E1A',
                },
            },
            animation: {
                'fade-up': 'fadeUp 0.6s ease forwards',
                'fade-in': 'fadeIn 0.8s ease forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-wave': 'pulseWave 3s ease-in-out infinite',
                'waveform': 'waveform 2s ease-in-out infinite alternate',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'count-up': 'countUp 0.5s ease-out',
                'slide-up': 'slideUp 0.7s ease forwards',
                'ripple': 'ripple 4s linear infinite',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                pulseWave: {
                    '0%, 100%': { transform: 'scaleY(1)', opacity: '0.6' },
                    '50%': { transform: 'scaleY(1.3)', opacity: '1' },
                },
                waveform: {
                    '0%': { transform: 'scaleY(0.3)' },
                    '50%': { transform: 'scaleY(1)' },
                    '100%': { transform: 'scaleY(0.5)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(66, 165, 245, 0.3)' },
                    '100%': { boxShadow: '0 0 40px rgba(66, 165, 245, 0.6)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                ripple: {
                    '0%': { transform: 'scale(0.8)', opacity: '1' },
                    '100%': { transform: 'scale(2.5)', opacity: '0' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [
        require("daisyui"),
        require('@tailwindcss/forms'),
    ],
    daisyui: {
        themes: false,
    }
}