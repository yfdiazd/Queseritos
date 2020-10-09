import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { ToastController, AlertController } from "@ionic/angular";
import { element } from 'protractor';
import { constants } from 'buffer';




@Injectable({
    providedIn: "root"

})
export class FBservicesService {
    //variables idGenerator
    varIdGenerator: any = 0;
    time: any;
    //variables id
    idCiudad: string;
    idCliente: String;
    idEstadoProducto: String;
    idProducto: String;
    idProveedor: string;
    idTipoAnticipo: String;
    idTipoTrueque: string;
    idTipoIdentificacion: String;
    idConductor: string;
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


    //Variables para ingresos
    public listI: any[] = [];
    valorT: any[] = [];
    val;
    public totalIngreso;
    //Variables para gastos
    numeroGastos;
    numeroGastosEliminados;
    numeroGastosPagos;
    public listG: any[] = [];
    public listGEliminados: any[] = [];
    public listGPagados: any[] = [];
    valorTG: any[] = [];
    valG;
    public totalGasto;

    // Variable usuario
    usuario: string;
    public totalTodo;

    fecha: Date;
    milisegundos = 5000;

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
        public alertController: AlertController


    ) {
        firebase.initializeApp(this.config);
        this.verificarsesion();

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
                console.log("suario:", firebase.auth().currentUser);
                console.log("token ususuario:", firebase.auth().currentUser.uid);
                //this.router.navigate(["home"]);
            })
            .catch(error => {
                this.toastErrorAutenticacion();
                console.log(error);
            });
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
                        .ref("usuario/" + this.usuarioUid + "/datosBasicos")
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

                //this.router.navigate(["home"]);
                this.usuarioUid = firebase.auth().currentUser.uid;
                this.mostrarNombre();
                this.getCiudades();
                this.getClientes();
                this.getEstadoProducto();
                this.getProductos();
                this.getProveedores();
                this.getTipoAnticipos();
                this.getTipoTrueque();
                this.getTiposIdentificacion();

                console.log("usuario:", this.usuarioUid);
            } else {
                console.log("No hay sesion, toca loguear");
                this.router.navigate(["login"]);
            }
        });
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
            color: "danger",
            duration: 5000
        });
        toast.present();
    }


    //-------------Metodo que permite consultar la fecha actual:----------------------------------
    fechaActual() {
        this.today = new Date();
        this.dd = String(this.today.getDate()).padStart(2, '0');
        this.mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
        this.yyyy = this.today.getFullYear();
        this.today = this.dd + '/' + this.mm + '/' + this.yyyy;

        return this.today;
    }
    //-----------------------------Metodos creacion parametrizacion------------------------------------------------------
    //Metodo que permite crear productos
    crearProdcuto(codigoProducto, descripcionProducto) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.idProducto = this.idGenerator();
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "productos/" + this.idProducto)
            .set({
                id: this.idProducto,
                codigo: codigoProducto,
                descripcion: descripcionProducto,
                estado: 1

            });
        this.toastProductoCrado();
    }
    //Metodo que permite crear proveedores
    crearProveedor(tipoIdentificacionProveedor, numIndetificacionProveedor, nombreProveedor, apellidoProveedor, telefonoProveedor, direccionProveedor, correoProveedor) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.idProveedor = this.idGenerator();
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "proveedores/" + this.idProveedor)
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
    }
    //Metodo que permite crear los tipos de identificacion
    agregarTipoIdentificacion(codigoTipoIdentificacion, descripcionTipoIdentificacion) {
        this.idTipoIdentificacion = this.idGenerator();
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "tiposIdentificacion/" + this.idTipoIdentificacion)
            .set({
                id: this.idTipoIdentificacion,
                codigo: codigoTipoIdentificacion,
                descripcion: descripcionTipoIdentificacion,
                estado: 1
            });
        this.toastOperacionExitosa();
    }
    //Metodo para agregar estados de producto
    agregarEstadoProducto(codigoEstadoProducto, descripcionEstadoProducto) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.idEstadoProducto = this.idGenerator()
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "estadoProductos/" + this.idEstadoProducto)
            .set({
                id: this.idEstadoProducto,
                codigo: codigoEstadoProducto,
                descripcion: descripcionEstadoProducto,
                estado: 1
            });
        this.toastOperacionExitosa();
    }
    //Metodo para agregar el tipo de anticipo
    agregarTipoAnticipo(codigoTipoAnticipo, descripcionTipoanticipo) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.idTipoAnticipo = this.idGenerator();
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "tipoAnticipo/" + this.idTipoAnticipo)
            .set({
                id: this.idTipoAnticipo,
                codigo: codigoTipoAnticipo,
                descripcion: descripcionTipoanticipo,
                estado: 1
            });
        this.toastOperacionExitosa();
    }
    //Metodo para agregar el tipo de trueque.
    agregarTipoTrueque(codigoTipoTrueque, descripcionTipoTrueque) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.idTipoTrueque = this.idGenerator();
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "tipoTrueque/" + this.idTipoTrueque)
            .set({
                id: this.idTipoTrueque,
                codigo: codigoTipoTrueque,
                descripcion: descripcionTipoTrueque,
                estado: 1
            });
        this.toastOperacionExitosa();
    }
    //Metodo que permite crear las ciudades del sistema
    agregarCiudad(codigoCiudad, describcionCiudad) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.idCiudad = this.idGenerator();
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion" + "/ciudad/" + this.idCiudad)
            .set({
                id: this.idCiudad,
                codigo: codigoCiudad,
                descripcion: describcionCiudad,
                estado: 1
            });
        this.toastOperacionExitosa();
    }
    //Metodo que permite agregar clientes
    agregarCliente(tipoIdentificacion, numeroIdentificacionCliente, nombresClietne, apellidosCliente, empresaCliente, codigoCiudad, celularCliente, direccionCliente, correoCliente) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.idCliente = this.idGenerator();
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "cliente/" + this.idCliente)
            .set({
                id: this.idCliente,
                idTipoIdentificacion: tipoIdentificacion,
                numeroIdentificacion: numeroIdentificacionCliente,
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
    }
    //Metodo para agregar conductores
    agregarConductor(tipoIdentificacionConductor, numeroIdentificacionConductor, nombreConductor, apelidoConductor, celularConductor) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.idConductor = this.idGenerator();
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "conductor/" + this.idConductor)
            .set({
                id: this.idConductor,
                idTipoIdentificacion: tipoIdentificacionConductor,
                numeroIdentificacion: numeroIdentificacionConductor,
                nombres: nombreConductor,
                apellidos: apelidoConductor,
                celular: celularConductor,
                estado: 1
            });
        this.toastOperacionExitosa();
    }

    //-----------------------Obtener listas des configuraciones------------------------------------------------
    getCiudades() {

        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/ciudad")
            .on("value", snapshot => {
                this.ciudadesLista = [];
                snapshot.forEach(element => {
                    this.ciudadesLista.push(element.val());
                });
                return this.ciudadesLista;
            });
    }
    getClientes() {
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/cliente")
            .on("value", snapshot => {
                this.clientesLista = [];
                snapshot.forEach(element => {
                    this.clientesLista.push(element.val());
                });
                return this.clientesLista;
            });
    }
    getEstadoProducto() {
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/estadoProductos")
            .on("value", snaphot => {
                this.estadoProductoLista = [];
                snaphot.forEach(element => {
                    this.estadoProductoLista.push(element.val());
                });
                console.log(this.estadoProductoLista);
                return this.estadoProductoLista;
            });
    }
    getProductos() {
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/productos")
            .on("value", snaphot => {
                this.productosLista = [];
                snaphot.forEach(element => {
                    this.productosLista.push(element.val());
                });
                return this.productosLista;
            });
    }
    getProveedores() {
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/proveedores")
            .on("value", snaphot => {
                this.proveedoresLista = [];
                snaphot.forEach(element => {
                    this.proveedoresLista.push(element.val());
                });
                return this.proveedoresLista;
            });
    }
    getTipoAnticipos() {
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/tipoAnticipo")
            .on("value", snaphot => {
                this.tipoAnticipoLista = [];
                snaphot.forEach(element => {
                    this.tipoAnticipoLista.push(element.val());
                });
                return this.tipoAnticipoLista;
            });
    }
    getTipoTrueque() {
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/tipoTrueque")
            .on("value", snaphot => {
                this.tipoTruequeLista = [];
                snaphot.forEach(element => {
                    this.tipoTruequeLista.push(element.val());
                });
                return this.tipoTruequeLista;
            });
    }
    getTiposIdentificacion() {
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/tiposIdentificacion")
            .on("value", snaphot => {
                this.tiposIdentificacionLista = [];
                snaphot.forEach(element => {
                    this.tiposIdentificacionLista.push(element.val());
                });
                return this.tiposIdentificacionLista;
            });
    }
    getConductor() {
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "conductor")
            .on("value", snaphot => {
                this.tiposIdentificacionLista = [];
                snaphot.forEach(element => {
                    this.conductoresLista.push(element.val());
                });
                return this.conductoresLista;
            });
    }

    //----------------------------------Metodos para eliminar estado 0-----------------------------------------

    deleteProducto(idProducto) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "productos/" + idProducto)
            .update({
                estado: 0

            });
        this.toastOperacionExitosa();
    }
    deleteProveedor(idProveedor) {
        this.usuarioUid = firebase.auth().currentUser.uid;

        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "proveedores/" + idProveedor)
            .update({
                estado: 0
            });
        this.toastOperacionExitosa();
    }
    deleteTipoIdentificacion(idTipoIdentificacion) {

        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "tiposIdentificacion/" + idTipoIdentificacion)
            .update({
                estado: 0
            });
        this.toastOperacionExitosa();
    }
    deleteEstadoProducto(idEstadoProducto) {
        this.usuarioUid = firebase.auth().currentUser.uid;

        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "estadoProductos/" + idEstadoProducto)
            .update({

                estado: 0
            });
        this.toastOperacionExitosa();
    }
    deleteTipoAnticipo(idTipoAnticipo) {
        this.usuarioUid = firebase.auth().currentUser.uid;

        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "tipoAnticipo/" + idTipoAnticipo)
            .update({
                estado: 0
            });
        this.toastOperacionExitosa();
    }
    deleteTipoTrueque(idTipoTrueque) {
        this.usuarioUid = firebase.auth().currentUser.uid;

        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "tipoTrueque/" + idTipoTrueque)
            .update({
                estado: 0
            });
        this.toastOperacionExitosa();
    }
    deleteCiudad(idCiudad) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/ciudad/" + idCiudad)
            .update({
                estado: 0
            }).then()
        this.toastOperacionExitosa();
    }
    deleteCliente(idCliente) {
        this.usuarioUid = firebase.auth().currentUser.uid;

        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "cliente/" + idCliente)
            .update({
                estado: 0
            });
        this.toastOperacionExitosa();
    }
    deleteConductor(idConductor) {
        this.usuarioUid = firebase.auth().currentUser.uid;

        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "conductor/" + idConductor)
            .update({
                estado: 0
            });
        this.toastOperacionExitosa();
    }
    //----------------------------------------Metodos para actualizar  registros configuracion-------------------------------
    updateProdcuto(idProducto, codigoProducto, descripcionProducto) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.idProducto = this.idGenerator();
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "productos/" + idProducto)
            .update({
                codigo: codigoProducto,
                descripcion: descripcionProducto
            });
        this.toastOperacionExitosa();
    }
    updateProveedor(idProveedor, tipoIdentificacionProveedor, numIndetificacionProveedor, nombreProveedor, apellidoProveedor, telefonoProveedor, direccionProveedor, correoProveedor) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "proveedores/" + idProveedor)
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
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "tiposIdentificacion/" + idTipoIdentificacion)
            .update({
                codigo: codigoTipoIdentificacion,
                descripcion: descripcionTipoIdentificacion
            });
        this.toastOperacionExitosa();
    }
    updateEstadoProducto(idEstadoProducto, codigoEstadoProducto, descripcionEstadoProducto) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "estadoProductos/" + idEstadoProducto)
            .update({
                codigo: codigoEstadoProducto,
                descripcion: descripcionEstadoProducto
            });
        this.toastOperacionExitosa();
    }
    updateTipoAnticipo(idTipoAnticipo, codigoTipoAnticipo, descripcionTipoanticipo) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "tipoAnticipo/" + idTipoAnticipo)
            .update({
                codigo: codigoTipoAnticipo,
                descripcion: descripcionTipoanticipo
            });
        this.toastOperacionExitosa();
    }
    updateTipoTrueque(idTipoTrueque, codigoTipoTrueque, descripcionTipoTrueque) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "tipoTrueque/" + idTipoTrueque)
            .update({
                codigo: codigoTipoTrueque,
                descripcion: descripcionTipoTrueque
            });
        this.toastOperacionExitosa();
    }
    updateCiudad(codigoCiudad, describcionCiudad) {

        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/ciudad")
            .update({
                codigo: codigoCiudad,
                descripcion: describcionCiudad
            });
    }
    updateCliente(idCliente, tipoIdentificacion, numeroIdentificacionCliente, nombresClietne, apellidosCliente, empresaCliente, codigoCiudad, celularCliente, direccionCliente, correoCliente) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "cliente/" + idCliente)
            .update({
                idTipoIdentificacion: tipoIdentificacion,
                numeroIdentificacion: numeroIdentificacionCliente,
                nombres: nombresClietne,
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
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "conductor/" + idConductor)
            .set({
                idTipoIdentificacion: tipoIdentificacionConductor,
                numeroIdentificacion: numeroIdentificacionConductor,
                nombres: nombreConductor,
                apellidos: apelidoConductor,
                celular: celularConductor
            });
        this.toastOperacionExitosa();
    }


    //---------------------------------- Metodo que genera los id unicos
    idGenerator() {
        this.varIdGenerator = new Date();
        this.time = String(this.varIdGenerator.getTime());
        this.varIdGenerator = this.time;
        return this.varIdGenerator;
    }

}
