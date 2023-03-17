# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_17_022937) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "settings", force: :cascade do |t|
    t.string "game_id", null: false
    t.string "speed"
    t.string "ENUM('slow', 'normal', 'frantic') DEFAULT 'normal'"
    t.string "hole_points"
    t.string "ENUM('none', 'one') DEFAULT 'none'"
    t.string "gap_spacing"
    t.string "ENUM('close', 'normal', 'far_apart') DEFAULT 'normal'"
    t.string "gap_size"
    t.string "ENUM('small', 'normal', 'large') DEFAULT 'normal'"
    t.boolean "red_play", default: false
    t.boolean "blue_play", default: false
    t.boolean "green_play", default: false
    t.boolean "yellow_play", default: false
    t.boolean "purple_play", default: false
    t.boolean "cyan_play", default: false
    t.string "red_left"
    t.string "red_right"
    t.string "blue_left"
    t.string "blue_right"
    t.string "green_left"
    t.string "green_right"
    t.string "yellow_left"
    t.string "yellow_right"
    t.string "cyan_left"
    t.string "cyan_right"
    t.string "purple_left"
    t.string "purple_right"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
