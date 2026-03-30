# Weather App 🌤️


A web application to display the current weather with support for Arabic and English languages, including automatic text direction switching (RTL/LTR).  
🔗 Live demo: [Weather App on Vercel](https://weather-app-three-teal-51.vercel.app/)

----------

## Main Features

-   Show current weather for a specific location using coordinates.
-   Multi-language support: Arabic and English.
-   Dynamic language switching with a single button.
-   Translate weather descriptions between Arabic and English.
-   Display current date and time in local format for each language.
-   Responsive design using **Material UI** and **Tailwind CSS**.
-   Automatic text direction (RTL/LTR) based on selected language.

----------

## Technologies Used

-   **React** – Frontend library.
-   **Material UI** – UI components.
-   **Tailwind CSS** – Rapid styling.
-   **Axios** – Fetch weather data from OpenWeather API.
-   **Moment.js** – Date and time formatting with locale support.
-   **react-i18next** – Multi-language support.

----------

## Challenges & Solutions

### 1️⃣ Moment.js Locale Issue

-   Initially, using:

moment.locale("ar");

-   The date was still showing in English.
-   Cause: **Vite tree-shaking removed Moment.js locale files**.
-   Solution: import the full version:

import  moment  from  "moment/min/moment-with-locales";

or

import  "moment/dist/locale/ar";

> This problem appeared locally, not in the code logic itself.

### 2️⃣ Vite/Tailwind Build Errors on Vercel

-   When deploying, build errors occurred related to `@tailwindcss/vite` and `@vitejs/plugin-react`.
-   Cause: Version conflicts between Vite 8, plugins, and Vercel build environment.
-   Solution: Align versions compatible with Vite 8, remove `node_modules` and `package-lock.json`, and reinstall dependencies.

> Summary:
> 
> -   Moment.js locale issue → appeared **locally** due to tree-shaking.
> -   Vite/Tailwind errors → appeared **on Vercel** due to environment and version conflicts.

---

##  Main Features

- Display current weather for a given location using coordinates.
- Multi-language support: Arabic and English.
- Dynamic language switching with a button.
- Translate weather description between Arabic and English.
- Display current date and time in local format for each language.
- Responsive design using **Material UI** and **Tailwind CSS**.
- Automatic text direction (RTL/LTR) based on language.

---

##  Technologies Used

- **React** – Front-end library.
- **Material UI** – UI components.
- **Tailwind CSS** – Styling.
- **Axios** – Fetching weather data from OpenWeather API.
- **Moment.js** – Date and time formatting with locale support.
- **react-i18next** – Multi-language support.

---

