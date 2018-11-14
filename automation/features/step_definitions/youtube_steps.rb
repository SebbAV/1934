require 'selenium-webdriver'
driver = Selenium::WebDriver.for :chrome
When(/^I enter the youtube url$/) do
  driver.navigate.to "https://youtube.com"
end