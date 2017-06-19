import { ExpenseManagemanetSystemPage } from './app.po';

describe('expense-managemanet-system App', () => {
  let page: ExpenseManagemanetSystemPage;

  beforeEach(() => {
    page = new ExpenseManagemanetSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
