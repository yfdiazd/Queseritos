import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { element } from 'protractor';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


//import { Camera, CameraOriginal } from '@ionic-native/camera';



@Injectable({
    providedIn: "root"
})
export class FBservicesService {


    //Variable para paths de validacion
    pathPush: any;
    //flag 
    flag: boolean = false;
    //variables idGenerator
    varIdGenerator: any = 0;
    time: any;
    //variables id
    idLote: string;
    idCiudad: string;
    idCliente: String;
    idEstadoProducto: String;
    idProducto: String;
    idProveedor: string;
    idTipoAnticipo: String;
    idTipoTrueque: string;
    idTipoIdentificacion: String;
    idConductor: string;
    //Id compras
    idCompra: string;
    idPesajeCompra: string;
    idConfirmarPesajeCompra: string;
    idAnticipos: string;

    //variable que guarda u obtiene el UID del usuario
    usuarioUid: string;
    //Variables para obtener la fecha actual
    today: any;
    dd: any;
    mm: any;
    yyyy: any;
    //Variables para listas
    public ciudadesLista: any[];
    public clientesLista: any[];
    public estadoProductoLista: any[];
    public productosLista: any[];
    public proveedoresLista: any[];
    public tipoAnticipoLista: any[];
    public tipoTruequeLista: any[];
    public tiposIdentificacionLista: any[];
    public conductoresLista: any[];
    //Lista compras
    public pesajeCompraLista: any[];
    public pesajeCompraListaPorProveedor: any[];
    public anticiposPesajeCompraLista: any[] = [];
    public proveedorCompraLista: any[] = [];
    public anticipoCompraLista: any[] = [];
    //Lista lotes
    listaLotes: any[] = [];
    public ultimoLote: any[];
    lastLote: any[];

    // Variable usuario
    usuario: string;
    public totalTodo;

    fecha: Date;

    config = {
        apiKey: "AIzaSyCnnBGKeb3uuEs0KtP3x1od1KGlRSEIuvM",
        authDomain: "queseritos.firebaseapp.com",
        databaseURL: "https://queseritos.firebaseio.com",
        projectId: "queseritos",
        storageBucket: "queseritos.appspot.com",
        messagingSenderId: "589566808528"
    };

    constructor(
        private router: Router,
        public toastController: ToastController,
        public alertController: AlertController,
        private navCtrl: NavController,
        private camera: Camera,

    ) {
        firebase.initializeApp(this.config);
        this.verificarsesion();
    }
    options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }


    //offline
    offLine() {
        firebase.firestore().enablePersistence()
            .catch(function (err) {
                if (err.code == 'failed-precondition') {
                    // Multiple tabs open, persistence can only be enabled
                    // in one tab at a a time.
                    // ...
                } else if (err.code == 'unimplemented') {
                    // The current browser does not support all of the
                    // features required to enable persistence
                    // ...
                }
            });
    }

    // todos los mentodos que tienen que ver solo con el usuario
    mostrarNombre() {
        firebase
            .database()
            .ref("usuarios/" + this.usuarioUid + "/datosBasicos")
            .on("value", snapshot => {
                this.usuario = snapshot.val();
                console.log(this.usuario);
                console.log(this.usuarioUid);
            });
    }
    iniciarSesion(email, password) {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Se inicio correctamente");
                console.log("token usuario:", firebase.auth().currentUser.uid);
                this.usuarioUid = firebase.auth().currentUser.uid;
                this.navCtrl.navigateForward(["main-menu"]);
            })
            .catch(error => {
                this.toastErrorAutenticacion();
                console.log(error);
            });
        return this.usuarioUid;
    }
    cerrarSesion() {
        firebase.auth().signOut();
    }
    //Metodo para registrar el usuario
    crearUsuario(email, password, user, password2) {
        if (password == password2) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    this.usuarioUid = firebase.auth().currentUser.uid;
                    console.log("Se creo correctamente");
                    console.log(firebase.auth().currentUser.uid);

                    firebase
                        .database()
                        .ref("usuario/datosBasicos")
                        .push({
                            usuario: user,
                            email: email
                        });
                    console.log('bres me registre');
                });
            this.toastRegistroCorrecto().catch(error => {
                console.log(error);
            });
        } else {
            this.toastContras();
        }
        this.router.navigate(["login"]);
    }
    //Metodo que recupera la clve.
    recuperarClave(correo) {
        var auth = firebase.auth();
        auth
            .sendPasswordResetEmail(correo)
            .then(() => {
                this.alertRecuperacion();
            })
            .catch(error => {
                this.toastRecuperacionFail();
                console.log("correo no enviado validar correo", error);
            });
    }
    verificarsesion() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("Si hay usuario logueado: ", firebase.auth().currentUser.uid)
                this.navCtrl.navigateForward("main-menu");
                //this.router.navigate(["main-menu"]);
                // this.mostrarNombre();
                this.getCiudades();
                this.getEstadoProducto();
                this.getProductos();
                this.getTipoAnticipos();
                this.getTiposIdentificacion();
                this.getProveedores();
                this.getClientes();
                this.getConductor();
                this.listaOrdenLotes();
                this.getLotesProveedor()

            } else {
                console.log("No hay sesion, toca loguear");
                this.navCtrl.navigateBack(["login"]);
            }
        });
        return this.usuarioUid;
    }

    // TODOS LOS TOAS o mensajes emergentes
    //toast
    async toastContras() {
        const toast = await this.toastController.create({
            message: "Las contraseñas no son iguales.",
            duration: 3000
        });
        toast.present();
    }
    async toastRegistroCorrecto() {
        const toast = await this.toastController.create({
            message: "Te has registrado correctamente",
            duration: 3000
        });
        toast.present();
    }
    async toastErrorAutenticacion() {
        const toast = await this.toastController.create({
            message: "Usuario y/o contraseña incorrectos. Intentelo de nuevo.",
            duration: 3000
        });
        toast.present();
    }
    async toastRecuperacionFail() {
        const toast = await this.toastController.create({
            message:
                "Por favor revisar el correo electronico ya que no existe en Life$Easier",
            duration: 7000
        });
        toast.present();
    }
    async toastElimino() {
        const toast = await this.toastController.create({
            message: "Se ha eliminado correctamente",
            color: "danger",
            duration: 7000
        });
        toast.present();
    }
    //mensaje que indica la creacion del producto
    async toastProductoCrado() {
        const toast = await this.toastController.create({
            message: "Se ha creado el producto correctamente",
            color: "danger",
            duration: 7000
        });
        toast.present();
    }
    //mensaje que indica la creacion del proveedor
    async toastProveedorCrado() {
        const toast = await this.toastController.create({
            message: "Se ha creado el proveedor de manera correcta",
            color: "danger",
            duration: 7000
        });
        toast.present();
    }
    //mensaje que indica la creacion del proveedor
    async toastNumIdentificaExiste() {
        const toast = await this.toastController.create({
            message: "El numero de identificacion ingresado ya existe.",
            color: "danger",
            duration: 7000
        });
        toast.present();
    }
    // Alertas
    async alertRecuperacion() {
        const alert = await this.alertController.create({
            header: "Revisa tu correo electronico",
            message:
                "Hemos enviado un email de recuperación a tu cuenta de correo electronico.",
            buttons: ["Vale!"]
        });

        await alert.present();
    }
    //toast operacion exitosa
    async toastOperacionExitosa() {
        const toast = await this.toastController.create({
            message: "Operacion ejecutada con exito",
            color: "success",
            duration: 5000
        });
        toast.present();
    }

    async toastElementoDuplicado() {
        const toas = await this.toastController.create({
            message: "El codigo que intenta agregar ya existe",
            color: "danger",
            duration: 5000
        });
        toas.present();
    }

    //METODOS GENERALES:::::::::::::::::::::::::::::::::::
    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
    //Metodos de validaciones
    validaCodigos(codigo, path) {
        this.flag = false;
        firebase
            .database()
            .ref(path)
            .on("value", snapshot => {
                snapshot.forEach(element => {
                    if (codigo == element.val().codigo && element.val().estado == 1 && element.val().codigo != null) {
                        return this.flag = true;
                    } else {
                        this.flag = false;
                    }
                });
            });
        codigo = "";
        path = "";
        return this.flag;
    }
    validaNumDocs(numIdentifica, path) {
        this.pathPush = false;
        firebase
            .database()
            .ref(path)
            .on("value", snapshot => {
                snapshot.forEach(element => {
                    if (numIdentifica == element.val().numIndetificacion && element.val().estado == 1 && element.val() != null) {
                        return this.flag = true;
                    } else {
                        this.flag = false;
                    }
                });
            });
        numIdentifica = "";
        path = "";
        return this.flag;
    }
    //-------------Metodo que permite consultar la fecha actual:----------------------------------
    fechaActual() {
        this.today = new Date();
        this.dd = String(this.today.getDate()).padStart(2, '0');
        this.mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
        this.yyyy = this.today.getFullYear();
        this.today = this.dd + '-' + this.mm + '-' + this.yyyy;

        return this.today;
    }


    //-----------------------------Metodos creacion parametrizacion------------------------------------------------------
    //Metodo que permite crear productos
    crearProducto(codigoProducto, descripcionProducto, flagEstado) {

        this.pathPush = ("usuario/configuracion/" + "productos");
        if (this.validaCodigos(codigoProducto, this.pathPush) == false) {

            this.idProducto = this.idGenerator();
            firebase
                .database()
                .ref("usuario/configuracion/" + "productos/" + this.idProducto)
                .set({
                    id: this.idProducto,
                    codigo: codigoProducto,
                    descripcion: descripcionProducto,
                    predetermina: flagEstado,
                    estado: 1

                });
            this.toastOperacionExitosa();

        } else {
            this.toastElementoDuplicado();
        }
    }
    //Metodo que permite crear proveedores
    crearProveedor(tipoIdentificacionProveedor, numIndetificacionProveedor, nombreProveedor, apellidoProveedor, telefonoProveedor, direccionProveedor, correoProveedor) {


        if (apellidoProveedor == null) {
            apellidoProveedor = "";
        }
        if (direccionProveedor == null) {
            direccionProveedor = "";
        }
        if (correoProveedor == null) {
            correoProveedor = "";
        }
        this.pathPush = ("usuario/configuracion/" + "proveedores");
        if (this.validaNumDocs(numIndetificacionProveedor, this.pathPush) == false) {
            this.idProveedor = this.idGenerator();
            firebase
                .database()
                .ref("usuario/configuracion/" + "proveedores/" + this.idProveedor)
                .set({
                    id: this.idProveedor,
                    idTipoIdentificacion: tipoIdentificacionProveedor,
                    numIndetificacion: numIndetificacionProveedor,
                    nombre: nombreProveedor,
                    apellido: apellidoProveedor,
                    telefono: telefonoProveedor,
                    direccion: direccionProveedor,
                    correo: correoProveedor,
                    fechaCreacion: this.fechaActual(),
                    estado: 1

                });
            this.toastProveedorCrado();

        } else {
            this.toastNumIdentificaExiste();
        }

    }
    //Metodo que permite crear los tipos de identificacion
    agregarTipoIdentificacion(codigoTipoIdentificacion, descripcionTipoIdentificacion) {

        this.pathPush = ("usuario/configuracion/" + "tiposIdentificacion");
        if (this.validaCodigos(codigoTipoIdentificacion, this.pathPush) == false) {
            this.idTipoIdentificacion = this.idGenerator();
            firebase
                .database()
                .ref("usuario/configuracion/" + "tiposIdentificacion/" + this.idTipoIdentificacion)
                .set({
                    id: this.idTipoIdentificacion,
                    codigo: codigoTipoIdentificacion,
                    descripcion: descripcionTipoIdentificacion,
                    estado: 1
                });
            this.toastOperacionExitosa();

        } else {
            this.toastElementoDuplicado();
        }
    }
    //Metodo para agregar estados de producto
    agregarEstadoProducto(codigoEstadoProducto, descripcionEstadoProducto) {

        this.pathPush = ("usuario/configuracion/" + "estadoProductos");
        if (this.validaCodigos(codigoEstadoProducto, this.pathPush) == false) {
            this.idEstadoProducto = this.idGenerator()
            firebase
                .database()
                .ref("usuario/configuracion/" + "estadoProductos/" + this.idEstadoProducto)
                .set({
                    id: this.idEstadoProducto,
                    codigo: codigoEstadoProducto,
                    descripcion: descripcionEstadoProducto,
                    estado: 1
                });
            this.toastOperacionExitosa();

        } else {
            this.toastElementoDuplicado();
        }
    }
    //Metodo para agregar el tipo de anticipo
    agregarTipoAnticipo(codigoTipoAnticipo, descripcionTipoanticipo) {

        this.pathPush = ("usuario/configuracion/" + "tipoAnticipo");
        if (this.validaCodigos(codigoTipoAnticipo, this.pathPush) == false) {
            this.idTipoAnticipo = this.idGenerator();
            firebase
                .database()
                .ref("usuario/configuracion/" + "tipoAnticipo/" + this.idTipoAnticipo)
                .set({
                    id: this.idTipoAnticipo,
                    codigo: codigoTipoAnticipo,
                    descripcion: descripcionTipoanticipo,
                    estado: 1
                });
            this.toastOperacionExitosa();

        } else {
            this.toastElementoDuplicado();
        }
    }
    //Metodo que permite crear las ciudades del sistema
    agregarCiudad(codigoCiudad, describcionCiudad) {

        this.pathPush = "";
        this.pathPush = ("usuario/configuracion" + "/ciudad");
        if (this.validaCodigos(codigoCiudad, this.pathPush) == false) {
            console.log("Prubeasssss ");
            this.idCiudad = this.idGenerator();
            firebase
                .database()
                .ref("usuario/configuracion" + "/ciudad/" + this.idCiudad)
                .onDisconnect()
                .set({
                    id: this.idCiudad,
                    codigo: codigoCiudad,
                    descripcion: describcionCiudad,
                    estado: 1
                });

            this.toastOperacionExitosa();

        } else {
            this.toastElementoDuplicado();
        }
    }
    //Metodo que permite agregar clientes
    agregarCliente(tipoIdentificacion, numeroIdentificacionCliente, nombresClietne, apellidosCliente, empresaCliente, codigoCiudad, celularCliente, direccionCliente, correoCliente) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        if (apellidosCliente == null) {
            apellidosCliente = "";
        }
        if (empresaCliente == null) {
            empresaCliente = "";
        }
        if (correoCliente == null) {
            correoCliente = "";
        }
        this.pathPush = "";
        this.pathPush = ("usuario/configuracion/" + "cliente");
        if (this.validaNumDocs(numeroIdentificacionCliente, this.pathPush) == false) {

            this.idCliente = this.idGenerator();
            firebase
                .database()
                .ref("usuario/configuracion/" + "cliente/" + this.idCliente)
                .set({
                    id: this.idCliente,
                    idTipoIdentificacion: tipoIdentificacion,
                    numIndetificacion: numeroIdentificacionCliente,
                    nombres: nombresClietne,
                    apellidos: apellidosCliente,
                    empresa: empresaCliente,
                    idCiudad: codigoCiudad,
                    celular: celularCliente,
                    direccion: direccionCliente,
                    correo: correoCliente,
                    estado: 1
                });
            this.toastOperacionExitosa();

        } else {
            this.toastNumIdentificaExiste();
        }
    }
    //Metodo para agregar conductores
    agregarConductor(tipoIdentificacionConductor, numeroIdentificacionConductor, nombreConductor, apelidoConductor, celularConductor) {

        if (apelidoConductor == null) {
            apelidoConductor = "";
        }
        this.pathPush = "";
        this.pathPush = ("usuario/configuracion/" + "conductor");
        if (this.validaNumDocs(numeroIdentificacionConductor, this.pathPush) == false) {
            this.idConductor = this.idGenerator();
            firebase
                .database()
                .ref("usuario/configuracion/" + "conductor/" + this.idConductor)
                .set({
                    id: this.idConductor,
                    idTipoIdentificacion: tipoIdentificacionConductor,
                    numIndetificacion: numeroIdentificacionConductor,
                    nombres: nombreConductor,
                    apellidos: apelidoConductor,
                    celular: celularConductor,
                    estado: 1
                });
            this.toastOperacionExitosa();

        } else {
            this.toastNumIdentificaExiste();
        }

    }

    //-----GETS-------------------------------------------------------
    //-----------------------Obtener listas des configuraciones------------------------------------------------
    getCiudades() {

        firebase
            .database()
            .ref("usuario/configuracion/ciudad")
            .on("value", snapshot => {
                this.ciudadesLista = [];
                snapshot.forEach(element => {
                    if (element.val().estado == 1) {
                        this.ciudadesLista.push(element.val());
                    }

                });
                return this.ciudadesLista;
            });
    }
    getClientes() {
        firebase
            .database()
            .ref("usuario/configuracion/cliente")
            .on("value", snapshot => {
                this.clientesLista = [];
                snapshot.forEach(element => {
                    if (element.val().estado == 1) {
                        this.clientesLista.push(element.val());
                    }
                });
                return this.clientesLista;
            });
    }
    getEstadoProducto() {
        firebase
            .database()
            .ref("usuario/configuracion/estadoProductos")
            .on("value", snaphot => {
                this.estadoProductoLista = [];
                snaphot.forEach(element => {
                    if (element.val().estado == 1) {
                        this.estadoProductoLista.push(element.val());
                    }
                });
                return this.estadoProductoLista;
            });
    }
    getProductos() {
        firebase
            .database()
            .ref("usuario/configuracion/productos")
            .on("value", snaphot => {
                this.productosLista = [];
                snaphot.forEach(element => {
                    if (element.val().estado == 1) {
                        this.productosLista.push(element.val());
                    }
                });
                return this.productosLista;
            });
    }
    getProveedores() {
        firebase
            .database()
            .ref("usuario/configuracion/proveedores")
            .on("value", snaphot => {
                this.proveedoresLista = [];
                snaphot.forEach(element => {
                    if (element.val().estado == 1) {
                        this.proveedoresLista.push(element.val());
                    }
                });
                return this.proveedoresLista;
            });
    }
    getTipoAnticipos() {
        firebase
            .database()
            .ref("usuario/configuracion/tipoAnticipo")
            .on("value", snaphot => {
                this.tipoAnticipoLista = [];
                snaphot.forEach(element => {
                    if (element.val().estado == 1) {
                        this.tipoAnticipoLista.push(element.val());
                    }
                });
                return this.tipoAnticipoLista;
            });
    }
    getTiposIdentificacion() {
        firebase
            .database()
            .ref("usuario/configuracion/tiposIdentificacion")
            .on("value", snaphot => {
                this.tiposIdentificacionLista = [];
                snaphot.forEach(element => {
                    if (element.val().estado == 1) {
                        this.tiposIdentificacionLista.push(element.val());
                    }
                });
                return this.tiposIdentificacionLista;
            });
    }
    getConductor() {
        firebase
            .database()
            .ref("usuario/configuracion/conductor")
            .on("value", snaphot => {
                this.conductoresLista = [];
                snaphot.forEach(element => {
                    if (element.val().estado == 1) {
                        this.conductoresLista.push(element.val());
                    }
                });
                return this.conductoresLista;
            });
    }


    //----------------------------------Metodos para eliminar estado 0-----------------------------------------
    deleteProducto(idProducto) {

        firebase
            .database()
            .ref("usuario/configuracion/" + "productos/" + idProducto)
            .update({
                estado: 0

            });
        this.toastOperacionExitosa();
    }
    deleteProveedor(idProveedor) {


        firebase
            .database()
            .ref("usuario/configuracion/" + "proveedores/" + idProveedor)
            .update({
                estado: 0
            });
        this.toastOperacionExitosa();
    }
    deleteTipoIdentificacion(idTipoIdentificacion) {


        firebase
            .database()
            .ref("usuario/configuracion/" + "tiposIdentificacion/" + idTipoIdentificacion)
            .update({
                estado: 0
            });
        this.toastOperacionExitosa();
    }
    deleteEstadoProducto(idEstadoProducto) {


        firebase
            .database()
            .ref("usuario/configuracion/" + "estadoProductos/" + idEstadoProducto)
            .update({

                estado: 0
            });
        this.toastOperacionExitosa();
    }
    deleteTipoAnticipo(idTipoAnticipo) {


        firebase
            .database()
            .ref("usuario/configuracion/" + "tipoAnticipo/" + idTipoAnticipo)
            .update({
                estado: 0
            });
        this.toastOperacionExitosa();
    }
    deleteCiudad(idCiudad) {

        firebase
            .database()
            .ref("usuario/configuracion/" + "/ciudad/" + idCiudad)
            .update({
                estado: 0
            }).then()
        this.toastOperacionExitosa();
    }
    deleteCliente(idCliente) {


        firebase
            .database()
            .ref("usuario/configuracion/" + "cliente/" + idCliente)
            .update({
                estado: 0
            });
        this.toastOperacionExitosa();
    }
    deleteConductor(idConductor) {


        firebase
            .database()
            .ref("usuario/configuracion/" + "conductor/" + idConductor)
            .update({
                estado: 0
            });
        this.toastOperacionExitosa();
    }
    //----------------------------------------Metodos para actualizar  registros configuracion-------------------------------
    updateProdcuto(idProducto, codigoProducto, descripcionProducto, flagEstado) {

        this.idProducto = this.idGenerator();
        firebase
            .database()
            .ref("usuario/configuracion/" + "productos/" + idProducto)
            .update({
                codigo: codigoProducto,
                descripcion: descripcionProducto,
                predetermina: flagEstado
            });
        this.toastOperacionExitosa();
    }
    updateProveedor(idProveedor, tipoIdentificacionProveedor, numIndetificacionProveedor, nombreProveedor, apellidoProveedor, telefonoProveedor, direccionProveedor, correoProveedor) {

        if (apellidoProveedor == null) {
            apellidoProveedor = "";
        }
        if (direccionProveedor == null) {
            direccionProveedor = "";
        }
        if (correoProveedor == null) {
            correoProveedor = "";
        }
        firebase
            .database()
            .ref("usuario/configuracion/" + "proveedores/" + idProveedor)
            .update({
                idTipoIdentificacion: tipoIdentificacionProveedor,
                numIndetificacion: numIndetificacionProveedor,
                nombre: nombreProveedor,
                apellido: apellidoProveedor,
                telefono: telefonoProveedor,
                direccion: direccionProveedor,
                correo: correoProveedor,

            });
        this.toastOperacionExitosa();
    }
    updateTipoIdentificacion(idTipoIdentificacion, codigoTipoIdentificacion, descripcionTipoIdentificacion) {

        firebase
            .database()
            .ref("usuario/configuracion/" + "tiposIdentificacion/" + idTipoIdentificacion)
            .update({
                codigo: codigoTipoIdentificacion,
                descripcion: descripcionTipoIdentificacion
            });
        this.toastOperacionExitosa();
    }
    updateEstadoProducto(idEstadoProducto, codigoEstadoProducto, descripcionEstadoProducto) {

        firebase
            .database()
            .ref("usuario/configuracion/" + "estadoProductos/" + idEstadoProducto)
            .update({
                codigo: codigoEstadoProducto,
                descripcion: descripcionEstadoProducto
            });
        this.toastOperacionExitosa();
    }
    updateTipoAnticipo(idTipoAnticipo, codigoTipoAnticipo, descripcionTipoanticipo) {

        firebase
            .database()
            .ref("usuario/configuracion/" + "tipoAnticipo/" + idTipoAnticipo)
            .update({
                codigo: codigoTipoAnticipo,
                descripcion: descripcionTipoanticipo
            });
        this.toastOperacionExitosa();
    }
    updateCiudad(idCiudad, codigoCiudad, describcionCiudad) {

        firebase
            .database()
            .ref("usuario/configuracion/" + "/ciudad/" + idCiudad)
            .update({
                codigo: codigoCiudad,
                descripcion: describcionCiudad
            });
    }
    updateCliente(idCliente, tipoIdentificacion, numeroIdentificacionCliente, nombresCliente, apellidosCliente, empresaCliente, codigoCiudad, celularCliente, direccionCliente, correoCliente) {

        if (apellidosCliente == null) {
            apellidosCliente = "";
        }
        if (empresaCliente == null) {
            empresaCliente = "";
        }
        if (correoCliente == null) {
            correoCliente = "";
        }
        firebase
            .database()
            .ref("usuario/configuracion/" + "cliente/" + idCliente)
            .update({
                idTipoIdentificacion: tipoIdentificacion,
                numIndetificacion: numeroIdentificacionCliente,
                nombres: nombresCliente,
                apellidos: apellidosCliente,
                empresa: empresaCliente,
                idCiudad: codigoCiudad,
                celular: celularCliente,
                direccion: direccionCliente,
                correo: correoCliente,

            });
        this.toastOperacionExitosa();
    }
    updateConductor(idConductor, tipoIdentificacionConductor, numeroIdentificacionConductor, nombreConductor, apelidoConductor, celularConductor) {

        if (apelidoConductor == null) {
            apelidoConductor = "";
        }
        firebase
            .database()
            .ref("usuario/configuracion/" + "conductor/" + idConductor)
            .update({
                idTipoIdentificacion: tipoIdentificacionConductor,
                numIndetificacion: numeroIdentificacionConductor,
                nombres: nombreConductor,
                apellidos: apelidoConductor,
                celular: celularConductor
            });
        this.toastOperacionExitosa();
    }
    //Metodo que genera los id unicos
    idGenerator() {
        this.varIdGenerator = new Date();
        this.time = String(this.varIdGenerator.getTime());
        this.varIdGenerator = this.time;
        return this.varIdGenerator;
    }
    //Generador de lotes fechaactual+L+consecutivo de lotes 1, 2, 3, ....
    generarLote() {

        this.idLote = this.idGenerator();
        firebase
            .database()
            .ref("usuario/configuracion/lotes")
            .on("value", snapshot => {
                console.log("Se genera lote correctamente" + snapshot.numChildren());
                firebase
                    .database()
                    .ref("usuario/configuracion/lotes/" + this.idLote)
                    .set({
                        id: this.idLote,
                        lote: (this.fechaActual() + "-L" + snapshot.numChildren())
                    });

            });
    }
    //Obtiene los lotes del mas antiguo al mas nuevo
    listaOrdenLotes() {
        this.ultimoLote = [];
        firebase
            .database()
            .ref("usuario/configuracion/lotes")
            .orderByValue()
            .on("value", snapshot => {
                snapshot.forEach(element => {
                    this.ultimoLote.push(element.val().lote);

                });
            });
        return this.ultimoLote;

    }

    //Metodos para las::::::::::::::::::COMPRAS
    //pesaje Copmpra
    agregarPesaje(idProveedor, codigoProducto, totalBultos, pesoBultos, bultosTT) {


        this.idPesajeCompra = this.idGenerator();
        this.lastLote = [];
        this.lastLote = (this.listaOrdenLotes().slice(this.listaOrdenLotes().length - 1));
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra/" + this.idPesajeCompra)
            .set({
                id: this.idPesajeCompra,
                lote: this.lastLote.toString(),
                fechaCompra: this.fechaActual(),
                idProveedor: idProveedor,
                idProducto: codigoProducto,
                totalBulto: totalBultos,
                pesoBultos: pesoBultos,
                costoTotalCompra: 0,
                bultoLista: bultosTT,
                estado: 1
            });
    }
    //Metodo que permite buscar y retornar las compras de los proveedores del ultimo lote
    async getProveedorCompra() {

        this.proveedorCompraLista = [];
        this.lastLote = [];
        this.lastLote = (this.ultimoLote.slice(this.ultimoLote.length - 1));
        console.log("Lsita proveedores a recorrer", this.proveedoresLista)
        this.proveedoresLista.forEach(element => {
            firebase
                .database()
                .ref("usuario/compras/" + element.id + "/" + this.lastLote.toString() + "/pesajeCompra")
                .on("value", snapshot => {
                    if (snapshot.exists && snapshot.val() !== null) {
                        console.log("Esto es snapshot", snapshot.val())
                        this.proveedorCompraLista.push(snapshot.val());
                    }
                });
        })
        return this.proveedorCompraLista;
    }


    // Traer los pesajes del proveedor seleccionado
    getPesajeCompra(idProveedor) {
        this.pesajeCompraLista = [];
        this.lastLote = [];
        this.lastLote = (this.listaOrdenLotes().slice(this.listaOrdenLotes().length - 1));
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra")
            .on("value", snapshot => {
                snapshot.forEach(element => {
                    this.pesajeCompraLista.push(element.val());
                });
                console.log("metodo getPesajeCompra" + this.pesajeCompraLista.length);
                return this.pesajeCompraLista;
            });
    }

    updateCostoCompra(idProveedor, idPesajeCompra, totalCompra) {
        console.log("Datosss de upppppp1 ", idProveedor)
        console.log("Datosss de upppppp2 ", idPesajeCompra)
        console.log("Datosss de upppppp3 ", totalCompra)
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra/" + idPesajeCompra)
            .update({
                costoTotalCompra: totalCompra
            });
    }


    //Confirmar pesajes
    agregarConfirmaPesaje(idProveedor, idPesajeCompra, idEstadoProducto, cantidadEstado, costoKilo, costoTotalEstado) {

        this.idConfirmarPesajeCompra = this.idGenerator();
        this.lastLote = [];
        this.lastLote = (this.listaOrdenLotes().slice(this.listaOrdenLotes().length - 1));
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/confirmarPesajeCompra/" + this.idConfirmarPesajeCompra)
            .set({
                id: this.idConfirmarPesajeCompra,
                codigoLote: this.lastLote.toString(),
                idPesajeCompra: idPesajeCompra,
                idEstadoProducto: idEstadoProducto,
                cantidadEstado: cantidadEstado,
                costoKilo: costoKilo,
                costoTotalEstado: costoTotalEstado
            });
        this.toastOperacionExitosa();
    }
    //metodo que permite registrar un anticipo a la compra
    registrarAnticiposApesajeCompra(idProveedor, idPesajeCompra, idTipoAnticipo, valorAnticipo, archivo) {

        this.idAnticipos = this.idGenerator();
        this.lastLote = [];
        this.lastLote = (this.listaOrdenLotes().slice(this.listaOrdenLotes().length - 1));
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/anticipos/" + this.idAnticipos)
            .set({
                id: this.idAnticipos,
                fechaAnticipo: this.fechaActual(),
                idProveedor: idProveedor,
                idTipoAnticipo: idTipoAnticipo,
                valorAnticipo: valorAnticipo,
                archivo: archivo,
                idPesajeCompra: idPesajeCompra,
                estado: 1
            });
        this.toastOperacionExitosa();
    }

    getAnticipoProveedor() {

        this.lastLote = [];
        this.lastLote = (this.ultimoLote.slice(this.ultimoLote.length - 1));
        this.anticipoCompraLista = [];
        this.proveedoresLista.forEach(element => {
            firebase
                .database()
                .ref("usuario/compras/" + element.id + "/" + this.lastLote.toString() + "/anticipos")
                .on('value', snapshot => {
                    if (snapshot.exists && snapshot.val() !== null) {
                        this.anticipoCompraLista.push(snapshot.val());
                    } else {
                    }
                });

        });
        return this.anticipoCompraLista;

    }

    takePhoto() {
        this.camera.getPicture(this.options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            console.log(err);
        });

    }

    proveedoresCompraLista: any;
    getProveedoresCompra() {
        this.proveedoresCompraLista = [];
        firebase.database().ref("usuario/compras/")
            .on("value", snapshot => {
                snapshot.forEach(element => {
                    this.proveedoresCompraLista.push(element.key);
                });
            });
        return this.proveedoresCompraLista;
    }


}