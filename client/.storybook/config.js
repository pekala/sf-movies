import { configure } from '@kadira/storybook';
import '../src/index.css';

function loadStories() {
  require('../src/components/Question/stories');
  require('../src/components/Result/stories');
  require('../src/components/QuestionIntro/stories');
  require('../src/components/Summary/stories');
}

configure(loadStories, module);
