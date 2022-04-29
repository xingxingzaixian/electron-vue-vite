export interface IElectronAPI {
  platform: string;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
