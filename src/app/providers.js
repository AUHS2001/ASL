import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import ThemeRegistry from "@/Theme/ThemeRegistry";
import { AuthContextProvider } from "@/context/AuthContext";
import { Providers } from "@/store/Providers";

export function Providers({ children }) {
  return (
    <ThemeRegistry>
      <AppRouterCacheProvider>
        <Providers>{children}</Providers>
      </AppRouterCacheProvider>
    </ThemeRegistry>
  );
}
