# 🕯️ נחמניסט — Nachmanist

יועץ רוחני מבוסס AI ברוח תורתו של רבי נחמן מברסלב.

> "כל העולם כולו גשר צר מאוד, והעיקר לא לפחד כלל"

## מה זה?

נחמניסט הוא צ'אטבוט בדומה לממשק של ChatGPT שעונה אך ורק בהתאם לכתבים ולהוויה של רבי נחמן מברסלב. הבוט מספק ייעוץ רוחני, השראה ותובנות מתורת רבי נחמן.

## הרצה

### 1. הגדרת Azure OpenAI

צור קובץ `.env` בתיקיית הפרויקט:

```bash
cp .env.example .env
```

ערוך את הקובץ עם פרטי ה-Azure OpenAI שלך:

```
AZURE_OPENAI_ENDPOINT=https://YOUR-RESOURCE.openai.azure.com
AZURE_OPENAI_API_KEY=your-api-key
AZURE_OPENAI_DEPLOYMENT=gpt-4o
AZURE_OPENAI_API_VERSION=2024-08-01-preview
```

### 2. התקנה

```bash
npm install
```

### 3. הרצה

הרץ את שרת ה-API (בטרמינל נפרד):

```bash
npm run server
```

הרץ את שרת הפיתוח:

```bash
npm run dev
```

פתח את http://localhost:5173 בדפדפן.

## מבנה הפרויקט

```
nachmanist/
├── server/
│   └── index.js          # Express API proxy for Azure OpenAI
├── src/
│   ├── components/
│   │   ├── ChatInput.tsx       # תיבת הקלט
│   │   ├── ChatMessage.tsx     # בועת הודעה
│   │   ├── RabbiNachmanPortrait.tsx  # איור SVG של רבי נחמן
│   │   ├── Sidebar.tsx         # סרגל צד עם היסטוריית שיחות
│   │   └── WelcomeScreen.tsx   # מסך פתיחה עם הצעות
│   ├── services/
│   │   ├── chatService.ts      # חיבור ל-API
│   │   └── systemPrompt.ts     # הפרומפט המערכתי של הנחמניסט
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── .env.example
├── index.html
├── package.json
└── vite.config.ts
```

## החלפת תמונת רבי נחמן

האיור הנוכחי הוא SVG מובנה. להחלפה בתמונה אמיתית:

1. הוסף את התמונה לתיקיית `public/` (למשל `public/rabbi-nachman.png`)
2. בקובץ `src/components/RabbiNachmanPortrait.tsx`, החלף את ה-SVG ב:

```tsx
export function RabbiNachmanPortrait() {
  return <img src="/rabbi-nachman.png" alt="רבי נחמן מברסלב" className="rabbi-portrait" />
}
```

## טכנולוגיות

- **Frontend:** React + TypeScript + Vite
- **Backend:** Express.js (API proxy)
- **AI:** Azure OpenAI (GPT-4o)
- **עיצוב:** CSS בהשראת ChatGPT, RTL מלא
