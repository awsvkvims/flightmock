import { featureFlagService } from '../FeatureFlagService';

beforeEach(() => {
  featureFlagService.reset();
});

describe('FeatureFlagService', () => {
  it('isEnabled returns false by default for showBudgetAirlines', () => {
    expect(featureFlagService.isEnabled('showBudgetAirlines')).toBe(false);
  });

  it('isEnabled returns true after enable() is called', () => {
    featureFlagService.enable('showBudgetAirlines');
    expect(featureFlagService.isEnabled('showBudgetAirlines')).toBe(true);
  });
});
