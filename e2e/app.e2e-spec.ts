import { AngularJSAppPage } from './app.po';

describe('angular-jsapp App', function() {
  let page: AngularJSAppPage;

  beforeEach(() => {
    page = new AngularJSAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
