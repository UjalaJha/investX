CREATE TABLE IF NOT EXISTS investment(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    investment_name TEXT, 
    investment_title TEXT,
    investment_amount INTEGER,
    investment_type TEXT,
    investment_app TEXT,
    investment_started_on DATE,
    investment_maturing_on DATE,
    investment_interest_rate TEXT,
    investment_more_info TEXT
);