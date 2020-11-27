import { auth, db } from '../config/firebase';
import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { useRouter } from 'next/router';

const authContext = createContext({ user: {} });
const { Provider } = authContext;

export function AuthProvider(props) {
	const auth = useAuthProvider();
 	return <Provider value={auth}>{props.children}</Provider>;
}

export const useAuth = () => {
	return useContext(authContext);
};

const useAuthProvider = () => {
	const [user, setUser] = useState(null);
	const router = useRouter();

	const handleAuthStateChanged = (user) => {
		setUser(user);
		if (user) {
			getUserAdditionalData(user.uid);
			router.push('/dashboard')
		}
	};

	useEffect(() => {
	 	const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
		return () => unsub();
	}, []);

	const signUp = (event) => {
		event.preventDefault();
		auth.createUserWithEmailAndPassword(event.target.email.value, event.target.password.value).then((response) => {
			createUser(response.user.uid, event.target.name.value, event.target.email.value);	
			router.push('/dashboard');
		}).catch((error) => {
	    	alert(error.message)
		});
	};

	const signIn = (event) => {
		event.preventDefault();
	 	auth.signInWithEmailAndPassword(event.target.email.value, event.target.password.value).then((response) => {
		    getUserAdditionalData(response.user.uid);
		    router.push('/dashboard');
	  	}).catch((error) => {
	  		alert(error.message)
	  	});
	};

	const createUser = (userId, name, email) => {
		return db.ref('users/' + userId).set({
			name: name,
			email: email,
			projects: []
		}).then(() => {
		    setUser({uid: userId, name: name, email: email, projects: []});
		    return user;
		}).catch((error) => {
			console.log(error)
		    return ;
		});
	};

	const signOut = () => {
	 	return auth.signOut().then(() => {
	 		setUser(null)
	 		router.push('/')
	 	});
	};

	const getUserAdditionalData = (userId) => {
		return db.ref('users/' + userId).on('value', (snapshot) => {
		  	const data = snapshot.val();
		  	var user = {
		  		uid: userId, 
		  		name: data.name, 
		  		email: data.email
		  	}
		  	if ('projects' in data) {
		  		user['projects'] = data.projects;
		  	} else {
		  		user['projects'] = [];
		  	}
		  	setUser(user);
		})
	}

	return { user, setUser, signUp, signIn, signOut };
};



