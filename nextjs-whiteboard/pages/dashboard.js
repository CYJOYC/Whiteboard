import { useRequireAuth } from '../hooks/useRequireAuth';
import { useRouter } from 'next/router';
import Button from '../components/button';
import { useState, useEffect } from 'react';
import Loader from '../components/loader';
import { auth } from '../config/firebase'


export default function Dashboard(props) {
    const auth = useRequireAuth();
    if (!auth.user || !auth.user.name) return <Loader />;
    return (
        <div>
            <h1>Welcome {auth.user.name}!</h1>
            <h3>You are logged in with {auth.user.email} and have {auth.user.projects.length} projects.</h3>
            <Button onClick={auth.signOut} type={'destructive'} name={'Logout'} />
        </div>
    );
};
