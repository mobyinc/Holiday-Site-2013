HolidaySite::Application.routes.draw do  
  root 'tree#index'

  get '/create' => 'tree#show_create'
  get '/:code' => 'tree#index'
  get '/ornaments/:id' => 'tree#show', as: 'ornament'
  get '/ornaments/:id/detail' => 'tree#show_detail'
  get '/ornaments/:id/thanks_detail' => 'tree#show_thanks_detail'

  resources :ornaments, only: [:create]
end
