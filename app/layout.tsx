import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CssBaseline from '@/components/ServerComponents/CssBaseline';
import theme from '@/config/theme';
import ThemeProvider from '@/components/ServerComponents/ThemeProvider';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'PokéLogger - A Pokédex Tracker',
	description: 'A site where you can track your Pokedex progress in any of the mainline games. Sign up for free now!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning={true} >
			<ThemeProvider theme={theme}>
				<NextAuthProvider>
					<CssBaseline />
					<body className={inter.className} style={{backgroundColor: '#dff7d2', wordBreak: 'break-word'}}>
						<GoogleAnalytics development={process.env.NODE_ENV === 'development'} />
						{children}
					</body>
				</NextAuthProvider>
			</ThemeProvider>
		</html>
	)
}