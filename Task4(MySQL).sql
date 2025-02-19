CREATE TABLE users (
	id INT,
    name VARCHAR(45),
    email VARCHAR(45),
    password VARCHAR(45),
    created_at TIMESTAMP
);

INSERT INTO users (name, email, password) VALUES
('Charles Louisin', 'charles@test.com', 'charles123'),
('John Doe', 'john@test.com', 'john123'),
('Jane Doe', 'jane@test.com', 'jane123'),
('Clark Hilton', 'clark@test.com', 'clark123'),
('Ruth Yimbne', 'ruth@test.com', 'ruth123');