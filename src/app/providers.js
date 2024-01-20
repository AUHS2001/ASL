import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import ThemeRegistry from "@/Theme/ThemeRegistry";
import { AuthContextProvider } from "@/context/AuthContext";

export function Providers({ children }) {
  return (
    <ThemeRegistry>
      <AppRouterCacheProvider>
       {children}
      </AppRouterCacheProvider>
    </ThemeRegistry>
  );
}