/**
 * Menu configuration for venue dashboard
 * Determines which menu items are visible based on distribution mode
 */

export type DistributionMode = "POOLED" | "PERSONAL";

export interface MenuItem {
  href: string;
  label: string;
  showFor: DistributionMode[];
}

export const ALL_MENU_ITEMS: MenuItem[] = [
  { href: "/venue/dashboard", label: "Dashboard", showFor: ["POOLED", "PERSONAL"] },
  { href: "/venue/staff", label: "Staff", showFor: ["PERSONAL"] },
  { href: "/venue/qr-codes", label: "QR", showFor: ["POOLED", "PERSONAL"] },
  { href: "/venue/payouts", label: "Payouts", showFor: ["PERSONAL"] },
  { href: "/venue/settings", label: "Settings", showFor: ["POOLED", "PERSONAL"] },
];

/**
 * Get visible menu items based on distribution mode
 */
export function getVisibleMenuItems(distributionMode: DistributionMode): MenuItem[] {
  return ALL_MENU_ITEMS.filter(item => item.showFor.includes(distributionMode));
}

/**
 * Check if a specific menu item should be visible
 */
export function isMenuItemVisible(href: string, distributionMode: DistributionMode): boolean {
  const item = ALL_MENU_ITEMS.find(i => i.href === href);
  return item ? item.showFor.includes(distributionMode) : false;
}
