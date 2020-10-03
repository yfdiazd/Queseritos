import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { ToastController, AlertController } from "@ionic/angular";




@Injectable({
  providedIn: "root"
})
export class FBservicesService {
  usuarioUid: string;
  totalGastoP;
  numeroIngresos;

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
        this.usuario = snapshot.val().usuario;
        console.log(this.usuario);
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
            .ref("usuarios/" + this.usuarioUid + "/datosBasicos")
            .set({
              usuario: user,
              email: email
            });
        });
      this.toastRegistroCorrecto().catch(error => {
        console.log(error);
      });
    } else {
      this.toastContras();
    }
    this.router.navigate(["login"]);
  }
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
        this.router.navigate(["home"]);
        this.usuarioUid = firebase.auth().currentUser.uid;
        this.mostrarNombre();
        console.log("usuario:", this.usuarioUid);
      } else {
        this.router.navigate(["login"]);
      }
    });
  }

  // TODOS LOS TOAS o mensajes emergentes
  //toast
  async toastContras() {
    const toast = await this.toastController.create({
      message: "Las contraseñas no son iguales",
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
        "Por favor revisar el correo electronico ya que no existe en el sistema",
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

}
