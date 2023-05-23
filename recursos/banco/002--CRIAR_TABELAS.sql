
USE fatec_1sem_23;

CREATE TABLE IF NOT EXISTS USUARIOS (
	usu_id int NOT NULL AUTO_INCREMENT,
	usu_nome varchar(60) NOT NULL,
	usu_email varchar(80) NOT NULL, 
	usu_senha varchar(255) NOT NULL,
	usu_tipo tinyint NOT NULL,
	PRIMARY KEY (usu_id)
);

CREATE TABLE IF NOT EXISTS PRODUTOS (
	prd_id int NOT NULL AUTO_INCREMENT,
	prd_nome varchar(60) NOT NULL,
	prd_valor DECIMAL(6,2) NOT NULL,
	prd_unidade varchar(30) NOT NULL,
	ptp_id int NOT NULL,
	prd_disponivel bit NOT NULL,
	prd_img varchar(255) NOT NULL, 
	prd_destaque bit NOT NULL, 
	prd_img_destaque varchar(255) NULL, 
	prd_descricao varchar(100) NOT NULL, 
	PRIMARY KEY (prd_id)
);

CREATE TABLE IF NOT EXISTS PRODUTO_TIPOS (
	ptp_id int NOT NULL AUTO_INCREMENT,
	ptp_nome varchar(20) NOT NULL, 
	ptp_icone varchar(255) NOT NULL, 	
	PRIMARY KEY (ptp_id)
);

CREATE TABLE IF NOT EXISTS PEDIDOS (
	ped_id int NOT NULL AUTO_INCREMENT,
	ped_data DATE NOT NULL,
	usu_id int NOT NULL,
	cli_id int NOT NULL,
	ped_tipo tinyint NOT NULL,
	ped_status tinyint NOT NULL,
	ped_desconto DECIMAL(6,2) NOT NULL,
	ped_vlr_pago DECIMAL(6,2) NOT NULL,
	PRIMARY KEY (ped_id)
);

CREATE TABLE IF NOT EXISTS PEDIDO_PRODUTOS (
	ppd_id int NOT NULL AUTO_INCREMENT,
	ppd_hora TIME NOT NULL,
	ppd_qtd int NOT NULL,
	ppd_valor DECIMAL(6,2) NOT NULL,
	ppd_obs varchar(50),
	ppd_status tinyint NOT NULL,
	ped_id int NOT NULL,
	prd_id int NOT NULL,
	PRIMARY KEY (ppd_id)
);

CREATE TABLE IF NOT EXISTS CLIENTES (
	usu_id int NOT NULL,
	cli_cel varchar(11) NOT NULL,
	cli_pts int NOT NULL,
	PRIMARY KEY (usu_id)
);

CREATE TABLE IF NOT EXISTS ENDERECO_CLIENTES (
	cli_id int NOT NULL,
	end_logradouro varchar(200) NOT NULL,
	end_num varchar(20) NOT NULL,
	end_bairro varchar(60) NOT NULL,
	end_complemento varchar(60),
	cid_id int NOT NULL,
	PRIMARY KEY (cli_id)
);

CREATE TABLE IF NOT EXISTS MESAS (
	mes_id int NOT NULL AUTO_INCREMENT,
	mes_nome varchar(20) NOT NULL,
	mes_status tinyint NOT NULL,
	mes_lugares tinyint NOT NULL,
	ped_id int NULL,
	PRIMARY KEY (mes_id)
);

CREATE TABLE IF NOT EXISTS CIDADES (
	cid_id int NOT NULL AUTO_INCREMENT,
	cid_nome varchar(60) NOT NULL,
	cid_uf char(2) NOT NULL,
	PRIMARY KEY (cid_id)
);
