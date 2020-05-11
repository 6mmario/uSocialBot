import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Router } from '@angular/router';
import { Publicacion } from '../../models/publicacion';
import { PublicacionService } from '../../services/publicacion.service'
import { CovidService } from '../../services/covid.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {
  //-------------------------------------
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Positivos' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Recuperados' },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Muertes', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  // public lineChartPlugins = [pluginAnnotations];
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  //------------------------------------
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  suImagen: number = 0;
  instruccion: boolean = false;
  nombrePais: string = '';
  fecha1: string = '';
  fecha2: string = '';
  data: any = [];
  tipoCasos: string = '';
  casos: number = 0;

  recuperados: number = 0;
  confirmados: number = 0;
  muertes: number = 0;
  fecha: string = '';

  publicacion: Publicacion = {
    texto: '',
    urlimagen: '',
    USUARIO_id_usuario: '',
    base64: '',
    extension: '',
    imagen: 0,
  }

  publicaciones: any = [];
  amigos: any = [];
  us: string = "";


  constructor(private publicacionServices: PublicacionService,
    private covidServices: CovidService,
    private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("id_usuario") === null) { this.router.navigate(['login']); }
    this.us = localStorage.getItem("nickname");
    this.obtenerTodas();
    this.listaAmigos();
    this.obtenerTodo();
  }

  //--------------------

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
    console.log('sirve o no sirve')
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
    console.log('sirve o no sirve v')
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }
  //---------------------------------

  obtenerTodas() {
    this.publicacion.USUARIO_id_usuario = localStorage.getItem("id_usuario");
    this.publicacionServices.getAll().subscribe(
      res => {
        this.publicaciones = res;

      },
      err => console.log(err)
    );
  }

  guardarPublicacion() {
    if (this.publicacion.extension !== 'jpg') {
      this.publicacion.base64 = this.publicacion.base64.replace('data:image/' + this.publicacion.extension + ';base64', '');
    }
    this.publicacion.base64 = this.publicacion.base64.replace('data:image/jpeg;base64', '');

    this.publicacionServices.savePublicacion(this.publicacion).subscribe(
      res => {
        window.location.reload();
      },
      err => console.log(err)
    );

  }

  cargandoImagen(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      console.log(fileInput.target.files[0].name.split('.').pop());
      this.publicacion.extension = fileInput.target.files[0].name.split('.').pop()
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;

            this.publicacion.base64 = this.cardImageBase64;
            this.publicacion.imagen = 1;
            this.suImagen = 1;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  borrarImagen() {
    this.cardImageBase64 = '';
    this.publicacion.base64 = '';
    this.publicacion.extension = '';
    this.publicacion.imagen = 0;
    this.suImagen = 0;
  }

  listaAmigos() {
    this.publicacionServices.getAmigos().subscribe(
      res => {
        this.amigos = res;
      },
      err => console.log(err)
    );
  }

  validar(tag) {
    switch (tag.value) {
      case 'casos':
        this.instruccion = true;
        this.casos = 1;
        break;

      case 'grafica':
        this.instruccion = false;
        this.casos = 0;
        break;
    }
  }

  pais(tag) {
    this.nombrePais = tag.value;
  }

  rangoFecha1(tag) {
    this.fecha1 = tag.value;
  }

  rangoFecha2(tag) {
    this.fecha2 = tag.value;
    console.log({ pais: this.nombrePais, rangoFecha: this.fecha1 + ' - ' + this.fecha2 });
    this.nombrePais = this.nombrePais.replace(/\b\w/g, l => l.toUpperCase());
    console.log({ NombrePais: this.nombrePais });
    const temp = this.nombrePais;
    let aux: any = [];
    aux = this.data[temp];
    console.log(aux);
    this.lineChartLabels = [];
    this.lineChartData = [];
    let f1 = 0;
    let f2 = 0;
    let positivos: any = [];
    let recuperados: any = [];
    let muertes: any = [];
    aux.forEach(element => {

      if (element.date === this.fecha1) {
        f1 = 1;
      }

      if (element.date === this.fecha2) {
        f2 = 1;
        this.lineChartLabels.push(element.date);
        positivos.push(element.confirmed)
        recuperados.push(element.recovered)
        muertes.push(element.deaths)
      }

      if (f1 === 1 && f2 === 0) {
        this.lineChartLabels.push(element.date);
        positivos.push(element.confirmed)
        recuperados.push(element.recovered)
        muertes.push(element.deaths)
      }
    });
    this.lineChartData.push({ data: positivos, label: 'Positivos' },
      { data: recuperados, label: 'Recuperados' },
      { data: muertes, label: 'Muertes', yAxisID: 'y-axis-1' });

  }

  tipoCaso(tag) {
    this.tipoCasos = tag.value;
    this.obtenerData();
  }

  obtenerTodo() {
    this.covidServices.obtenerInfo().subscribe(
      res => {
        this.data = res;
      },
      err => console.log(err)
    );
  }

  obtenerData() {
    this.covidServices.obtenerInfo().subscribe(
      res => {
        this.data = res;
        this.mostrarDatos(this.data)

      },
      err => console.log(err)
    );
  }

  mostrarDatos(data) {
    this.confirmados = 0;
    this.recuperados = 0;
    this.muertes = 0;
    console.log({ instruccion: this.instruccion, pais: this.nombrePais, rangoFecha: this.fecha1 + ' - ' + this.fecha2, tCaso: this.tipoCasos });
    this.nombrePais = this.nombrePais.replace(/\b\w/g, l => l.toUpperCase());
    const temp = this.nombrePais;
    let aux: any = [];
    aux = data[temp];

    aux.forEach(element => {
      //console.log(element.date);
      if (element.date === this.fecha1) {
        console.log('lo encontre');
        switch (this.tipoCasos) {
          case 'confirmados':
            console.log(element.confirmed);
            this.confirmados = element.confirmed
            break;
          case 'recuperados':
            console.log(element.recovered);
            this.recuperados = element.recovered;
            break;
          case 'muertes':
            this.muertes = element.deaths;
            console.log(element.deaths);
            break;
          default:
            this.confirmados = element.confirmed;
            this.recuperados = element.recovered;
            this.muertes = element.deaths;
            break;
        }
      }
    });
  }
}
