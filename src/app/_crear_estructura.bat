@echo off
chcp 65001 >nul
echo.
echo ╔══════════════════════════════════════════╗
echo ║   Creando estructura de app/...          ║
echo ╚══════════════════════════════════════════╝
echo.

:: El script vive en src\app — todas las rutas son relativas a ese punto

:: ─── (public) ────────────────────────────────────────────────────────────────

mkdir "(public)"
type nul > "(public)\layout.tsx"
type nul > "(public)\page.tsx"

mkdir "(public)\(auth)\login"
mkdir "(public)\(auth)\register"
mkdir "(public)\(auth)\forgot-password"
type nul > "(public)\(auth)\layout.tsx"
type nul > "(public)\(auth)\login\page.tsx"
type nul > "(public)\(auth)\register\page.tsx"
type nul > "(public)\(auth)\forgot-password\page.tsx"

mkdir "(public)\tenants\auth\login"
mkdir "(public)\tenants\auth\register"
type nul > "(public)\tenants\auth\layout.tsx"
type nul > "(public)\tenants\auth\login\page.tsx"
type nul > "(public)\tenants\auth\register\page.tsx"

mkdir "(public)\instructors\auth\login"
type nul > "(public)\instructors\auth\layout.tsx"
type nul > "(public)\instructors\auth\login\page.tsx"

mkdir "(public)\courses\[slug]"
type nul > "(public)\courses\page.tsx"
type nul > "(public)\courses\[slug]\page.tsx"

echo [OK] (public)

:: ─── (student) ───────────────────────────────────────────────────────────────

mkdir "(student)"
type nul > "(student)\layout.tsx"
type nul > "(student)\loading.tsx"
type nul > "(student)\error.tsx"

mkdir "(student)\dashboard"
type nul > "(student)\dashboard\page.tsx"

mkdir "(student)\my-courses\[courseSlug]\lessons\[lessonId]"
type nul > "(student)\my-courses\page.tsx"
type nul > "(student)\my-courses\[courseSlug]\page.tsx"
type nul > "(student)\my-courses\[courseSlug]\loading.tsx"
type nul > "(student)\my-courses\[courseSlug]\lessons\[lessonId]\page.tsx"

mkdir "(student)\profile"
type nul > "(student)\profile\page.tsx"

echo [OK] (student)

:: ─── (instructor) ────────────────────────────────────────────────────────────

mkdir "(instructor)"
type nul > "(instructor)\layout.tsx"
type nul > "(instructor)\loading.tsx"
type nul > "(instructor)\error.tsx"

mkdir "(instructor)\dashboard"
type nul > "(instructor)\dashboard\page.tsx"

mkdir "(instructor)\courses\new"
mkdir "(instructor)\courses\[courseId]\modules\[moduleId]\lessons\[lessonId]"
type nul > "(instructor)\courses\page.tsx"
type nul > "(instructor)\courses\new\page.tsx"
type nul > "(instructor)\courses\[courseId]\page.tsx"
type nul > "(instructor)\courses\[courseId]\loading.tsx"
type nul > "(instructor)\courses\[courseId]\modules\page.tsx"
type nul > "(instructor)\courses\[courseId]\modules\[moduleId]\lessons\page.tsx"
type nul > "(instructor)\courses\[courseId]\modules\[moduleId]\lessons\[lessonId]\page.tsx"

mkdir "(instructor)\profile"
type nul > "(instructor)\profile\page.tsx"

echo [OK] (instructor)

:: ─── (tenant) ────────────────────────────────────────────────────────────────

mkdir "(tenant)"
type nul > "(tenant)\layout.tsx"
type nul > "(tenant)\loading.tsx"
type nul > "(tenant)\error.tsx"

mkdir "(tenant)\dashboard"
type nul > "(tenant)\dashboard\layout.tsx"
type nul > "(tenant)\dashboard\page.tsx"

mkdir "(tenant)\dashboard\courses\new"
mkdir "(tenant)\dashboard\courses\[courseId]"
type nul > "(tenant)\dashboard\courses\page.tsx"
type nul > "(tenant)\dashboard\courses\new\page.tsx"
type nul > "(tenant)\dashboard\courses\[courseId]\page.tsx"

mkdir "(tenant)\dashboard\instructors\[instructorId]"
type nul > "(tenant)\dashboard\instructors\page.tsx"
type nul > "(tenant)\dashboard\instructors\[instructorId]\page.tsx"

mkdir "(tenant)\dashboard\students\[studentId]"
type nul > "(tenant)\dashboard\students\page.tsx"
type nul > "(tenant)\dashboard\students\[studentId]\page.tsx"

mkdir "(tenant)\dashboard\categories"
type nul > "(tenant)\dashboard\categories\page.tsx"

mkdir "(tenant)\dashboard\enrollments"
type nul > "(tenant)\dashboard\enrollments\page.tsx"

mkdir "(tenant)\dashboard\settings\billing"
type nul > "(tenant)\dashboard\settings\page.tsx"
type nul > "(tenant)\dashboard\settings\billing\page.tsx"

echo [OK] (tenant)

:: ─── (super-admin) ───────────────────────────────────────────────────────────

mkdir "(super-admin)"
type nul > "(super-admin)\layout.tsx"
type nul > "(super-admin)\loading.tsx"
type nul > "(super-admin)\error.tsx"

mkdir "(super-admin)\admin"
type nul > "(super-admin)\admin\layout.tsx"
type nul > "(super-admin)\admin\page.tsx"

mkdir "(super-admin)\admin\tenants\[tenantId]"
type nul > "(super-admin)\admin\tenants\page.tsx"
type nul > "(super-admin)\admin\tenants\[tenantId]\page.tsx"

mkdir "(super-admin)\admin\users\[userId]"
type nul > "(super-admin)\admin\users\page.tsx"
type nul > "(super-admin)\admin\users\[userId]\page.tsx"

mkdir "(super-admin)\admin\courses"
type nul > "(super-admin)\admin\courses\page.tsx"

mkdir "(super-admin)\admin\categories"
type nul > "(super-admin)\admin\categories\page.tsx"

mkdir "(super-admin)\admin\settings"
type nul > "(super-admin)\admin\settings\page.tsx"

echo [OK] (super-admin)

:: ─── Root files ──────────────────────────────────────────────────────────────

:: Solo crea los root files si NO existen (para no pisar los que ya tienes)
if not exist "layout.tsx"   type nul > "layout.tsx"
if not exist "globals.css"  type nul > "globals.css"
if not exist "loading.tsx"  type nul > "loading.tsx"
if not exist "error.tsx"    type nul > "error.tsx"
if not exist "not-found.tsx" type nul > "not-found.tsx"

echo [OK] root files

:: ─── api — se conserva intacto ───────────────────────────────────────────────
echo [--] api/auth/[...all]/route.ts  ^<-- conservado, no se toco

echo.
echo ╔══════════════════════════════════════════╗
echo ║   Estructura creada exitosamente  ✓      ║
echo ╚══════════════════════════════════════════╝
echo.
pause