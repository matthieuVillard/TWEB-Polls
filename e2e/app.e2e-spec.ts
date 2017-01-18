import { PollsPage } from './app.po';

describe('polls App', function() {
  let page: PollsPage;

  beforeEach(() => {
    page = new PollsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
