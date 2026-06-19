import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../../pages/index'

// Mock next/image since it requires configuration in test env
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock next/head
jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('Home Page', () => {
  it('renders the welcome heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Welcome to')
    expect(heading).toHaveTextContent('Next.js!')
  })

  it('renders the Next.js link in the heading', () => {
    render(<Home />)
    const nextjsLink = screen.getByRole('link', { name: /Next\.js!/i })
    expect(nextjsLink).toHaveAttribute('href', 'https://nextjs.org')
  })

  it('renders the description text', () => {
    render(<Home />)
    const description = screen.getByText(/Get started by editing/i)
    expect(description).toBeInTheDocument()
  })

  it('renders the code reference to pages/index.tsx', () => {
    render(<Home />)
    const codeElement = screen.getByText('pages/index.tsx')
    expect(codeElement).toBeInTheDocument()
    expect(codeElement.tagName).toBe('CODE')
  })

  it('renders the Documentation card', () => {
    render(<Home />)
    const docLink = screen.getByRole('link', { name: /Documentation/i })
    expect(docLink).toBeInTheDocument()
    expect(docLink).toHaveAttribute('href', 'https://nextjs.org/docs')
    expect(docLink).toHaveTextContent(
      'Find in-depth information about Next.js features and API.'
    )
  })

  it('renders the Learn card', () => {
    render(<Home />)
    const learnLink = screen.getByRole('link', { name: /Learn/i })
    expect(learnLink).toBeInTheDocument()
    expect(learnLink).toHaveAttribute('href', 'https://nextjs.org/learn')
    expect(learnLink).toHaveTextContent(
      'Learn about Next.js in an interactive course with quizzes!'
    )
  })

  it('renders the Examples card', () => {
    render(<Home />)
    const examplesLink = screen.getByRole('link', { name: /Examples/i })
    expect(examplesLink).toBeInTheDocument()
    expect(examplesLink).toHaveAttribute(
      'href',
      'https://github.com/vercel/next.js/tree/canary/examples'
    )
    expect(examplesLink).toHaveTextContent(
      'Discover and deploy boilerplate example Next.js projects.'
    )
  })

  it('renders the Deploy card', () => {
    render(<Home />)
    const deployLink = screen.getByRole('link', {
      name: /Deploy .*Instantly deploy/i,
    })
    expect(deployLink).toBeInTheDocument()
    expect(deployLink).toHaveAttribute(
      'href',
      expect.stringContaining('vercel.com/new')
    )
    expect(deployLink).toHaveTextContent(
      'Instantly deploy your Next.js site to a public URL with Vercel.'
    )
  })

  it('renders the footer with Vercel branding', () => {
    render(<Home />)
    const footerLink = screen.getByRole('link', { name: /Powered by/i })
    expect(footerLink).toBeInTheDocument()
    expect(footerLink).toHaveAttribute(
      'href',
      expect.stringContaining('vercel.com')
    )
    expect(footerLink).toHaveAttribute('target', '_blank')
    expect(footerLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders the Vercel logo image in footer', () => {
    render(<Home />)
    const logo = screen.getByAltText('Vercel Logo')
    expect(logo).toBeInTheDocument()
  })

  it('renders all four navigation cards', () => {
    render(<Home />)
    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings).toHaveLength(4)
  })
})
