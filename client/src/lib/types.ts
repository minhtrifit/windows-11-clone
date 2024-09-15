export interface APP_TYPE {
  id?: string;
  iconUrl?: string;
  iconName?: string;
  iconWidth?: number;
  iconHeight?: number;
  targetElement?: React.ReactElement;
  targetElementname?: string;
  targetElementTabName?: string;
  targetElementTabIcon?: React.ReactElement;
  isTargetElementTab?: boolean;
  lastOpenedTime?: string;
  content?: string;
  type?: string;
  createdAt?: any;
}
