require 'pry'
When(/^I enter "([^"]*)" as email and "([^"]*)" as password$/) do |user, pwd|
  $driver.find_element(:name, 'email').send_keys(user)
  $driver.find_element(:name, 'password').send_keys(pwd)
end


Then(/^I should be redirected to game page and see 4 doors$/) do
  expect($driver.find_element(:id, 'door_up').displayed?).to be_truthy
  expect($driver.find_element(:id, 'door_right').displayed?).to be_truthy
  expect($driver.find_element(:id, 'door_left').displayed?).to be_truthy
  expect($driver.find_element(:id, 'door_down').displayed?).to be_truthy
end

Then(/^I should stay in login page$/) do
 expect($driver.find_element(:css, '.log-form').displayed?).to be_truthy
end