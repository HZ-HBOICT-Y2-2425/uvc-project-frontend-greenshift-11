import { render, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte'; // Ensure correct path

describe('Page component', () => {
  it('renders correctly', () => {
    const { getByText } = render(Page);
    expect(getByText('Some Text')).toBeInTheDocument(); // Adjust as per your component's text
  });
});