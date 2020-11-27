import { useRequireAuth } from '../hooks/useRequireAuth';
import { useRouter } from 'next/router';
import Button from '../components/button';
import { useState, useEffect } from 'react';
import Loader from '../components/loader';
// import ProjectOption from '../components/ProjectOption';
import ProjectForm from '../components/ProjectForm';
import { auth, db } from '../config/firebase';
import ProjectOption from '../components/ProjectOption';
import styles from '../styles/dashboard.module.css'

export default function Dashboard(props) {
    const auth = useRequireAuth();
    const [isCreateProject, setIsCreateProject] = useState(false);
    const [isEnterRoomCode, setIsEnterRoomCode] = useState(false);

    const closeProjectForm = () => {
        setIsCreateProject(false);
        setIsEnterRoomCode(false);
    }

    const showCreateProject = () => {
        setIsCreateProject(true);
        setIsEnterRoomCode(false);
    }

    const showEnterRoomCode = () => {
        setIsEnterRoomCode(true);
        setIsCreateProject(false);
    }

    

    const enterRoomCode = (event) => {
        event.preventDefault();
        alert(event.target.code.value);
        // Add to auth.user.projects
        // Add to db
    }

    const createProject = (event) => {
        event.preventDefault();
        // Update auth.user state
        let newUser = {...auth.user}
        newUser.projects = [...newUser.projects, event.target.name.value]
        auth.setUser(newUser)
        // Update db users
        db.ref('users/' + auth.user.uid).set({
			name: auth.user.name,
			email: auth.user.email,
			projects: auth.user.projects
		}).catch((error) => {
			console.log(error)
		    return ;
        });
        // Create new db collection "projects"
        // having PERMISSION_DENIED issue now


        // var postData = {
        //     name: event.target.name.value
        // };

        // var newPostKey = db.ref().child('projects').push().key;
        // var updates = {};
        // updates['/projects/' + newPostKey] = postData;
        // return db.ref().update(updates);

        // Direct to whiteboard page

    }

    const enterProject = (event) => {
        alert(event.target.getAttribute('key'))
    }

    const deleteOption = (event) => {
        // event.stopPropagation();
        alert("delete")
    }




    if (!auth.user || !auth.user.name) return <Loader />;
    // projectOption key to be replaced by project unique id
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <Button onClick={showCreateProject} type={'solid'} name={'Create New Board'} />
                    <Button onClick={showEnterRoomCode} type={'solid'} name={'Enter Board Code'} />
                    <Button onClick={auth.signOut} type={'outline'} name={'Logout'} />
                </nav>
            </header>
            <main className={styles.main}>
                <h1>Welcome {auth.user.name}!</h1>
                <h3>You are logged in with {auth.user.email} and have {auth.user.projects.length} projects.</h3>
                <div className={styles.projectOptions}>
                    {auth.user.projects.map((project, index) => {return (<ProjectOption key={index} name={project} 
                    onClick={enterProject} delete={deleteOption}></ProjectOption>)})}
                </div>
            </main>

            {isCreateProject? <ProjectForm title={"Create a New Board"} name={"name"} placeholder={"Board Name"} 
            submitvalue={"Create"} onSubmit={createProject} closeProjectForm={closeProjectForm}></ProjectForm>: null}

            {isEnterRoomCode? <ProjectForm title={"Enter a Board Code"} name={"code"} placeholder={"Board Code"} 
            submitvalue={"Enter"} onSubmit={enterRoomCode} closeProjectForm={closeProjectForm}></ProjectForm>: null}
            
        </div>
    );
};
