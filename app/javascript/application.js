// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
//= require bootstrap

import "@hotwired/turbo-rails"
import "controllers"
import "jquery"

// import "./src/jquery"
// import "jquery-ui"

import Rails from "@rails/ujs"
Rails.start()