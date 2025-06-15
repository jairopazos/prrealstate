DROP TABLE User;

CREATE TABLE User (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    password VARCHAR(60) NOT NULL,
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL,
    birthDate DATETIME NOT NULL,
    email VARCHAR(60) NOT NULL,
    phone VARCHAR(60) NOT NULL,
    address VARCHAR(60) NOT NULL,
    gender VARCHAR(60) NOT NULL,
    CONSTRAINT UserPK PRIMARY KEY (id),
    CONSTRAINT UserNameUniqueKey UNIQUE (userName)
) ENGINE = InnoDB;

CREATE INDEX UserIndexByUserName ON User (userName);

CREATE TABLE Post (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  tipoAnuncio ENUM('venta', 'alquiler') NOT NULL,
  tipoVivienda ENUM('Casa', 'Piso', 'Chalet') NOT NULL,
  description VARCHAR(200) NOT NULL,
  urls JSON NOT NULL,
  nameOwner VARCHAR(20) NOT NULL,
  telephone VARCHAR(15) NOT NULL,
  creationDate DATETIME NOT NULL,
  modificationDate DATETIME NOT NULL,
  addressId BIGINT NOT NULL,
  CONSTRAINT AddressIdFK FOREIGN KEY (addressId)
      REFERENCES Address(id)
) ENGINE = InnoDB;

CREATE TABLE Address (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  province VARCHAR (30) NOT NULL,
  city VARCHAR (30) NOT NULL,
  postalCode VARCHAR (6) NOT NULL,
  street VARCHAR (30) NOT NULL,
  number INTEGER NOT NULL,
  height INTEGER,
  letter CHAR(1),
) ENGINE = InnoDB;