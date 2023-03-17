Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "pune#index"
  get "settings" => "settings#index"
  post "settings/save" => "settings#save"
  post "settings/fetch" => "settings#fetch"

end
