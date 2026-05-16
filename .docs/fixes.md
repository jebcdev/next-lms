# 🛠️ Fixes & Changes

## 1. Seeders mejorados

Generación de datos más realistas incluyendo tenant por defecto para un registro correcto.
`prisma/seed.ts`

## 2. Script de seed

`npm run seed`

## 3. Role visible en la Topbar

El role del usuario ahora se muestra en la barra superior.
`src/app/(dashboard)/dashboard/components/Topbar.tsx`

## 4. Sidebar condicional por role

Settings y Students ahora son visibles únicamente para administradores.
`src/app/(dashboard)/dashboard/components/Sidebar.tsx`

## 5. Dashboard principal refactorizado por role

La página principal del dashboard ahora renderiza contenido según el role del usuario.
`src/app/(dashboard)/dashboard/page.tsx`

## 6. Server action: datos del estudiante

Consulta consolidada de todos los datos del estudiante.
`src/app/(dashboard)/dashboard/actions/students/get-student-data.ts`

## 7. Tarjeta de estadísticas del estudiante

Componente para mostrar la data del estudiante en el dashboard.
`src/app/(dashboard)/dashboard/components/students/student-stats-card.tsx`

## 8. Tabla de cursos con progreso

Tabla que muestra los cursos inscritos junto con el avance del estudiante.
`src/app/(dashboard)/dashboard/courses/components/CoursesTable.tsx`

## 9. Social login/register eliminado

Se removió la autenticación con proveedores externos (Google, GitHub).
`src/app/(auth)/signin/page.tsx`
`src/app/(auth)/register/page.tsx`

<!--  -->

## 10. Efecto Paralax en el inicio

Se implemento efecto paralax en el inicio
`src\app\(marketing)\components\hero-particles.tsx`
`src\app\(marketing)\page.tsx`

## 11. Dashboard con particulas

Se implemento un diseño mucho mas moderno para el dashboard
`src\app\(dashboard)\dashboard\components\dashboard-particles.tsx`
`src/app/(dashboard)/dashboard/layout.tsx`
`src\app\(dashboard)\dashboard\components\Topbar.tsx`
`src\app\(dashboard)\dashboard\components\Sidebar.tsx`

## 12. Logo y favicon

Implementación de logo personalizado
`public\logo.png`
`src\app\favicon.ico`
`src\app\(marketing)\components\Navbar.tsx`