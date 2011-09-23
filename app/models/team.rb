class Team < ActiveRecord::Base

   has_many    :registrations, :order => 'created_at DESC'
end
