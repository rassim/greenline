class AuthController < ApplicationController
  before_filter :site_protect
  
  
  def register
    render :layout => 'site'
  end
  
  def create_user
    params[:user][:enabled] = true
    @user = User.create(params[:user])
    if @user.valid? then
      @user.online = Time.now
      @user.save
      render :update do |p|
        p.redirect_to :controller => 'auth', :action => 'thanks'
      end
    else
      render :partial => 'form'
    end
  end
  
  def thanks
    @article = Article.find_by_alias('thanks_for_register')
    render :layout => 'site'
  end
  
  def login
    user = User.find_by_login_and_password(
      params[:user][:login], params[:user][:password]
    )
    if !user.blank? && user.enabled? then
      session[:user_id]  = user.id
      user.online = Time.now
      user.save
      redirect_to root_url
      return 
    end
    
    if user.blank? then
      flash[:auth_error] = "Wrong login or password"
      redirect_to request.referer
      return 
    end
    
    if !user.enabled? then
      flash[:auth_error] = "Your information iwas not activated"
      redirect_to request.referer
      return
    end
  end
  
  def logout
    @user.online = 2.minutes.ago
    @user.save
    session[:user_id] = nil
    redirect_to root_url
  end
  
  def online
#    @user.online = Time.now
#    @user.save
#    render :update  do |p|
#      p.replace_html 'num-online-users', :partial => 'auth/online_users'
#      p.replace_html 'inbox-label', inbox_label(@user)
#    end
  end
  
  def online_users
    render :update  do |p|
      p.replace_html 'num-online-users', :partial => 'auth/online_users'
    end
  end
end
