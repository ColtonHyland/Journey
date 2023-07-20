CREATE TABLE timeframes (
  timeframe_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  timeframe_type VARCHAR(10) NOT NULL,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);