class Gameevent < ActiveRecord::Base
  
  belongs_to  :user
  belongs_to  :game
 
  belongs_to  :event

end
