import {
    CategoryType,
    TransactionType,
} from "@/generated/prisma/enums";

// ─── CATEGORY TYPE ────────────────────────────────────────────────────────────

const CATEGORY_TYPE_LABELS: Record<CategoryType, string> = {
    [CategoryType.INCOME]: "Income",
    [CategoryType.EXPENSE]: "Expense",
};

export function getCategoryTypeLabel(type: CategoryType): string {
    return CATEGORY_TYPE_LABELS[type];
}

// ─── TRANSACTION TYPE ─────────────────────────────────────────────────────────

const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
    [TransactionType.INCOME]: "Income",
    [TransactionType.EXPENSE]: "Expense",
};

export function getTransactionTypeLabel(
    type: TransactionType,
): string {
    return TRANSACTION_TYPE_LABELS[type];
}
