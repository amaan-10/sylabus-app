# 📚 Sylabus

## 🚀 Overview

**Sylabus** is a modern SaaS platform designed for individual teachers and educational institutions to generate question papers effortlessly.

It combines automation with flexibility, allowing users to create **AI-powered question papers** or build fully **custom papers manually** with precision.

---

## ✨ Key Features

### 🤖 Auto Question Paper Generation

- Generate complete question papers instantly using AI
- Select subject, chapters, difficulty level, and marks distribution
- Smart question selection from database or AI-generated pool

### 🛠️ Custom Paper Builder

- Drag & drop interface for building papers manually
- Add, edit, remove, and reorder questions easily
- Support for multiple question types (MCQ, descriptive, short answers, etc.)

### 📊 Question Bank Management

- Create and manage a centralized question repository
- Filter by subject, chapter, difficulty, and tags
- Bulk upload questions

### 📝 Exam Modes

- Predefined templates (Midterm, Final, Unit Test, etc.)
- Fully customizable paper formats

### 💾 Draft & Save

- Save paper drafts and continue later
- Version control for different paper sets

### 📄 Export & Sharing

- Export papers as PDF
- Print-ready formatting
- Share digitally with students or staff

### 🏫 Multi-User Support

- Role-based access (Admin, Teacher, Staff)
- Institution-level management

### 📈 Analytics (Optional Future Feature)

- Insights on question usage
- Difficulty distribution analysis

---

## 🧠 How It Works

1. Select subject and syllabus
2. Choose generation mode:
   - Auto (AI-based)
   - Custom (Manual builder)

3. Configure paper settings
4. Generate or build the paper
5. Preview and export

---

## 🧩 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, API Routes
- **Database:** MongoDB
- **Authentication:** Firebase
- **AI Integration:** Gemini-AI, Custom ML Models
- **Drag & Drop:** dnd-kit

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/amaan-10/sylabus-app.git

# Navigate to project
cd sylabus

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env.local` file and add:

```env
MONGODB_URI=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
JWT_SECRET=
GEMINI_API_KEY=
```

---

## 📁 Project Structure

```
/sylabus
 ├──src/
    ├── app/
    ├── components/
    ├── lib/
    ├── models/
    ├── api/
 ├── public/
 └── scripts/
```

---

## 🎯 Target Users

- Individual Teachers
- Coaching Institutes
- Schools & Colleges
- EdTech Platforms

---

## 💡 Use Cases

- Generate exam papers in seconds
- Maintain standardized question patterns
- Reduce manual workload for teachers
- Create multiple paper sets to avoid repetition

---

## 🔮 Future Enhancements

- AI-based difficulty balancing
- Automatic answer key generation
- Student performance analytics
- Question plagiarism detection

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 👨‍💻 Author

Built with ❤️ by Amaan Shaikh
