class User < ActiveRecord::Base
  LOGIN_LEN    = 3
  PASSWORD_LEN = 8
  
  
  belongs_to  :location
  has_many    :lots, :order => 'created_at DESC'
  has_many    :bids
  has_many    :clients
  has_many    :dialogs
  
  has_many  :registrations
  has_many  :gameevents

  has_many    :user_interests
  has_many    :interests, :through => :user_interests
  
  validates_presence_of     :nick, :login, :password, :email, :description
  validates_uniqueness_of   :login
  validates_confirmation_of :password
  
  attr_accessor :password_confirmation
  attr_accessor :interest_products_ids
  
  
  def title
    return self.nick
  end
  
  def interest_products_ids
    return self.interests.map{ |i| i.id}.join(',')
  end
  
  def interest_products_ids=(value)
    self.interests = []
    self.interests = value.split(',').map { |i| Product.find_by_id(i)} 
  end
  
  def online?
    return if self.online.blank? 
    return self.online >= 1.minute.ago
  end
  
  def self.count_online_users
    User.count(:all, :conditions => [ 'online >= ?', 1.minute.ago])
  end
  
  def self.generate_new_user
    user = User.create(
      :login        => "new_user_" + new_login(LOGIN_LEN) , :password => new_login(PASSWORD_LEN),
      :nick         => "_New Nickname",
      :email        => "e@mail",
      :description  => "Description",
      :online       => Time.now,
      :location     => Location.root
    )
    return user
  end  
private
  def self.new_login(length)
     chars = ("a".."z").to_a + ("A".."Z").to_a + ("0".."9").to_a
     login = ""
     1.upto(length) { |i| login << chars[rand(chars.size-1)] }
     return login
  end
end
