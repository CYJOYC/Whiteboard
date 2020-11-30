import React from 'react';
//import './index.css';
import Gallery from '../../components/Gallery.js';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../config/firebase';
import Loader from '../../components/loader'; 

export default function Project(props) {
	const auth = useAuth();
	return <React.StrictMode>
		<Gallery data={props.data} user={auth.user} code={props.galleryCode}/>
	</React.StrictMode>
}

// This function gets called at build time
export async function getStaticPaths() {
	// Call an external API endpoint to get posts
	let galleries = null;
	await db.ref(`galleries/`).once('value', (snapshot) => {
	const data = snapshot.val();
		galleries = Object.keys(data);
	})

	// Get the paths we want to pre-render based on posts
	const paths = galleries.map((galleryId) => `/gallery/${galleryId}`)

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false }
}

export async function getStaticProps(context) {
	const galleryCode = context.params.id
	let data = null;
	await db.ref(`galleries/${galleryCode}/`).once('value', (snapshot) => {
		data = snapshot.val();
	});

	if (!data) {
		return {
			redirect: {
			    destination: '/dashboard',
			    permanent: false,
			},
		}
	}

	return {
		props: {
			data,
			galleryCode
		}, // will be passed to the page component as props
	}
}