import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { ToastController, AlertController } from "@ionic/angular";




@Injectable({
    providedIn: "root"

})
export class FBservicesService {
    //comando alejo


    //variable que guarda u obtiene el UID del usuario
    usuarioUid: string;
    //Variables para obtener la fecha actual
    today: any;
    dd: any;
    mm: any;
    yyyy: any;
    //Variables para lista de ciudades
    ciudadesLista: any[];

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
        public alertController: AlertController,

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
                this.router.navigate(["main-menu"]);
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
                        .set({
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

                this.router.navigate(["main-menu"]);
                this.usuarioUid = firebase.auth().currentUser.uid;
                this.mostrarNombre();
                this.getCiudades();
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

    //Metodo que permite crear productos
    crearProdcuto(codigoProducto, descripcionProducto) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/productos/" + codigoProducto)
            .set({
                codigo: codigoProducto,
                descripcion: descripcionProducto

            });
        this.toastProductoCrado();
    }

    //Metodo que permite crear proveedores
    crearProveedor(tipoIdentificacionProveedor, numIndetificacionProveedor, nombreProveedor, apellidoProveedor, telefonoProveedor, direccionProveedor, correoProveedor) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/proveedores/" + numIndetificacionProveedor + "-" + nombreProveedor)
            .set({
                tipoIdentificacion: tipoIdentificacionProveedor,
                numIndetificacion: numIndetificacionProveedor,
                nombre: nombreProveedor,
                apellido: apellidoProveedor,
                telefono: telefonoProveedor,
                direccion: direccionProveedor,
                correo: correoProveedor,
                fechaCreacion: this.fechaActual()

            });
        this.toastProveedorCrado();
    }

    //Metodo que permite consultar la fecha actual:

    fechaActual() {
        this.today = new Date();
        this.dd = String(this.today.getDate()).padStart(2, '0');
        this.mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
        this.yyyy = this.today.getFullYear();
        this.today = this.dd + '/' + this.mm + '/' + this.yyyy;
        return this.today;
    }

    //Metodo que permite crear los tipos de identificacion
    agregarTipoIdentificacion(codigoTipoIdentificacion, descripcionTipoIdentificacion) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/tiposIdentificacion/" + codigoTipoIdentificacion)
            .set({
                codigo: codigoTipoIdentificacion,
                descripcion: descripcionTipoIdentificacion
            });
        this.toastOperacionExitosa();
    }

    //Metodo para agregar estados de producto
    agregarEstadoProducto(codigoEstadoProducto, descripcionEstadoProducto) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/estadoProductos/" + codigoEstadoProducto)
            .set({
                codigo: codigoEstadoProducto,
                descripcion: descripcionEstadoProducto
            });
        this.toastOperacionExitosa();
    }
    //Metodo para agregar el tipo de anticipo
    agregarTipoAnticipo(codigoTipoAnticipo, descripcionTipoanticipo) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/tipoAnticipo/" + codigoTipoAnticipo)
            .set({
                codigo: codigoTipoAnticipo,
                descripcion: descripcionTipoanticipo
            });
        this.toastOperacionExitosa();
    }

    //Metodo para agregar el tipo de trueque.
    agregarTipoTrueque(codigoTipoTrueque, descripcionTipoTrueque) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/tipoTrueque/" + codigoTipoTrueque)
            .set({
                codigo: codigoTipoTrueque,
                descripcion: descripcionTipoTrueque
            });
        this.toastOperacionExitosa();
    }

    //Metodo que permite crear las ciudades del sistema
    agregarCiudad(codigoCiudad, describcionCiudad) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/ciudad/" + codigoCiudad)
            .set({
                codigo: codigoCiudad,
                descripcion: describcionCiudad
            });
        this.toastOperacionExitosa();
    }
    //Metodo que permite agregar clientes
    agregarCliente(tipoIdentificacion, numeroIdentificacionCliente, nombresClietne, apellidosCliente, empresaCliente, codigoCiudad, celularCliente, direccionCliente, correoCliente) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/cliente/" + numeroIdentificacionCliente + "-" + nombresClietne)
            .set({
                identificacion: tipoIdentificacion,
                numeroIdentificacion: numeroIdentificacionCliente,
                nombres: nombresClietne,
                apellidos: apellidosCliente,
                empresa: empresaCliente,
                codigoCiudad: codigoCiudad,
                celular: celularCliente,
                direccion: direccionCliente,
                correo: correoCliente
            });
        this.toastOperacionExitosa();
    }
    //Metodo para agregar conductores
    agregarConductor(tipoIdentificacionConductor, numeroIdentificacionConductor, nombreConductor, apelidoConductor, celularConductor) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/cliente/" + numeroIdentificacionConductor + "-" + nombreConductor)
            .set({
                identificacion: tipoIdentificacionConductor,
                numeroIdentificacion: numeroIdentificacionConductor,
                nombres: nombreConductor,
                apellidos: apelidoConductor,
                celular: celularConductor
            });
        this.toastOperacionExitosa();
    }
    //obtener uid
    getUID() {
        this.usuarioUid = firebase.auth().currentUser.uid;
        return this.usuarioUid;
    }
    local;
    //Obtener lista de ciudades
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
}