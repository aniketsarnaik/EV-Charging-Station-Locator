CREATE TABLE role (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(30) UNIQUE NOT NULL
);

INSERT INTO role (role_name) VALUES
('ADMIN'),
('OWNER'),
('CUSTOMER');


CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role_id INT,
    status VARCHAR(30) DEFAULT 'ACTIVE',
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);


CREATE TABLE charging_station (
    station_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT,
    station_name VARCHAR(100),
    address TEXT,
    latitude DOUBLE,
    longitude DOUBLE,
    approval_status VARCHAR(30) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES user(user_id)
);


CREATE TABLE charger (
    charger_id INT PRIMARY KEY AUTO_INCREMENT,
    station_id INT,
    charger_number VARCHAR(20),
    charger_type VARCHAR(50),
    power_rating VARCHAR(30),
    availability_status VARCHAR(30) DEFAULT 'FREE',
    FOREIGN KEY (station_id) REFERENCES charging_station(station_id)
);


CREATE TABLE booking (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    charger_id INT,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) DEFAULT 'BOOKED',
    FOREIGN KEY (customer_id) REFERENCES user(user_id),
    FOREIGN KEY (charger_id) REFERENCES charger(charger_id)
);


CREATE TABLE otp_session (
    otp_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    otp_code VARCHAR(10),
    otp_type VARCHAR(20), -- START / END
    expiry_time TIMESTAMP,
    verified BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (booking_id) REFERENCES booking(booking_id)
);


CREATE TABLE charging_session (
    session_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    session_status VARCHAR(30) DEFAULT 'IN_PROGRESS',
    FOREIGN KEY (booking_id) REFERENCES booking(booking_id)
);


CREATE TABLE admin_action (
    action_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_id INT,
    station_id INT,
    action VARCHAR(50),
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES user(user_id),
    FOREIGN KEY (station_id) REFERENCES charging_station(station_id)
);
