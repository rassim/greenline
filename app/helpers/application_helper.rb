# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
 
  def product_title(product)
    route = [product.ancestors.reject { |c| c.parent_id == 0 }].flatten.map { |pr| pr.title }
    route << "<b>#{product.title}</b>"
    return route.join("/")
  end
  
  def lot_desc(lot)
    result = ""
    metrics = lot.metrics
    unless lot.product.blank?
      result +=  product_title(lot.product)
    end

    unless metrics.blank? then
      result += ", " + metrics.nominative(lot.count)
    end

    result
  end

  
   def product_name_full(lot)
    result = ""

     unless lot.product.blank?
      result +=  product_title(lot.product)
    end
    
    result
  end


  def calculate_time_distance(seconds)
    time    = {}
    minutes = (seconds / 60).floor
    hours   = (minutes / 60).floor
    days    = (hours   / 24).floor
    
    time[:seconds] = (seconds - minutes*60).floor
    time[:minutes] = minutes - hours*60
    time[:hours]   = hours   - days*24
    time[:days]    = days 
    
    return time
  end  

  # Выводит русскую строку "сколько осталось до"
  def desc_time_distance(from, to)
    seconds = from-to
    t = calculate_time_distance(seconds)
    if seconds > 1.days then 
      value = t[:days].to_s    + " " + Russian.p(t[:days],  "день", "дня", "дней" ) + " " +
              t[:hours].to_s   + " " + Russian.p(t[:hours], "час", "часа", "часов" ) + " " +
              t[:minutes].to_s + " " + Russian.p(t[:minutes], "минута", "минуты", "минут") 
    elsif seconds > 1.hours then 
      value = t[:hours].to_s   + " " + Russian.p(t[:hours], "час", "часа", "часов" ) + " " +
              t[:minutes].to_s + " " + Russian.p(t[:minutes], "минута", "минуты", "минут") 
    else  
      value = "%02d" % t[:minutes].to_s + ":" + "%02d" % t[:seconds].to_s
    end
    value
  end
  
  def stock_view(value)
    return "%.2f" % value
  end

  def total_box_weight(nbox, weight)
    return nbox *  weight
  end
  
  def current_part_desc(lot)
    unless lot.collected_part.blank?
      lot.metrics.genitive(lot.count * lot.collected_part.part) + "(#{stock_view(lot.collected_part.part*100)}%)"
    else
      ""
    end
  end  
  
  def user_desc(user)
    if user.online? then
      "<span class='online'>" + user.title + "</span>"
    else
      user.title
    end
  end

  def team_desc(team_number)
    @team = Team.find(team_number)
    @team.name
  end

end
