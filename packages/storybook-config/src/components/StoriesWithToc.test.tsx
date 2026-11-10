import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import {
  setParentHash,
  StoriesWithToc,
  StoryToc,
  useHashNavigation,
} from './StoriesWithToc';

vi.mock('@storybook/addon-docs/blocks', () => ({
  Description: () => <p>Story description</p>,
  Story: () => <div>Embedded reference</div>,
}));

vi.mock('./ComponentCanvas', () => ({
  ComponentCanvas: () => <div>Interactive example</div>,
}));

const stories = [
  { id: 'first_story', name: 'First story', moduleExport: {} },
  { id: 'second_story', name: 'Second story', moduleExport: {} },
];

describe('story navigation', () => {
  afterEach(() => {
    window.location.hash = '';
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('scrolls to a story and updates the parent tab hash from the TOC', () => {
    const target = document.createElement('div');
    target.id = 'first_story';
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    render(<StoryToc stories={stories} hashPrefix="examples" />);
    fireEvent.click(screen.getByRole('link', { name: 'First story' }));

    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    });
    expect(window.location.hash).toBe('#examples_first_story');
    target.remove();
  });

  it('uses an unprefixed hash when no tab prefix is supplied', () => {
    render(<StoryToc stories={stories} />);
    fireEvent.click(screen.getByRole('link', { name: 'Second story' }));

    expect(window.location.hash).toBe('#second_story');
  });

  it('sends hash updates by message when the parent is cross-origin', () => {
    const postMessage = vi.fn();
    const parent = new Proxy(window, {
      get(target, property) {
        if (property === 'location') throw new Error('Cross-origin access');
        if (property === 'postMessage') return postMessage;
        const value: unknown = Reflect.get(target, property);
        return value;
      },
    });
    vi.spyOn(window, 'parent', 'get').mockReturnValue(parent);

    setParentHash('recipes_example');

    expect(postMessage).toHaveBeenCalledWith(
      { type: 'UPDATE_HASH', hash: 'recipes_example' },
      '*',
    );
  });

  it('restores initial story navigation and stops handling messages on unmount', () => {
    vi.useFakeTimers();
    window.location.hash = '#examples_first_story';
    const target = document.createElement('div');
    target.id = 'first_story';
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);
    const onNavigate = vi.fn();
    const { unmount } = renderHook(() => useHashNavigation(onNavigate));

    expect(onNavigate).toHaveBeenCalledWith('examples_first_story');
    vi.advanceTimersByTime(200);
    expect(target.scrollIntoView).toHaveBeenCalledOnce();

    fireEvent(window, new MessageEvent('message', { data: { type: 'OTHER' } }));
    expect(onNavigate).toHaveBeenCalledTimes(1);

    fireEvent(
      window,
      new MessageEvent('message', {
        data: { type: 'UPDATE_HASH', hash: 'api' },
      }),
    );
    expect(onNavigate).toHaveBeenLastCalledWith('api');

    unmount();
    fireEvent(
      window,
      new MessageEvent('message', {
        data: { type: 'UPDATE_HASH', hash: 'examples_first_story' },
      }),
    );
    expect(onNavigate).toHaveBeenCalledTimes(2);
    target.remove();
  });

  it('waits for navigation messages when the initial parent hash is inaccessible', () => {
    const parent = new Proxy(window, {
      get(target, property) {
        if (property === 'location') throw new Error('Cross-origin access');
        const value: unknown = Reflect.get(target, property);
        return value;
      },
    });
    vi.spyOn(window, 'parent', 'get').mockReturnValue(parent);
    const onNavigate = vi.fn();
    renderHook(() => useHashNavigation(onNavigate));

    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('omits a redundant TOC for a single story', () => {
    render(<StoriesWithToc stories={stories.slice(0, 1)} />);

    expect(screen.getByText('Interactive example')).toBeVisible();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
