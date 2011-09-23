module GamesHelper

  def game_date(default_time)
    return date_format1(default_time)
  end

  def date_format1(datetime)
    return datetime.strftime("%d-%b-%Y").upcase
  end
end
