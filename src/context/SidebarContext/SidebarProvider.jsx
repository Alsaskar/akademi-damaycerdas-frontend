import { useState } from 'react';
import { SidebarContext } from './SidebarContext';
import { getLocalStorage } from '@/utils/localStorage';

// Membuat Provider
export const SidebarProvider = ({ children }) => {
  // Menggunakan fungsi di dalam useState agar getLocalStorage hanya dijalankan sekali (lazy initial state)
  const [isShowSidebar, setIsShowSidebarState] = useState(() =>
    getLocalStorage({ key: 'isShowSidebar', initValue: false }),
  );

  // Wrapper function untuk update state dan localStorage secara bersamaan
  const setIsShowSidebar = (newValue) => {
    localStorage.setItem('isShowSidebar', JSON.stringify(newValue));
    setIsShowSidebarState(newValue);
  };

  return (
    <SidebarContext.Provider value={{ isShowSidebar, setIsShowSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
