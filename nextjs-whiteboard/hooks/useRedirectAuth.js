import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

export const useRedirectAuth = () => {
	const auth = useAuth();
	const router = useRouter();
	useEffect(() => {
  		if (auth.user) {
   			router.push('/dashboard');
  		} 
 	}, [auth, router]);
 
 	return auth;
};