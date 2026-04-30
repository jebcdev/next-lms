 "use client";

import { useState, useMemo, ReactNode, Suspense } from "react";
import { Input } from "@/features/shared/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import Link from "next/link";
import Loading from "@/app/loading";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SearchField<T> = keyof T;

export interface HeaderAction {
  icon: ReactNode;
  text: string;
  link: string;
}

export interface GeneralGridProps<T extends { id: string | number }> {
  items: T[];
  searchFields: SearchField<T>[];
  renderCard: (item: T, index: number) => ReactNode;

  // ── Header ──────────────────────────────────────────────────────────────
  title?: string;
  subtitle?: string;
  headerAction?: HeaderAction;

  // ── Search ──────────────────────────────────────────────────────────────
  searchPlaceholder?: string;

  // ── Layout ──────────────────────────────────────────────────────────────
  gridCols?: string;

  // ── Empty state ──────────────────────────────────────────────────────────
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: ReactNode;

  // ── Extra toolbar content ─────────────────────────────────────────────
  toolbarEnd?: ReactNode;

  // ── Suspense ─────────────────────────────────────────────────────────────
  loadingMessage?: string;
}

// ---------------------------------------------------------------------------
// Header action renderer
// ---------------------------------------------------------------------------

function HeaderActionRenderer({ action }: { action: HeaderAction }) {
  const Icon = action.icon;

  return (
    <Button asChild>
      <Link href={action.link} className="gap-2">
        {Icon}
        {action.text}
      </Link>
    </Button>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function GeneralGrid<T extends { id: string | number }>({
  items,
  searchFields,
  renderCard,
  title,
  subtitle,
  headerAction,
  searchPlaceholder = "Buscar...",
  gridCols = "sm:grid-cols-2 lg:grid-cols-3",
  emptyTitle = "No se encontraron resultados",
  emptyDescription = "Intenta con otros términos de búsqueda",
  emptyIcon,
  toolbarEnd,
  loadingMessage = "Cargando...",
}: GeneralGridProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;

    const lower = searchQuery.toLowerCase();

    return items.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        if (typeof value === "string") return value.toLowerCase().includes(lower);
        if (typeof value === "number") return String(value).includes(lower);
        return false;
      })
    );
  }, [items, searchFields, searchQuery]);

  return (
    <div className="space-y-6">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      {(title || headerAction) && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {title && (
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
            </div>
          )}
          {headerAction && <div className="shrink-0"><HeaderActionRenderer action={headerAction} /></div>}
        </div>
      )}

      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {toolbarEnd && <div className="flex items-center gap-2">{toolbarEnd}</div>}
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          icon={emptyIcon}
          query={searchQuery}
        />
      ) : (
        <div className={`grid gap-6 ${gridCols}`}>
          {filteredItems.map((item, index) => (
            <div key={item.id}>{renderCard(item, index)}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState({
  title,
  description,
  icon,
  query,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
  query?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        {icon ?? <Search className="h-8 w-8 text-muted-foreground" />}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">
        {query ? <>Sin resultados para &quot;{query}&quot;</> : description}
      </p>
    </div>
  );
}