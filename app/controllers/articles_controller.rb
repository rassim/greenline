class ArticlesController < ApplicationController
  before_filter :site_protect
  
  layout 'site'
  def view
    @article = Article.find_by_alias(params[:id])
  end
  
  def about
    @article = Article.find_by_alias('about')
    @section = "about"
  end
end
