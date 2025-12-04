/**
 * Notification logic for venue dashboard
 * Determines when to show staff-related notifications
 */

export type DistributionMode = "POOLED" | "PERSONAL";

export interface NotificationConfig {
  showNoStaffAlert: boolean;
  showAddStaffOnQrPage: boolean;
}

/**
 * Determines if "no staff" notification should be shown
 * Only for PERSONAL mode when activeStaff = 0
 */
export function shouldShowNoStaffAlert(
  distributionMode: DistributionMode,
  activeStaffCount: number
): boolean {
  return distributionMode === "PERSONAL" && activeStaffCount === 0;
}

/**
 * Get notification configuration based on venue state
 */
export function getNotificationConfig(
  distributionMode: DistributionMode,
  activeStaffCount: number
): NotificationConfig {
  const showNoStaffAlert = shouldShowNoStaffAlert(distributionMode, activeStaffCount);
  
  return {
    showNoStaffAlert,
    showAddStaffOnQrPage: showNoStaffAlert,
  };
}
