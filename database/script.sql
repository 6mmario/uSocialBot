-- MySQL Script generated by MySQL Workbench
-- mié 08 abr 2020 22:47:27 CST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `id_usuario` VARCHAR(50) NOT NULL,
  `nombre` VARCHAR(100) NULL,
  `nickname` VARCHAR(50) NULL,
  `pass` VARCHAR(200) NULL,
  `urlimagen` VARCHAR(300) NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`publicacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`publicacion` (
  `id_publicacion` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NULL,
  `texto` VARCHAR(1000) NULL,
  `urlimagen` VARCHAR(300) NULL,
  `usuario_id_usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_publicacion`),
  INDEX `fk_publicacion_usuario_idx` (`usuario_id_usuario` ASC),
  CONSTRAINT `fk_publicacion_usuario`
    FOREIGN KEY (`usuario_id_usuario`)
    REFERENCES `mydb`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
