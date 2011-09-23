class HomeController < ApplicationController
  layout 'site'
  
  before_filter :home_init, :site_protect
  
  def index
    @greeting      = Article.find_by_alias('greeting')
    @users         = User.find(:all)
    @teams = Team.find(:all)
    @games = Game.find(:all)
  end
private
  def home_init
    @section = "main"
  end
end
