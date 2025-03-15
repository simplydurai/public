export interface NavItem {
    id: number;
    displayName: string;
    fragment: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    children?: NavItem[];
  }