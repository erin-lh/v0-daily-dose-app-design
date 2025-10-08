Thought for 7sHere's an updated README overview that accurately reflects the current DailyDose+ app:

---

# DailyDose+

**Tech-Enabled Wellness for Medication Adherence**

DailyDose+ is a luxury mobile-first wellness app designed to make medication and supplement routines effortless. Built with a premium aesthetic that feels more like a lifestyle app than medical software, it combines smart reminders, streak tracking, and hardware integration to help users build consistent wellness habits.

## Overview

DailyDose+ transforms medication adherence into a motivating wellness experience. The app connects to a smart pill box with LED notifications and sensors, providing gentle reminders and celebrating consistency through streaks and visual rewards. With a clean white interface and sage green accents (`#88a596`), the design prioritizes calm, motivation, and ease of use.

### Key Features

**Authentication & User Modes**

- Modern authentication with Sign in with Apple, Google, or SMS code
- Two user modes: "For Myself" (full access) and "Join Family" (caregiver mode)
- Family members can receive notifications and mark doses without accessing personal streaks


**Medication Management**

- Add medications with custom names, dosages, colors, and schedules
- Support for multi-dose scheduling (multiple times per day)
- Temporary medication tracking (e.g., antibiotics, short-term prescriptions)
- Visual medication list with color identifiers and time-based organization
- Persistent storage using localStorage


**Wellness Dashboard**

- Streak tracking with celebratory confetti animations
- Today's routine showing upcoming and completed doses
- Quick stats for consistency rate and weekly adherence
- Motivating, supportive copy ("Stay consistent, feel great")


**Hardware Integration**

- Real-time pill box connection monitoring
- Battery level tracking with low battery alerts
- Customizable LED, sound, and vibration settings
- Last activity tracking and sync status
- Test alert functionality


**Smart Notifications**

- Scheduled reminders for each medication
- Missed dose alerts with gentle nudges
- Success celebrations for consistency
- Device status notifications (low battery, connection issues)
- Quiet hours to pause notifications during sleep or meetings


**Family & Caregiver Mode**

- Generate family codes for easy invitation
- Manage family member access to specific medications
- Remote monitoring for caregivers and parents
- Privacy-focused: family members can't see streaks or full medication history


**Settings & Customization**

- Travel mode with automatic timezone adjustment
- Theme customization (light/dark mode)
- Privacy controls and data export
- Optional lock mode for child safety
- Smartwatch sync settings


### Design Philosophy

DailyDose+ follows a "luxury wellness" design approach:

- **Mobile-first**: Optimized for iPhone with safe area insets and touch-friendly interactions
- **Minimal & Clean**: White backgrounds with sage green (`#88a596`) accents
- **Smooth Animations**: Slide-ups, fades, and confetti celebrations for emotional engagement
- **Supportive Copy**: Wellness-focused language, not clinical jargon
- **Premium Feel**: Rounded corners, soft shadows, generous white space


### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui component library
- **Typography**: Inter font family for modern, rounded aesthetic
- **Icons**: Lucide React for minimal line icons
- **State Management**: React hooks with localStorage persistence
- **Animations**: Framer Motion for smooth transitions and celebrations


### Target Users

- Busy professionals managing daily vitamins or prescriptions
- Patients with chronic conditions requiring medication adherence
- Parents managing children's medications
- Caregivers monitoring elderly parents' medication routines
- Wellness enthusiasts tracking supplement regimens
- Frequent travelers needing timezone-aware reminders
