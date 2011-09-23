# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.


class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  #protect_from_forgery # See ActionController::RequestForgeryProtection for details
  
  before_filter :user_auth, :app_init

  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password

  def admin_auth
    return true
  end
  
  def user_auth
    begin
      unless session[:user_id].blank? then
        @user = User.find_by_id(session[:user_id])
        unless @user.blank? then
          @user.online = Time.now
          @user.save
        end
      else
        @user = nil
      end
    rescue
      @user = nil
    end  
  end
  
  def app_init
    @cabinet = ""
    @section = ""
  end

  def site_protect
    authenticate_or_request_with_http_basic do |login, password|
	if (login == "twu" && password == "soccer") then
        true
      else
        false
      end
    end    
  end
  
  def admin_protect
    authenticate_or_request_with_http_basic do |login, password|
      if (login == "samed" && password == "vurgun") then
        true
      else
        false
      end
    end
  end
end
