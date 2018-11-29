require 'selenium-webdriver'
require 'pry'
$driver = Selenium::WebDriver.for :chrome
When(/^I enter the localhost url$/) do
  $driver.navigate.to "http://localhost:8000"
end
And(/^I click "([^"]*)" button$/) do |btn|
  button = btn.downcase.gsub(/\s/, '_')
  case button
  when 'login'
    $driver.find_element(:css, '.btn_N').click
  when 'register'
    $driver.find_element(:css, '.register').click
  when 'sign_up'
    $driver.find_element(:css, '.btn_N').click
  end
end
And(/^I wait for "([^"]*)" seconds$/) do |seconds|
  sleep seconds.to_i
end