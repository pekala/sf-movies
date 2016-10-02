import { configure } from '@kadira/storybook';
import '../src/index.css';

function loadStories() {
  require('../src/components/Question/stories');
  require('../src/components/Hint/stories');
  require('../src/components/Result/stories');
}

configure(loadStories, module);
