import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Home from './page'

describe('Test', () => {
    // it('renders from context', () => {
    //     render(<Home />)
    //     expect(screen.getByText('Fall Limited Edition Sneakers')).toBeInTheDocument()
    // })

    it('fetches from API', async () => {
        async function fetchProducts() {
            try {
                const response = await fetch('api/products')
                const data = await response.json()
                return data
            } catch (error) {
                console.log(error)
            }
        }
        const data =  await fetchProducts()
        expect(data[0].title).toEqual("Fall Limited Edition Sneakers")
    })

    it('images are imported in mirage', async () => {
        render(<Home />)
        
        // Wait for the images to be loaded
        await waitFor(() => {
            const imgElement = screen.getByAltText('thumbnail image') as HTMLImageElement;
            return imgElement && imgElement.complete;
        });

        // Check if the images are present in the document
        const image = screen.getByAltText('thumbnail image') as HTMLImageElement;
        expect(image.srcset).toContain('next/image?url')
    })

})