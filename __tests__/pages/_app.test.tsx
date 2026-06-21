import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MyApp from '../../pages/_app'
import type { AppProps } from 'next/app'

// Mock the global CSS import
jest.mock('../../styles/globals.css', () => ({}))

describe('MyApp', () => {
  const MockComponent = () => <div data-testid="mock-component">Mock Page</div>

  const defaultProps: AppProps = {
    Component: MockComponent,
    pageProps: {},
    router: {} as AppProps['router'],
  }

  it('renders the provided Component', () => {
    render(<MyApp {...defaultProps} />)
    expect(screen.getByTestId('mock-component')).toBeInTheDocument()
    expect(screen.getByText('Mock Page')).toBeInTheDocument()
  })

  it('passes pageProps to the Component', () => {
    const ComponentWithProps = ({ title }: { title: string }) => (
      <h1 data-testid="prop-component">{title}</h1>
    )

    const props: AppProps = {
      ...defaultProps,
      Component: ComponentWithProps as unknown as AppProps['Component'],
      pageProps: { title: 'Test Title' },
    }

    render(<MyApp {...props} />)
    expect(screen.getByTestId('prop-component')).toHaveTextContent('Test Title')
  })

  it('renders different components when swapped', () => {
    const FirstComponent = () => <p>First</p>
    const SecondComponent = () => <p>Second</p>

    const { rerender } = render(
      <MyApp
        {...defaultProps}
        Component={FirstComponent as unknown as AppProps['Component']}
      />
    )
    expect(screen.getByText('First')).toBeInTheDocument()

    rerender(
      <MyApp
        {...defaultProps}
        Component={SecondComponent as unknown as AppProps['Component']}
      />
    )
    expect(screen.getByText('Second')).toBeInTheDocument()
  })
})
