import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { IntermedioResponse } from 'src/app/business/almacen/intermedio/intermedio/models/intermedio.response';
import { IntermedioService } from 'src/app/business/almacen/intermedio/intermedio/intermedio.service';
import { PaneraUtils } from 'src/app/commons/util/panera-util';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IntermedioRequest } from 'src/app/business/almacen/intermedio/intermedio/models/intermedio.request';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { RecetaDetalleResponse } from '../receta-detalle.response';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { PaneraRecetaService } from '../../panera-receta-service';
import { RecetaResponse } from '../receta.response';


@Component({
  selector: 'app-modal-intermedio',
  templateUrl: './modal-intermedio.component.html',
  styleUrls: ['./modal-intermedio.component.scss']
})
export class ModalIntermedioComponent implements OnInit {
  public intermedios: IntermedioResponse[];
  public currentPageIntermedio = 1;
  public itemsPerPageIntermedio = 10;
  public pageSizeIntermedio: number;
  public verIntermedio = false;
  public receta = new RecetaResponse();
  public ingredientes: RecetaDetalleResponse[];
  public recetaDetalles: RecetaDetalleResponse[];
  displayedColumns: string[] = ['select', 'id', 'nombre'];
  dataSource = new MatTableDataSource<IntermedioResponse>();
  selection = new SelectionModel<IntermedioResponse>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 

  
  constructor(              
    private intermedioService: IntermedioService,
    private paneraUtils: PaneraUtils,
    public activeModal: NgbActiveModal,
    private recetaService: PaneraRecetaService,
    ) {
      this.receta = new RecetaResponse();
      this.recetaDetalles = [];
      this.intermedios = [];
      this.listarIntermedios();
      this.cargarReceta();
     }

  ngOnInit() {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IntermedioResponse): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  cargarReceta() {
    PaneraVistaUtils.mostrarLoading(true);
    if (this.paneraUtils.obtenerGet('idReceta') !== undefined) {
      const idReceta = Number(this.paneraUtils.obtenerGet('idReceta'));
      this.recetaService.obtenerReceta(idReceta).subscribe(
        data => {
          if (data.success) {
            this.receta = data.result;
            this.ingredientes = this.receta.ingredientes.slice();
            this.recetaDetalles = this.receta.ingredientes.slice();
            PaneraVistaUtils.cambiarBtnGuardar('Actualizar Receta');
            // this.verBotones();
          } else {
            console.log(data.message);
            PaneraVistaUtils.mostrarLoading(false);
          }
        },
        err => {
          console.log(err);
          PaneraVistaUtils.mostrarLoading(false);
        }
      );
    } else {
      this.receta = new RecetaResponse();
      this.receta.id = 0;
      this.receta.idTipo = 0;
      this.receta.idTipoCategoria = 0;
      this.receta.idCategoria = 0;
      this.receta.idProducto = 0;
      this.receta.idIntermedio = 0;
      this.ingredientes = [];
      //this.verBotones();
    }
  }
  listarIntermedios() {
    const intermedioRequest = new IntermedioRequest();
    this.intermedioService.listarIntermedios(intermedioRequest).subscribe(
      data => {
        if (data.success) {
          this.intermedios = data.result;
          console.log("this.intermedios",this.intermedios);
          this.dataSource = new MatTableDataSource<IntermedioResponse>(this.intermedios);
          this.dataSource.paginator = this.paginator;
        } else {
          console.log(data.message);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  

  // seleccionoIntermedio(i: number) {
  //   if (this.intermedios[i].activo === '0') {
  //     this.intermedios[i].activo = '1';
  //   } else {
  //     this.intermedios[i].activo = '0';
  //   }
  // }

  guardarIntermedio() {
    console.log(this.intermedios);
    console.log(this.selection.selected);

    this.selection.selected.forEach(intermedio => {

        let noExisteIntermedio = true;
        this.ingredientes.forEach(ingrediente => {
          if (ingrediente.idIntermedio === intermedio.id) {
            noExisteIntermedio = false;
          }
        });
        if (noExisteIntermedio) {
          const ingrediente = new RecetaDetalleResponse();
          ingrediente.id = 0;
          ingrediente.idIntermedio = intermedio.id;
          ingrediente.nomIntermedio = intermedio.nombre;
          ingrediente.nomIngrediente = intermedio.nombre;
          ingrediente.cantidad = 1;
          ingrediente.nomMedida = intermedio.nomMedida;
          this.ingredientes.push(ingrediente);
        }
    });
    this.activeModal.close(this.ingredientes);
    // this.modalService.dismissAll();
  }
  cerrar(){
    this.activeModal.dismiss();
  }

  // public onPageChangeIntermedio(pageNumIntermedio: number): void {
  //   this.pageSizeIntermedio = this.itemsPerPageIntermedio * (pageNumIntermedio - 1);
  // }

  // public changePageSizeIntermedio(numIntermedio: number): void {
  //   this.itemsPerPageIntermedio = this.pageSizeIntermedio + numIntermedio;
  // }

  // verBotones() {
  //   const idTipo = Number(this.receta.idTipo);
  //   if (idTipo === 0) {
  //     this.verIntermedio = false;
  //     this.verProducto = false;
  //   }
  //   if (idTipo === PaneraParametro.ID_TIPO_RECETA_INTERMEDIO) {
  //     this.verIntermedio = true;
  //     this.verProducto = false;
  //   } else if (idTipo === PaneraParametro.ID_TIPO_RECETA_PRODUCTO) {
  //     this.verIntermedio = false;
  //     this.verProducto = true;
  //   }
  //   if (Number(this.receta.id) > 0) {
  //     this.verNuevo = false;
  //   } else {
  //     this.verNuevo = true;
  //   }
  // }

}
