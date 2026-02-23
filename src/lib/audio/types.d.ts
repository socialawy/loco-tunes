export interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
  };
  maxTouchPoints?: number;
}

export interface ExtendedPerformance extends Performance {
  memory?: {
    jsHeapSizeLimit: number;
  };
}
