-- Insertion Order:
-- 1. rooms
-- 2. users
-- 3. hostel_blocks
-- 4. floors    


--- Rohith - F617, Bhargav - H101
INSERT INTO users (id, username, password, room_number, phone_number) VALUES
('cs21btech11062@iith.ac.in', 'Rohith', 'password789', NULL, 3456789012),
('cs21btech11063@iith.ac.in', 'Pranav', 'passwordabc', 'G424', 4567890123),
('cs21btech11052@iith.ac.in', 'Bhargav', 'password123', NULL, 1234567890),
('hr.aryabhatta@iith.ac.in', 'aryabhatta', 'passwordaryabhatta', 'A101', 5678901234),
('hr.bhaskara@iith.ac.in', 'bhaskara', 'passwordbhaskara', 'B202', 6789012345),
('hr.charaka@iith.ac.in', 'charaka', 'passwordcharaka', 'C303', 7890123456),
('hr.susruta@iith.ac.in', 'susruta', 'passwordsusruta', 'D404', 8901234567),
('hr.kautilya@iith.ac.in', 'kautilya', 'passwordkautilya', 'E505', 9012345678),
('hr.vyasa@iith.ac.in', 'vyasa', 'passwordvyasa', 'F406', 1234567890),
('hr.brahmagupta@iith.ac.in', 'brahmagupta', 'passwordbrahmagupta', 'G512', 2345678901),
('hr.varahamihira@iith.ac.in', 'varahamihira', 'passwordvarahamihira', 'H323', 3456789012),
('office.hostel@iith.ac.in', 'Admin', 'passwordAdmin374', NULL, '0350135198');

---HR's original student id's
INSERT INTO users (id, username, password, room_number, phone_number) VALUES
('cs21btech11013@iith.ac.in', 'aryabhatta', 'passaryabhatta', 'A101', 5678901234),
('es21btech11003@iith.ac.in', 'bhaskara', 'passbhaskara', 'B202', 6789012345),
('ms21btech11033@iith.ac.in', 'charaka', 'passcharaka', 'C303', 7890123456),
('ep20btech11024@iith.ac.in', 'susruta', 'passsusruta', 'D404', 8901234567),
('ma20btech11017@iith.ac.in', 'kautilya', 'passkautilya', 'E505', 9012345678),
('me20btech11034@iith.ac.in', 'vyasa', 'passvyasa', 'F406', 1234567890),
('ce22btech11008@iith.ac.in', 'brahmagupta', 'passbrahmagupta', 'G512', 2345678901),
('ee23btech11025@iith.ac.in', 'varahamihira', 'passvarahamihira', 'H323', 3456789012);


--- for pod mates - Bhargav
INSERT INTO users (id, username, password, room_number, phone_number) VALUES
('ee21btech11053@iith.ac.in', 'Ethan', 'password456', 'H102', 1234567891),
('ms21btech11054@iith.ac.in', 'Taylor', 'password789', 'H103', 1234567892),
('cs21btech11055@iith.ac.in', 'Thomas', 'passwordabc', 'H104', 1234567893),
('cs22btech11056@iith.ac.in', 'Noah', 'passworddef', 'H105', 1234567894),
('cs23btech11057@iith.ac.in', 'Davis', 'passwxyz', 'H106', 1234567895),
('es21btech11058@iith.ac.in', 'Martinez', 'passworduvw', 'H107', 1234567896),
('ee21btech11059@iith.ac.in', 'Bob', 'passwordxyz', 'H108', 1234567897);

--- for Search A student
INSERT INTO users (id, username, password, room_number, phone_number) VALUES
('ee29btech11153@iith.ac.in', 'RamKrishna', 'password456', 'H109', 1234567891),
('ms29btech11154@iith.ac.in', 'Mahesh', 'password789', 'H110', 1234567892),
('cs29btech11155@iith.ac.in', 'Suresh', 'passwordabc', 'H111', 1234567893),
('cs29btech11156@iith.ac.in', 'Ramesh', 'passworddef', 'H112', 1234567894),
('cs29btech11157@iith.ac.in', 'Raju', 'passwxyz', 'H113', 1234567895),
('es29btech11158@iith.ac.in', 'Hooman', 'passworduvw', 'H114', 1234567896),
('ee29btech11159@iith.ac.in', 'Singh', 'passwordxyz', 'H115', 1234567897),
('ee29btech11060@iith.ac.in', 'Johnny', 'password123', 'H116', 1234567898),
('ee29btech11061@iith.ac.in', 'Alex', 'password456', 'H117', 1234567899),
('ms29btech11062@iith.ac.in', 'Michael', 'password789', 'H118', 1234567900),
('cs29btech11063@iith.ac.in', 'Daniel', 'passwordabc', 'H119', 1234567901),
('cs29btech11064@iith.ac.in', 'James', 'passworddef', 'H120', 1234567902),
('cs29btech11065@iith.ac.in', 'Matthew', 'passwxyz', 'H121', 1234567903),
('es29btech11066@iith.ac.in', 'David', 'passworduvw', 'H122', 1234567904),
('ee29btech11067@iith.ac.in', 'Joseph', 'passwordxyz', 'H123', 1234567905),
('ee29btech11068@iith.ac.in', 'Andrew', 'password123', 'H124', 1234567906),
('ee29btech11069@iith.ac.in', 'Ryan', 'password456', 'H125', 1234567907),
('ms29btech11070@iith.ac.in', 'Brandon', 'password789', 'H126', 1234567908),
('cs29btech11071@iith.ac.in', 'Samuel', 'passwordabc', 'H127', 1234567909),
('cs29btech11072@iith.ac.in', 'John', 'passworddef', 'H128', 1234567910),
('cs29btech11073@iith.ac.in', 'Nathan', 'passwxyz', 'H129', 1234567911),
('es29btech11074@iith.ac.in', 'Jonathan', 'passworduvw', 'H130', 1234567912),
('ee29btech11075@iith.ac.in', 'Christopher', 'passwordxyz', 'H131', 1234567913),
('ee29btech11076@iith.ac.in', 'Jacob', 'password123', 'H132', 1234567914);


--- for pod mates - Rohith
INSERT INTO users (id, username, password, room_number, phone_number) VALUES
('me21btech11007@iith.ac.in', 'Olivia', 'password123', 'F618', 3456789013),
('ce21btech11018@iith.ac.in', 'Bruce', 'passwordabc', 'F619', 3456789014),
('ce21btech11039@iith.ac.in', 'Avery', 'passworddef', 'F620', 3456789015),
('cs21btech11040@iith.ac.in', 'Harper', 'passwxyz', 'F621', 3456789016),
('ce21btech11021@iith.ac.in', 'Jackson', 'passworduvw', 'F622', 3456789017),
('ma21btech11032@iith.ac.in', 'Aria', 'passwordxyz', 'F623', 3456789018),
('me21btech11013@iith.ac.in', 'Lucas', 'password123', 'F624', 3456789019);

--- for pod mates - Pranav
INSERT INTO users (id, username, password, room_number, phone_number) VALUES
('ms21btech11074@iith.ac.in', 'Isabella', 'password123', 'G417', 4567890124),
('ms21btech11075@iith.ac.in', 'Mason', 'passworddef', 'G418', 4567890125),
('cs21btech11076@iith.ac.in', 'Elizabeth', 'passwxyz', 'G419', 4567890126),
('cs21btech11077@iith.ac.in', 'Michael', 'passworduvw', 'G420', 4567890127),
('cs21btech11078@iith.ac.in', 'Abigail', 'passwordxyz', 'G421', 4567890128),
('ce21btech11079@iith.ac.in', 'David', 'password123', 'G422', 4567890129),
('ce21btech11080@iith.ac.in', 'Sophie', 'password456', 'G423', 4567890130);


INSERT INTO hostel_blocks (block_id, block_name, hr_id, rating) VALUES
('A', 'Aryabhatta', 'hr.aryabhatta@iith.ac.in', 4.5),
('B', 'Bhaskara', 'hr.bhaskara@iith.ac.in', 3.8),
('C', 'Charaka', 'hr.charaka@iith.ac.in', 4.2),
('D', 'Susruta', 'hr.susruta@iith.ac.in', 4.0),
('E', 'Kautilya', 'hr.kautilya@iith.ac.in', 4.1),
('F', 'Vyasa', 'hr.vyasa@iith.ac.in', 4.7),
('G', 'Brahmagupta', 'hr.brahmagupta@iith.ac.in', 4.3),
('H', 'Varahamihira', 'hr.varahamihira@iith.ac.in', 4.6);


INSERT INTO floors (floor_number, lift_working_status, lift_last_serviced, washing_machine_working_status, washing_machine_last_serviced, water_filter_working_status, water_filter_last_serviced, bathroom_working_status, bathroom_last_serviced, housekeeping_working_status, housekeeping_last_serviced)
VALUES ('H1', TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW()),
('H2', TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW()),
('H3', TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW()),
('H4', TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW()),
('H5', TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW()),
('H6', TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW()),
('F6', TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW()),
('G4', TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW(), TRUE, NOW());


--- HR's rooms
INSERT INTO rooms (room_no, lan_status, electrical, furniture, occupied, leave_room) VALUES
('A101', TRUE, TRUE, TRUE, TRUE, FALSE),
('B202', TRUE, TRUE, TRUE, TRUE, FALSE),
('C303', TRUE, TRUE, TRUE, TRUE, FALSE),
('D404', TRUE, TRUE, TRUE, TRUE, FALSE),
('E505', TRUE, TRUE, TRUE, TRUE, FALSE),
('F406', TRUE, TRUE, TRUE, TRUE, FALSE),
('G512', TRUE, TRUE, TRUE, TRUE, FALSE),
('H323', TRUE, TRUE, TRUE, TRUE, FALSE);


-- Add more rooms from H109 to H132 with randomized boolean values
INSERT INTO rooms (room_no, lan_status, electrical, furniture, occupied, leave_room) VALUES
('F601', TRUE, TRUE, TRUE, TRUE, FALSE),
('F602', TRUE, TRUE, TRUE, TRUE, FALSE),
('F603', TRUE, TRUE, TRUE, TRUE, FALSE),
('F604', TRUE, TRUE, TRUE, TRUE, FALSE),
('F605', TRUE, TRUE, TRUE, TRUE, FALSE),
('F606', TRUE, TRUE, TRUE, TRUE, FALSE),
('F607', TRUE, TRUE, TRUE, TRUE, FALSE),
('F608', TRUE, TRUE, TRUE, TRUE, FALSE),
('F609', TRUE, TRUE, TRUE, TRUE, FALSE),
('F610', TRUE, TRUE, TRUE, TRUE, FALSE),
('F611', TRUE, TRUE, TRUE, TRUE, FALSE),
('F612', TRUE, TRUE, TRUE, TRUE, FALSE),
('F613', TRUE, TRUE, TRUE, TRUE, FALSE),
('F614', TRUE, TRUE, TRUE, TRUE, FALSE),
('F615', TRUE, TRUE, TRUE, TRUE, FALSE),
('F616', TRUE, TRUE, TRUE, TRUE, FALSE),
('F617', TRUE, TRUE, TRUE, FALSE, FALSE),
('F618', TRUE, TRUE, TRUE, TRUE, FALSE),
('F619', TRUE, TRUE, TRUE, TRUE, FALSE),
('F620', TRUE, TRUE, TRUE, TRUE, FALSE),
('F621', TRUE, TRUE, TRUE, TRUE, FALSE),
('F622', TRUE, TRUE, TRUE, TRUE, FALSE),
('F623', TRUE, TRUE, TRUE, TRUE, FALSE),
('F624', TRUE, TRUE, TRUE, TRUE, FALSE),
('F625', TRUE, TRUE, TRUE, TRUE, FALSE),
('F626', TRUE, TRUE, TRUE, TRUE, FALSE),
('F627', TRUE, TRUE, TRUE, TRUE, FALSE),
('F628', TRUE, TRUE, TRUE, TRUE, FALSE),
('F629', TRUE, TRUE, TRUE, TRUE, FALSE),
('F630', TRUE, TRUE, TRUE, TRUE, FALSE),
('F631', TRUE, TRUE, TRUE, TRUE, FALSE),
('F632', TRUE, TRUE, TRUE, TRUE, FALSE),
('G401', TRUE, TRUE, TRUE, TRUE, FALSE),
('G402', TRUE, TRUE, TRUE, TRUE, FALSE),
('G403', TRUE, TRUE, TRUE, TRUE, FALSE),
('G404', TRUE, TRUE, TRUE, TRUE, FALSE),
('G405', TRUE, TRUE, TRUE, TRUE, FALSE),
('G406', TRUE, TRUE, TRUE, TRUE, FALSE),
('G407', TRUE, TRUE, TRUE, TRUE, FALSE),
('G408', TRUE, TRUE, TRUE, TRUE, FALSE),
('G409', TRUE, TRUE, TRUE, TRUE, FALSE),
('G410', TRUE, TRUE, TRUE, TRUE, FALSE),
('G411', TRUE, TRUE, TRUE, TRUE, FALSE),
('G412', TRUE, TRUE, TRUE, TRUE, FALSE),
('G413', TRUE, TRUE, TRUE, TRUE, FALSE),
('G414', TRUE, TRUE, TRUE, TRUE, FALSE),
('G415', TRUE, TRUE, TRUE, TRUE, FALSE),
('G416', TRUE, TRUE, TRUE, TRUE, FALSE),
('G417', TRUE, TRUE, TRUE, TRUE, FALSE),
('G418', TRUE, TRUE, TRUE, TRUE, FALSE),
('G419', TRUE, TRUE, TRUE, TRUE, FALSE),
('G420', TRUE, TRUE, TRUE, TRUE, FALSE),
('G421', TRUE, TRUE, TRUE, TRUE, FALSE),
('G422', TRUE, TRUE, TRUE, TRUE, FALSE),
('G423', TRUE, TRUE, TRUE, TRUE, FALSE),
('G424', TRUE, TRUE, TRUE, TRUE, FALSE),
('G425', TRUE, TRUE, TRUE, TRUE, FALSE),
('G426', TRUE, TRUE, TRUE, TRUE, FALSE),
('G427', TRUE, TRUE, TRUE, TRUE, FALSE),
('G428', TRUE, TRUE, TRUE, TRUE, FALSE),
('G429', TRUE, TRUE, TRUE, TRUE, FALSE),
('G430', TRUE, TRUE, TRUE, TRUE, FALSE),
('G431', TRUE, TRUE, TRUE, TRUE, FALSE),
('G432', TRUE, TRUE, TRUE, TRUE, FALSE),
('H101', TRUE, TRUE, TRUE, FALSE, FALSE),
('H102', TRUE, TRUE, TRUE, TRUE, FALSE),
('H103', TRUE, TRUE, TRUE, TRUE, FALSE),
('H104', TRUE, TRUE, TRUE, TRUE, FALSE),
('H105', TRUE, TRUE, TRUE, TRUE, FALSE),
('H106', TRUE, TRUE, TRUE, TRUE, FALSE),
('H107', TRUE, TRUE, TRUE, TRUE, FALSE),
('H108', TRUE, TRUE, TRUE, TRUE, FALSE),
('H109', TRUE, TRUE, TRUE, TRUE, FALSE),
('H110', TRUE, TRUE, TRUE, TRUE, FALSE),
('H111', TRUE, TRUE, TRUE, TRUE, FALSE),
('H112', TRUE, TRUE, TRUE, TRUE, FALSE),
('H113', TRUE, TRUE, TRUE, TRUE, FALSE),
('H114', TRUE, TRUE, TRUE, TRUE, FALSE),
('H115', TRUE, TRUE, TRUE, TRUE, FALSE),
('H116', TRUE, TRUE, TRUE, TRUE, FALSE),
('H117', TRUE, TRUE, TRUE, TRUE, FALSE),
('H118', TRUE, TRUE, TRUE, TRUE, FALSE),
('H119', TRUE, TRUE, TRUE, TRUE, FALSE),
('H120', TRUE, TRUE, TRUE, TRUE, FALSE),
('H121', TRUE, TRUE, TRUE, TRUE, FALSE),
('H122', TRUE, TRUE, TRUE, TRUE, FALSE),
('H123', TRUE, TRUE, TRUE, TRUE, FALSE),
('H124', TRUE, TRUE, TRUE, TRUE, FALSE),
('H125', TRUE, TRUE, TRUE, TRUE, FALSE),
('H126', TRUE, TRUE, TRUE, TRUE, FALSE),
('H127', TRUE, TRUE, TRUE, TRUE, FALSE),
('H128', TRUE, TRUE, TRUE, TRUE, FALSE),
('H129', TRUE, TRUE, TRUE, TRUE, FALSE),
('H130', TRUE, TRUE, TRUE, TRUE, FALSE),
('H131', TRUE, TRUE, TRUE, TRUE, FALSE),
('H132', TRUE, TRUE, TRUE, TRUE, FALSE);