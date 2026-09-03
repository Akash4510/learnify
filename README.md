# 🎓 Learnify: Enterprise Learning Management System (LMS)

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Mux](https://img.shields.io/badge/Mux_Video-FF3270?style=for-the-badge&logo=mux&logoColor=white)

> A full-stack, scalable LMS engineered to handle on-the-fly video encoding, secure financial transactions, and strict Role-Based Access Control (RBAC).

<p align="center">
  <img width="1920" height="1080" alt="thumbnail" src="https://github.com/user-attachments/assets/ad5d3627-c69f-4fcd-93d4-593592d2d70a" />
</p>

---

## 🧭 System Workflows & Architecture

Instead of a monolithic approach, Learnify is divided into highly specialized workflows to handle the heavy lifting of an educational platform.

### 🎬 Workflow 1: The Media Pipeline (Mux)

Serving static `.mp4` files consumes massive bandwidth and causes client-side buffering. Learnify solves this by utilizing **Mux** for enterprise-grade video infrastructure.

1. **Upload:** Creators upload raw video files via `UploadThing`.
2. **Encode:** Mux intercepts the file and encodes it on the fly.
3. **Stream:** Videos are served back to the Next.js client via **HLS (HTTP Live Streaming)**, automatically adjusting the bitrate and resolution based on the user's internet speed (identical to the architecture of Netflix or YouTube).

### 🔐 Workflow 2: Strict Role-Based Access Control (RBAC)

To ensure data security and clean UI separation, the application utilizes Next.js App Router layout groups to physically isolate user privileges:

```text
app/
├── (course)           # 🟢 STUDENT: Distraction-free video consumption UI
├── (dashboards)
│   ├── admin/         # 🔴 ADMIN: KYC approvals, global platform analytics
│   └── creator/       # 🔵 CREATOR: Drag-and-drop course builder, revenue metrics
```

_Authentication is handled at the Edge via **NextAuth v5 (Auth.js)**, meaning unauthorized users are redirected before the server even boots up the protected pages._

### 💳 Workflow 3: Transactional Integrity (Razorpay)

Course enrollments are gated by a secure financial pipeline.

- The server generates a cryptographic order ID.
- The client completes the transaction via the **Razorpay** checkout UI.
- A Next.js API route securely verifies the `razorpay_signature` against the server's secret key before permanently unlocking the course in the PostgreSQL database.

---

## 📸 Platform Interface

|                                                         The Course Builder (Creator)                                                          |                                                     The Learning Environment (Student)                                                     |
| :-------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="1920" height="1080" alt="course-setup-2" src="https://github.com/user-attachments/assets/1f2f4186-cb7d-47a6-8f05-b90d6476a9d1" /> | <img width="1920" height="1080" alt="course-page" src="https://github.com/user-attachments/assets/ad72fee4-ba19-4b11-a60e-a000faef1d49" /> |
|                                 _Features `@hello-pangea/dnd` for smooth, drag-and-drop chapter reordering._                                  |                                     _Custom Mux video player tracking progress and completion state._                                      |

---

## ⚙️ Core Technology Stack

| Category               | Technologies Used                                             |
| :--------------------- | :------------------------------------------------------------ |
| **Core Framework**     | Next.js 14 (App Router, Server Actions), React 18, TypeScript |
| **Database & Auth**    | PostgreSQL, Prisma ORM, NextAuth v5 (Auth.js)                 |
| **Media & Storage**    | Mux (Video HLS), UploadThing (Images/PDFs)                    |
| **Payments & Emails**  | Razorpay, Resend (Transactional emails)                       |
| **UI & Interactivity** | Tailwind CSS, Shadcn UI, Zustand, React Hook Form             |

<details>
<summary><b>🛠️ View Advanced Implementations (Click to expand)</b></summary>
<br>

- **Server Actions:** Replaced traditional API routes with Next.js Server Actions for form submissions (course creation, profile updates), reducing client-side JavaScript bundle sizes.
- **Zustand Confetti Store:** Utilized a lightweight global state manager to trigger a celebratory Confetti UI across different components when a user completes 100% of a course.
- **Debounced Search:** Implemented custom hooks (`use-debounce`) on the course exploration page to prevent database query spamming while the user types in the search bar.

</details>

---

## 🚀 Development Setup

1. **Clone & Install:**

   ```bash
   git clone [https://github.com/Akash4510/learnify.git](https://github.com/Akash4510/learnify.git)
   cd learnify
   npm install
   ```

2. **Configure Environment:**
   Create a `.env` file with the following variables:

   ```env
   DATABASE_URL=
   NEXTAUTH_SECRET=
   MUX_TOKEN_ID=
   MUX_TOKEN_SECRET=
   RAZORPAY_KEY_ID=
   RAZORPAY_KEY_SECRET=
   UPLOADTHING_SECRET=
   UPLOADTHING_APP_ID=
   RESEND_API_KEY=
   ```

3. **Initialize Database:**

   ```bash
   npx prisma generate
   npx prisma db push
   node scripts/seed.ts  # Seeds default categories
   ```

4. **Run Application:**
   ```bash
   npm run dev
   ```
