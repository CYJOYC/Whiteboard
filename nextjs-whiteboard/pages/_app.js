import '../styles/globals.css'
import { AuthProvider } from '../hooks/useAuth'
import { GalleryProvider } from '../hooks/useGallery'

function MyApp({ Component, pageProps }) {
	return (
  		<AuthProvider>
			<GalleryProvider>
  				<Component {...pageProps} />
			</GalleryProvider>
  		</AuthProvider>
  	);
}

export default MyApp
