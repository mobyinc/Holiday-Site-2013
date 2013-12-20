HolidaySite::Application.routes.draw do  
  root 'tree#index'

  get '/create' => 'tree#show_create'
  get '/:code' => 'tree#index'
  get '/ornament/:id' => 'tree#show', as: 'ornament'
  get '/ornament/:id/detail' => 'tree#show_detail'
end
