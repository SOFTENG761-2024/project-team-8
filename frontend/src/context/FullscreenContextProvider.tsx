import { createContext, ReactNode, useState } from "react";

interface FullscreenContextType {
  isAnyPdfFullscreen: boolean;
  setIsAnyPdfFullscreen: (fullscreen: boolean) => void;
  lessonChanged: boolean;
  setLessonChanged: (changed: boolean) => void;
}

interface FullscreenContextProviderProps {
  children: ReactNode;
}

export const FullscreenContext = createContext<FullscreenContextType>({
  isAnyPdfFullscreen: false,
  setIsAnyPdfFullscreen: () => {},
  lessonChanged: true,
  setLessonChanged: () => {},
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
  const [lessonChanged, setLessonChanged] = useState<boolean>(true);

  const context = {
    isAnyPdfFullscreen,
    setIsAnyPdfFullscreen,
    lessonChanged,
    setLessonChanged,
  };

  return (
    <FullscreenContext.Provider value={context}>
      {children}
    </FullscreenContext.Provider>
  );
};
