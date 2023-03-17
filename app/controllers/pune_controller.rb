class PuneController < ActionController::Base

    def index
        @colors = ["red", "blue", "green", "yellow", "purple", "cyan"]
        @actions = ["die", "win", "speeding", "yabass", "pause", "burp"]

        # require 'securerandom'
        @game_id = SecureRandom.uuid

    end
end