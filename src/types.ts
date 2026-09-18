export interface DeviceUsage {
  id: string;
  name: string;
  category: 'cooling' | 'kitchen' | 'water' | 'lighting' | 'ev' | 'other';
  powerWatts: number;
  dailyHours: number;
  monthlyCostSAR: number;
  percentage: number;
  status: 'optimal' | 'warning' | 'standby';
  healthScore: number;
}

export interface CircuitBreaker {
  id: string;
  label: string;
  zone: string;
  currentAmps: number;
  maxAmps: number;
  temperatureC: number;
  status: 'safe' | 'warning' | 'alert';
  voltage: number;
}

export interface ProtectionAlert {
  id: string;
  type: 'arc_fault' | 'thermal' | 'surge' | 'overload' | 'leakage' | 'standby_waste';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'info';
  timestamp: string;
  resolved: boolean;
  actionTaken: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tag: string;
  description: string;
  priceSAR: number;
  originalPriceSAR: number;
  popular?: boolean;
  panelCapacity: string;
  features: string[];
  ctaLabel: string;
}

export interface PropertyEstimate {
  propertyType: 'apartment' | 'floor' | 'villa_medium' | 'villa_large';
  monthlyBillSAR: number;
  propertyAgeYears: number;
  hasCentralAC: boolean;
  hasPoolOrPump: boolean;
  hasEV: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  city: string;
  district: string;
  propertyType: string;
  planId: string;
  preferredDate: string;
  notes?: string;
}
