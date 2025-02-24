
import {create} from 'zustand'

type SettingsStore=  {
    isOpen : boolean ;
    onOpen: (name: string, projectId: string) => void;
    onClose: () => void;
    name : string | null ;
    projectId : string | null ;
}

export const useDeleteHook = create<SettingsStore>((set)=> ({
    isOpen : false ,
    onOpen: (name, projectId) => set({ isOpen: true, name, projectId }),
  onClose: () => set({ isOpen: false, name: null, projectId: null }),
    name : null,
    projectId : null
}))