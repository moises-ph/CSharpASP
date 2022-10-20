
GO
Create DataBase DB_API_DATOS;
GO
USE DB_API_DATOS;
GO
Create Table Usuario (
ID_Usuario varchar (15) primary key,
Nombres varchar (80),
Telefono varchar (60),
Correo varchar (40),
Ciudad varchar (60),
FechaIngreso Datetime default getdate()
);
GO
--EXECUTE usp_registrar '1','Moises pineda','3232434412','mois.mp8@gmail.com','Armenia'
--execute usp_registrar '2','Ethiem alex','3112324415','soyunsimp@gmail.com','Armenia'
--execute usp_registrar '3','Gian luis alfonso','348586994','soyunenano@gmail.com','Armenia'
--execute usp_registrar '4','Daniel genshi gomes inpact','3736485094','soygenshíplayer@gmail.com','Armenia'
--execute usp_registrar '5','brayan stiven medina','3184852213','soylolplayer@gmail.com','Armenia'

--usp_Listar

GO
Create procedure usp_registrar
@ID_Usuario varchar (15),
@Nombres varchar (80),
@Telefono varchar (60),
@Correo varchar (40),
@Ciudad  varchar (60)
as
begin
	Insert Into Usuario (ID_Usuario,Nombres,Telefono,Correo,Ciudad) Values (@ID_Usuario,@Nombres,@Telefono, @Correo, @Ciudad)
end
go

GO
Create procedure usp_Actualizar
@ID_Usuario varchar (15),
@Nombres varchar (80),
@Telefono varchar (60),
@Correo varchar (40),
@Ciudad  varchar (60)
as
begin
	update Usuario set Nombres = @Nombres,Telefono = @Telefono, Correo = @Correo, Ciudad = @Ciudad where ID_Usuario = @ID_Usuario
end
go

go
create procedure usp_Eliminar
@id_usuario varchar(15)
as
begin
	DELETE FROM Usuario where ID_Usuario = @id_usuario;
end
go

go
create procedure usp_Consultar
@id_usuario varchar(15)
as
begin
	SELECT * FROM Usuario where ID_Usuario = @id_usuario;
end
go

go
create procedure usp_Listar
as
begin
	SELECT * FROM Usuario
end
go