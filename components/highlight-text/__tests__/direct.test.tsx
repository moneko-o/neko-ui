import { render } from '@solidjs/testing-library';

import HighlightText from '../index';

describe('HighlightText (direct render)', () => {
  it('highlight as array with flag creates new CSS highlight', () => {
    render(() => (
      <HighlightText
        text="Hello World Test"
        highlight={[{ highlight: 'World', flag: 'g' }, 'Test']}
        flag="i"
      />
    ));
  });

  it('extra prop highlights suffix text with new Highlight', () => {
    render(() => <HighlightText text="Hello" extra=" World" highlight="Hello" />);
  });

  it('highlight as string creates highlight', () => {
    render(() => <HighlightText text="foo bar baz" highlight="bar" highlightColor="#ff0000" />);
  });
});
