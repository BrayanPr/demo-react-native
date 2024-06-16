export type AuthData = {
    token: string;
    email: string;
    name: string;
};

const authService = async (username: string, password: string): Promise<object | undefined> => {

    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
                expiresInMins: 1, // optional, defaults to 60
            })
        })

        if (!response.ok) {
            throw Error('Error in login. Try again')
        }
        return response.json()

    } catch (error) {
        return undefined
    }

}

export default authService