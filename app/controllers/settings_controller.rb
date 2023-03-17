class SettingsController < ActionController::Base
    protect_from_forgery with: :null_session

    def index
    end

    def fetch
        game_id = params['game_id']
        setting = Settings.find_by_game_id(game_id)

        render json: setting
    end

    def save
        settings = params['settings']
        setting = Settings.find_or_create_by(game_id: settings['game_id'])

        setting.game_id = settings['game_id']
        setting.speed = settings['speed'].downcase
        setting.hole_points = settings['hole_points'].downcase
        setting.gap_spacing = settings['gap_spacing'].downcase
        setting.gap_size = settings['gap_size'].downcase

        setting.red_play = settings['worms']['red']['play']
        setting.blue_play = settings['worms']['blue']['play']
        setting.green_play = settings['worms']['green']['play']
        setting.yellow_play = settings['worms']['yellow']['play']
        setting.purple_play = settings['worms']['purple']['play']
        setting.cyan_play = settings['worms']['cyan']['play']
  
        setting.red_left = settings['worms']['red']['left']
        setting.red_right = settings['worms']['red']['right']
        setting.blue_left = settings['worms']['blue']['left']
        setting.blue_right = settings['worms']['blue']['right']
        setting.green_left = settings['worms']['green']['left']
        setting.green_right = settings['worms']['green']['right']
        setting.yellow_left = settings['worms']['yellow']['left']
        setting.yellow_right = settings['worms']['yellow']['right']
        setting.cyan_left = settings['worms']['cyan']['left']
        setting.cyan_right = settings['worms']['cyan']['right']
        setting.purple_left = settings['worms']['purple']['left']
        setting.purple_right = settings['worms']['purple']['right']

        setting.save!
    end

    private

    # def settings_params
    #     params.require().permit()
    # end
end