INSERT INTO categories (id, name, slug, is_active, created_at, updated_at) VALUES
(1, 'Cricket', 'cricket', 1, datetime('now'), datetime('now')),
(2, 'Football', 'football', 1, datetime('now'), datetime('now')),
(3, 'Snooker', 'snooker', 1, datetime('now'), datetime('now')),
(4, 'PlayStations', 'playstations', 1, datetime('now'), datetime('now')),
(5, 'Pool', 'pool', 1, datetime('now'), datetime('now')),
(6, 'Badminton', 'badminton', 1, datetime('now'), datetime('now')),
(7, 'Leisure Rooms', 'leisure-rooms', 1, datetime('now'), datetime('now'));

INSERT INTO sub_categories (id, category_id, name, slug, price_per_hour, is_active, created_at, updated_at) VALUES
(1, 3, 'Snooker', 'snooker', 500, 1, datetime('now'), datetime('now')),
(2, 3, 'Double Snooker', 'double-snooker', 800, 1, datetime('now'), datetime('now')),
(3, 3, 'Snooker & PS', 'snooker-ps', 700, 1, datetime('now'), datetime('now')),
(4, 7, 'VIP', 'vip', 1500, 1, datetime('now'), datetime('now')),
(5, 5, 'Pool & PS', 'pool-ps', 600, 1, datetime('now'), datetime('now')),
(6, 4, 'Double PlayStation', 'double-playstation', 600, 1, datetime('now'), datetime('now')),
(7, 4, 'PlayStation', 'playstation', 400, 1, datetime('now'), datetime('now')),
(8, 4, 'Pool & PS', 'pool-ps-2', 600, 1, datetime('now'), datetime('now')),
(9, 4, 'Snooker & PS', 'snooker-ps-2', 700, 1, datetime('now'), datetime('now')),
(10, 2, 'Football Ground', 'football-ground', 2000, 1, datetime('now'), datetime('now')),
(11, 1, 'Cricket Ground', 'cricket-ground', 2000, 1, datetime('now'), datetime('now')),
(12, 1, 'Cricket Lane', 'cricket-lane', 500, 1, datetime('now'), datetime('now')),
(13, 6, 'Badminton Courts', 'badminton-courts', 800, 1, datetime('now'), datetime('now'));

INSERT INTO opening_hours (id, day_of_week, opening_time, closing_time, is_open, created_at, updated_at) VALUES
(1, 'Monday', '12:00', '04:00', 1, datetime('now'), datetime('now')),
(2, 'Tuesday', '12:00', '04:00', 1, datetime('now'), datetime('now')),
(3, 'Wednesday', '12:00', '04:00', 1, datetime('now'), datetime('now')),
(4, 'Thursday', '12:00', '04:00', 1, datetime('now'), datetime('now')),
(5, 'Friday', '15:00', '04:00', 1, datetime('now'), datetime('now')),
(6, 'Saturday', '10:00', '04:00', 1, datetime('now'), datetime('now')),
(7, 'Sunday', '10:00', '04:00', 1, datetime('now'), datetime('now'));
