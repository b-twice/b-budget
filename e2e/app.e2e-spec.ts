import { BgeoBudgetWebPage } from './app.po';

describe('bgeo-budget-web App', function() {
  let page: BgeoBudgetWebPage;

  beforeEach(() => {
    page = new BgeoBudgetWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
