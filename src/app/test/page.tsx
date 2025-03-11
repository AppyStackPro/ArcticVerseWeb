'use client'

import { account } from '../../firebase/appwrite';

export default function TestAppwrite() {
    const checkSession = async () => {
        try {
            const session = await account.get();
            console.log('Session:', session);
        } catch (error) {
            console.error('No active session', error);
        }
    };

    return (
        <div>
            <h1>Appwrite Connection Test</h1>
            <button onClick={checkSession}>Check Session</button>
        </div>
    );
}
