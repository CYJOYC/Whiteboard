import Head from 'next/head'
import Link from 'next/link'


export default function Login() {
    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <h1>Login</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
             </h2>
        </div>
    )
}