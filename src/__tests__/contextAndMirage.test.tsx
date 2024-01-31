import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import { ProductType } from '@/types/product';
import { makeServer } from '@/mirage/mirage';
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

    if (isLoading) return (<p data-testid="loading">TestComponent is loading...</p>)

    return (
        <div>
            <h1 data-testid="loading-finished">Loading finished</h1>
            <div>
                <p data-testid='company-name'>{fetchedData[0].company}</p>
                <button onClick={handleIncrement} data-testid="increment-button">+</button>
                <button onClick={handleDecrement} data-testid="decrement-button">-</button>
                <button onClick={handleAddToCart} data-testid="add-to-cart-button">Add to cart</button>
                <button onClick={handleDeleteFromCart} data-testid="delete-from-cart-button">Delete from cart</button>
                <Image 
                src={fetchedData[0].thumbnailImage.link} 
                alt="thumbnail image"
                />
                <p data-testid="quantity-holder">{quantity}</p>
            </div>
            {
                cart.length > 0 && (
                <div className='cart' data-testid='cart-view'>
                    <h2>Cart</h2>
                    <p data-testid='cart-product-id'>{cart[0].id}</p>
                    <p data-testid='cart-product-title'>{cart[0].title}</p>
                    <p data-testid='cart-product-quantity'>{cart[0].quantity}</p>
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
            expect(screen.getByTestId('loading-finished')).toBeInTheDocument()
        })

        // expect(screen.getByTestId("company-name").textContent).toEqual('Sneaker Company')
        expect(screen.getByTestId("company-name").textContent).toEqual('Sneaker ComPNIAFD')
    })

    it('images are correctly imported in mirage', async () => {
        // Wait for the images to be loaded
        await waitFor(() => {
            expect(screen.getByTestId('loading-finished')).toBeInTheDocument()
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
            expect(screen.getByTestId('loading-finished')).toBeInTheDocument();
        });

        const incrementButton = screen.getByTestId('increment-button');
        const decrementButton = screen.getByTestId('decrement-button');
        const quantityHolder = screen.getByTestId('quantity-holder');

        expect(quantityHolder).toBeInTheDocument();
        expect(quantityHolder.textContent).toBe('0');

        fireEvent.click(incrementButton);
        expect(quantityHolder.textContent).toBe('1');

        fireEvent.click(incrementButton);
        expect(quantityHolder.textContent).toBe('2');

        fireEvent.click(incrementButton);
        expect(quantityHolder.textContent).toBe('3');

        fireEvent.click(decrementButton);
        expect(quantityHolder.textContent).toBe('2');

        fireEvent.click(decrementButton);
        expect(quantityHolder.textContent).toBe('1');

        fireEvent.click(decrementButton);
        expect(quantityHolder.textContent).toBe('0');

        fireEvent.click(decrementButton);
        expect(quantityHolder.textContent).toBe('0');
    });


    it('adds/deletes to/from cart', async () => {
        await waitFor(() => {
            expect(screen.getByTestId('loading-finished')).toBeInTheDocument();
        })

        const incrementButton = screen.getByTestId('increment-button');
        const decrementButton = screen.getByTestId('decrement-button');
        const addToCartButton = screen.getByTestId('add-to-cart-button');
        const deleteFromCartButton = screen.getByTestId('delete-from-cart-button');

        fireEvent.click(incrementButton)
        fireEvent.click(addToCartButton)
        expect(screen.getByTestId('cart-view')).toBeInTheDocument()
        expect(screen.getByTestId('cart-product-id').textContent).toEqual('1') 
        expect(screen.getByTestId('cart-product-quantity').textContent).toEqual('1') 

        fireEvent.click(incrementButton)
        fireEvent.click(addToCartButton)
        expect(screen.getByTestId('cart-product-quantity').textContent).toEqual('3') 

        fireEvent.click(deleteFromCartButton)
        expect(screen.queryByTestId('cart-view')).toBeNull()

        fireEvent.click(addToCartButton)
        expect(screen.getByTestId('cart-product-id').textContent).toEqual('1') 
        expect(screen.getByTestId('cart-product-quantity').textContent).toEqual('2') 
    })

    it('does not add to cart when quantity is 0', async () => {
        await waitFor(() => {
            expect(screen.getByTestId('loading-finished')).toBeInTheDocument();
        })

        const incrementButton = screen.getByTestId('increment-button');
        const decrementButton = screen.getByTestId('decrement-button');
        const addToCartButton = screen.getByTestId('add-to-cart-button');
        const deleteFromCartButton = screen.getByTestId('delete-from-cart-button');

        fireEvent.click(incrementButton)
        fireEvent.click(addToCartButton)

        expect(screen.getByTestId('cart-view')).toBeInTheDocument()
        expect(screen.getByTestId('cart-product-id').textContent).toEqual('1') 
        expect(screen.getByTestId('cart-product-quantity').textContent).toEqual('1') 

        fireEvent.click(deleteFromCartButton)

        expect(screen.queryByTestId('cart-view')).toBeNull()

        fireEvent.click(decrementButton)
        fireEvent.click(addToCartButton)

        expect(screen.queryByTestId('cart-view')).toBeNull()
    })

})