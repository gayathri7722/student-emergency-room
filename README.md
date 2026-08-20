# Academic SOS

Build a complete, polished, responsive web app called "Academic Emergency Room" (AER) — an app that helps stressed students figure out exactly what to study when they're behind on an exam, assignment, or deadline.

## CONCEPT

Students who are behind, panicking, or don't know where to start describe their situation, and the app gives them a realistic, prioritized recovery plan instead of generic "study harder" advice. Core message: "You're not finished. You're just in academic emergency mode."

Tone: Gen Z, bold, slightly humorous, reassuring (never mocking), premium and modern — NOT a boring corporate education app.

## DESIGN

Dark-themed, emergency-inspired visual style.

- Background: near-black (zinc-950)

- Cards: dark gray (zinc-900) with subtle borders

- Primary accent: red (for emergency/urgent elements)

- Secondary accents: orange (warning), green (success/recovery), purple (AI/help features)

- Text: off-white, muted gray for secondary text

- Fonts: a bold geometric sans-serif for headings (like Space Grotesk), clean sans-serif for body text (like Inter)

- Rounded cards, clear typography hierarchy, subtle animations (pulsing status dot, progress bars, smooth transitions)

- Fully responsive: mobile-first with a bottom navigation bar (Home, Emergency, Missions, Progress, Profile), desktop gets a top navigation bar

## PAGES & FEATURES

### 1. Landing Page

- Hero headline: "YOU'RE COOKED. But we're not dead yet." with a subheading explaining the product

- Animated status indicator: "SYSTEM STATUS: ACADEMIC CRISIS DETECTED"

- Two buttons: "Enter Emergency Mode" (primary, red) and "I'm Actually Doing Fine" (secondary)

- Sections: the problem (students fail because they don't know what to do next), how it works (Assess → Triage → Recover → Come Back), a preview of the "15-Minute Miracle" feature, a preview of "Damage Control", 3 clearly-labeled fictional testimonials, final call-to-action

### 2. Emergency Assessment (multi-step wizard, not one long form)

- Step 1: "What's happening?" — multi-select cards (exam tomorrow, behind on syllabus, assignment due soon, too many deadlines, understand nothing, failed an exam, everything on fire, don't know where to start)

- Step 2: "How much time do you have?" — selectable time options (15 min, 30 min, 1hr, 2hr, 4hr, tonight, this week, no idea) plus a custom input

- Step 3: "What are you trying to save?" — form fields for subject, exam/assignment name, deadline, current progress %, target grade, topics, difficulty, available hours, plus a file upload area for syllabus/notes (UI only, no real upload needed)

- Step 4: "What went wrong? Be honest, we don't judge." — multi-select (procrastinated, didn't understand basics, studied wrong things, missed classes, forgot everything, underestimated exam, overwhelmed, didn't start)

- Include a progress bar across the top showing which step you're on

### 3. AI Diagnosis (mock/demo results, no real AI needed)

- A brief animated "analyzing" loading screen with rotating messages

- Then show: severity level with a percentage bar, time remaining, estimated workload, time deficit, number of priority topics, and an estimated recovery probability — with a small disclaimer that these are estimates

### 4. Recovery Plan

- A 5-phase plan (Stabilize, Priority Surgery, Practice, Simulation, Final Check) each with a duration and specific action items

- A "Don't Study Everything" section that sorts topics into 4 tiers: Must Know (red), Should Know (orange), If You Have Time (green), Ignore For Now (gray) — each with a short explanation of why

- A "Start First Mission" call-to-action button

### 5. Survival Mode Timer

- A focused countdown timer tied to a specific mission/topic

- Start/Pause button, "I'm Stuck" button, "I'm Done" button

### 6. "I'm Stuck" feature (accessible from anywhere in the app via a floating button)

- Asks where exactly the student is stuck (doesn't understand concept, doesn't know how to solve it, keeps making the same mistake, can't remember it, explanation doesn't make sense)

- Then offers to explain in different styles: like a smart friend, like I'm 10, meme language, real-world example, exam answer, professor mode, visual explanation — each showing a different mock explanation of the same example concept

### 7. Damage Control

- A visual (not spreadsheet-style) view of multiple deadlines at once, each showing task name, deadline, effort required, and a priority indicator (red/orange/green)

- Clear recommendation per task: "Do this first," "Squeeze in later," or "Ask for an extension"

- A button that generates a polite, pre-written extension request message

### 8. Dashboard (home screen after entering the app)

- "Good morning, [Name]" greeting with an overall condition badge (Stable/Critical)

- Active emergencies as cards showing subject, time remaining, and recovery progress bar

- Quick action buttons: New Emergency, 15-Min Mission, Explain Something, Upload Syllabus, Damage Control, My Progress

- Academic vitals panel with animated gauges/bars: Academic Health, Knowledge, Focus, Recovery Progress

- A comeback streak indicator

### 9. 15-Minute Miracle

- A modal/screen for when a student has exactly 15 minutes — shows an exact minute-by-minute breakdown (e.g. 00:00–03:00 understand core concept, 03:00–08:00 study best example, etc.)

### 10. Progress Page

- Total XP, comeback streak, a row of milestone badges (some earned, some locked/greyed out)

- A simple "post-mortem" tool: enter previous score and new score, and it shows the point improvement with an encouraging message

### 11. Community ("Triage Room")

- Anonymous demo posts with a category tag (exam panic, study strategies, deadline survival, motivation, etc.) and simple emoji reaction counts

- Filterable by category

## TECHNICAL REQUIREMENTS

- Use React with clean, modular components — do not put everything in one giant file

- Use Tailwind CSS for all styling

- The entire app must work fully in demo mode with realistic pre-filled mock data — no backend, no API keys, no real authentication required

- Make sure every button and interactive element actually works and navigates correctly — no dead links or broken states

- Add thoughtful empty states and loading states where relevant

- Ensure good color contrast, readable font sizes, and keyboard-accessible buttons

- Prioritize a clean, working, polished MVP over cramming in every possible feature — if something can't be done cleanly, simplify it rather than leaving it broken

Please build this as a fully working, click-through demo with no console errors and no broken navigation.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://study-salvage.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/35375e21-80c2-4ad5-bbb4-7e3d5b04391c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
