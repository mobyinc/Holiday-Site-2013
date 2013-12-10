HolidaySite::Application.routes.draw do  
  root 'tree#index'

  get '/:code' => 'tree#index'
end
