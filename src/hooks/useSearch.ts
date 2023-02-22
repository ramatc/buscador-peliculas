import { useEffect, useState, useRef } from 'react';

export function useSearch () {
    const [search, setSearch] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const isFirstInput = useRef(true);

    useEffect(() => {
        if(isFirstInput.current){
            isFirstInput.current = search === '';
            return;
        }

        if(search === '') {
            setError('No se puede buscar una película vacía');
            return;
        }

        if(search.length < 2) {
            setError('No se puede buscar una película con menos de 2 caracteres');
            return;
        }

        setError(null);
    }, [search]);

    return { search, setSearch, error }
}