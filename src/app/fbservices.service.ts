import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { element } from 'protractor';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { log } from 'console';
import { Direct } from 'protractor/built/driverProviders';


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
    //Id Ventas
    idVenta: string;

    // data de recorrerlista proveedores con compras
    objImp: any;
    onbjAnt: any;
    listaCard: any;
    public listaAnt: any;
    public pesoacumulado = 0;
    public saldocreditotal = 0;
    public saldodebitototal = 0;

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
    public infoCompraUnica: any[];
    //Lista compras
    public pesajeCompraLista: any[];
    public pesajeCompraListaPorProveedor: any[];
    public anticiposPesajeCompraLista: any[] = [];
    public proveedorCompraLista: any[];
    public anticipoCompraLista: any[] = [];
    public loteProveedorLista: any;
    //Lista lotes
    listaLotes: any[] = [];
    public ultimoLote: any[];
    lastLote: any[];

    // Variable usuario
    usuario: string;
    public totalTodo;

    //variables para el saldar Deudas
    moverHistoricoLista: any[];
    objMoverHistorico: any;

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


            });
    }
    iniciarSesion(email, password) {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {


                this.usuarioUid = firebase.auth().currentUser.uid;
                this.navCtrl.navigateForward(["main-menu"]);
            })
            .catch(error => {
                this.toastErrorAutenticacion();
                console.error(error);
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



                    firebase
                        .database()
                        .ref("usuario/datosBasicos")
                        .push({
                            usuario: user,
                            email: email
                        });

                });
            this.toastRegistroCorrecto().catch(error => {
                console.error(error);
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

            });
    }
    verificarsesion() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {

                // this.navCtrl.navigateForward("main-menu");
                this.router.navigate(["main-menu"]);
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
            } else {

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

    //toast para archivos
    async toastArchivoImagen() {
        const toas = await this.toastController.create({
            message: "El archivo que intenta subir no es de tipo imagen por favor intente de nuevo",
            color: "danger",
            duration: 5000
        });
        toas.present();
    }
    async toastCamposBlanco() {
        const toas = await this.toastController.create({
            message: "Por favor diligencie todos los campos del formulario.",
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

            this.idCiudad = this.idGenerator();
            firebase
                .database()
                .ref("usuario/configuracion" + "/ciudad/" + this.idCiudad)
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
                console.log("imprime lista de clientes fb", this.clientesLista);
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
        this.crearBalanceLote(idProveedor, this.lastLote.toString());
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
                estado: 1,
                anticipos: 0
            });
    }
    //Metodo que permite buscar y retornar las compras de los proveedores del ultimo lote
    async getProveedorCompra() {
        const ordenLotes = await this.listaOrdenLotes();
        this.proveedorCompraLista = [];
        this.lastLote = [];
        this.lastLote = (ordenLotes.slice(ordenLotes.length - 1));
        this.proveedoresLista.forEach(element => {
            firebase
                .database()
                .ref("usuario/compras/" + element.id + "/" + this.lastLote.toString() + "/pesajeCompra")
                .on("value", snapshot => {

                    if (snapshot.exists() && snapshot.val() !== null) {

                        this.proveedorCompraLista.push(snapshot.val());
                    }
                });
        })
        return this.proveedorCompraLista;
    }
    // Traer los pesajes del proveedor seleccionado
    async getPesajeCompra(idProveedor) {
        const ordenLotes = await this.listaOrdenLotes();
        this.pesajeCompraLista = [];
        this.lastLote = [];
        this.lastLote = (ordenLotes.slice(this.listaOrdenLotes().length - 1));
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra")
            .on("value", snapshot => {
                this.pesajeCompraLista = [];
                snapshot.forEach(element => {
                    this.pesajeCompraLista.push(element.val());
                });
                return this.pesajeCompraLista;
            });
    }

    deletePesajeCompra(idProveedor, idPesajeCompra) {
        const ordenLotes = this.listaOrdenLotes();
        this.lastLote = [];
        this.lastLote = (ordenLotes.slice(ordenLotes.length - 1));
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra/" + idPesajeCompra)
            .remove();
        this.toastOperacionExitosa();
    }

    updateCostoCompra(idProveedor, idPesajeCompra, totalCompra, accion) {
        if (accion == "suma") {

            let totalLocal = 0;
            this.getCostoCompra(idProveedor, idPesajeCompra);
            totalLocal = this.costoCompraTemp;
            totalLocal = (totalLocal + totalCompra);
            firebase
                .database()
                .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra/" + idPesajeCompra)
                .update({
                    costoTotalCompra: totalLocal
                });
        } else if (accion == "resta") {
            console.log("Vamos a RESTARRRRRRRRRRRRR");

            let totalLocal = 0;
            this.getCostoCompra(idProveedor, idPesajeCompra);
            totalLocal = this.costoCompraTemp;
            totalLocal = (totalLocal - totalCompra);
            console.log("Restassssssssssssss ", totalLocal);

            firebase
                .database()
                .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra/" + idPesajeCompra)
                .update({
                    costoTotalCompra: totalLocal
                });
        }
    }

    costoCompraTemp: number;
    getCostoCompra(idProveedor, idPesajeCompra) {
        this.costoCompraTemp = 0;

        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra")
            .on("value", snapshot => {
                snapshot.forEach(element => {
                    if (element.key == idPesajeCompra) {
                        console.log("Elelelelel ", element.val());
                        this.costoCompraTemp = element.val().costoTotalCompra;
                    }

                });
            });
        return this.costoCompraTemp;
    }

    //Confirmar pesajes
    agregarConfirmaPesaje(idProveedor, idPesajeCompra, idEstadoProducto, cantidadEstado, costoKilo, costoTotalEstado) {
        this.idConfirmarPesajeCompra = this.idGenerator();
        this.lastLote = [];
        this.lastLote = (this.listaOrdenLotes().slice(this.listaOrdenLotes().length - 1));
        this.updateBalanceLoteCompra(idProveedor, this.lastLote.toString(), costoTotalEstado, "suma");
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/confirmarPesajeCompra/" + idPesajeCompra + "/" + this.idConfirmarPesajeCompra)
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

    public pesajeConfirmadoLista: any[];
    public objPesajeConfirmado: any;
    public sumapesoConfirmado: any;
    public saldoPesoConfirmado: any;
    async getPesajeConfirmado(idProveedor, idPesajeCompra) {
        this.pesajeConfirmadoLista = [];
        this.objPesajeConfirmado = [];
        this.sumapesoConfirmado = 0;
        this.saldoPesoConfirmado = 0;
        const ordenLotes = await this.listaOrdenLotes();
        this.lastLote = [];
        this.lastLote = (ordenLotes.slice(ordenLotes.length - 1));

        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/confirmarPesajeCompra/" + idPesajeCompra)
            .on("value", snapshot => {
                if (snapshot.exists()) {
                    this.pesajeConfirmadoLista = [];
                    this.sumapesoConfirmado = 0;
                    this.saldoPesoConfirmado = 0;
                    snapshot.forEach(element => {
                        this.estadoProductoLista.forEach(estadoPro => {
                            if (estadoPro.id == element.val().idEstadoProducto) {
                                this.objPesajeConfirmado = ({
                                    nombreEstadoQueso: estadoPro.descripcion,
                                    cantidadEstado: element.val().cantidadEstado,
                                    codigoLote: element.val().codigoLote,
                                    costoKilo: element.val().costoKilo,
                                    costoTotalEstado: element.val().costoTotalEstado,
                                    id: element.val().id,
                                    idEstadoProducto: element.val().idEstadoProducto,
                                    idPesajeCompra: element.val().idPesajeCompra
                                });
                                this.pesajeConfirmadoLista.push(this.objPesajeConfirmado);
                                this.objPesajeConfirmado = null;
                                this.sumapesoConfirmado = (this.sumapesoConfirmado + parseInt(element.val().cantidadEstado));
                                this.saldoPesoConfirmado = (this.saldoPesoConfirmado + parseInt(element.val().costoTotalEstado));
                            }
                        })
                    });
                }
                return this.pesajeConfirmadoLista, this.sumapesoConfirmado;
            });
    }
    deletePesajeConfirmado(idProveedor, idPesajeCompra, idPesajeConfirmado, valor) {
        const ordenLotes = this.listaOrdenLotes();
        this.lastLote = [];
        this.lastLote = (ordenLotes.slice(ordenLotes.length - 1));
        this.updateCostoCompra(idProveedor, idPesajeCompra, valor, "resta");
        this.updateBalanceLoteCompra(idProveedor, this.lastLote.toString(), valor, "resta");
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/confirmarPesajeCompra/" + idPesajeCompra + "/" + idPesajeConfirmado)
            .remove();
        this.toastOperacionExitosa();
    }



    //metodo que permite registrar un anticipo a la compra
    registrarAnticiposApesajeCompra(idProveedor, idPesajeCompra, lote, idTipoAnticipo, valorAnticipo, archivo) {
        let objAnt: any = null;
        this.idAnticipos = this.idGenerator();
        this.upLoadImage(idProveedor, this.idAnticipos, archivo);
        this.lastLote = [];
        this.lastLote = (this.listaOrdenLotes().slice(this.listaOrdenLotes().length - 1));
        this.updateBalanceLoteAnt(idProveedor, lote, valorAnticipo, "suma");
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + lote + "/anticipos/" + this.idAnticipos)
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
        if (idPesajeCompra !== 0) {
            this.getPesajeAnt(idProveedor, lote, idPesajeCompra);
        }



        this.toastOperacionExitosa();
    }

    getPesajeAnt(idProveedor, lote, idPesajeCompra) {
        let listaAnt: any[] = [];
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + lote + "/anticipos")
            .on("value", snapshot => {
                snapshot.forEach(element => {
                    if (element.val().idPesajeCompra == idPesajeCompra) {
                        listaAnt.push(element.val());
                    }
                });

            });
        this.updatePesajeAnt(idProveedor, lote, idPesajeCompra, listaAnt);
    }
    updatePesajeAnt(idProveedor, lote, idPesajeCompra, anticipo) {

        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + lote + "/pesajeCompra/" + idPesajeCompra)
            .update({
                anticipos: anticipo
            });
    }

    async getAnticipoProveedor() {

        this.lastLote = [];
        this.lastLote = (this.ultimoLote.slice(this.ultimoLote.length - 1));
        this.anticipoCompraLista = [];
        let proveedoresLista = await this.proveedoresLista;
        proveedoresLista.forEach(element => {
            firebase
                .database()
                .ref("usuario/compras/" + element.id + "/" + this.lastLote.toString() + "/anticipos")
                .on('value', snapshot => {
                    this.anticipoCompraLista = [];
                    if (snapshot.exists && snapshot.val() !== null) {
                        this.anticipoCompraLista.push(snapshot.val());
                    } else {
                    }
                });
        });
        return this.anticipoCompraLista;
    }
    anticipoDirectoProveedorLista: any[];
    getAnticipoDirectoProveedor(idProveedor, lote) {
        this.anticipoDirectoProveedorLista = [];
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + lote + "/anticipos")
            .on("value", snapshot => {
                this.anticipoDirectoProveedorLista = [];
                if (snapshot.exists()) {
                    snapshot.forEach(element => {
                        if (element.val().idPesajeCompra == 0 || element.val().idPesajeCompra == "0") {
                            this.anticipoDirectoProveedorLista.push(element.val());
                        }
                    });
                }
            });
        return this.anticipoDirectoProveedorLista;
    }

    public img: any;
    getFoto(idProveedor, idAnticipo) {
        this.img = null;
        firebase
            .storage()
            .ref("anticipos/" + idProveedor + "/" + idAnticipo).getDownloadURL().then(imgUr => {
                this.img = imgUr;

                return this.img;
            });
    }
    upLoadImage(idProveedor, idAnticipo, file) {

        firebase.storage().ref("anticipos/" + idProveedor + "/" + idAnticipo).put(file.target.files[0]);

    }
    deleteImage(idProveedor, idAnticipo) {
        firebase.storage().ref("anticipos/" + idProveedor + "/" + idAnticipo).delete();
    }

    deleteAnticiposApesajeCompra(idProveedor, idPesaje, idAnticipo, valorAnticipo, lote) {
        this.updateBalanceLoteAnt(idProveedor, lote, valorAnticipo, "resta")
        this.deleteImage(idProveedor, idAnticipo);
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + lote + "/anticipos/" + idAnticipo)
            .remove();
        if (idPesaje !== 0) {
            this.getPesajeAnt(idProveedor, lote, idPesaje);

        }
    }


    public proveedoresCompraLista: any[];

    async getProveedoresCompra() {
        this.proveedoresCompraLista = [];
        firebase
            .database()
            .ref()
            .child("usuario/compras/")
            .on("value", snapshot => {
                snapshot.forEach(element => {
                    this.proveedoresCompraLista.push(element.key);
                });
            });
        return this.proveedoresCompraLista;
    }
    listaLotesDelProveedor: any[];
    objLotesDelProveedor: any;
    async getLotesDelProveedor(idProveedor) {
        this.listaLotesDelProveedor = [];
        this.objLotesDelProveedor = null;
        firebase
            .database()
            .ref()
            .child("usuario/compras/" + idProveedor)
            .on("value", snapshot => {
                this.listaLotesDelProveedor = [];
                this.objLotesDelProveedor = null;
                snapshot.forEach(element => {
                    this.objLotesDelProveedor = ({
                        lote: element.key,
                        compra: element.val().balance.comprasLote,
                        anticipo: element.val().balance.anticiposLote
                    })
                    this.listaLotesDelProveedor.push(this.objLotesDelProveedor);
                });
            });
        console.log("Retornandoooooo ", this.listaLotesDelProveedor);

        return this.listaLotesDelProveedor;
    }

    getLoteProveedor() {
        this.objImp = [];
        this.onbjAnt = [];
        this.listaCard = [];
        this.listaAnt = [];
        this.pesoacumulado = 0;
        this.saldocreditotal = 0;
        this.saldodebitototal = 0;



        this.proveedorCompraLista.forEach(element => {
            let total = 0;
            let totalCosto = 0;
            let totalBultos = 0;
            let keys = Object.keys(element);
            let lotes = element[keys[0]].idProveedor;
            keys.forEach(key => {
                total += element[key].pesoBultos;
                totalBultos += element[key].totalBulto;
                totalCosto += element[key].costoTotalCompra;
                this.pesoacumulado += element[key].pesoBultos;
                this.saldocreditotal += element[key].costoTotalCompra;
            });

            this.objImp = ({
                idProvedor: lotes,
                bultos: totalBultos,
                costo: totalCosto,
                peso: total
            });
            this.listaCard.push(this.objImp);
        });
        this.anticipoCompraLista.forEach(element => {
            let totalAnt: number = 0;
            let keys = Object.keys(element);
            let prov = element[keys[0]].idProveedor;
            keys.forEach(key => {
                totalAnt += element[key].valorAnticipo;
                this.saldodebitototal += element[key].valorAnticipo;
            });
            this.onbjAnt = ({
                valorAnt: totalAnt,
                idProvee: prov
            });
            this.listaAnt.push(this.onbjAnt);
        });


        this.recorreListas();
        return this.listaCard, this.listaAnt, this.pesoacumulado, this.saldocreditotal, this.saldodebitototal;
    }

    public listaPaVer: any[];
    obtPa: any;
    recorreListas() {
        this.listaPaVer = [];
        if (this.listaAnt.length != 0) {
            this.listaPaVer = [];
            this.listaCard.forEach(element => {
                this.listaAnt.forEach(element2 => {
                    if (element.idProvedor == element2.idProvee) {
                        this.obtPa = ({
                            idProvedor: element.idProvedor,
                            bultos: element.bultos,
                            costo: element.costo,
                            peso: element.peso,
                            debito: element2.valorAnt
                        });
                        this.listaPaVer.push(this.obtPa);
                        this.obtPa = null;
                    } else if (this.listaPaVer.filter(valor => {
                        return valor.idProvedor == element.idProvedor;
                    }).length == 0 && this.listaAnt.filter(valorF => {
                        return valorF.idProvee == element.idProvedor
                    }).length == 0) {

                        this.obtPa = ({
                            idProvedor: element.idProvedor,
                            bultos: element.bultos,
                            costo: element.costo,
                            peso: element.peso,
                            debito: 0
                        });
                        this.listaPaVer.push(this.obtPa);
                        this.obtPa = null;
                    }
                });
            });
        } else {
            this.listaPaVer = [];
            this.listaCard.forEach(elementC => {
                this.obtPa = ({
                    idProvedor: elementC.idProvedor,
                    bultos: elementC.bultos,
                    costo: elementC.costo,
                    peso: elementC.peso,
                    debito: 0
                });
                this.listaPaVer.push(this.obtPa);
                this.obtPa = null;
            });
        }
        console.log("retornooooooooooooooooooooo", this.listaPaVer);
        return this.listaPaVer;
    }

    //METODOS PARA LOS::::::::::::::::::::::::ESTADOS
    //Metodo para traer todos los funcionarios
    getInfoCompra(idProveedor, idCompra) {
        this.infoCompraUnica = [];
        this.lastLote = [];
        this.lastLote = (this.ultimoLote.slice(this.ultimoLote.length - 1));
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra/" + idCompra)
            .on("value", snapshot => {
                this.infoCompraUnica = [];
                if (snapshot.val().estado == 1) {
                    this.infoCompraUnica.push(snapshot.val());
                }
                return this.infoCompraUnica;
            });
        this.getPesajeConfirmado(idProveedor, idCompra);
    }

    public pesajeLoteProveedorLista: any[];
    getPesajeLoteProveedor(idProveedor, lote) {
        this.pesajeLoteProveedorLista = [];
        firebase
            .database()
            .ref()
            .child("usuario/compras/" + idProveedor + "/" + lote + "/pesajeCompra")
            .on("value", snapshot => {
                this.pesajeLoteProveedorLista = [];
                if (snapshot.exists) {
                    snapshot.forEach(element => {
                        this.pesajeLoteProveedorLista.push(element.val());
                    });
                }
            });
    }


    crearBalanceLote(idProveedor, lote) {
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + lote + "/balance")
            .on("value", snapshot => {
                if (!snapshot.exists()) {
                    firebase
                        .database()
                        .ref("usuario/compras/" + idProveedor + "/" + lote + "/balance")
                        .set({
                            comprasLote: 0,
                            anticiposLote: 0
                        });
                }
            });

    }

    balanceLoteCompra: number;
    balanceLoteAnts: number;
    getBalanceLote(idProveedor, lote) {
        this.balanceLoteCompra = 0;
        this.balanceLoteAnts = 0;
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + lote)
            .on("value", snapshot => {
                snapshot.forEach(element => {
                    if (element.key == "balance") {
                        this.balanceLoteCompra = element.val().comprasLote;
                        this.balanceLoteAnts = element.val().anticiposLote;

                    }
                });
            });
        return this.balanceLoteCompra, this.balanceLoteAnts;

    }
    updateBalanceLoteCompra(idProveedor, lote, compra, accion) {
        if (accion == "suma") {
            this.getBalanceLote(idProveedor, lote);
            let local = this.balanceLoteCompra;
            local = (local + compra);
            firebase
                .database()
                .ref("usuario/compras/" + idProveedor + "/" + lote + "/balance")
                .update({
                    comprasLote: local
                });
        } else if (accion == "resta") {
            this.getBalanceLote(idProveedor, lote);
            let local = this.balanceLoteCompra;
            local = (local - compra);
            firebase
                .database()
                .ref("usuario/compras/" + idProveedor + "/" + lote + "/balance")
                .update({
                    comprasLote: local
                });
        }
    }
    updateBalanceLoteAnt(idProveedor, lote, anticipo, accion) {
        if (accion == "suma") {
            this.getBalanceLote(idProveedor, lote);
            let local = this.balanceLoteAnts;
            local = (local + anticipo);
            firebase
                .database()
                .ref("usuario/compras/" + idProveedor + "/" + lote + "/balance")
                .update({
                    anticiposLote: local
                });
        } else if (accion == "resta") {
            this.getBalanceLote(idProveedor, lote);
            let local = this.balanceLoteAnts;
            local = (local - anticipo);
            firebase
                .database()
                .ref("usuario/compras/" + idProveedor + "/" + lote + "/balance")
                .update({
                    anticiposLote: local
                });
        }
    }


    //saldar Deudas
    async saldarDeudasProveedor(idProveedor, valor) {
        this.agregarEstadoProveedor(idProveedor, valor);
        this.getObjProveedor(idProveedor,)
    }

    async getObjProveedor(idProveedor) {
        console.log("Entro al getObjeto");
        this.moverHistoricoLista = [];
        this.objMoverHistorico = null;
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor)
            .on("value", snapshot => {
                this.moverHistoricoLista = [];
                this.objMoverHistorico = null;
                this.objMoverHistorico = ({
                    objHistorico: snapshot.val()
                });

            });
        this.agregarHistorico(idProveedor, this.objMoverHistorico);
        console.log("Salio del getOBJETO");

    }
    async agregarHistorico(idProveedor, objeto) {
        console.log("Entro al crear historico");
        firebase
            .database()
            .ref("usuario/historico/" + idProveedor)
            .set({
                nodo: objeto
            });
        console.log("Salio del historico");
    }

    async agregarEstadoProveedor(idProveedor, valor) {
        console.log("Entra a crear el estado");
        firebase
            .database()
            .ref("usuario/estadoProveedor/" + idProveedor)
            .set({
                valor: valor
            });
    }
    public estadoSaldoProveedor: number;
    async getEstadoProveedor(idProveedor) {
        console.log("Entra a consultar el estado del proveedor");
        this.estadoSaldoProveedor = 0;
        firebase
            .database()
            .ref("usuario/estadoProveedor/" + idProveedor)
            .on("value", snapshot => {
                if (snapshot.exists()) {
                    snapshot.forEach(element => {
                        this.estadoSaldoProveedor = element.val();
                    })
                } else {
                    this.estadoSaldoProveedor = 0;
                    console.log("No existe el proveedor");
                }
            });
        return this.estadoSaldoProveedor;
    }

    async eliminarNodoProveedor(idProveedor) {
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor)
            .remove();
        console.log("Eliminó");
    }


    agregarVenta(idCliente, ciudad, conductor, costoVenta, fechaEnvio, listaPesada, pesoEnviado, pesoLimite, placa, tipoQueso, fechaNodo) {
        this.idVenta = this.idGenerator();
        firebase
            .database()
            .ref("usuario/ventas/" + idCliente + "/" + fechaNodo + "/" + this.idVenta)
            .set({
                id: this.idVenta,
                idCliente: idCliente,
                ciudad: ciudad,
                conductor: conductor,
                costoVenta: costoVenta,
                fechaEnvio: fechaEnvio,
                pesadas: listaPesada,
                pesoEnviado: pesoEnviado,
                pesoLimite: pesoLimite,
                placa: placa,
                tipoQueso: tipoQueso
            });
        this.toastOperacionExitosa();
    }


}