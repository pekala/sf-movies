import { configure } from '@kadira/storybook';
import '../src/index.css';

function loadStories() {
  require('../src/stories');
  require('../src/components/Question/stories');
  require('../src/components/Hint/stories');
}

configure(loadStories, module);
