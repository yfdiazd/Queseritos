"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.FBservicesService = void 0;
var core_1 = require("@angular/core");
var firebase = require("firebase");
//import { Camera, CameraOriginal } from '@ionic-native/camera';
var FBservicesService = /** @class */ (function () {
    function FBservicesService(router, toastController, alertController, navCtrl, camera) {
        this.router = router;
        this.toastController = toastController;
        this.alertController = alertController;
        this.navCtrl = navCtrl;
        this.camera = camera;
        //flag 
        this.flag = false;
        //variables idGenerator
        this.varIdGenerator = 0;
        this.pesoacumulado = 0;
        this.saldocreditotal = 0;
        this.saldodebitototal = 0;
        this.anticiposPesajeCompraLista = [];
        this.anticipoCompraLista = [];
        //Lista lotes
        this.listaLotes = [];
        this.config = {
            apiKey: "AIzaSyCnnBGKeb3uuEs0KtP3x1od1KGlRSEIuvM",
            authDomain: "queseritos.firebaseapp.com",
            databaseURL: "https://queseritos.firebaseio.com",
            projectId: "queseritos",
            storageBucket: "queseritos.appspot.com",
            messagingSenderId: "589566808528"
        };
        this.options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.ventasclienteLista = [];
        this.sumaCompras = 0;
        this.sumanticipo = 0;
        this.credito = 0;
        this.debito = 0;
        this.saldo = 0;
        firebase.initializeApp(this.config);
        this.verificarsesion();
    }
    //offline
    FBservicesService.prototype.offLine = function () {
        firebase.firestore().enablePersistence()["catch"](function (err) {
            if (err.code == 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            }
            else if (err.code == 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        });
    };
    // todos los mentodos que tienen que ver solo con el usuario
    FBservicesService.prototype.mostrarNombre = function () {
        var _this = this;
        firebase
            .database()
            .ref("usuarios/" + this.usuarioUid + "/datosBasicos")
            .on("value", function (snapshot) {
            _this.usuario = snapshot.val();
        });
    };
    FBservicesService.prototype.iniciarSesion = function (email, password) {
        var _this = this;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function () {
            _this.usuarioUid = firebase.auth().currentUser.uid;
            _this.navCtrl.navigateForward(["main-menu"]);
        })["catch"](function (error) {
            _this.toastErrorAutenticacion();
            console.error(error);
        });
        return this.usuarioUid;
    };
    FBservicesService.prototype.cerrarSesion = function () {
        firebase.auth().signOut();
    };
    //Metodo para registrar el usuario
    FBservicesService.prototype.crearUsuario = function (email, password, user, password2) {
        var _this = this;
        if (password == password2) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(function () {
                _this.usuarioUid = firebase.auth().currentUser.uid;
                firebase
                    .database()
                    .ref("usuario/datosBasicos")
                    .push({
                    usuario: user,
                    email: email
                });
            });
            this.toastRegistroCorrecto()["catch"](function (error) {
                console.error(error);
            });
        }
        else {
            this.toastContras();
        }
        this.router.navigate(["login"]);
    };
    //Metodo que recupera la clve.
    FBservicesService.prototype.recuperarClave = function (correo) {
        var _this = this;
        var auth = firebase.auth();
        auth
            .sendPasswordResetEmail(correo)
            .then(function () {
            _this.alertRecuperacion();
        })["catch"](function (error) {
            _this.toastRecuperacionFail();
        });
    };
    FBservicesService.prototype.verificarsesion = function () {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // this.navCtrl.navigateForward("main-menu");
                _this.router.navigate(["main-menu"]);
                // this.mostrarNombre();
                _this.getCiudades();
                _this.getEstadoProducto();
                _this.getProductos();
                _this.getTipoAnticipos();
                _this.getTiposIdentificacion();
                _this.getProveedores();
                _this.getClientes();
                _this.getConductor();
                _this.listaOrdenLotes();
            }
            else {
                _this.navCtrl.navigateBack(["login"]);
            }
        });
        return this.usuarioUid;
    };
    // TODOS LOS TOAS o mensajes emergentes
    //toast
    FBservicesService.prototype.toastContras = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Las contraseñas no son iguales.",
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    FBservicesService.prototype.toastRegistroCorrecto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Te has registrado correctamente",
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    FBservicesService.prototype.toastErrorAutenticacion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Usuario y/o contraseña incorrectos. Intentelo de nuevo.",
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    FBservicesService.prototype.toastRecuperacionFail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Por favor revisar el correo electronico ya que no existe en Life$Easier",
                            duration: 7000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    FBservicesService.prototype.toastElimino = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Se ha eliminado correctamente",
                            color: "success",
                            duration: 7000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    //mensaje que indica la creacion del producto
    FBservicesService.prototype.toastProductoCrado = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Se ha creado el producto correctamente",
                            color: "success",
                            duration: 7000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    //mensaje que indica la creacion del proveedor
    FBservicesService.prototype.toastProveedorCrado = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Se ha creado el proveedor de manera correcta",
                            color: "success",
                            duration: 7000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    //mensaje que indica la creacion del proveedor
    FBservicesService.prototype.toastNumIdentificaExiste = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "El numero de identificacion ingresado ya existe.",
                            color: "danger",
                            duration: 5000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Alertas
    FBservicesService.prototype.alertRecuperacion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: "Revisa tu correo electronico",
                            message: "Hemos enviado un email de recuperación a tu cuenta de correo electronico.",
                            buttons: ["Vale!"]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //toast operacion exitosa
    FBservicesService.prototype.toastOperacionExitosa = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Operacion ejecutada con exito",
                            color: "success",
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    FBservicesService.prototype.toastExistenPesajesDetale = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Existen pesajes confirmados para esta compra",
                            color: "danger",
                            duration: 5000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    FBservicesService.prototype.toastElementoDuplicado = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "El codigo que intenta agregar ya existe",
                            color: "danger",
                            duration: 5000
                        })];
                    case 1:
                        toas = _a.sent();
                        toas.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    //toast para archivos
    FBservicesService.prototype.toastArchivoImagen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "El archivo que intenta subir no es de tipo imagen por favor intente de nuevo",
                            color: "danger",
                            duration: 5000
                        })];
                    case 1:
                        toas = _a.sent();
                        toas.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    FBservicesService.prototype.toastCamposBlanco = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Por favor diligencie todos los campos del formulario.",
                            color: "danger",
                            duration: 5000
                        })];
                    case 1:
                        toas = _a.sent();
                        toas.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    //METODOS GENERALES:::::::::::::::::::::::::::::::::::
    FBservicesService.prototype.sleep = function (milliseconds) {
        var date = Date.now();
        var currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    };
    //Metodos de validaciones
    FBservicesService.prototype.validaCodigos = function (codigo, path) {
        var _this = this;
        this.flag = false;
        firebase
            .database()
            .ref(path)
            .on("value", function (snapshot) {
            snapshot.forEach(function (element) {
                if (codigo == element.val().codigo && element.val().estado == 1 && element.val().codigo != null) {
                    return _this.flag = true;
                }
                else {
                    _this.flag = false;
                }
            });
        });
        codigo = "";
        path = "";
        return this.flag;
    };
    FBservicesService.prototype.validaNumDocs = function (numIdentifica, path) {
        var _this = this;
        this.pathPush = false;
        firebase
            .database()
            .ref(path)
            .on("value", function (snapshot) {
            snapshot.forEach(function (element) {
                if (numIdentifica == element.val().numIndetificacion && element.val().estado == 1 && element.val() != null) {
                    return _this.flag = true;
                }
                else {
                    _this.flag = false;
                }
            });
        });
        numIdentifica = "";
        path = "";
        return this.flag;
    };
    //-------------Metodo que permite consultar la fecha actual:----------------------------------
    FBservicesService.prototype.fechaActual = function () {
        this.today = new Date();
        this.dd = String(this.today.getDate()).padStart(2, '0');
        this.mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
        this.yyyy = this.today.getFullYear();
        this.today = this.dd + '-' + this.mm + '-' + this.yyyy;
        return this.today;
    };
    //-----------------------------Metodos creacion parametrizacion------------------------------------------------------
    //Metodo que permite crear productos
    FBservicesService.prototype.crearProducto = function (codigoProducto, descripcionProducto, flagEstado) {
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
        }
        else {
            this.toastElementoDuplicado();
        }
    };
    //Metodo que permite crear proveedores
    FBservicesService.prototype.crearProveedor = function (tipoIdentificacionProveedor, numIndetificacionProveedor, nombreProveedor, apellidoProveedor, telefonoProveedor, direccionProveedor, correoProveedor) {
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
        }
        else {
            this.toastNumIdentificaExiste();
        }
    };
    //Metodo que permite crear los tipos de identificacion
    FBservicesService.prototype.agregarTipoIdentificacion = function (codigoTipoIdentificacion, descripcionTipoIdentificacion) {
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
        }
        else {
            this.toastElementoDuplicado();
        }
    };
    //Metodo para agregar estados de producto
    FBservicesService.prototype.agregarEstadoProducto = function (codigoEstadoProducto, descripcionEstadoProducto) {
        this.pathPush = ("usuario/configuracion/" + "estadoProductos");
        if (this.validaCodigos(codigoEstadoProducto, this.pathPush) == false) {
            this.idEstadoProducto = this.idGenerator();
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
        }
        else {
            this.toastElementoDuplicado();
        }
    };
    //Metodo para agregar el tipo de anticipo
    FBservicesService.prototype.agregarTipoAnticipo = function (codigoTipoAnticipo, descripcionTipoanticipo) {
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
        }
        else {
            this.toastElementoDuplicado();
        }
    };
    //Metodo que permite crear las ciudades del sistema
    FBservicesService.prototype.agregarCiudad = function (codigoCiudad, describcionCiudad) {
        this.pathPush = "";
        this.pathPush = ("usuario/configuracion" + "/ciudad");
        if (this.validaCodigos(codigoCiudad, this.pathPush) == false) {
            this.idCiudad = this.idGenerator();
            firebase.firestore().collection("usuario/configuracion/ciudad").doc(this.idCiudad).set({
                id: this.idCiudad,
                codigo: codigoCiudad,
                descripcion: describcionCiudad,
                estado: 1
            });
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
        }
        else {
            this.toastElementoDuplicado();
        }
    };
    //Metodo que permite agregar clientes
    FBservicesService.prototype.agregarCliente = function (tipoIdentificacion, numeroIdentificacionCliente, nombresClietne, apellidosCliente, empresaCliente, codigoCiudad, celularCliente, direccionCliente, correoCliente) {
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
        }
        else {
            this.toastNumIdentificaExiste();
        }
    };
    //Metodo para agregar conductores
    FBservicesService.prototype.agregarConductor = function (tipoIdentificacionConductor, numeroIdentificacionConductor, nombreConductor, apelidoConductor, celularConductor) {
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
        }
        else {
            this.toastNumIdentificaExiste();
        }
    };
    //-----GETS-------------------------------------------------------
    //-----------------------Obtener listas des configuraciones------------------------------------------------
    FBservicesService.prototype.getCiudades = function () {
        var _this = this;
        firebase
            .database()
            .ref("usuario/configuracion/ciudad")
            .on("value", function (snapshot) {
            _this.ciudadesLista = [];
            snapshot.forEach(function (element) {
                if (element.val().estado == 1) {
                    _this.ciudadesLista.push(element.val());
                }
            });
            return _this.ciudadesLista;
        });
    };
    FBservicesService.prototype.getClientes = function () {
        var _this = this;
        firebase
            .database()
            .ref("usuario/configuracion/cliente")
            .on("value", function (snapshot) {
            _this.clientesLista = [];
            snapshot.forEach(function (element) {
                if (element.val().estado == 1) {
                    _this.clientesLista.push(element.val());
                }
            });
            return _this.clientesLista;
        });
    };
    FBservicesService.prototype.getEstadoProducto = function () {
        var _this = this;
        firebase
            .database()
            .ref("usuario/configuracion/estadoProductos")
            .on("value", function (snaphot) {
            _this.estadoProductoLista = [];
            snaphot.forEach(function (element) {
                if (element.val().estado == 1) {
                    _this.estadoProductoLista.push(element.val());
                }
            });
            return _this.estadoProductoLista;
        });
    };
    FBservicesService.prototype.getProductos = function () {
        var _this = this;
        firebase
            .database()
            .ref("usuario/configuracion/productos")
            .on("value", function (snaphot) {
            _this.productosLista = [];
            snaphot.forEach(function (element) {
                if (element.val().estado == 1) {
                    _this.productosLista.push(element.val());
                }
            });
            return _this.productosLista;
        });
    };
    FBservicesService.prototype.getProveedores = function () {
        var _this = this;
        firebase
            .database()
            .ref("usuario/configuracion/proveedores")
            .on("value", function (snaphot) {
            _this.proveedoresLista = [];
            snaphot.forEach(function (element) {
                if (element.val().estado == 1) {
                    _this.proveedoresLista.push(element.val());
                }
            });
            return _this.proveedoresLista;
        });
        // this.getTodo();
    };
    FBservicesService.prototype.getTipoAnticipos = function () {
        var _this = this;
        firebase
            .database()
            .ref("usuario/configuracion/tipoAnticipo")
            .on("value", function (snaphot) {
            _this.tipoAnticipoLista = [];
            snaphot.forEach(function (element) {
                if (element.val().estado == 1) {
                    _this.tipoAnticipoLista.push(element.val());
                }
            });
            return _this.tipoAnticipoLista;
        });
    };
    FBservicesService.prototype.getTiposIdentificacion = function () {
        var _this = this;
        firebase
            .database()
            .ref("usuario/configuracion/tiposIdentificacion")
            .on("value", function (snaphot) {
            _this.tiposIdentificacionLista = [];
            snaphot.forEach(function (element) {
                if (element.val().estado == 1) {
                    _this.tiposIdentificacionLista.push(element.val());
                }
            });
            return _this.tiposIdentificacionLista;
        });
    };
    FBservicesService.prototype.getConductor = function () {
        var _this = this;
        firebase
            .database()
            .ref("usuario/configuracion/conductor")
            .on("value", function (snaphot) {
            _this.conductoresLista = [];
            snaphot.forEach(function (element) {
                if (element.val().estado == 1) {
                    _this.conductoresLista.push(element.val());
                }
            });
            return _this.conductoresLista;
        });
    };
    //----------------------------------Metodos para eliminar estado 0-----------------------------------------
    FBservicesService.prototype.deleteProducto = function (idProducto) {
        firebase
            .database()
            .ref("usuario/configuracion/" + "productos/" + idProducto)
            .update({
            estado: 0
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.deleteProveedor = function (idProveedor) {
        firebase
            .database()
            .ref("usuario/configuracion/" + "proveedores/" + idProveedor)
            .update({
            estado: 0
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.deleteTipoIdentificacion = function (idTipoIdentificacion) {
        firebase
            .database()
            .ref("usuario/configuracion/" + "tiposIdentificacion/" + idTipoIdentificacion)
            .update({
            estado: 0
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.deleteEstadoProducto = function (idEstadoProducto) {
        firebase
            .database()
            .ref("usuario/configuracion/" + "estadoProductos/" + idEstadoProducto)
            .update({
            estado: 0
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.deleteTipoAnticipo = function (idTipoAnticipo) {
        firebase
            .database()
            .ref("usuario/configuracion/" + "tipoAnticipo/" + idTipoAnticipo)
            .update({
            estado: 0
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.deleteCiudad = function (idCiudad) {
        firebase
            .database()
            .ref("usuario/configuracion/" + "/ciudad/" + idCiudad)
            .update({
            estado: 0
        }).then();
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.deleteCliente = function (idCliente) {
        firebase
            .database()
            .ref("usuario/configuracion/" + "cliente/" + idCliente)
            .update({
            estado: 0
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.deleteConductor = function (idConductor) {
        firebase
            .database()
            .ref("usuario/configuracion/" + "conductor/" + idConductor)
            .update({
            estado: 0
        });
        this.toastOperacionExitosa();
    };
    //----------------------------------------Metodos para actualizar  registros configuracion-------------------------------
    FBservicesService.prototype.updateProdcuto = function (idProducto, codigoProducto, descripcionProducto, flagEstado) {
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
    };
    FBservicesService.prototype.updateProveedor = function (idProveedor, tipoIdentificacionProveedor, numIndetificacionProveedor, nombreProveedor, apellidoProveedor, telefonoProveedor, direccionProveedor, correoProveedor) {
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
            correo: correoProveedor
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.updateTipoIdentificacion = function (idTipoIdentificacion, codigoTipoIdentificacion, descripcionTipoIdentificacion) {
        firebase
            .database()
            .ref("usuario/configuracion/" + "tiposIdentificacion/" + idTipoIdentificacion)
            .update({
            codigo: codigoTipoIdentificacion,
            descripcion: descripcionTipoIdentificacion
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.updateEstadoProducto = function (idEstadoProducto, codigoEstadoProducto, descripcionEstadoProducto) {
        firebase
            .database()
            .ref("usuario/configuracion/" + "estadoProductos/" + idEstadoProducto)
            .update({
            codigo: codigoEstadoProducto,
            descripcion: descripcionEstadoProducto
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.updateTipoAnticipo = function (idTipoAnticipo, codigoTipoAnticipo, descripcionTipoanticipo) {
        firebase
            .database()
            .ref("usuario/configuracion/" + "tipoAnticipo/" + idTipoAnticipo)
            .update({
            codigo: codigoTipoAnticipo,
            descripcion: descripcionTipoanticipo
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.updateCiudad = function (idCiudad, codigoCiudad, describcionCiudad) {
        firebase
            .database()
            .ref("usuario/configuracion/" + "/ciudad/" + idCiudad)
            .update({
            codigo: codigoCiudad,
            descripcion: describcionCiudad
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.updateCliente = function (idCliente, tipoIdentificacion, numeroIdentificacionCliente, nombresCliente, apellidosCliente, empresaCliente, codigoCiudad, celularCliente, direccionCliente, correoCliente) {
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
            correo: correoCliente
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.updateConductor = function (idConductor, tipoIdentificacionConductor, numeroIdentificacionConductor, nombreConductor, apelidoConductor, celularConductor) {
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
    };
    //Metodo que genera los id unicos
    FBservicesService.prototype.idGenerator = function () {
        this.varIdGenerator = new Date();
        this.time = String(this.varIdGenerator.getTime());
        this.varIdGenerator = this.time;
        return this.varIdGenerator;
    };
    //Generador de lotes fechaactual+L+consecutivo de lotes 1, 2, 3, ....
    FBservicesService.prototype.generarLote = function () {
        var _this = this;
        this.idLote = this.idGenerator();
        firebase
            .database()
            .ref("usuario/configuracion/lotes")
            .on("value", function (snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach(function (element) {
                    if (element.val().lote.indexOf(_this.fechaActual) <= 0) {
                        firebase
                            .database()
                            .ref("usuario/configuracion/lotes/" + _this.idLote)
                            .set({
                            id: _this.idLote,
                            lote: (_this.fechaActual() + "-L" + snapshot.numChildren())
                        });
                    }
                });
            }
            else {
                firebase
                    .database()
                    .ref("usuario/configuracion/lotes/" + _this.idLote)
                    .set({
                    id: _this.idLote,
                    lote: (_this.fechaActual() + "-L" + snapshot.numChildren())
                });
            }
        });
    };
    //Obtiene los lotes del mas antiguo al mas nuevo
    FBservicesService.prototype.listaOrdenLotes = function () {
        var _this = this;
        this.ultimoLote = [];
        firebase
            .database()
            .ref("usuario/configuracion/lotes")
            .orderByValue()
            .on("value", function (snapshot) {
            snapshot.forEach(function (element) {
                _this.ultimoLote.push(element.val().lote);
            });
        });
        return this.ultimoLote;
    };
    //Metodos para las::::::::::::::::::COMPRAS
    //pesaje Copmpra
    FBservicesService.prototype.agregarPesaje = function (idProveedor, codigoProducto, totalBultos, pesoBultos, bultosTT) {
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
    };
    //Metodo que permite buscar y retornar las compras de los proveedores del ultimo lote
    FBservicesService.prototype.getProveedorCompra = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ordenLotes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.listaOrdenLotes()];
                    case 1:
                        ordenLotes = _a.sent();
                        this.proveedorCompraLista = [];
                        this.lastLote = [];
                        this.lastLote = (ordenLotes.slice(ordenLotes.length - 1));
                        this.proveedoresLista.forEach(function (element) {
                            firebase
                                .database()
                                .ref("usuario/compras/" + element.id + "/" + _this.lastLote.toString() + "/pesajeCompra")
                                .on("value", function (snapshot) {
                                if (snapshot.exists() && snapshot.val() !== null) {
                                    _this.proveedorCompraLista.push(snapshot.val());
                                }
                            });
                        });
                        return [2 /*return*/, this.proveedorCompraLista];
                }
            });
        });
    };
    // Traer los pesajes del proveedor seleccionado
    FBservicesService.prototype.getPesajeCompra = function (idProveedor, lote) {
        return __awaiter(this, void 0, void 0, function () {
            var ordenLotes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.listaOrdenLotes()];
                    case 1:
                        ordenLotes = _a.sent();
                        this.pesajeCompraLista = [];
                        this.lastLote = [];
                        this.lastLote = (ordenLotes.slice(this.listaOrdenLotes().length - 1));
                        firebase
                            .database()
                            .ref("usuario/compras/" + idProveedor + "/" + lote + "/pesajeCompra")
                            .on("value", function (snapshot) {
                            _this.pesajeCompraLista = [];
                            snapshot.forEach(function (element) {
                                _this.pesajeCompraLista.push(element.val());
                            });
                            return _this.pesajeCompraLista;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FBservicesService.prototype.deletePesajeCompra = function (idProveedor, idPesajeCompra) {
        var ordenLotes = this.listaOrdenLotes();
        this.lastLote = [];
        this.lastLote = (ordenLotes.slice(ordenLotes.length - 1));
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra/" + idPesajeCompra)
            .remove();
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.updateCostoCompra = function (idProveedor, idPesajeCompra, totalCompra, accion) {
        if (accion == "suma") {
            var totalLocal = 0;
            this.getCostoCompra(idProveedor, idPesajeCompra);
            totalLocal = this.costoCompraTemp;
            totalLocal = (totalLocal + totalCompra);
            firebase
                .database()
                .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra/" + idPesajeCompra)
                .update({
                costoTotalCompra: totalLocal
            });
        }
        else if (accion == "resta") {
            var totalLocal = 0;
            this.getCostoCompra(idProveedor, idPesajeCompra);
            totalLocal = this.costoCompraTemp;
            console.log("esto es la db en compra balance ", totalLocal);
            console.log("esto es local lo que se quita de balance ", totalCompra);
            totalLocal = (totalLocal - totalCompra);
            console.log("esto queda se actualziara en la base de taos ", totalLocal);
            firebase
                .database()
                .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra/" + idPesajeCompra)
                .update({
                costoTotalCompra: totalLocal
            });
        }
    };
    FBservicesService.prototype.getCostoCompra = function (idProveedor, idPesajeCompra) {
        var _this = this;
        this.costoCompraTemp = 0;
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra")
            .on("value", function (snapshot) {
            snapshot.forEach(function (element) {
                if (element.key == idPesajeCompra) {
                    _this.costoCompraTemp = element.val().costoTotalCompra;
                }
            });
        });
        return this.costoCompraTemp;
    };
    //Confirmar pesajes
    FBservicesService.prototype.agregarConfirmaPesaje = function (idProveedor, idPesajeCompra, idEstadoProducto, cantidadEstado, costoKilo, costoTotalEstado) {
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
    };
    FBservicesService.prototype.getPesajeConfirmado = function (idProveedor, idPesajeCompra) {
        return __awaiter(this, void 0, void 0, function () {
            var ordenLotes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pesajeConfirmadoLista = [];
                        this.objPesajeConfirmado = [];
                        this.sumapesoConfirmado = 0;
                        this.saldoPesoConfirmado = 0;
                        return [4 /*yield*/, this.listaOrdenLotes()];
                    case 1:
                        ordenLotes = _a.sent();
                        this.lastLote = [];
                        this.lastLote = (ordenLotes.slice(ordenLotes.length - 1));
                        firebase
                            .database()
                            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/confirmarPesajeCompra/" + idPesajeCompra)
                            .on("value", function (snapshot) {
                            if (snapshot.exists()) {
                                _this.pesajeConfirmadoLista = [];
                                _this.sumapesoConfirmado = 0;
                                _this.saldoPesoConfirmado = 0;
                                snapshot.forEach(function (element) {
                                    _this.estadoProductoLista.forEach(function (estadoPro) {
                                        if (estadoPro.id == element.val().idEstadoProducto) {
                                            _this.objPesajeConfirmado = ({
                                                nombreEstadoQueso: estadoPro.descripcion,
                                                cantidadEstado: element.val().cantidadEstado,
                                                codigoLote: element.val().codigoLote,
                                                costoKilo: element.val().costoKilo,
                                                costoTotalEstado: element.val().costoTotalEstado,
                                                id: element.val().id,
                                                idEstadoProducto: element.val().idEstadoProducto,
                                                idPesajeCompra: element.val().idPesajeCompra
                                            });
                                            _this.pesajeConfirmadoLista.push(_this.objPesajeConfirmado);
                                            _this.objPesajeConfirmado = null;
                                            _this.sumapesoConfirmado = (_this.sumapesoConfirmado + parseInt(element.val().cantidadEstado));
                                            _this.saldoPesoConfirmado = (_this.saldoPesoConfirmado + parseInt(element.val().costoTotalEstado));
                                        }
                                    });
                                });
                            }
                            return _this.pesajeConfirmadoLista, _this.sumapesoConfirmado;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FBservicesService.prototype.deletePesajeConfirmado = function (idProveedor, idPesajeCompra, idPesajeConfirmado, valor) {
        var ordenLotes = this.listaOrdenLotes();
        this.lastLote = [];
        this.lastLote = (ordenLotes.slice(ordenLotes.length - 1));
        this.updateCostoCompra(idProveedor, idPesajeCompra, valor, "resta");
        this.updateBalanceLoteCompra(idProveedor, this.lastLote.toString(), valor, "resta");
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/confirmarPesajeCompra/" + idPesajeCompra + "/" + idPesajeConfirmado)
            .remove();
        this.toastOperacionExitosa();
    };
    //metodo que permite registrar un anticipo a la compra
    FBservicesService.prototype.registrarAnticiposApesajeCompra = function (idProveedor, idPesajeCompra, lote, idTipoAnticipo, valorAnticipo, archivo) {
        var objAnt = null;
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
    };
    FBservicesService.prototype.getPesajeAnt = function (idProveedor, lote, idPesajeCompra) {
        var listaAnt = [];
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + lote + "/anticipos")
            .on("value", function (snapshot) {
            snapshot.forEach(function (element) {
                if (element.val().idPesajeCompra == idPesajeCompra) {
                    listaAnt.push(element.val());
                }
            });
        });
        this.updatePesajeAnt(idProveedor, lote, idPesajeCompra, listaAnt);
    };
    FBservicesService.prototype.updatePesajeAnt = function (idProveedor, lote, idPesajeCompra, anticipo) {
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + lote + "/pesajeCompra/" + idPesajeCompra)
            .update({
            anticipos: anticipo
        });
    };
    FBservicesService.prototype.getAnticipoProveedor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var proveedoresLista;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lastLote = [];
                        this.lastLote = (this.ultimoLote.slice(this.ultimoLote.length - 1));
                        this.anticipoCompraLista = [];
                        return [4 /*yield*/, this.proveedoresLista];
                    case 1:
                        proveedoresLista = _a.sent();
                        proveedoresLista.forEach(function (element) {
                            firebase
                                .database()
                                .ref("usuario/compras/" + element.id + "/" + _this.lastLote.toString() + "/anticipos")
                                .on('value', function (snapshot) {
                                if (snapshot.exists() && snapshot.val() !== null) {
                                    _this.anticipoCompraLista.push(snapshot.val());
                                }
                            });
                        });
                        return [2 /*return*/, this.anticipoCompraLista];
                }
            });
        });
    };
    FBservicesService.prototype.getAnticipoDirectoProveedor = function (idProveedor, lote) {
        var _this = this;
        this.anticipoDirectoProveedorLista = [];
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + lote + "/anticipos")
            .on("value", function (snapshot) {
            _this.anticipoDirectoProveedorLista = [];
            if (snapshot.exists()) {
                snapshot.forEach(function (element) {
                    if (element.val().idPesajeCompra == 0 || element.val().idPesajeCompra == "0") {
                        _this.anticipoDirectoProveedorLista.push(element.val());
                    }
                });
            }
        });
        return this.anticipoDirectoProveedorLista;
    };
    FBservicesService.prototype.getFoto = function (idProveedor, idAnticipo) {
        var _this = this;
        this.img = null;
        firebase
            .storage()
            .ref("anticipos/" + idProveedor + "/" + idAnticipo).getDownloadURL().then(function (imgUr) {
            _this.img = imgUr;
            return _this.img;
        });
    };
    FBservicesService.prototype.upLoadImage = function (idProveedor, idAnticipo, file) {
        firebase.storage().ref("anticipos/" + idProveedor + "/" + idAnticipo).put(file.target.files[0]);
    };
    FBservicesService.prototype.deleteImage = function (idProveedor, idAnticipo) {
        firebase.storage().ref("anticipos/" + idProveedor + "/" + idAnticipo)["delete"]();
    };
    FBservicesService.prototype.deleteAnticiposApesajeCompra = function (idProveedor, idPesaje, idAnticipo, valorAnticipo, lote) {
        this.updateBalanceLoteAnt(idProveedor, lote, valorAnticipo, "resta");
        this.deleteImage(idProveedor, idAnticipo);
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + lote + "/anticipos/" + idAnticipo)
            .remove();
        if (idPesaje !== 0) {
            this.getPesajeAnt(idProveedor, lote, idPesaje);
        }
    };
    FBservicesService.prototype.getProveedoresCompra = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.proveedoresCompraLista = [];
                firebase
                    .database()
                    .ref()
                    .child("usuario/compras/")
                    .on("value", function (snapshot) {
                    snapshot.forEach(function (element) {
                        _this.proveedoresCompraLista.push(element.key);
                    });
                });
                return [2 /*return*/, this.proveedoresCompraLista];
            });
        });
    };
    FBservicesService.prototype.getLotesDelProveedor = function (idProveedor) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.listaLotesDelProveedor = [];
                this.objLotesDelProveedor = null;
                firebase
                    .database()
                    .ref()
                    .child("usuario/compras/" + idProveedor)
                    .on("value", function (snapshot) {
                    _this.listaLotesDelProveedor = [];
                    _this.objLotesDelProveedor = null;
                    snapshot.forEach(function (element) {
                        _this.objLotesDelProveedor = ({
                            lote: element.key,
                            compra: element.val().balance.comprasLote,
                            anticipo: element.val().balance.anticiposLote
                        });
                        _this.listaLotesDelProveedor.push(_this.objLotesDelProveedor);
                    });
                });
                return [2 /*return*/, this.listaLotesDelProveedor];
            });
        });
    };
    FBservicesService.prototype.getLoteProveedor = function () {
        var _this = this;
        this.saldodebitototal = 0;
        this.pesoacumulado = 0;
        this.saldocreditotal = 0;
        this.objImp = [];
        this.onbjAnt = [];
        this.listaCard = [];
        this.listaAnt = [];
        this.proveedorCompraLista.forEach(function (element) {
            var total = 0;
            var totalCosto = 0;
            var totalBultos = 0;
            var keys = Object.keys(element);
            var lotes = element[keys[0]].idProveedor;
            keys.forEach(function (key) {
                total += element[key].pesoBultos;
                totalBultos += element[key].totalBulto;
                totalCosto += element[key].costoTotalCompra;
                _this.pesoacumulado += element[key].pesoBultos;
                _this.saldocreditotal += element[key].costoTotalCompra;
            });
            _this.objImp = ({
                idProvedor: lotes,
                bultos: totalBultos,
                costo: totalCosto,
                peso: total
            });
            _this.listaCard.push(_this.objImp);
        });
        this.anticipoCompraLista.forEach(function (element) {
            var totalAnt = 0;
            var keys = Object.keys(element);
            var prov = element[keys[0]].idProveedor;
            keys.forEach(function (key) {
                totalAnt += element[key].valorAnticipo;
                _this.saldodebitototal += element[key].valorAnticipo;
            });
            _this.onbjAnt = ({
                valorAnt: totalAnt,
                idProvee: prov
            });
            _this.listaAnt.push(_this.onbjAnt);
        });
        this.recorreListas();
        return this.listaCard, this.listaAnt, this.pesoacumulado, this.saldocreditotal, this.saldodebitototal;
    };
    FBservicesService.prototype.recorreListas = function () {
        var _this = this;
        this.listaPaVer = [];
        if (this.listaAnt.length != 0) {
            this.listaPaVer = [];
            this.listaCard.forEach(function (element) {
                _this.listaAnt.forEach(function (element2) {
                    if (element.idProvedor == element2.idProvee) {
                        _this.obtPa = ({
                            idProvedor: element.idProvedor,
                            bultos: element.bultos,
                            costo: element.costo,
                            peso: element.peso,
                            debito: element2.valorAnt
                        });
                        _this.listaPaVer.push(_this.obtPa);
                        _this.obtPa = null;
                    }
                    else if (_this.listaPaVer.filter(function (valor) {
                        return valor.idProvedor == element.idProvedor;
                    }).length == 0 && _this.listaAnt.filter(function (valorF) {
                        return valorF.idProvee == element.idProvedor;
                    }).length == 0) {
                        _this.obtPa = ({
                            idProvedor: element.idProvedor,
                            bultos: element.bultos,
                            costo: element.costo,
                            peso: element.peso,
                            debito: 0
                        });
                        _this.listaPaVer.push(_this.obtPa);
                        _this.obtPa = null;
                    }
                });
            });
        }
        else {
            this.listaPaVer = [];
            this.listaCard.forEach(function (elementC) {
                _this.obtPa = ({
                    idProvedor: elementC.idProvedor,
                    bultos: elementC.bultos,
                    costo: elementC.costo,
                    peso: elementC.peso,
                    debito: 0
                });
                _this.listaPaVer.push(_this.obtPa);
                _this.obtPa = null;
            });
        }
        return this.listaPaVer;
    };
    //METODOS PARA LOS::::::::::::::::::::::::ESTADOS
    //Metodo para traer todos los funcionarios
    FBservicesService.prototype.getInfoCompra = function (idProveedor, idCompra) {
        var _this = this;
        this.infoCompraUnica = [];
        this.lastLote = [];
        this.lastLote = (this.ultimoLote.slice(this.ultimoLote.length - 1));
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra/" + idCompra)
            .on("value", function (snapshot) {
            _this.infoCompraUnica = [];
            if (snapshot.val().estado == 1) {
                _this.infoCompraUnica.push(snapshot.val());
            }
            return _this.infoCompraUnica;
        });
        this.getPesajeConfirmado(idProveedor, idCompra);
    };
    FBservicesService.prototype.getPesajeLoteProveedor = function (idProveedor, lote) {
        var _this = this;
        this.pesajeLoteProveedorLista = [];
        firebase
            .database()
            .ref()
            .child("usuario/compras/" + idProveedor + "/" + lote + "/pesajeCompra")
            .on("value", function (snapshot) {
            _this.pesajeLoteProveedorLista = [];
            if (snapshot.exists) {
                snapshot.forEach(function (element) {
                    _this.pesajeLoteProveedorLista.push(element.val());
                });
            }
        });
    };
    FBservicesService.prototype.crearBalanceLote = function (idProveedor, lote) {
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + lote + "/balance")
            .on("value", function (snapshot) {
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
    };
    FBservicesService.prototype.getBalanceLote = function (idProveedor, lote) {
        var _this = this;
        this.balanceLoteCompra = 0;
        this.balanceLoteAnts = 0;
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + lote)
            .on("value", function (snapshot) {
            snapshot.forEach(function (element) {
                if (element.key == "balance") {
                    _this.balanceLoteCompra = element.val().comprasLote;
                    _this.balanceLoteAnts = element.val().anticiposLote;
                }
            });
        });
        return this.balanceLoteCompra, this.balanceLoteAnts;
    };
    FBservicesService.prototype.updateBalanceLoteCompra = function (idProveedor, lote, compra, accion) {
        if (accion == "suma") {
            this.getBalanceLote(idProveedor, lote);
            var local = this.balanceLoteCompra;
            local = (local + compra);
            firebase
                .database()
                .ref("usuario/compras/" + idProveedor + "/" + lote + "/balance")
                .update({
                comprasLote: local
            });
        }
        else if (accion == "resta") {
            this.getBalanceLote(idProveedor, lote);
            var local = this.balanceLoteCompra;
            local = (local - compra);
            firebase
                .database()
                .ref("usuario/compras/" + idProveedor + "/" + lote + "/balance")
                .update({
                comprasLote: local
            });
        }
    };
    FBservicesService.prototype.updateBalanceLoteAnt = function (idProveedor, lote, anticipo, accion) {
        if (accion == "suma") {
            this.getBalanceLote(idProveedor, lote);
            var local = this.balanceLoteAnts;
            local = (local + anticipo);
            firebase
                .database()
                .ref("usuario/compras/" + idProveedor + "/" + lote + "/balance")
                .update({
                anticiposLote: local
            });
        }
        else if (accion == "resta") {
            this.getBalanceLote(idProveedor, lote);
            var local = this.balanceLoteAnts;
            local = (local - anticipo);
            firebase
                .database()
                .ref("usuario/compras/" + idProveedor + "/" + lote + "/balance")
                .update({
                anticiposLote: local
            });
        }
    };
    //saldar Deudas
    FBservicesService.prototype.saldarDeudasProveedor = function (idProveedor, valor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.agregarEstadoProveedor(idProveedor, valor);
                this.getObjProveedor(idProveedor);
                this.agregarHistorico(idProveedor, this.objMoverHistorico);
                return [2 /*return*/];
            });
        });
    };
    FBservicesService.prototype.getObjProveedor = function (idProveedor) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.moverHistoricoLista = [];
                this.objMoverHistorico = null;
                firebase
                    .database()
                    .ref("usuario/compras/" + idProveedor)
                    .on("value", function (snapshot) {
                    _this.moverHistoricoLista = [];
                    _this.objMoverHistorico = null;
                    _this.objMoverHistorico = ({
                        objHistorico: snapshot.val()
                    });
                    _this.moverHistoricoLista.push(_this.objMoverHistorico);
                });
                return [2 /*return*/];
            });
        });
    };
    FBservicesService.prototype.alertaSaldarLote = function (idProveedor, valorMensaje) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: 'Saldado correctamente',
                            message: 'El proximo lote inicia con $' + valorMensaje,
                            buttons: [
                                {
                                    text: 'Aceptar',
                                    handler: function () {
                                        _this.saldarDeudasProveedor(idProveedor, valorMensaje);
                                        _this.eliminarNodoProveedor(idProveedor);
                                        // this.navCtrl.navigateBack(["cardlistaproveedores"]);
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FBservicesService.prototype.agregarHistorico = function (idProveedor, objeto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                firebase
                    .database()
                    .ref("usuario/historico/" + idProveedor)
                    .set({
                    nodo: objeto
                });
                return [2 /*return*/];
            });
        });
    };
    FBservicesService.prototype.agregarEstadoProveedor = function (idProveedor, valor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                firebase
                    .database()
                    .ref("usuario/estadoProveedor/" + idProveedor)
                    .set({
                    valor: valor
                });
                return [2 /*return*/];
            });
        });
    };
    FBservicesService.prototype.getEstadoProveedor = function (idProveedor) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.estadoSaldoProveedor = 0;
                firebase
                    .database()
                    .ref("usuario/estadoProveedor/" + idProveedor)
                    .on("value", function (snapshot) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (element) {
                            _this.estadoSaldoProveedor = element.val();
                        });
                    }
                    else {
                        _this.estadoSaldoProveedor = 0;
                    }
                });
                return [2 /*return*/, this.estadoSaldoProveedor];
            });
        });
    };
    FBservicesService.prototype.eliminarNodoProveedor = function (idProveedor) {
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor)
            .remove();
    };
    FBservicesService.prototype.agregarVenta = function (idCliente, ciudad, conductor, fechaEnvio, listaPesada, pesoEnviado, pesoLimite, placa, imagen) {
        var img;
        var nodo = fechaEnvio.split("-", 3);
        var fechaNodo = (nodo[0] + "-" + nodo[1]);
        this.idVenta = this.idGenerator();
        if (imagen !== undefined) {
            img = imagen;
            this.upLoadImageVenta(idCliente, this.idVenta, img);
        }
        else {
            img = "No se adjunto imagen.";
        }
        firebase
            .database()
            .ref("usuario/ventas/" + idCliente + "/" + fechaNodo + "/" + this.idVenta)
            .set({
            id: this.idVenta,
            idCliente: idCliente,
            ciudad: ciudad,
            conductor: conductor,
            costoVenta: 0,
            fechaEnvio: fechaEnvio,
            pesadas: listaPesada,
            pesoEnviado: pesoEnviado,
            pesoLimite: pesoLimite,
            placa: placa,
            imagen: img
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.updateVenta = function () {
    };
    FBservicesService.prototype.upLoadImageVenta = function (idCliente, idVenta, file) {
        firebase.storage().ref("ventas/" + idCliente + "/" + idVenta).put(file.target.files[0]);
    };
    FBservicesService.prototype.getVentaCliente = function (idCliente) {
        var _this = this;
        this.sumaVentas = 0;
        this.ventasclienteLista = [];
        firebase
            .database()
            .ref("usuario/ventas/" + idCliente)
            .on("value", function (snapshot) {
            _this.ventasclienteLista = [];
            _this.listaKey = [];
            _this.sumaVentas = 0;
            if (snapshot.exists()) {
                snapshot.forEach(function (element) {
                    _this.listaKey.push(element.key);
                });
                _this.listaKey.forEach(function (element) {
                    firebase
                        .database()
                        .ref("usuario/ventas/" + idCliente + "/" + element)
                        .on("value", function (snapshot) {
                        snapshot.forEach(function (element) {
                            _this.sumaVentas += element.val().costoVenta;
                            _this.ventasclienteLista.push(element.val());
                        });
                    });
                });
            }
            return _this.ventasclienteLista, _this.sumaVentas;
        });
    };
    FBservicesService.prototype.getVentaClienteMes = function (idCliente) {
        var _this = this;
        this.sumaVentaMes = 0;
        var fechaSpl = this.fechaActual().split("-", 3);
        var nodo = (fechaSpl[2] + "-" + fechaSpl[1]);
        this.ventasclienteListaMes = [];
        firebase
            .database()
            .ref("usuario/ventas/" + idCliente + "/" + nodo)
            .on("value", function (snapshot) {
            _this.ventasclienteListaMes = [];
            _this.sumaVentaMes = 0;
            if (snapshot.exists()) {
                snapshot.forEach(function (element) {
                    console.log("elemesdsadasd as", element.val().costoVenta);
                    _this.ventasclienteListaMes.push(element.val());
                    _this.sumaVentaMes += element.val().costoVenta;
                });
            }
            return _this.ventasclienteListaMes, _this.sumaVentaMes;
        });
    };
    FBservicesService.prototype.updateBultoPesajeDetallado = function (idProveedor, idPesaje, listaBultos, peso, totalBultos, idProducto) {
        var _this = this;
        this.lastLote = [];
        this.lastLote = (this.ultimoLote.slice(this.ultimoLote.length - 1));
        firebase
            .database()
            .ref("usuario/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra/" + idPesaje)
            .on("value", function (snapshot) {
            if (snapshot.val().costoTotalCompra == 0) {
                firebase
                    .database()
                    .ref("usuario/compras/" + idProveedor + "/" + _this.lastLote.toString() + "/pesajeCompra/" + idPesaje)
                    .update({
                    bultoLista: listaBultos,
                    pesoBultos: peso,
                    totalBulto: totalBultos,
                    idProducto: idProducto
                });
                _this.toastOperacionExitosa();
            }
            else {
                _this.toastExistenPesajesDetale();
            }
        });
    };
    FBservicesService.prototype.eliminarVenta = function (idCliente, fechaNodo, idVenta) {
        var nodo = fechaNodo.split("-", 3);
        var nodoEnv = (nodo[0] + "-" + nodo[1]);
        firebase
            .database()
            .ref("usuario/ventas/" + idCliente + "/" + nodoEnv + "/" + idVenta)
            .remove();
    };
    FBservicesService.prototype.eliminarPesada = function (idCliente, fechaNodo, idVenta, idPesada) {
        var nodo = fechaNodo.split("-", 3);
        var nodoEnv = (nodo[0] + "-" + nodo[1]);
        firebase
            .database()
            .ref("usuario/ventas/" + idCliente + "/" + nodoEnv + "/" + idVenta + "/pesadas")
            .on("value", function (snapshot) {
            console.log(" pesadasdsdasdasdasda ", snapshot.val());
            snapshot.forEach(function (element) {
                console.log("id bultos de pesadas ", element.val().id);
                console.log("KEY bultos de pesadas ", element.key);
                if (element.val().id == idPesada && element.val().valor == 0) {
                    console.log("ingresamos");
                    firebase.database().ref("usuario/ventas/" + idCliente + "/" + nodoEnv + "/" + idVenta + "/pesadas/" + element.key)
                        .remove();
                }
            });
        });
    };
    FBservicesService.prototype.actualizarVenta = function (idCliente, ciudad, conductor, fechaEnvio, listaPesada, pesoEnviado, pesoLimite, placa, imagen, costoVenta, idVenta) {
        var nodo = fechaEnvio.split("-", 3);
        var nodoEnv = (nodo[0] + "-" + nodo[1]);
        var img;
        if (imagen !== undefined) {
            img = imagen;
            this.upLoadImageVenta(idCliente, idVenta, img);
            firebase
                .database()
                .ref("usuario/ventas/" + idCliente + "/" + nodoEnv + "/" + idVenta)
                .update({
                idCliente: idCliente,
                ciudad: ciudad,
                conductor: conductor,
                costoVenta: costoVenta,
                fechaEnvio: fechaEnvio,
                pesadas: listaPesada,
                pesoEnviado: pesoEnviado,
                pesoLimite: pesoLimite,
                placa: placa,
                imagen: img
            });
        }
        else {
            firebase
                .database()
                .ref("usuario/ventas/" + idCliente + "/" + nodoEnv + "/" + idVenta)
                .update({
                idCliente: idCliente,
                ciudad: ciudad,
                conductor: conductor,
                costoVenta: costoVenta,
                fechaEnvio: fechaEnvio,
                pesadas: listaPesada,
                pesoEnviado: pesoEnviado,
                pesoLimite: pesoLimite,
                placa: placa
            });
        }
    };
    FBservicesService.prototype.updatecostoVenta = function (idCliente, fechaNodo, idVenta, pesoPesada, valorPesada, costoAnterior, accion) {
        return __awaiter(this, void 0, void 0, function () {
            var nodo, nodoEnv, a, a;
            return __generator(this, function (_a) {
                nodo = fechaNodo.split("-", 3);
                nodoEnv = (nodo[0] + "-" + nodo[1]);
                console.log("fecha:", nodoEnv);
                if (accion == "suma") {
                    a = (pesoPesada * valorPesada);
                    a = (a + costoAnterior);
                    firebase
                        .database()
                        .ref("usuario/ventas/" + idCliente + "/" + nodoEnv + "/" + idVenta)
                        .update({
                        costoVenta: a
                    });
                }
                else if (accion == "resta") {
                    a = (pesoPesada * valorPesada);
                    a = (costoAnterior - a);
                    firebase
                        .database()
                        .ref("usuario/ventas/" + idCliente + "/" + nodoEnv + "/" + idVenta)
                        .update({
                        costoVenta: a
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    FBservicesService.prototype.updatePesadas = function (idCliente, fechaNodo, idVenta, idPesada, pesoPesada, valorPesada) {
        var nodo = fechaNodo.split("-", 3);
        var nodoEnv = (nodo[0] + "-" + nodo[1]);
        var a = (pesoPesada * valorPesada);
        console.log("fecha update:", nodoEnv);
        firebase
            .database()
            .ref("usuario/ventas/" + idCliente + "/" + nodoEnv + "/" + idVenta + "/pesadas")
            .on("value", function (snapshot) {
            console.log(" pesadasdsdasdasdasda ", snapshot.val());
            snapshot.forEach(function (element) {
                console.log("id bultos de pesadas ", element.val().id);
                console.log("KEY bultos de pesadas ", element.key);
                if (element.val().id == idPesada && element.val().valor == 0) {
                    console.log("ingresamos");
                    firebase.database().ref("usuario/ventas/" + idCliente + "/" + nodoEnv + "/" + idVenta + "/pesadas/" + element.key)
                        .update({
                        valor: valorPesada,
                        valorTotal: a
                    });
                }
            });
        });
    };
    FBservicesService.prototype.getTodo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lista, a, b;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("entro a get Todo");
                        return [4 /*yield*/, this.proveedoresLista];
                    case 1:
                        lista = _a.sent();
                        this.sumaTodo = [];
                        a = 0;
                        b = 0;
                        this.credito = 0;
                        this.debito = 0;
                        this.saldo = 0;
                        // let d = 0;
                        // let c = 0;
                        lista.forEach(function (element) {
                            firebase
                                .database()
                                .ref()
                                .child("usuario/compras/" + element.id)
                                .on("value", function (snapshot) {
                                snapshot.forEach(function (element) {
                                    // lote: element.key,
                                    _this.sumaCompras = (a + element.val().balance.comprasLote);
                                    _this.sumanticipo = (b + element.val().balance.anticiposLote);
                                    _this.credito += _this.sumaCompras;
                                    _this.debito += _this.sumanticipo;
                                    // this.sumaTodo.push({
                                    //     compras: this.sumaCompras,
                                    //     anticipos: this.sumanticipo
                                    // });
                                });
                            });
                        });
                        // this.sumaTodo.forEach(element => {
                        //     this.credito = (d + element.compras);
                        //     this.debito = (c + element.anticipos);
                        // });
                        this.saldo = (this.credito - this.debito);
                        console.log("object getTodo", this.credito, this.debito, this.saldo);
                        return [2 /*return*/, (this.sumaTodo, this.credito, this.debito, this.saldo)];
                }
            });
        });
    };
    FBservicesService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], FBservicesService);
    return FBservicesService;
}());
exports.FBservicesService = FBservicesService;
