export interface AddOnService {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string; // Detail description to show on click
  additionalInfo?: string; // e.g. "if the person didn't sponsored family before"
  addOns?: AddOnService[]; // Interactive add-ons in the popup
}

export interface Workflow {
  id: string;
  title: string;
  icon: string;
  description: string;
  services: Service[];
}

export interface SelectedService {
  serviceId: string;
  quantity: number;
  selectedAddOns: string[]; // List of AddOn IDs
  notes?: string;
}

export interface ContactDetails {
  name: string;
  phone: string;
  email: string;
}
