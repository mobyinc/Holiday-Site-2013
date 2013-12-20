HolidaySite::Application.routes.draw do  
  root 'tree#index'

  get '/:code' => 'tree#index'
  get '/ornament/:id' => 'tree#show'

end
