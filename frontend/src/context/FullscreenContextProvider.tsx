import { createContext, ReactNode, useState } from "react";

interface FullscreenContextType {
  isAnyPdfFullscreen: boolean;
  setIsAnyPdfFullscreen: (fullscreen: boolean) => void;
}

interface FullscreenContextProviderProps {
  children: ReactNode;
}

export const FullscreenContext = createContext<FullscreenContextType>({
  isAnyPdfFullscreen: false,
  setIsAnyPdfFullscreen: () => {},
});

/**
 * This component provides the FullscreenContext to the application.
 *
 * @param children The children of the component, which will have access to the FullscreenContext.
 */
export const FullscreenContextProvider = ({
  children,
}: FullscreenContextProviderProps) => {
  const [isAnyPdfFullscreen, setIsAnyPdfFullscreen] = useState<boolean>(false);

  const context = {
    isAnyPdfFullscreen,
    setIsAnyPdfFullscreen,
  };

  return (
    <FullscreenContext.Provider value={context}>
      {children}
    </FullscreenContext.Provider>
  );
};
