require 'pry'
def generate_random
  return ([*('A'..'Z'),*('0'..'9')]-%w(0 1 I O)).sample(8).join
end
When(/^I fill all sign up fields with random value and (same|different) password$/) do |action|
  nick = generate_random
  email = "#{generate_random}@1934.com"
  pwd = generate_random
  $driver.find_element(:name, 'nick').send_keys(nick)
  $driver.find_element(:name, 'email').send_keys(email)
  action == 'same' ? pwd2 = pwd : pwd2 = generate_random
  $driver.find_element(:name, 'password').send_keys(pwd)
  $driver.find_element(:name, 'pwd-confirm').send_keys(pwd2)
end

Then(/^I should be redirected to login page$/) do
  expect($driver.find_element(:css, '.panel_full').displayed?).to be_truthy
end

When(/^I just fill username in sign up form$/) do
  nick = generate_random
  $driver.find_element(:name, 'nick').send_keys(nick)
end

Then(/^I should remain in sign up page$/) do
  expect($driver.find_element(:css, '.reg-form').displayed?).to be_truthy
end