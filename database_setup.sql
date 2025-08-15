CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(100) NOT NULL, 
    duration INTEGER NOT NULL, 
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

INSERT INTO sessions (subject, duration, start_time, notes) VALUES
('Calculus', 120, '2025-08-15 10:00:00', 'Reviewing integration by parts'),
('Physics', 90, '2025-08-15 11:30:00', 'Working on projectile motion'),
('English', 60, '2025-08-14 13:00:00', 'Preparing for essay'),
('History', 120, '2025-08-13 15:00:00', 'Studying the American Revolution'),
('Chemistry', 90, '2025-08-12 16:30:00', 'Reviewing stoichiometry'),
('Biology', 60, '2025-08-12 18:00:00', 'Preparing for lab report'),
('Spanish', 120, '2025-08-11 20:00:00', 'Reviewing Spanish grammar'),
('Art', 90, '2025-08-11 21:30:00', 'Working on watercolor painting'),
('Music', 60, '2025-08-10 23:00:00', 'Practicing piano'),
('Computer Science', 120, '2025-08-10 01:00:00', 'Working on a project'),
('Calculus', 120, '2025-08-08 01:00:00', 'Learning Integration'),
('Calculus', 150, '2025-08-01 01:00:00', 'Learning Integration'),
('Calculus', 60, '2025-08-01 01:00:00', 'Learning Integration'),
('Calculus', 90, '2025-07-29 01:00:00', 'Learning Integration'),
('Calculus', 60, '2025-07-05 01:00:00', 'Learning Integration'),
('Calculus', 60, '2025-07-04 01:00:00', 'Learning Integration');

SELECT * FROM sessions;