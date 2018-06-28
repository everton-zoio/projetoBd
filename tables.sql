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
-- Table `mydb`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuario` (
  `RA` VARCHAR(10) NOT NULL,
  `PassWord` VARCHAR(20) NOT NULL,
  `Nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`RA`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Contato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Contato` (
  `idContato1` VARCHAR(10) NOT NULL,
  `idContato2` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idContato1`, `idContato2`),
  INDEX `fk_Contato_2_idx` (`idContato2` ASC),
  CONSTRAINT `fk_Contato_1`
    FOREIGN KEY (`idContato1`)
    REFERENCES `mydb`.`Usuario` (`RA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Contato_2`
    FOREIGN KEY (`idContato2`)
    REFERENCES `mydb`.`Usuario` (`RA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`mensagens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`mensagens` (
  `idRemetente` VARCHAR(10) NOT NULL,
  `idDestino` VARCHAR(10) NOT NULL,
  `mensagem` TEXT(500) NOT NULL,
  `data` DATE NOT NULL,
  PRIMARY KEY (`idRemetente`, `idDestino`, `data`),
  INDEX `fk_mensagens_2_idx` (`idDestino` ASC),
  CONSTRAINT `fk_mensagens_1`
    FOREIGN KEY (`idRemetente`)
    REFERENCES `mydb`.`Contato` (`idContato1`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mensagens_2`
    FOREIGN KEY (`idDestino`)
    REFERENCES `mydb`.`Contato` (`idContato2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`chat Global`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`chat Global` (
  `UsuarioId` VARCHAR(10) NOT NULL,
  `mensagem` TEXT(500) NOT NULL,
  `data` DATE NOT NULL,
  PRIMARY KEY (`UsuarioId`, `data`),
  CONSTRAINT `fk_chat Global_1`
    FOREIGN KEY (`UsuarioId`)
    REFERENCES `mydb`.`Usuario` (`RA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Aluno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Aluno` (
  `RA` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`RA`),
  CONSTRAINT `fk_Aluno_1`
    FOREIGN KEY (`RA`)
    REFERENCES `mydb`.`Usuario` (`RA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Professor` (
  `RA` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`RA`),
  CONSTRAINT `fk_Aluno_10`
    FOREIGN KEY (`RA`)
    REFERENCES `mydb`.`Usuario` (`RA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Notas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Notas` (
  `idAluno` VARCHAR(10) NOT NULL,
  `Disciplina` VARCHAR(45) NOT NULL,
  `nota` FLOAT NOT NULL,
  PRIMARY KEY (`idAluno`),
  CONSTRAINT `fk_Notas_1`
    FOREIGN KEY (`idAluno`)
    REFERENCES `mydb`.`Aluno` (`RA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Turma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Turma` (
  `idTurma` VARCHAR(10) NOT NULL,
  `idProfessor` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idTurma`, `idProfessor`),
  INDEX `fk_Turma_1_idx` (`idProfessor` ASC),
  CONSTRAINT `fkProf`
    FOREIGN KEY (`idProfessor`)
    REFERENCES `mydb`.`Professor` (`RA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`matricula`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`matricula` (
  `idAluno` VARCHAR(10) NOT NULL,
  `CodTurma` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`CodTurma`, `idAluno`),
  INDEX `fk_cria_10_idx` (`idAluno` ASC),
  CONSTRAINT `fk_cria_10`
    FOREIGN KEY (`idAluno`)
    REFERENCES `mydb`.`Aluno` (`RA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cria_20`
    FOREIGN KEY (`CodTurma`)
    REFERENCES `mydb`.`Turma` (`idTurma`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`duvidas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`duvidas` (
  `IdDuvida` INT NOT NULL AUTO_INCREMENT,
  `idTurma` VARCHAR(10) NOT NULL,
  `duvida` TEXT(500) NOT NULL,
  `data` DATE NOT NULL,
  `idAluno` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`IdDuvida`),
  INDEX `fk_duvidas_2_idx` (`idAluno` ASC),
  CONSTRAINT `fk_duvidas_1`
    FOREIGN KEY (`idTurma`)
    REFERENCES `mydb`.`Turma` (`idTurma`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_duvidas_2`
    FOREIGN KEY (`idAluno`)
    REFERENCES `mydb`.`Aluno` (`RA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`respostas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`respostas` (
  `idResposta` INT NOT NULL,
  `idTurma` VARCHAR(10) NOT NULL,
  `IdDuvida` INT NOT NULL,
  `resposta` TEXT(500) NOT NULL,
  `data` DATE NOT NULL,
  PRIMARY KEY (`idTurma`, `IdDuvida`, `data`),
  INDEX `fk_respostas_1_idx` (`IdDuvida` ASC),
  CONSTRAINT `fk_respostas_1`
    FOREIGN KEY (`IdDuvida`)
    REFERENCES `mydb`.`duvidas` (`IdDuvida`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_respostas_2`
    FOREIGN KEY (`idTurma`)
    REFERENCES `mydb`.`Turma` (`idTurma`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
