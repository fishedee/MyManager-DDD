import { useState, useCallback } from 'react';

export default function useUserModel() {
    const [user, setUser] = useState(0);

    return {
        user,
        setUser,
    };
}
