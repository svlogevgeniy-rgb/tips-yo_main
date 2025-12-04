import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getVisibleMenuItems, isMenuItemVisible, DistributionMode } from './menu';

/**
 * **Feature: tipsio-refactor-v2, Property 3: UI режима "Единая кубышка"**
 * 
 * *Для любого* заведения с distributionMode = POOLED, боковое меню НЕ должно содержать
 * разделы "Персонал" и "Выплаты", а дашборд НЕ должен показывать блок "Активные сотрудники".
 * 
 * **Validates: Requirements 3.1, 3.4, 3.6**
 */
describe('Property 3: UI for POOLED mode', () => {
  const distributionModeArb = fc.constantFrom<DistributionMode>('POOLED', 'PERSONAL');

  it('should hide Staff menu item for POOLED mode', () => {
    fc.assert(
      fc.property(
        fc.constant('POOLED' as DistributionMode),
        (mode) => {
          const visibleItems = getVisibleMenuItems(mode);
          const hasStaff = visibleItems.some(item => item.href === '/venue/staff');
          expect(hasStaff).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should hide Payouts menu item for POOLED mode', () => {
    fc.assert(
      fc.property(
        fc.constant('POOLED' as DistributionMode),
        (mode) => {
          const visibleItems = getVisibleMenuItems(mode);
          const hasPayouts = visibleItems.some(item => item.href === '/venue/payouts');
          expect(hasPayouts).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should show Staff and Payouts menu items for PERSONAL mode', () => {
    fc.assert(
      fc.property(
        fc.constant('PERSONAL' as DistributionMode),
        (mode) => {
          const visibleItems = getVisibleMenuItems(mode);
          const hasStaff = visibleItems.some(item => item.href === '/venue/staff');
          const hasPayouts = visibleItems.some(item => item.href === '/venue/payouts');
          expect(hasStaff).toBe(true);
          expect(hasPayouts).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should always show Dashboard, QR, and Settings for any mode', () => {
    fc.assert(
      fc.property(
        distributionModeArb,
        (mode) => {
          const visibleItems = getVisibleMenuItems(mode);
          const hasDashboard = visibleItems.some(item => item.href === '/venue/dashboard');
          const hasQR = visibleItems.some(item => item.href === '/venue/qr-codes');
          const hasSettings = visibleItems.some(item => item.href === '/venue/settings');
          
          expect(hasDashboard).toBe(true);
          expect(hasQR).toBe(true);
          expect(hasSettings).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return correct visibility for specific menu items', () => {
    // Staff should only be visible for PERSONAL
    expect(isMenuItemVisible('/venue/staff', 'POOLED')).toBe(false);
    expect(isMenuItemVisible('/venue/staff', 'PERSONAL')).toBe(true);
    
    // Payouts should only be visible for PERSONAL
    expect(isMenuItemVisible('/venue/payouts', 'POOLED')).toBe(false);
    expect(isMenuItemVisible('/venue/payouts', 'PERSONAL')).toBe(true);
    
    // Dashboard should be visible for both
    expect(isMenuItemVisible('/venue/dashboard', 'POOLED')).toBe(true);
    expect(isMenuItemVisible('/venue/dashboard', 'PERSONAL')).toBe(true);
  });

  it('POOLED mode should have fewer menu items than PERSONAL mode', () => {
    const pooledItems = getVisibleMenuItems('POOLED');
    const personalItems = getVisibleMenuItems('PERSONAL');
    
    expect(pooledItems.length).toBeLessThan(personalItems.length);
    expect(pooledItems.length).toBe(3); // Dashboard, QR, Settings
    expect(personalItems.length).toBe(5); // Dashboard, Staff, QR, Payouts, Settings
  });
});
