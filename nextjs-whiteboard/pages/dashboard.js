import { useRequireAuth } from '../hooks/useRequireAuth';
import { useRouter } from 'next/router';
import Button from '../components/button'

export default function Dashboard(props) {
    const auth = useRequireAuth();
    if (!auth.user) return null;
    return (
        <div>
            <h1>Welcome {auth.user.name}!</h1>
            <h2>You are logged in with {auth.user.email}</h2>
            <Button onClick={auth.signOut} type={'destructive'} name={'Logout'} />
        </div>
    );
};
