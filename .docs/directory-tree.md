📦src
│
├── 📂app                                         # Solo rutas — cero lógica aquí
│   │
│   ├── 📂api
│   │   └── 📂auth
│   │       └── 📂[...all]
│   │           └── 📜route.ts                    # Better-auth handler (NO TOCAR)
│   │
│   ├── 📂(public)                                # Rutas públicas sin auth
│   │   ├── 📜layout.tsx                          # PublicHeader + PublicFooter
│   │   ├── 📜page.tsx                            # / Landing page
│   │   │
│   │   ├── 📂(auth)                              # Auth de STUDENT
│   │   │   ├── 📜layout.tsx                      # Redirect si ya está logueado
│   │   │   ├── 📂login
│   │   │   │   └── 📜page.tsx                    # /login
│   │   │   ├── 📂register
│   │   │   │   └── 📜page.tsx                    # /register
│   │   │   └── 📂forgot-password
│   │   │       └── 📜page.tsx                    # /forgot-password
│   │   │
│   │   ├── 📂tenants
│   │   │   └── 📂auth                            # Auth de ADMIN + SUPER_ADMIN
│   │   │       ├── 📜layout.tsx                  # Redirect si ya está logueado
│   │   │       ├── 📂login
│   │   │       │   └── 📜page.tsx                # /tenants/auth/login
│   │   │       └── 📂register
│   │   │           └── 📜page.tsx                # /tenants/auth/register
│   │   │
│   │   ├── 📂instructors
│   │   │   └── 📂auth                            # Auth de INSTRUCTOR
│   │   │       ├── 📜layout.tsx
│   │   │       └── 📂login
│   │   │           └── 📜page.tsx                # /instructors/auth/login
│   │   │
│   │   └── 📂courses                             # Catálogo público
│   │       ├── 📜page.tsx                        # /courses
│   │       └── 📂[slug]
│   │           └── 📜page.tsx                    # /courses/[slug] preview
│   │
│   ├── 📂(student)                               # Portal STUDENT
│   │   ├── 📜layout.tsx                          # Guard: role === STUDENT
│   │   ├── 📜loading.tsx
│   │   ├── 📜error.tsx
│   │   ├── 📂dashboard
│   │   │   └── 📜page.tsx                        # /dashboard
│   │   ├── 📂my-courses
│   │   │   ├── 📜page.tsx                        # /my-courses
│   │   │   └── 📂[courseSlug]
│   │   │       ├── 📜page.tsx                    # /my-courses/[courseSlug]
│   │   │       ├── 📜loading.tsx
│   │   │       └── 📂lessons
│   │   │           └── 📂[lessonId]
│   │   │               └── 📜page.tsx            # /my-courses/[courseSlug]/lessons/[lessonId]
│   │   └── 📂profile
│   │       └── 📜page.tsx                        # /profile
│   │
│   ├── 📂(instructor)                            # Portal INSTRUCTOR
│   │   ├── 📜layout.tsx                          # Guard: role === INSTRUCTOR
│   │   ├── 📜loading.tsx
│   │   ├── 📜error.tsx
│   │   ├── 📂dashboard
│   │   │   └── 📜page.tsx                        # /dashboard (instructor)
│   │   ├── 📂courses
│   │   │   ├── 📜page.tsx                        # /courses — mis cursos
│   │   │   ├── 📂new
│   │   │   │   └── 📜page.tsx                    # /courses/new
│   │   │   └── 📂[courseId]
│   │   │       ├── 📜page.tsx                    # /courses/[courseId] editar
│   │   │       ├── 📜loading.tsx
│   │   │       └── 📂modules
│   │   │           ├── 📜page.tsx                # /courses/[courseId]/modules
│   │   │           └── 📂[moduleId]
│   │   │               └── 📂lessons
│   │   │                   ├── 📜page.tsx
│   │   │                   └── 📂[lessonId]
│   │   │                       └── 📜page.tsx
│   │   └── 📂profile
│   │       └── 📜page.tsx
│   │
│   ├── 📂(tenant)                                # Panel ADMIN del tenant
│   │   ├── 📜layout.tsx                          # Guard: role === ADMIN + tenantId válido
│   │   ├── 📜loading.tsx
│   │   ├── 📜error.tsx
│   │   └── 📂dashboard
│   │       ├── 📜layout.tsx                      # TenantSidebar
│   │       ├── 📜page.tsx                        # /dashboard — overview
│   │       ├── 📂courses
│   │       │   ├── 📜page.tsx                    # Cursos del tenant
│   │       │   ├── 📂new
│   │       │   │   └── 📜page.tsx
│   │       │   └── 📂[courseId]
│   │       │       └── 📜page.tsx
│   │       ├── 📂instructors
│   │       │   ├── 📜page.tsx                    # Gestión de instructores
│   │       │   └── 📂[instructorId]
│   │       │       └── 📜page.tsx
│   │       ├── 📂students
│   │       │   ├── 📜page.tsx                    # Gestión de estudiantes
│   │       │   └── 📂[studentId]
│   │       │       └── 📜page.tsx
│   │       ├── 📂categories
│   │       │   └── 📜page.tsx                    # Categorías de cursos
│   │       ├── 📂enrollments
│   │       │   └── 📜page.tsx                    # Inscripciones
│   │       └── 📂settings
│   │           ├── 📜page.tsx                    # Config general del tenant
│   │           └── 📂billing
│   │               └── 📜page.tsx                # Plan y facturación
│   │
│   ├── 📂(super-admin)                           # Panel SUPER_ADMIN
│   │   ├── 📜layout.tsx                          # Guard: role === SUPER_ADMIN
│   │   ├── 📜loading.tsx
│   │   ├── 📜error.tsx
│   │   └── 📂admin
│   │       ├── 📜layout.tsx                      # AdminSidebar
│   │       ├── 📜page.tsx                        # /admin — overview global
│   │       ├── 📂tenants
│   │       │   ├── 📜page.tsx                    # Todos los tenants
│   │       │   └── 📂[tenantId]
│   │       │       └── 📜page.tsx                # Detalle + edición
│   │       ├── 📂users
│   │       │   ├── 📜page.tsx                    # Todos los usuarios
│   │       │   └── 📂[userId]
│   │       │       └── 📜page.tsx
│   │       ├── 📂courses
│   │       │   └── 📜page.tsx                    # Todos los cursos
│   │       ├── 📂categories
│   │       │   └── 📜page.tsx                    # Categorías globales
│   │       └── 📂settings
│   │           └── 📜page.tsx                    # Config de la plataforma
│   │
│   ├── 📜layout.tsx                              # Root layout (html, body, providers)
│   ├── 📜globals.css
│   ├── 📜loading.tsx                             # Loading global
│   ├── 📜error.tsx                               # Error global
│   └── 📜not-found.tsx                           # 404 global
│
├── 📂features                                    # Toda la lógica de negocio
│   │
│   ├── 📂shared                                  # Compartido entre features
│   │   ├── 📂components
│   │   │   ├── 📂ui                              # Primitivos: Button, Input, Badge...
│   │   │   └── 📂layout                          # PublicHeader, Sidebar, Footer...
│   │   ├── 📂hooks                               # useDebounce, usePagination...
│   │   └── 📂types
│   │       └── 📜index.ts                        # IGeneralResponse, etc.
│   │
│   ├── 📂public                                  # Feature: área pública
│   │   ├── 📂auth                                # Auth de STUDENT
│   │   │   ├── 📂actions
│   │   │   │   └── 📜auth.action.ts
│   │   │   ├── 📂components
│   │   │   │   ├── 📜LoginForm.tsx
│   │   │   │   └── 📜RegisterForm.tsx
│   │   │   └── 📂validations
│   │   │       └── 📜auth.schema.ts
│   │   └── 📂courses                             # Catálogo público
│   │       └── 📂components
│   │           ├── 📜CourseCard.tsx
│   │           └── 📜CourseGrid.tsx
│   │
│   ├── 📂tenants                                 # Feature: tenants (ADMIN + SUPER_ADMIN)
│   │   ├── 📂actions
│   │   │   └── 📜auth.action.ts
│   │   ├── 📂components
│   │   │   ├── 📜TenantLoginForm.tsx
│   │   │   └── 📜TenantRegisterForm.tsx
│   │   └── 📂validations
│   │       └── 📜auth.schema.ts
│   │
│   ├── 📂instructors                             # Feature: instructores
│   │   ├── 📂actions
│   │   │   ├── 📜auth.action.ts
│   │   │   └── 📜instructors.action.ts
│   │   ├── 📂components
│   │   │   ├── 📜InstructorLoginForm.tsx
│   │   │   └── 📜InstructorTable.tsx
│   │   └── 📂validations
│   │       └── 📜auth.schema.ts
│   │
│   ├── 📂courses                                 # Feature: cursos (núcleo del LMS)
│   │   ├── 📂actions
│   │   │   ├── 📜courses.action.ts
│   │   │   ├── 📜modules.action.ts
│   │   │   └── 📜lessons.action.ts
│   │   ├── 📂components
│   │   │   ├── 📜CourseForm.tsx
│   │   │   ├── 📜CourseTable.tsx
│   │   │   ├── 📜ModuleList.tsx
│   │   │   ├── 📜LessonForm.tsx
│   │   │   └── 📜LessonViewer.tsx
│   │   └── 📂validations
│   │       ├── 📜courses.schema.ts
│   │       ├── 📜modules.schema.ts
│   │       └── 📜lessons.schema.ts
│   │
│   ├── 📂enrollments                             # Feature: inscripciones
│   │   ├── 📂actions
│   │   │   └── 📜enrollments.action.ts
│   │   ├── 📂components
│   │   │   ├── 📜EnrollButton.tsx
│   │   │   └── 📜EnrollmentTable.tsx
│   │   └── 📂validations
│   │       └── 📜enrollments.schema.ts
│   │
│   ├── 📂progress                                # Feature: progreso de lecciones
│   │   ├── 📂actions
│   │   │   └── 📜progress.action.ts
│   │   └── 📂components
│   │       ├── 📜ProgressBar.tsx
│   │       └── 📜LessonCheckbox.tsx
│   │
│   ├── 📂categories                              # Feature: categorías
│   │   ├── 📂actions
│   │   │   └── 📜categories.action.ts
│   │   ├── 📂components
│   │   │   └── 📜CategoryTable.tsx
│   │   └── 📂validations
│   │       └── 📜categories.schema.ts
│   │
│   ├── 📂student                                 # Feature: portal del estudiante
│   │   └── 📂components
│   │       ├── 📜StudentDashboard.tsx
│   │       └── 📜MyCourseCard.tsx
│   │
│   ├── 📂tenant-dashboard                        # Feature: panel admin del tenant
│   │   ├── 📂actions
│   │   │   └── 📜tenant-dashboard.action.ts
│   │   └── 📂components
│   │       ├── 📜TenantSidebar.tsx
│   │       ├── 📜TenantOverview.tsx
│   │       └── 📜TenantSettingsForm.tsx
│   │
│   └── 📂super-admin                             # Feature: panel super admin
│       ├── 📂actions
│       │   └── 📜admin.action.ts
│       └── 📂components
│           ├── 📜AdminSidebar.tsx
│           ├── 📜TenantTable.tsx
│           └── 📜UserTable.tsx
│
├── 📂lib                                         # Infraestructura y servicios externos
│   ├── 📂auth
│   │   ├── 📜auth.ts                             # Config better-auth (server)
│   │   └── 📜auth-client.ts                      # Config better-auth (client)
│   ├── 📂db
│   │   └── 📜prismaDB.ts                         # Prisma client singleton
│   ├── 📂logger
│   │   └── 📜console-logger.ts
│   └── 📂utils
│       ├── 📜slugify.ts
│       └── 📜enum-labels.ts                      # getRoleLabel, getPlanLabel...
│
├── 📂hooks                                       # Hooks globales de cliente
│   ├── 📜use-current-user.ts                     # Sesión del usuario actual
│   └── 📜use-tenant.ts                           # Tenant activo
│
├── 📂types                                       # Tipos TypeScript globales
│   └── 📜index.ts                                # IGeneralResponse, enums re-export...
│
├── 📂config                                      # Config estática de la app
│   ├── 📜site.ts                                 # Nombre, URL base, SEO defaults
│   └── 📜nav.ts                                  # Navlinks por rol
│
├── 📂generated                                   # Auto-generado por Prisma (NO EDITAR)
│   └── 📂prisma
│
└── 📜middleware.ts                               # Protección de rutas por rol/sesión