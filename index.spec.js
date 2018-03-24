const assert = require('chai').assert;

const webdriverio = require('webdriverio');
const options = { desiredCapabilities: { browserName: 'chrome' } };


describe('index test', () => {
  let client;

  before(() => {
    client = webdriverio.remote(options);
    return client.init();
  });

  it('should show the correct title with done', (done) => {
    client.url('https://duckduckgo.com/')
                          .setValue('#search_form_input_homepage', 'WebdriverIO')
                          .click('#search_button_homepage')
                          .getTitle().then((title) => {
        assert.equal(title, 'WebdriverIO at DuckDuckGo');
        done();
      });
  }).timeout(5000);

  it('should show the correct title with async/await', async () => {
    const title = await client.url('https://duckduckgo.com/')
      .setValue('#search_form_input_homepage', 'WebdriverIO')
      .click('#search_button_homepage')
      .getTitle();
    assert.equal(title, 'WebdriverIO at DuckDuckGo');
  }).timeout(5000);

  after(() => {
    client.end();
  });
})