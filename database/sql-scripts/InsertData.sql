CREATE USER 'usocial'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON *.* TO 'usocial'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
CREATE USER 'usocial'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON *.* TO 'usocial'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;