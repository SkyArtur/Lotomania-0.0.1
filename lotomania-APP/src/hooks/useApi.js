import { useEffect, useState } from "react";

export function useApi(fetcher, deps) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        setLoading(true);

        fetcher()
            .then((result) => { if (active) return setData(result); })
            .catch(() => { if (active) return setData(null); })
            .finally(() => { if (active) setLoading(false); })

        return () => { active = false; };
    }, deps);

    return { data, loading };

}
