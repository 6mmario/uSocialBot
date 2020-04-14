# Practica 2
## Seminario 1

## Integrantes

- Mario Obed Morales Guitz 201213283
- Sandy Fabiola Merida Hernandez 201020126

# Arquitectura

# APP Angular
Color 1: #feeb97
<span style="color: #feeb97 ">some **1** text</span>

Color 2: #4fb783
<span style="color: #4fb783 ">some **2** text</span>

Color 3: #409d9b
<span style="color: #409d9b ">some **3** text</span>

Color 4: #034561
<span style="color: #034561 ">some **4** text</span>

Bootstrap 1
https://ng-bootstrap.github.io/#/components/accordion/examples

Bootstrap 2
https://getbootstrap.com/docs/4.4/getting-started/introduction/

## Iniciar nodeJs
1. `npm run buld` Pasa de typescript a javascript
2. `npm run dev` Realiza los cambios de typescipt y compila

# Rutas del server

| Metodo | Ruta                                   | Descripcion                                                               |
|--------|----------------------------------------|---------------------------------------------------------------------------|
| POST   | http://ip:3000/usuario                 | Guarda a un usuario                                                       |
| POST   | http://ip:3000/usuario/OAuth           | Login                                                                     |
| PUT    | http://ip:3000/usuario/:id             | Actualizacion de un usuario                                               |
| POST   | http://ip:3000/publicacion             | Creacion de una nueva publicacion                                         |
| GET    | http://ip:3000/publicacion             | Obtiene todo el listado de las publicaciones                              |
| GET    | http://ip:3000/usuario                 | Obtiene todo el listado de los amigos                                     |
| GET    | http://ip:3000/usuario/:id             | Obtiene los datos del usuario                                     |


# Grupos, usuarios, permisos/roles y tokens
## Grupos
|Group    |Policies                           | Permissions / Roles                                                      |
|---------|-----------------------------------|--------------------------------------------------------------------------|
|Architect|AmazonEC2FullAccess                | Accesos completo (creación, modificación y eliminacion) de instancias EC2|
|         |AmazonVPCFullAccess                | Accesos completo (creación, modificación y eliminacion) de instancias VPC|
|Backend  |AmazonS3FullAccess                 | Accesos completo (creación, modificación y eliminacion) de buckets S3    |
|         |AmazonEC2ContainerServiceFullAccess| Ve las EC2 creadas, ingreso con ssh , no puede iniciar o parar una EC2   |
|Frontend |AmazonS3FullAccess                 | Accesos completo (creación, modificación y eliminacion) de buckets S3    |
|         |AmazonEC2ContainerServiceFullAccess| Ve las EC2 creadas, ingreso con ssh , no puede iniciar o parar una EC2   |

## Users
|User       | Group                   | Token generated      |
|-----------|-------------------------|----------------------|
|g26_arqui  | Architect               |                      |
|g26_mario  | Backend                 | S3_KEYC,S3_SECRETKEY |
|g26_sandy  | Frontend                |                      |

# VPC
|VPC name| VPC-G26    |
|Red     | 10.0.0.0/16|
Las subnet asociadas tendran una IP privada en el rango de la red de la VPC asociada.

## Subnets
Todas pertenecen a la VPC-G26
|Name                 |IP´s range   |
|---------------------|-------------|
|WebSite-public-subnet|10.0.1.0/24  |
|Server-private-subnet|10.0.2.0/24  |
|DB-private-subnet    |10.0.3.0/24  |
Las IPs asignadas a cada EC2 que se asocia a una subnet es generada en el rango que la tabla describe.

## Route table

|Name                   | VPC   |Routes                        | Subnets associations                    |   
|-----------------------|-------|-------------------------------|-----------------------------------------|
|internet-rtable        |VPC-G26|  10.0.0.0/16 , 0.0.0.0/0::/0  | WebSite-public-subnet                   |
| default-private-rtable|VPC-G26|  10.0.0.0/16                  |Server-private-subnet , DB-private-subnet|
**internet-rtable:** Las subnets asociadas a esta tabla, tienen comunicación con el internet y la red interna de la VPC-G26
**default-private-rtable:** Las subnets asociadas a esta tabla no tienen acceso a internet, pero las que estan asociadas se monunican entre si, en este caso con la red VPC-G26




