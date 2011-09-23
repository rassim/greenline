class Game < ActiveRecord::Base

   has_many    :registrations, :order => 'created_at DESC'
   has_many    :gameevents

end
