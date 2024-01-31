import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Home from '../app/page'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import { ProductType } from '@/types/product';
import { makeServer } from '@/mirage/mirage';
import { serverHooks } from 'next/dist/server/app-render/entry-base';
import CartProvider, { CartContext } from '@/context/CartContext';

function TestComponent () {

    const [fetchedData, setFetchedData] = useState<ProductType[] | []>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const { cart, addToCart, deleteFromCart } = useContext(CartContext);

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

    async function handleIncrement () {
        setQuantity((prevQuantity) => prevQuantity + 1);
    }

    async function handleDecrement () {
        setQuantity((prevQuantity) => prevQuantity > 0 ? prevQuantity - 1 : 0)
    }

    async function handleAddToCart () {
        const product = fetchedData[0];
        if (quantity <= 0) return;
        
        addToCart({...product, quantity: quantity});
    }

    async function handleDeleteFromCart () {
        const product = fetchedData[0];
        deleteFromCart(product.id);
    }

    if (isLoading) return (<p>TestComponent is loading...</p>)

    return (
        <div>
            <h1>Loading finished</h1>
            <div>
                <p>{fetchedData[0].company}</p>
                <button onClick={handleIncrement}>+</button>
                <button onClick={handleDecrement}>-</button>
                <button onClick={handleAddToCart}>Add to cart</button>
                <button onClick={handleDeleteFromCart}>Delete from cart</button>
                <Image 
                src={fetchedData[0].thumbnailImage} 
                alt="thumbnail image"
                />
                <p id="quantity-holder">{quantity}</p>
            </div>
            {
                cart.length > 0 && (
                <div className='cart'>
                    <h2>Cart</h2>
                    <p id='cart-id'>Product ID is {cart[0].id}</p>
                    <p id='cart-quantity' role="show-quantity">Quantity is {cart[0].quantity}</p>
                </div>
                )
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

    it('quantity is incremented/decremented', async () => {
        await waitFor(() => {
            expect(screen.getByText('Loading finished')).toBeInTheDocument()
        })

        const incrementButton = screen.getByText('+');
        const decrementButton = screen.getByText('-');
        const quantityHolder = screen.getByText('0');

        expect(quantityHolder).toBeInTheDocument();
        expect(quantityHolder.textContent).toBe('0');

        fireEvent.click(incrementButton)
        expect(quantityHolder.textContent).toBe('1');

        fireEvent.click(incrementButton)
        expect(quantityHolder.textContent).toBe('2');

        fireEvent.click(decrementButton)
        expect(quantityHolder.textContent).toBe('1');

        fireEvent.click(decrementButton)
        expect(quantityHolder.textContent).toBe('0');

        fireEvent.click(decrementButton)
        expect(quantityHolder.textContent).toBe('0');
    })

    it('adds/deletes to/from cart', async () => {
        await waitFor(() => {
            expect(screen.getByText('Loading finished')).toBeInTheDocument()
        })

        const addToCartButton = screen.getByText('Add to cart');
        const incrementButton = screen.getByText('+');
        fireEvent.click(incrementButton)
        fireEvent.click(addToCartButton)

        expect(screen.getByText('Cart')).toBeInTheDocument()
        expect(screen.getByText('Product ID is 1')).toBeInTheDocument()
        expect(screen.getByText('Quantity is 1')).toBeInTheDocument()

        fireEvent.click(incrementButton)
        fireEvent.click(addToCartButton)
        expect(screen.getByText('Quantity is 3')).toBeInTheDocument()

        const deleteFromCartButton = screen.getByText('Delete from cart');
        fireEvent.click(deleteFromCartButton)

        expect(screen.queryByRole('show-quantity')).toBeNull()

        fireEvent.click(addToCartButton)
        expect(screen.getByText('Product ID is 1')).toBeInTheDocument()
        expect(screen.getByText('Quantity is 2')).toBeInTheDocument()
    })

    it('does not add to cart when quantity is 0', async () => {
        await waitFor(() => {
            expect(screen.getByText('Loading finished')).toBeInTheDocument()
        })

        const addToCartButton = screen.getByText('Add to cart');
        const incrementButton = screen.getByText('+');
        fireEvent.click(incrementButton)
        fireEvent.click(addToCartButton)

        expect(screen.getByText('Cart')).toBeInTheDocument()
        expect(screen.getByText('Product ID is 1')).toBeInTheDocument()
        expect(screen.getByText('Quantity is 1')).toBeInTheDocument()

        const deleteFromCartButton = screen.getByText('Delete from cart');
        fireEvent.click(deleteFromCartButton)

        expect(screen.queryByRole('show-quantity')).toBeNull()

        const decrementButton = screen.getByText('-');
        fireEvent.click(decrementButton)
        fireEvent.click(addToCartButton)

        expect(screen.queryByRole('show-quantity')).toBeNull()
    })

})