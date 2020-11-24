import { useRequireAuth } from '../hooks/useRequireAuth';
import { useRouter } from 'next/router';

export default function Dashboard(props) {
    const auth = useRequireAuth();
    if (!auth.user) return null;
    return (
        <div>
            <h1>Welcome {auth.user.name}!</h1>
            <h2>You are logged in with {auth.user.email}</h2>
            <button onClick={auth.signOut}>Logout</button>
        </div>
    );
};
