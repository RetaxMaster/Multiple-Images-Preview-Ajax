<?php


class Generar
{

  private $cadena;
  private $passw;
  private $longitud;

  public function __construct()
  {
    $this->cadena = "ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    $this->passw = "";
  }

  public function GenerarP($long){
    $longitud = strlen($this->cadena);
    $this->longitud = $long;

    for ($i=0; $i <=$this->longitud ; $i++) {
      $aleatorio= mt_rand(0, $longitud-1);
      $this->passw .= substr($this->cadena, $aleatorio, 1);
    }

    $pass = $this->passw;
    $this->passw = "";

    return $pass;
  }
}


 ?>
