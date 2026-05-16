# 📁 Estructura del Proyecto

```
📦nextlms
 ┣ 📂.docs
 ┃ ┗ 📜fixes.md
 ┣ 📂prisma
 ┃ ┣ 📂migrations
 ┃ ┃ ┣ 📂20260516011342_full_db
 ┃ ┃ ┃ ┗ 📜migration.sql
 ┃ ┃ ┗ 📜migration_lock.toml
 ┃ ┣ 📜schema.prisma
 ┃ ┗ 📜seed.ts
 ┣ 📂public
 ┃ ┗ 📜logo.png
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂(auth)
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┗ 📜signup-form.tsx
 ┃ ┃ ┃ ┣ 📂signin
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂signup
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜layout.tsx
 ┃ ┃ ┣ 📂(dashboard)
 ┃ ┃ ┃ ┗ 📂dashboard
 ┃ ┃ ┃ ┃ ┣ 📂actions
 ┃ ┃ ┃ ┃ ┃ ┗ 📂students
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜get-student-data.ts
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┣ 📂students
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜student-stats-card.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜dashboard-particles.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜RecentActivity.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Sidebar.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜StatCard.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Stats.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Topbar.tsx
 ┃ ┃ ┃ ┃ ┣ 📂courses
 ┃ ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CourseForm.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CoursesTable.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂new
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂[courseId]
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CreateLessonForm.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CreateModuleForm.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LessonsList.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ModulesList.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂types
 ┃ ┃ ┃ ┃ ┃ ┗ 📜all-student-data.interface.ts
 ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂(marketing)
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┃ ┣ 📜hero-particles.tsx
 ┃ ┃ ┃ ┃ ┗ 📜Navbar.tsx
 ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂api
 ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┗ 📂[...nextauth]
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂courses
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂lessons
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂modules
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┗ 📂register
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📜depc_page.tsx
 ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┣ 📜globals.css
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂providers
 ┃ ┃ ┃ ┗ 📜session-provider.tsx
 ┃ ┃ ┣ 📂ui
 ┃ ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┃ ┣ 📜card.tsx
 ┃ ┃ ┃ ┗ 📜input.tsx
 ┃ ┃ ┗ 📜auth-components.tsx
 ┃ ┗ 📂lib
 ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┣ 📜courses.ts
 ┃ ┃ ┃ ┣ 📜dashboard.ts
 ┃ ┃ ┃ ┣ 📜lessons.ts
 ┃ ┃ ┃ ┗ 📜modles.ts
 ┃ ┃ ┣ 📂db
 ┃ ┃ ┃ ┗ 📂seeders
 ┃ ┃ ┃ ┃ ┣ 📜all-seed.ts
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂generated
 ┃ ┃ ┃ ┗ 📂prisma
 ┃ ┃ ┃ ┃ ┣ 📂internal
 ┃ ┃ ┃ ┃ ┃ ┣ 📜class.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜prismaNamespace.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜prismaNamespaceBrowser.ts
 ┃ ┃ ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Account.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜CategoriesOnCourses.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Category.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Course.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Enrollment.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Lesson.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜LessonProgress.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Module.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Session.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Tenant.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜User.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜VerificationToken.ts
 ┃ ┃ ┃ ┃ ┣ 📜browser.ts
 ┃ ┃ ┃ ┃ ┣ 📜client.ts
 ┃ ┃ ┃ ┃ ┣ 📜commonInputTypes.ts
 ┃ ┃ ┃ ┃ ┣ 📜enums.ts
 ┃ ┃ ┃ ┃ ┗ 📜models.ts
 ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┣ 📜getTenant.ts
 ┃ ┃ ┣ 📜prisma.ts
 ┃ ┃ ┗ 📜utils.ts
 ┣ 📜.env
 ┣ 📜.env.example
 ┣ 📜.gitignore
 ┣ 📜AGENTS.md
 ┣ 📜CLAUDE.md
 ┣ 📜components.json
 ┣ 📜envConfig.ts
 ┣ 📜eslint.config.mjs
 ┣ 📜next-env.d.ts
 ┣ 📜next.config.ts
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜postcss.config.mjs
 ┣ 📜prisma.config.ts
 ┣ 📜proxy.ts
 ┣ 📜README.md
 ┗ 📜tsconfig.json
```