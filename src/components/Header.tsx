import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function Header () {
    const { cart } = useContext(CartContext);
    const [fetchedData, setFetchedData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    async function fetchProducts() {
        try {
            const response = await fetch('api/products')
            const data = await response.json()
            setFetchedData(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <header>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
            <div>
                {cart.map((product) => {
                    return (
                        <div key={product.id}>
                            <p>{product.title}</p>
                        </div>
                    )
                })}
                <Image 
                    src={fetchedData[0].thumbnailImage}
                    alt="thumbnail image"
                />
            </div>
                
            )}
        </header>
    );
}