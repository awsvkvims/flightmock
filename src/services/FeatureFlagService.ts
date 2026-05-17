export interface FeatureFlags {
  showBudgetAirlines: boolean;
}

const defaults: FeatureFlags = {
  showBudgetAirlines: false,
};

class FeatureFlagService {
  private flags: FeatureFlags = { ...defaults };

  isEnabled(flag: keyof FeatureFlags): boolean {
    return this.flags[flag];
  }

  enable(flag: keyof FeatureFlags): void {
    this.flags[flag] = true;
  }

  reset(): void {
    this.flags = { ...defaults };
  }
}

export const featureFlagService = new FeatureFlagService();
