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
    function FBservicesService(router, toastController, alertController) {
        this.router = router;
        this.toastController = toastController;
        this.alertController = alertController;
        //flag 
        this.flag = false;
        //variables idGenerator
        this.varIdGenerator = 0;
        this.anticiposPesajeCompraLista = [];
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
            console.log(_this.usuario);
            console.log(_this.usuarioUid);
        });
    };
    FBservicesService.prototype.iniciarSesion = function (email, password) {
        var _this = this;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function () {
            console.log("Se inicio correctamente");
            console.log("suario:", firebase.auth().currentUser);
            console.log("token ususuario:", firebase.auth().currentUser.uid);
            _this.router.navigate(["main-menu"]);
            _this.usuarioUid = firebase.auth().currentUser.uid;
        })["catch"](function (error) {
            _this.toastErrorAutenticacion();
            console.log(error);
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
                console.log("Se creo correctamente");
                console.log(firebase.auth().currentUser.uid);
                firebase
                    .database()
                    .ref("usuario/" + _this.usuarioUid + "/datosBasicos")
                    .push({
                    usuario: user,
                    email: email
                });
                console.log('bres me registre');
            });
            this.toastRegistroCorrecto()["catch"](function (error) {
                console.log(error);
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
            console.log("correo no enviado validar correo", error);
        });
    };
    FBservicesService.prototype.verificarsesion = function () {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.getUid();
                _this.offLine();
                //this.router.navigate(["main-menu"]);
                _this.usuarioUid = firebase.auth().currentUser.uid;
                _this.mostrarNombre();
                _this.getCiudades();
                _this.getClientes();
                _this.getEstadoProducto();
                _this.getProductos();
                _this.getProveedores();
                _this.getTipoAnticipos();
                _this.getTiposIdentificacion();
                _this.getConductor();
                _this.listaOrdenLotes();
                // this.generarLote();
                console.log("usuario:", _this.usuarioUid);
            }
            else {
                console.log("No hay sesion, toca loguear");
                _this.router.navigate(["login"]);
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
                            color: "danger",
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
                            color: "danger",
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
                            color: "danger",
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
    //obtiene el uid del usuario
    FBservicesService.prototype.getUid = function () {
        this.usuarioUid = firebase.auth().currentUser.uid;
        return this.usuarioUid;
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
    FBservicesService.prototype.crearProdcuto = function (codigoProducto, descripcionProducto, flagEstado) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.pathPush = ("usuario/" + this.usuarioUid + "/configuracion/" + "productos");
        if (this.validaCodigos(codigoProducto, this.pathPush) == false) {
            this.idProducto = this.idGenerator();
            firebase
                .database()
                .ref("usuario/" + this.usuarioUid + "/configuracion/" + "productos/" + this.idProducto)
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
        this.usuarioUid = firebase.auth().currentUser.uid;
        if (apellidoProveedor == null) {
            apellidoProveedor = "";
        }
        if (direccionProveedor == null) {
            direccionProveedor = "";
        }
        if (correoProveedor == null) {
            correoProveedor = "";
        }
        this.pathPush = ("usuario/" + this.usuarioUid + "/configuracion/" + "proveedores");
        if (this.validaNumDocs(numIndetificacionProveedor, this.pathPush) == false) {
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
        else {
            this.toastNumIdentificaExiste();
        }
    };
    //Metodo que permite crear los tipos de identificacion
    FBservicesService.prototype.agregarTipoIdentificacion = function (codigoTipoIdentificacion, descripcionTipoIdentificacion) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.pathPush = ("usuario/" + this.usuarioUid + "/configuracion/" + "tiposIdentificacion");
        if (this.validaCodigos(codigoTipoIdentificacion, this.pathPush) == false) {
            this.idTipoIdentificacion = this.idGenerator();
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
        else {
            this.toastElementoDuplicado();
        }
    };
    //Metodo para agregar estados de producto
    FBservicesService.prototype.agregarEstadoProducto = function (codigoEstadoProducto, descripcionEstadoProducto) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.pathPush = ("usuario/" + this.usuarioUid + "/configuracion/" + "estadoProductos");
        if (this.validaCodigos(codigoEstadoProducto, this.pathPush) == false) {
            this.idEstadoProducto = this.idGenerator();
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
        else {
            this.toastElementoDuplicado();
        }
    };
    //Metodo para agregar el tipo de anticipo
    FBservicesService.prototype.agregarTipoAnticipo = function (codigoTipoAnticipo, descripcionTipoanticipo) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.pathPush = ("usuario/" + this.usuarioUid + "/configuracion/" + "tipoAnticipo");
        if (this.validaCodigos(codigoTipoAnticipo, this.pathPush) == false) {
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
        else {
            this.toastElementoDuplicado();
        }
    };
    //Metodo para agregar el tipo de trueque.
    //agregarTipoTrueque(codigoTipoTrueque, descripcionTipoTrueque) {
    //  this.usuarioUid = firebase.auth().currentUser.uid;
    //this.pathPush = ("usuario/" + this.usuarioUid + "/configuracion/" + "tipoTrueque");
    //if (this.validaCodigos(codigoTipoTrueque, this.pathPush) == false) {
    //   this.idTipoTrueque = this.idGenerator();
    // firebase
    //   .database()
    // .ref("usuario/" + this.usuarioUid + "/configuracion/" + "tipoTrueque/" + this.idTipoTrueque)
    //.set({
    //  id: this.idTipoTrueque,
    //codigo: codigoTipoTrueque,
    //descripcion: descripcionTipoTrueque,
    //estado: 1
    // });
    //this.toastOperacionExitosa();
    //}
    //this.toastElementoDuplicado();
    // }
    //Metodo que permite crear las ciudades del sistema
    FBservicesService.prototype.agregarCiudad = function (codigoCiudad, describcionCiudad) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.pathPush = "";
        this.pathPush = ("usuario/" + this.usuarioUid + "/configuracion" + "/ciudad");
        if (this.validaCodigos(codigoCiudad, this.pathPush) == false) {
            this.idCiudad = this.idGenerator();
            firebase
                .database()
                .ref("usuario/" + this.usuarioUid + "/configuracion" + "/ciudad/" + this.idCiudad)
                .onDisconnect()
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
    FBservicesService.prototype.sleep = function (milliseconds) {
        var date = Date.now();
        var currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
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
        this.pathPush = ("usuario/" + this.usuarioUid + "/configuracion/" + "cliente");
        if (this.validaNumDocs(numeroIdentificacionCliente, this.pathPush) == false) {
            this.idCliente = this.idGenerator();
            firebase
                .database()
                .ref("usuario/" + this.usuarioUid + "/configuracion/" + "cliente/" + this.idCliente)
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
        this.usuarioUid = firebase.auth().currentUser.uid;
        if (apelidoConductor == null) {
            apelidoConductor = "";
        }
        this.pathPush = "";
        this.pathPush = ("usuario/" + this.usuarioUid + "/configuracion/" + "conductor");
        if (this.validaNumDocs(numeroIdentificacionConductor, this.pathPush) == false) {
            this.idConductor = this.idGenerator();
            firebase
                .database()
                .ref("usuario/" + this.usuarioUid + "/configuracion/" + "conductor/" + this.idConductor)
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
    //-----------------------Obtener listas des configuraciones------------------------------------------------
    FBservicesService.prototype.getCiudades = function () {
        var _this = this;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/ciudad")
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
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/cliente")
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
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/estadoProductos")
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
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/productos")
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
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/proveedores")
            .on("value", function (snaphot) {
            _this.proveedoresLista = [];
            snaphot.forEach(function (element) {
                if (element.val().estado == 1) {
                    _this.proveedoresLista.push(element.val());
                }
            });
            return _this.proveedoresLista;
        });
    };
    FBservicesService.prototype.getTipoAnticipos = function () {
        var _this = this;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/tipoAnticipo")
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
    //  getTipoTrueque() {
    //    firebase
    //      .database()
    //     .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/tipoTrueque")
    //    .on("value", snaphot => {
    //      this.tipoTruequeLista = [];
    //      snaphot.forEach(element => {
    //        if (element.val().estado == 1) {
    //           this.tipoTruequeLista.push(element.val());
    //      }
    //    });
    //     return this.tipoTruequeLista;
    // });
    //}
    FBservicesService.prototype.getTiposIdentificacion = function () {
        var _this = this;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/tiposIdentificacion")
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
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "conductor")
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
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "productos/" + idProducto)
            .update({
            estado: 0
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.deleteProveedor = function (idProveedor) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "proveedores/" + idProveedor)
            .update({
            estado: 0
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.deleteTipoIdentificacion = function (idTipoIdentificacion) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "tiposIdentificacion/" + idTipoIdentificacion)
            .update({
            estado: 0
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.deleteEstadoProducto = function (idEstadoProducto) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "estadoProductos/" + idEstadoProducto)
            .update({
            estado: 0
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.deleteTipoAnticipo = function (idTipoAnticipo) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "tipoAnticipo/" + idTipoAnticipo)
            .update({
            estado: 0
        });
        this.toastOperacionExitosa();
    };
    //  deleteTipoTrueque(idTipoTrueque) {
    //      this.usuarioUid = firebase.auth().currentUser.uid;
    //   firebase
    //     .database()
    //    .ref("usuario/" + this.usuarioUid + "/configuracion/" + "tipoTrueque/" + idTipoTrueque)
    //    .update({
    //       estado: 0
    //    });
    //   this.toastOperacionExitosa();
    //}
    FBservicesService.prototype.deleteCiudad = function (idCiudad) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/ciudad/" + idCiudad)
            .update({
            estado: 0
        }).then();
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.deleteCliente = function (idCliente) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "cliente/" + idCliente)
            .update({
            estado: 0
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.deleteConductor = function (idConductor) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "conductor/" + idConductor)
            .update({
            estado: 0
        });
        this.toastOperacionExitosa();
    };
    //----------------------------------------Metodos para actualizar  registros configuracion-------------------------------
    FBservicesService.prototype.updateProdcuto = function (idProducto, codigoProducto, descripcionProducto, flagEstado) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.idProducto = this.idGenerator();
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "productos/" + idProducto)
            .update({
            codigo: codigoProducto,
            descripcion: descripcionProducto,
            predetermina: flagEstado
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.updateProveedor = function (idProveedor, tipoIdentificacionProveedor, numIndetificacionProveedor, nombreProveedor, apellidoProveedor, telefonoProveedor, direccionProveedor, correoProveedor) {
        this.usuarioUid = firebase.auth().currentUser.uid;
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
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "proveedores/" + idProveedor)
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
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "tiposIdentificacion/" + idTipoIdentificacion)
            .update({
            codigo: codigoTipoIdentificacion,
            descripcion: descripcionTipoIdentificacion
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.updateEstadoProducto = function (idEstadoProducto, codigoEstadoProducto, descripcionEstadoProducto) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "estadoProductos/" + idEstadoProducto)
            .update({
            codigo: codigoEstadoProducto,
            descripcion: descripcionEstadoProducto
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.updateTipoAnticipo = function (idTipoAnticipo, codigoTipoAnticipo, descripcionTipoanticipo) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "tipoAnticipo/" + idTipoAnticipo)
            .update({
            codigo: codigoTipoAnticipo,
            descripcion: descripcionTipoanticipo
        });
        this.toastOperacionExitosa();
    };
    FBservicesService.prototype.updateCiudad = function (idCiudad, codigoCiudad, describcionCiudad) {
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "/ciudad/" + idCiudad)
            .update({
            codigo: codigoCiudad,
            descripcion: describcionCiudad
        });
    };
    FBservicesService.prototype.updateCliente = function (idCliente, tipoIdentificacion, numeroIdentificacionCliente, nombresCliente, apellidosCliente, empresaCliente, codigoCiudad, celularCliente, direccionCliente, correoCliente) {
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
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "cliente/" + idCliente)
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
        this.usuarioUid = firebase.auth().currentUser.uid;
        if (apelidoConductor == null) {
            apelidoConductor = "";
        }
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/" + "conductor/" + idConductor)
            .set({
            idTipoIdentificacion: tipoIdentificacionConductor,
            numIndetificacion: numeroIdentificacionConductor,
            nombres: nombreConductor,
            apellidos: apelidoConductor,
            celular: celularConductor
        });
        this.toastOperacionExitosa();
    };
    //---------------------------------- Metodo que genera los id unicos
    FBservicesService.prototype.idGenerator = function () {
        this.varIdGenerator = new Date();
        this.time = String(this.varIdGenerator.getTime());
        this.varIdGenerator = this.time;
        return this.varIdGenerator;
    };
    //Generador de lotes fechaactual+L+consecutivo de lotes 1, 2, 3, ....
    FBservicesService.prototype.generarLote = function () {
        var _this = this;
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.idLote = this.idGenerator();
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/lotes")
            .on("value", function (snapshot) {
            console.log("Se genera lote correctamente" + snapshot.numChildren());
            firebase
                .database()
                .ref("usuario/" + _this.usuarioUid + "/configuracion/lotes/" + _this.idLote)
                .set({
                id: _this.idLote,
                lote: (_this.fechaActual() + "-L" + snapshot.numChildren())
            });
        });
    };
    //Obtiene los lotes del mas antiguo al mas nuevo
    FBservicesService.prototype.listaOrdenLotes = function () {
        var _this = this;
        this.usuarioUid = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/configuracion/lotes")
            .orderByValue()
            .on("value", function (snapshot) {
            _this.ultimoLote = [];
            snapshot.forEach(function (element) {
                _this.ultimoLote.push(element.val().lote);
            });
        });
        return this.ultimoLote;
    };
    //Metodos para las comprassssss
    //pesaje Copmpra
    FBservicesService.prototype.agregarPesaje = function (idProveedor, codigoProducto, totalBultos, pesoBultos, bultosTT) {
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.idPesajeCompra = this.idGenerator();
        this.lastLote = [];
        this.lastLote = (this.listaOrdenLotes().slice(this.listaOrdenLotes().length - 1));
        console.log("lote *- - - - - - - - -", this.lastLote.toString());
        firebase
            .database()
            .ref("usuario/" + this.usuarioUid + "/compras/" + idProveedor + "/" + this.lastLote.toString() + "/pesajeCompra/" + this.idPesajeCompra)
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
    };
    FBservicesService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], FBservicesService);
    return FBservicesService;
}());
exports.FBservicesService = FBservicesService;
