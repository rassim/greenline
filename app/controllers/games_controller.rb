class GamesController < ApplicationController
    layout 'site'

  before_filter :site_protect
  before_filter :init, :only => [ :new, :create ]

  def auto_complete_for_lot_location_title
    locations = Location.find(:all, :conditions => ['LOWER(title) LIKE ?', "#{params[:lot][:location_title].tagify}%"]).select { |l| l.children.blank? }
    render :partial => 'shared/auto_complete', :locals => { :variants => locations}
  end

  def auto_complete_for_lot_product_title
    products = Product.find(:all, :conditions => [ 'LOWER(title) LIKE ?', "#{params[:lot][:product_title].tagify}%"]).select { |l| l.children.blank? }
    render :partial => 'shared/auto_complete', :locals => { :variants => products}
  end

  def new

  end


 
  def lotrast1
    @info = params[:par]
  end



  def create
    game_info           = params[:lot]
    @game = Game.create(game_info)
    if @game.valid? then
      redirect_to :controller => 'games', :action => 'games'
      return
    else
      render :action => 'new'
      return
    end
  end


  def edit
    @selectedgame = Game.find( params[:id])
  end

  
  def balance
    @game = Game.find( params[:id])
    @users = User.find(:all)

     for user in @users
       xgoal = Gameevent.count(:all, :conditions => {:user_id => user.id, :event_id => 1})
       user.update_attribute(:totgoal, xgoal)
       xassi = Gameevent.count(:all, :conditions => {:user_id => user.id, :event_id => 2})
       user.update_attribute(:totassi, xassi)
       xga = xgoal+xassi
       user.update_attribute(:totga, xga)
     end
    @gevents = Gameevent.find(:all)
  end

  def cancel_reg
    gameid = params[:id]
    regid = params[:rid]
    @reg = Registration.find(regid)
    @reg.destroy
    
    redirect_to :controller => 'games', :action => 'registration', :id => gameid
  end


  def change_team
    userid = params[:uid]
    gameid = params[:id]
    @reg = Registration.first(:all, :conditions => {:game_id => gameid, :user_id => userid});

    xteam = @reg.team_id
    #xteam = 1
    if(xteam == 1) 
      yteam = 2
    else
      yteam = 1
    end

    @reg.update_attribute(:team_id, yteam)
    
    redirect_to :controller => 'games', :action => 'registration', :id => gameid
  end

  def registration
    @game = Game.find( params[:id])
    @xmessage = params[:mess]
    
    #@registr = Registration.find(:all, :conditions => {:game_id => @game.id});
    @registr1 = Registration.find(:all, :conditions => {:game_id => @game.id, :team_id => 1});
    @registr2 = Registration.find(:all, :conditions => {:game_id => @game.id, :team_id => 2});
  end


  def addevents
    @game = Game.find( params[:id])
    @xmessage = params[:mess]

    @gevents = Gameevent.find(:all, :conditions => {:game_id => @game.id})
    
  end


  def registerplayer
    xgame_id = params[:gameid]
    xuser_id = session[:user_id]
    
    xreg = Registration.find(:all, :conditions => {:game_id => xgame_id, :user_id => xuser_id})

    unless xreg.blank?
      redirect_to :controller => 'games', :action => 'registration', :id => xgame_id
      session[:msg] = 'Registration record already exists !?!'
    else
      @reg = Registration.create(:game_id => xgame_id, :user_id=>xuser_id, :team_id=>1)
      redirect_to :controller => 'games', :action => 'registration', :id => xgame_id
      session[:msg] = 'You have been registered for the game !!!'
    end

  end


  def games
    @games = Game.find(:all)
  end

  def stats
    @games = Game.find(:all)
    @users = User.find(:all)
     for user in @users
       xgoal = Gameevent.count(:all, :conditions => {:user_id => user.id, :event_id => 1})
       user.update_attribute(:totgoal, xgoal)
       xassi = Gameevent.count(:all, :conditions => {:user_id => user.id, :event_id => 2})
       user.update_attribute(:totassi, xassi)
       
       xgames = Registration.count(:all, :conditions => {:user_id => user.id})
       user.update_attribute(:totgame, xgames)

       xga = xgoal+xassi
       user.update_attribute(:totga, xga)
     end
    @gevents = Gameevent.find(:all)
  end

  def viewteams
    @teams = Team.find(:all)
  end

  def viewusers
    @users = User.find(:all)
  end

 def viewgames
    @games = Game.find(:all)
  end

  def update
    game_info = params[:lot]
    game = Game.find(params[:id])

    game.update_attribute(:info, game_info[:info])
    game.update_attribute(:final_score1, game_info[:final_score1])
    game.update_attribute(:final_score2, game_info[:final_score2])
    game.update_attribute(:half_score1, game_info[:half_score1])
    game.update_attribute(:half_score2, game_info[:half_score2])

    game.update_attribute(:done, game_info[:done])

    
    @games = Game.find(:all)
  end


  def restore
    old_lot = Lot.find_by_id(params[:id])
    @lot = Lot.new(
      :product_id  => old_lot.product_id, :product_title   => old_lot.product.title,
      :user_id     => old_lot.user_id,
      :location_id => old_lot.location_id, :location_title  => old_lot.location.title,
      :metrics_id  => old_lot.metrics_id, :count => old_lot.count, :price => old_lot.prices.last.value,
      :description => old_lot.description,
      :allow_parts => old_lot.allow_parts,
      :client_id     => old_lot.client_id
    )

    render :action => 'new'
  end

private
  def init
  end
end
