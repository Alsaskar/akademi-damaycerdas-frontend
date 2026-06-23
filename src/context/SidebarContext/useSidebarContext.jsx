import { useContext } from 'react';
import { SidebarContext } from './SidebarContext';

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('Context must be used within a provider');
  }
  return context;
};
