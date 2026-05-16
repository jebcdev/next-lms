# 📚 NextLMS

> Sistema de Gestión de Aprendizaje (LMS) multiplataforma con arquitectura multi-tenant, construido con Next.js 16 y Prisma.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
</p>

---

## 📖 Descripción General

**NextLMS** es un sistema de gestión de aprendizaje moderno y escalable que permite a instituciones educativas y empresas crear y gestionar cursos en línea. El sistema implementa una arquitectura **multi-tenant**, lo que significa que múltiples organizaciones (tenants) pueden utilizar la misma plataforma de forma aislada.

### ✨ Características Principales

- 🔐 **Autenticación Segura** - Soporte para credenciales, Google y GitHub OAuth
- 🏢 **Arquitectura Multi-Tenant** - Múltiples organizaciones con datos aislados
- 📚 **Gestión de Cursos** - Creación de cursos, módulos y lecciones
- 📊 **Seguimiento de Progreso** - Tracking de progreso por estudiante
- 👥 **Sistema de Roles** - Roles jerárquicos (Super Admin, Admin, Instructor, Student)
- 🎨 **UI Moderna** - Interfaz construida con Tailwind CSS y Radix UI

---

## ⚙️ Stack Tecnológico

| Capa | Tecnología |
|------|-------------|
| **Framework** | Next.js 16.2.4 (App Router) |
| **Lenguaje** | TypeScript 5.x |
| **Base de Datos** | PostgreSQL |
| **ORM** | Prisma 7.8.0 |
| **Autenticación** | NextAuth (Auth.js) v5 |
| **UI/Styling** | Tailwind CSS 4, shadcn, Radix UI |
| **Componentes** | Phosphor Icons, Lucide React |
| **Validación** | Zod |
| **Utilidades** | clsx, tailwind-merge, class-variance-authority |

---

## 🔧 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** v18.x o superior
- **PostgreSQL** v14.x o superior
- **npm** o **pnpm** (gestor de paquetes)

### Base de Datos

Puedes utilizar cualquier servicio de PostgreSQL:
- 🟢 **Neon** (recomendado para desarrollo)
- 🐘 **PostgreSQL local**
- ☁️ **Supabase**, Railway, Render, etc.

---

## 🔐 Variables de Entorno

Copia el archivo `.env.example` a `.env` y completa los valores:

```env
# ===========================================
# BASE DE DATOS (PostgreSQL)
# ===========================================
DATABASE_URL="postgresql://usuario:password@host:5432/nextlms"

# ===========================================
# AUTENTICACIÓN (Auth.js)
# ===========================================
# Secret para firmar tokens JWT (genera con: openssl rand -base64 32)
AUTH_SECRET="tu-secret-aqui"

# URL base de la aplicación
NEXTAUTH_URL="http://localhost:3000"

# Secret para NextAuth (genera con: openssl rand -base64 32)
NEXTAUTH_SECRET="tu-nextauth-secret-aqui"

# ===========================================
# OAuth (opcional)
# ===========================================
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
```

### Descripción de Variables

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | Cadena de conexión a PostgreSQL en formato `postgresql://[user]:[password]@[host]:[port]/[database]` |
| `AUTH_SECRET` | Clave secreta para cifrar tokens JWT. Genera una nueva con `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL donde corre la aplicación (usualmente `http://localhost:3000` en desarrollo) |
| `NEXTAUTH_SECRET` | Secret adicional para NextAuth. Genera igual que `AUTH_SECRET` |
| `AUTH_GOOGLE_ID` | Client ID de Google Cloud Console para OAuth |
| `AUTH_GOOGLE_SECRET` | Client Secret de Google Cloud Console para OAuth |
| `AUTH_GITHUB_ID` | Client ID de GitHub Developer Settings para OAuth |
| `AUTH_GITHUB_SECRET` | Client Secret de GitHub Developer Settings para OAuth |

---

## 💻 Instalación

### 1. Clonar el repositorio

```bash
git clone <repositorio-url>
cd nextlms
```

### 2. Instalar dependencias

```bash
npm install
# o si prefieres pnpm
pnpm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
# Edita .env con tus valores
```

### 4. Generar el cliente de Prisma

```bash
npx prisma generate
```

### 5. Ejecutar migraciones de base de datos

```bash
npx prisma migrate dev --name init
```

### 6. (Opcional) Ejecutar seed con datos de ejemplo

```bash
npm run seed
```

Esto populates la base de datos con:
- 1 Tenant: "Instituto Digital"
- 3 Categorías: Programación, Bases de Datos, DevOps
- 4 Usuarios de prueba (consulta la sección de usuarios de prueba)
- 4 Cursos con módulos y lecciones
- Inscripciones y progreso de lecciones

---

## ⚡ Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo en `http://localhost:3000` |
| `npm run build` | Compila la aplicación para producción |
| `npm run start` | Inicia el servidor en modo producción |
| `npm run lint` | Ejecuta ESLint para verificar código |
| `npm run seed` | Popula la base de datos con datos de demostración |

---

## 🗃️ Estructura de la Base de Datos

### Modelos Principales

```
Tenant (Organización)
├── User
│   ├── Account (OAuth)
│   ├── Session
│   └── Enrollment
│       └── LessonProgress
└── Course
    ├── Module
    │   └── Lesson
    └── Category
```

### Modelos Detallados

#### 🏢 Tenant
Representa una organización (empresa, instituto, etc.). Cada tenant tiene su propio subdominio y datos aislados.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (CUID) | Identificador único |
| `name` | String | Nombre de la organización |
| `slug` | String (unique) | Subdominio (ej: `miempresa.nextlms.com`) |
| `logo` | String? | URL del logo |
| `plan` | Enum | Plan de suscripción (FREE, STARTER, PRO, ENTERPRISE) |
| `isActive` | Boolean | Si el tenant está activo |

#### 👤 User
Usuario del sistema. Puede belongecer a un tenant o ser global (Super Admin).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (CUID) | Identificador único |
| `name` | String? | Nombre completo |
| `email` | String (unique) | Correo electrónico |
| `password` | String? | Hash de contraseña (nullable para OAuth) |
| `role` | Enum | Rol del usuario |
| `tenantId` | String? | FK al Tenant (nullable para Super Admin) |
| `isActive` | Boolean | Si el usuario está activo |

#### 📚 Course
Curso creado por un instructor dentro de un tenant.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (CUID) | Identificador único |
| `title` | String | Título del curso |
| `slug` | String | URL amigable (único por tenant) |
| `description` | String? | Descripción del curso |
| `thumbnail` | String? | URL de miniatura |
| `price` | Decimal? | Precio del curso |
| `isPublished` | Boolean | Si el curso está publicado |
| `isFree` | Boolean | Si el curso es gratuito |
| `tenantId` | String | FK al Tenant |
| `ownerId` | String | FK al User (instructor) |

#### 📖 Module
Módulo dentro de un curso (ej: "Capítulo 1", "Introducción").

#### 📝 Lesson
Lección individual dentro de un módulo. Puede ser de tipo TEXT, VIDEO o QUIZ.

#### 📋 Enrollment
Inscripción de un estudiante a un curso.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `userId` | String | FK al estudiante |
| `courseId` | String | FK al curso |
| `status` | Enum | ACTIVE, COMPLETED, CANCELLED |

#### 🎯 LessonProgress
Tracking del progreso de un estudiante en una lección específica.

---

## 🔑 Roles de Usuario y Permisos

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **SUPER_ADMIN** | Admin global de la plataforma | Acceso a todos los tenants, gestión de la plataforma |
| **ADMIN** | Admin del tenant | Gestión de usuarios y cursos dentro de su organización |
| **INSTRUCTOR** | Creador de cursos | Crear, editar y publicar sus propios cursos |
| **STUDENT** | Estudiante | Ver y inscribirse en cursos, trackear progreso |

### Usuarios de Prueba (después de ejecutar `npm run seed`)

| Email | Rol | Contraseña |
|-------|-----|------------|
| `superadmin@nextlms.com` | Super Admin | `password123` |
| `admin@instituto.com` | Admin | `password123` |
| `instructor@instituto.com` | Instructor | `password123` |
| `ana@estudiante.com` | Estudiante | `password123` |
| `luis@estudiante.com` | Estudiante | `password123` |

---

## 🏃 Cómo Correr el Proyecto en Desarrollo

1. **Asegúrate de tener PostgreSQL corriendo** y tener tu `DATABASE_URL` configurada correctamente en `.env`.

2. **Genera las tablas en la base de datos:**

   ```bash
   npx prisma migrate dev --name init
   ```

3. **Inicia el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

4. **Abre tu navegador en:** `http://localhost:3000`

### Opcional: Populate con datos de ejemplo

Si quieres ver datos de demostración:

```bash
npm run seed
```

---

## 📁 Estructura del Proyecto

```
nextlms/
├── prisma/
│   ├── schema.prisma    # Definición de modelos de DB
│   └── seed.ts          # Script de populate de datos
├── src/
│   ├── app/             # App Router de Next.js
│   │   ├── (auth)/      # Rutas de autenticación
│   │   ├── (dashboard)/ # Dashboard y rutas protegidas
│   │   └── api/         # API routes
│   ├── components/      # Componentes React
│   ├── lib/
│   │   ├── auth.ts      # Configuración de NextAuth
│   │   ├── prisma.ts   # Cliente de Prisma
│   │   └── generated/   # Cliente generado por Prisma
│   └── styles/          # Estilos globales
├── public/              # Archivos estáticos
├── .env.example         # Plantilla de variables de entorno
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔧 Configuración Adicional

### OAuth (Google/GitHub)

Para habilitar login con Google o GitHub:

1. **Google:**
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un proyecto y habilita OAuth
   - Agrega `http://localhost:3000` como URI de redirección
   - Copia las credenciales a `.env`

2. **GitHub:**
   - Ve a [GitHub Developer Settings](https://github.com/settings/developers)
   - Crea una nueva OAuth App
   - Agrega `http://localhost:3000/api/auth/callback/github` como callback URL
   - Copia las credenciales a `.env`

### shadcn

Este proyecto utiliza shadcn para componentes UI. Para agregar nuevos componentes:

```bash
npx shadcn@latest add button
```

---

## 📝 Notas Adicionales

- 🔄 **Estrategia de Sesión:** Este proyecto usa JWT en lugar de sesiones de DB para mejor rendimiento.
- 🌍 **Multi-Tenant:** La arquitectura permite que cada organización tenga su propio subdominio y datos aislados.
- 🔒 **Seguridad:** Las contraseñas se hashean con bcrypt (12 rounds).
- 📊 **Progreso:** El sistema trackea automáticamente el progreso de cada estudiante por lección.
-免费 **Lecciones Gratis:** Los instructores pueden marcar lecciones como gratuitas para atraer estudiantes.

---

## 📄 Licencia

MIT License - feel free to use this project for learning and development.

---

<div align="center">
  <p>Built with ❤️ using Next.js + Prisma + PostgreSQL</p>
</div>