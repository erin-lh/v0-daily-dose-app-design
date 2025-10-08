# DailyDose+ Design System

## 🎨 Visual Identity

### Brand Essence

DailyDose+ is positioned at the intersection of **wellness** and **technology**. The design language should feel:

- **Luxurious** - Premium materials, generous white space, refined details
- **Calming** - Soft colors, smooth animations, gentle interactions
- **Motivating** - Celebratory moments, progress visualization, positive reinforcement
- **Effortless** - Intuitive flows, minimal friction, clear hierarchy

### Brand Personality

**If DailyDose+ were a person:**
- A supportive wellness coach, not a strict doctor
- Encouraging and empowering, never judgmental
- Modern and tech-savvy, but warm and approachable
- Sophisticated yet accessible

---

## 🎨 Color System

### Primary Palette

\`\`\`css
/* Brand Color - Sage Green */
--sage-green: #88a596;
--sage-green-light: #a8bfb3;
--sage-green-dark: #6b8579;

/* Neutrals */
--white: #ffffff;
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
\`\`\`

### Semantic Colors

\`\`\`css
/* Success - Green */
--success: #10b981;
--success-light: #d1fae5;

/* Warning - Amber */
--warning: #f59e0b;
--warning-light: #fef3c7;

/* Error - Red */
--error: #ef4444;
--error-light: #fee2e2;

/* Info - Blue */
--info: #3b82f6;
--info-light: #dbeafe;
\`\`\`

### Usage Guidelines

**Sage Green (#88a596):**
- Primary buttons and CTAs
- Active states and selections
- Progress indicators
- Brand moments (logo, headers)
- Accent elements

**White (#ffffff):**
- Primary background
- Card backgrounds
- Button text on colored backgrounds

**Gray Scale:**
- Text hierarchy (900 for headings, 600 for body, 400 for secondary)
- Borders and dividers (200-300)
- Disabled states (400)
- Subtle backgrounds (50-100)

**Semantic Colors:**
- Success: Completed doses, achievements, positive feedback
- Warning: Low battery, refill reminders, caution states
- Error: Missed doses, connection issues, validation errors
- Info: Tips, helpful information, neutral notifications

---

## ✍️ Typography

### Font Family

**Primary:** Inter (Variable)

Inter is a modern, highly legible sans-serif designed for digital interfaces. Its rounded, friendly appearance aligns with the wellness aesthetic while maintaining professional credibility.

\`\`\`css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
\`\`\`

### Type Scale

\`\`\`css
/* Headings */
--text-3xl: 32px;  /* Page titles */
--text-2xl: 24px;  /* Section headers */
--text-xl: 20px;   /* Card titles */
--text-lg: 18px;   /* Subheadings */

/* Body */
--text-base: 16px; /* Primary body text */
--text-sm: 14px;   /* Secondary text, labels */
--text-xs: 12px;   /* Captions, metadata */
\`\`\`

### Font Weights

\`\`\`css
--font-regular: 400;  /* Body text */
--font-medium: 500;   /* Emphasis, labels */
--font-semibold: 600; /* Subheadings, buttons */
--font-bold: 700;     /* Headings, strong emphasis */
\`\`\`

### Line Heights

\`\`\`css
--leading-tight: 1.25;   /* Headings */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.625; /* Long-form content */
\`\`\`

### Usage Examples

\`\`\`tsx
// Page Title
<h1 className="text-3xl font-bold text-gray-900">
  Your Wellness Journey
</h1>

// Section Header
<h2 className="text-2xl font-semibold text-gray-900">
  Today's Routine
</h2>

// Card Title
<h3 className="text-xl font-semibold text-gray-900">
  Morning Medications
</h3>

// Body Text
<p className="text-base text-gray-600 leading-relaxed">
  Stay consistent with your routine to build healthy habits.
</p>

// Label
<label className="text-sm font-medium text-gray-700">
  Medication Name
</label>

// Caption
<span className="text-xs text-gray-500">
  Last taken 2 hours ago
</span>
\`\`\`

---

## 📐 Spacing System

### Scale

Based on 4px base unit for consistency:

\`\`\`css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
\`\`\`

### Usage Guidelines

**Component Padding:**
- Small: 12px (space-3)
- Medium: 16px (space-4)
- Large: 24px (space-6)

**Stack Spacing:**
- Tight: 8px (space-2)
- Normal: 16px (space-4)
- Relaxed: 24px (space-6)

**Section Spacing:**
- Between sections: 32px (space-8)
- Page margins: 16px mobile, 24px desktop

---

## 🔲 Layout Patterns

### Mobile-First Grid

\`\`\`tsx
// Single column on mobile, responsive on larger screens
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
\`\`\`

### Card Layout

\`\`\`tsx
<div className="bg-white rounded-2xl p-6 shadow-sm">
  <h3 className="text-xl font-semibold mb-4">Card Title</h3>
  <p className="text-gray-600">Card content</p>
</div>
\`\`\`

### List Layout

\`\`\`tsx
<div className="space-y-3">
  {items.map(item => (
    <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-xl">
      {/* List item content */}
    </div>
  ))}
</div>
\`\`\`

---

## 🎭 Components

### Buttons

**Primary Button:**
\`\`\`tsx
<button className="w-full bg-[#88a596] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#6b8579] transition-colors">
  Continue
</button>
\`\`\`

**Secondary Button:**
\`\`\`tsx
<button className="w-full bg-white text-gray-900 font-semibold py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors">
  Cancel
</button>
\`\`\`

**Icon Button:**
\`\`\`tsx
<button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
  <Icon className="w-5 h-5 text-gray-600" />
</button>
\`\`\`

### Cards

**Standard Card:**
\`\`\`tsx
<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
  {/* Content */}
</div>
\`\`\`

**Interactive Card:**
\`\`\`tsx
<button className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#88a596] transition-all text-left">
  {/* Content */}
</button>
\`\`\`

### Inputs

**Text Input:**
\`\`\`tsx
<input
  type="text"
  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#88a596] focus:ring-2 focus:ring-[#88a596]/20 outline-none transition-all"
  placeholder="Enter medication name"
/>
\`\`\`

**Select:**
\`\`\`tsx
<select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#88a596] focus:ring-2 focus:ring-[#88a596]/20 outline-none transition-all">
  <option>Daily</option>
  <option>Twice daily</option>
</select>
\`\`\`

---

## ✨ Animations

### Timing Functions

\`\`\`css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
\`\`\`

### Durations

\`\`\`css
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--duration-slower: 400ms;
\`\`\`

### Common Animations

**Fade In:**
\`\`\`tsx
<div className="animate-in fade-in duration-300">
  {/* Content */}
</div>
\`\`\`

**Slide Up:**
\`\`\`tsx
<div className="animate-in slide-in-from-bottom duration-400">
  {/* Content */}
</div>
\`\`\`

**Scale:**
\`\`\`tsx
<button className="transition-transform active:scale-95">
  {/* Button */}
</button>
\`\`\`

**Confetti Celebration:**
\`\`\`tsx
import Confetti from "react-confetti-boom"

<Confetti
  mode="boom"
  particleCount={50}
  colors={["#88a596", "#ffffff", "#d1fae5"]}
  shapeSize={12}
  spreadDeg={360}
/>
\`\`\`

---

## 📱 Mobile Optimization

### Safe Areas

\`\`\`tsx
<div className="min-h-screen pb-safe">
  {/* Content */}
</div>
\`\`\`

### Touch Targets

Minimum 44px height for all interactive elements:

\`\`\`tsx
<button className="min-h-[44px] px-4">
  Tap Me
</button>
\`\`\`

### Bottom Navigation

\`\`\`tsx
<nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
  <div className="flex justify-around py-2">
    {/* Nav items */}
  </div>
</nav>
\`\`\`

---

## ♿ Accessibility

### Color Contrast

All text meets WCAG AA standards (4.5:1 ratio):
- Gray-900 on white: 16.1:1 ✅
- Gray-600 on white: 5.7:1 ✅
- Sage green on white: 3.2:1 (use for large text only)

### Focus States

\`\`\`tsx
<button className="focus:outline-none focus:ring-2 focus:ring-[#88a596] focus:ring-offset-2">
  {/* Button */}
</button>
\`\`\`

### Screen Reader Support

\`\`\`tsx
<button aria-label="Mark medication as taken">
  <CheckIcon />
</button>
\`\`\`

---

## 🎯 Design Tokens

### Border Radius

\`\`\`css
--radius-sm: 8px;   /* Small elements */
--radius-md: 12px;  /* Buttons, inputs */
--radius-lg: 16px;  /* Cards */
--radius-xl: 20px;  /* Large cards */
--radius-2xl: 24px; /* Hero elements */
--radius-full: 9999px; /* Pills, avatars */
\`\`\`

### Shadows

\`\`\`css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
\`\`\`

### Z-Index Scale

\`\`\`css
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1100;
--z-fixed: 1200;
--z-modal: 1300;
--z-popover: 1400;
--z-tooltip: 1500;
\`\`\`

---

## 📝 Copy Guidelines

### Voice & Tone

**Supportive, not clinical:**
- ✅ "You're doing great! 7-day streak"
- ❌ "Adherence rate: 100%"

**Empowering, not commanding:**
- ✅ "Ready to take your evening routine?"
- ❌ "Take your medication now"

**Lifestyle, not medical:**
- ✅ "Wellness journey"
- ❌ "Treatment plan"

### Microcopy Examples

**Buttons:**
- "Continue" (not "Submit")
- "Add to routine" (not "Add medication")
- "Mark as done" (not "Mark as taken")

**Notifications:**
- "Time for your wellness routine ✨"
- "You're on a roll! Don't break your streak"
- "Gentle reminder: Evening routine in 15 minutes"

**Empty States:**
- "Start your wellness journey by adding your first routine"
- "No notifications yet—you're all caught up!"

---

**Last Updated:** January 2025  
**Version:** 1.0.0
