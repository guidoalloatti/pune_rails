class AddSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :settings do |t|
      t.string :game_id, null: false
      t.string :speed, "ENUM('slow', 'normal', 'frantic') DEFAULT 'normal'"
      t.string :hole_points, "ENUM('none', 'one') DEFAULT 'none'"
      t.string :gap_spacing, "ENUM('close', 'normal', 'far_apart') DEFAULT 'normal'"
      t.string :gap_size, "ENUM('small', 'normal', 'large') DEFAULT 'normal'"

      t.boolean :red_play, null: true, default: false
      t.boolean :blue_play, null: true, default: false
      t.boolean :green_play, null: true, default: false
      t.boolean :yellow_play, null: true, default: false
      t.boolean :purple_play, null: true, default: false
      t.boolean :cyan_play, null: true, default: false

      t.string :red_left, null: true
      t.string :red_right, null: true
      t.string :blue_left, null: true
      t.string :blue_right, null: true
      t.string :green_left, null: true
      t.string :green_right, null: true
      t.string :yellow_left, null: true
      t.string :yellow_right, null: true
      t.string :cyan_left, null: true
      t.string :cyan_right, null: true
      t.string :purple_left, null: true
      t.string :purple_right, null: true

      t.timestamps
    end
  end
end