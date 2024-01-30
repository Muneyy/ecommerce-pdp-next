import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Home from '../app/page'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import { ProductType } from '@/types/product';
import { makeServer } from '@/mirage/mirage';
import { serverHooks } from 'next/dist/server/app-render/entry-base';
import CartProvider, { CartContext } from '@/context/CartContext';

function TestComponent () {

    const [fetchedData, setFetchedData] = useState<ProductType[]>();
    const [isLoading, setIsLoading] = useState(true);
    const { test } = useContext(CartContext);

    useEffect(() => {
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

        fetchProducts()
    }, [])

    if (isLoading) return (<p>TestComponent is loading...</p>)

    return (
        <div>
            <h1>Loading finished</h1>
            {fetchedData && 
            <div>
                <p>{fetchedData[0].company}</p>
                <p>{test}</p>
                <Image 
                src={fetchedData[0].thumbnailImage} 
                alt="thumbnail image"
                />
            </div>
            }
        </div>
    )
}

describe('Test', () => {
    let mirageServer: any;
    beforeEach(() => {
        mirageServer = makeServer()
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        )
    })

    afterEach(() => {
        mirageServer.shutdown()
    })


    it('fetches from API', async () => {
        await waitFor(() => {
            expect(screen.getByText('Loading finished')).toBeInTheDocument()
        })

        expect(screen.getByText("Sneaker Company")).toBeInTheDocument()
        expect(screen.getByText("test")).toBeInTheDocument()
    })

    it('images are correctly imported in mirage', async () => {
        // Wait for the images to be loaded
        await waitFor(() => {
            expect(screen.getByAltText('thumbnail image')).toBeInTheDocument()
            const imgElement = screen.getByAltText('thumbnail image') as HTMLImageElement;
            return imgElement && imgElement.complete;
        });

        // Check if the images are present in the document
        const image = screen.getByAltText('thumbnail image') as HTMLImageElement;
        expect(image.srcset).toContain('/_next/image?url')
    })

})