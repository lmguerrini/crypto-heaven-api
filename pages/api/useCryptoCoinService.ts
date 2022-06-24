import { useEffect, useState } from "react";
import { Service } from "../../types/service";
import { CryptoCoin } from "../../types/cryptoCoin";

export interface CryptoCoins {
    data: CryptoCoin[];
}

// get data on mount
const useCryptoCoinService = () => {
    const [result, setResult] = useState<Service<CryptoCoins>>({
        status: "loading",
    });

    useEffect(() => {
        fetch("https://api.coincap.io/v2/assets?limit=7")
            .then((response) => response.json())
            .then((response) =>
                setResult({ status: "loaded", payload: response })
            )
            .catch((error) => setResult({ status: "error", error }));
    }, []);
    return result;
};

export default useCryptoCoinService;
