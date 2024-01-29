import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Test', () => {
    it('renders from context', () => {
        render(<Home />)
        expect(screen.getByText('Example Product')).toBeInTheDocument()
    })
})